---
title: "Next.js ile Supabase: Adım Adım Kimlik Doğrulama (Auth) Akışı"
slug: nextjs-supabase-auth
titleImage: title.png
titleImageAlt: ""
date: 7 Mayıs 2025
tags: [Nextjs, React, Supabase, Auth, Yazılım]
---

Bu yazıda, bir Next.js projesine Supabase kimlik doğrulamasını (authentication) adım adım entegre etmeyi inceleyeceğiz. Başlamadan önce Supabase nedir kısaca bir göz atalım.

![](/blog/nextjs-supabase-auth/title.png)

## Supabase Nedir?

Supabase, modern web ve mobile uygulamalar geliştirmeyi hızlandıran bir açık kaynak backend servisidir (Backend as a Service). Supabase ile:

- PostgreSQL veritabanı oluşturabilir
- Gerçek zamanlı veritabanı oluşturabilir
- Dosya yükleme ve yönetimi yapabilir
- Edge network sayesinde kullanıcılara en yakın şekilde backend kodu çalıştırabilir
- Admin paneli sayesinde değişiklikleri kolayca yapabilirsiniz
- Bunlara ek olarak, Supabase aynı zamanda uygulamanızın auth kısmını da yönetebilir

### Supabase Proje Kurulumu

Supabase kayıt olduktan sonra “new project” tuşuna tıkayın, gerekli alanları doldurun, parolayı supabase üzerinde otomatik oluşturun ya da bir şifre yöneticisi ile oluşturup bir yere kayıt edin, ben bunun için bitwarden’ın notlarını kullanıyorum

![](/blog/nextjs-supabase-auth/new-project-screen.png)

Daha sonra, settings/ Data API bölümüne gidin, buradaki URL ve API anahtarlarını .env.local dosyanıza ekleyin. Özellikle SUPABASE*KEY (service_role anahtarı) gibi hassas anahtarların asla tarayıcıya sızmaması gerektiğini unutmayın. Next.js, yalnızca NEXT_PUBLIC* önekiyle başlayan ortam değişkenlerini (.env variables) tarayıcıya gönderir, bu yüzden SUPABASE_KEY gibi anahtarlar sunucu tarafında güvende kalır. Yine de API anahtarlarınızı yönetirken her zaman dikkatli olun.

```javascript
NEXT_PUBLIC_SUPABASE_URL = "project url";
SUPABASE_KEY = "süper gizli service_role anahtarı";
NEXT_PUBLIC_SUPABASE_ANON_KEY = "public anahtar";
```

Typescript tiplerini oluşturmak için bu kodu terminale yazın

```javascript
pnpx supabase gen types typescript --project-id {project_id} > src/lib/supabase/database.types.ts
```

**project_id’yi URL’den alabilirsiniz**: https://{project_id}.supabase.co

Ardından Next.js projenizde src/lib/supabase klasörü oluşturun (eğer projede src klasörü kullanmıyorsanız app/\_lib/supabase klasörü oluşturun). Bu klasörün altına aşağıdaki dosyaları ekleyin. Bu dosyaların içeriği standart Supabase kurulumundan biraz farklı; detaylarını aşağıda açıklayacağım.

_**client.ts:**_ Bu dosyayı client üzerindeki istekler için kullanacağız

```javascript
import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

if (
!process.env.NEXT_PUBLIC_SUPABASE_URL ||
!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
throw new Error("Problem connecting to the database");

export const supabaseClientAnon = createClient<Database>(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
```

_**server.ts:**_ Bu dosya, sunucudaki Supabase client’larımız için. Normalde createServerClientAPI ile RLS’e (Row Level Security) uygun şekilde çalışırız, yani herkes kendi verisini görür, işler tıkırındadır. Ama bazen, özellikle admin tarafında bir şeyler yaparken ya da tüm verilere erişmemiz gereken özel durumlarda, RLS biraz baş ağrıtabilir.

İşte tam bu noktada, createBrowserClientAPI’ı SUPABASE_KEY (tam yetkili service_role anahtarı) ile kullanarak RLS’i devre dışı bırakıp işimizi hallediyoruz. Yani, browser client’ı, sunucuda RLS’i bypass etmek için kullanıyoruz.

Ama burası önemli: Bu service_role anahtarı tüm kapıları açar, süper admin gücü verir. O yüzden bunu kullanırken çok dikkatli olmamız lazım. Sadece sunucu tarafında ve gerçekten başka çare kalmadığında kullanılmalı, yoksa farkında olmadan güvenlik açıklarına davet açarız.

```javascript
import {
createServerClient as createServerClientAPI,
createBrowserClient as createBrowserClientAPI,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "./database.types";

export async function createServerClient() {
const cookieStore = await cookies();

return createServerClientAPI<Database>(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() {
return cookieStore.getAll();
},
setAll(cookiesToSet) {
try {
cookiesToSet.forEach(({ name, value, options }) =>
cookieStore.set(name, value, options),
);
} catch {
// The `setAll` method was called from a Server Component.
// This can be ignored if you have middleware refreshing
// user sessions.
}
},
},
},
);
}
// ! This overrides the Row Level Security (RLS) policy
export async function createBrowserClient() {
return createBrowserClientAPI<Database>(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.SUPABASE_KEY!,
);
}
```

_**lib/supabase/middleware.ts:**_ Bu auth akışının parçası

```javascript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
let supabaseResponse = NextResponse.next({
request,
});

const supabase = createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() {
return request.cookies.getAll();
},
setAll(cookiesToSet) {
cookiesToSet.forEach(({ name, value }) =>
request.cookies.set(name, value),
);
supabaseResponse = NextResponse.next({
request,
});
cookiesToSet.forEach(({ name, value, options }) =>
supabaseResponse.cookies.set(name, value, options),
);
},
},
},
);

// Do not run code between createServerClient and
// supabase.auth.getUser(). A simple mistake could make it very hard to debug
// issues with users being randomly logged out.

// IMPORTANT: DO NOT REMOVE auth.getUser()

const {
data: { user },
} = await supabase.auth.getUser();

if (
!user &&
!request.nextUrl.pathname.startsWith("/login") &&
!request.nextUrl.pathname.startsWith("/signup")
) {
// no user, potentially respond by redirecting the user to the login page
const url = request.nextUrl.clone();
url.pathname = "/login";
return NextResponse.redirect(url);
}

// IMPORTANT: You _must_ return the supabaseResponse object as it is.
// If you're creating a new response object with NextResponse.next() make sure to:
// 1. Pass the request in it, like so:
// const myNewResponse = NextResponse.next({ request })
// 2. Copy over the cookies, like so:
// myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
// 3. Change the myNewResponse object to fit your needs, but avoid changing
// the cookies!
// 4. Finally:
// return myNewResponse
// If this is not done, you may be causing the browser and server to go out
// of sync and terminate the user's session prematurely!

return supabaseResponse;
}
```

_**src/middleware.ts:**_

```javascript
import { updateSession } from "@/lib/supabase/middleware";
import { MiddlewareConfig, type NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
return await updateSession(request);
}
export const config: MiddlewareConfig = {
matcher: [
'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
],
};
```

Artık auth kısmına geçebiliriz ama ondan önce ufak bir not:

Supabase fonksiyonlarınızı oluştururken 2 farklı dosya oluşturun, sunucuda çalışacak fonksiyonları bir dosyaya, browser üzerinde çalışacakları diğer tarafa ekleyin. Diğer türlü hata alacaksınız, çünkü NEXT_PUBLIC ile işaretlenmeyen .env değişkenleri browser’a gönderilmeyeceği için runtime hatasına neden olacak.

**Projeyi kurduk, çevre değişkenlerini ayarladık şimdi işin heyecanlı kısmına geliyoruz: kullanıcı auth sistemi!**

## AUTH

İşin büyük kısmını tamamladık artık sadece login ve signup sayfalarını oluşturmak kaldı. Giriş ve kayıt sayfalarınızı oluşturun bunu yaparken dosya yollarının supabase/middleware.ts ile aynı olmasına dikkat edin.

_**action.ts:**_

```javascript
"use server";
import { redirect } from "next/navigation";
import { createServerClient } from "./supabase/server";
import { loginFormSchema, LoginFormSchema } from "./validation/loginForm";
import { SignupFormSchema, signupFormSchema } from "./validation/signupForm";

export async function login(inputData: LoginFormSchema) {
const validatedData = loginFormSchema.safeParse(inputData);

if (!validatedData.success) {
const fieldErrors = validatedData.error.flatten().fieldErrors;

    return {
      error: {
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };

}

const supabase = await createServerClient();
const { data, error } = await supabase.auth.signInWithPassword({
email: inputData.email,
password: inputData.password,
});

if (error) {
console.error(error.message);
throw new Error(error.message);
}

redirect("/admin");

return data;
}

export async function signup(inputData: SignupFormSchema) {
const validatedUserData = signupFormSchema.safeParse({
fullName: inputData.fullName,
email: inputData.email,
password: inputData.password,
});

if (!validatedUserData.success) {
const fieldErrors = validatedUserData.error.flatten().fieldErrors;

    return {
      error: {
        fullName: fieldErrors.fullName,
        email: fieldErrors.email,
        password: fieldErrors.password,
      },
    };

}

const fullName = validatedUserData.data.fullName;
const email = validatedUserData.data.email;
const password = validatedUserData.data.password;

if (!fullName || !email || !password) return;
const supabase = await createServerClient();

const { data, error } = await supabase.auth.signUp({
email,
password,
options: {
data: { fullName },
},
});

if (error) {
console.error(error.message);
throw new Error(error.message);
}
if (data?.user?.role !== "authenticated") redirect("/admin/");

return { message: "Success" };
}

export async function logout() {
const supabase = await createServerClient();
const { error } = await supabase.auth.signOut();

if (error) {
console.error(error.message);
throw new Error(error.message);
}

redirect("/");
}
```

Not: Auth’un çalışması için validasyon koduna gerek yok fakat atlanmaması gerken bir detay olduğu için kod içinde bıraktım.

## Giriş ve Kayıt Sayfaları

_**login.tsx:**_

```javascript
"use client";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/action";
import { loginFormSchema, LoginFormSchema } from "@/lib/validation/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

function AdminLoginForm() {
const form = useForm<LoginFormSchema>({
defaultValues: { email: "", password: "" },
resolver: zodResolver(loginFormSchema),
});
const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
login(data);
};

return (

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} action="">
<FormField
name="email"
control={form.control}
rules={{ required: "Email is required" }}
render={({ field }) => {
return (
<FormItem>
<FormLabel>Email</FormLabel>
<FormControl>
<Input placeholder="user@example.com" {...field} />
</FormControl>
</FormItem>
);
}}
/>
<FormField
name="password"
control={form.control}
render={({ field }) => {
return (
<FormItem>
<FormLabel>Password</FormLabel>
<FormControl>
<Input placeholder="password" {...field} />
</FormControl>
</FormItem>
);
}}
/>
<Button type="submit">Submit</Button>
</form>
</Form>
);
}
export default AdminLoginForm;

```

_**signup.tsx:**_

```javascript
"use client";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { signup } from "@/lib/action";
import {
SignupFormSchema,
signupFormSchema,
} from "@/lib/validation/signupForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

function AdminSignupForm() {
const form = useForm<SignupFormSchema>({
resolver: zodResolver(signupFormSchema),
defaultValues: { email: "", password: "", fullName: "" },
});

const onSubmit: SubmitHandler<SignupFormSchema> = async (data) => {
await signup(data);
};

return (

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)}>
<FormField
name="email"
control={form.control}
render={({ field }) => {
return (
<FormItem>
<FormLabel>Email</FormLabel>
<FormControl>
<Input placeholder="user@example.com" {...field} />
</FormControl>
</FormItem>
);
}}
/>
<FormField
name="password"
control={form.control}
render={({ field }) => {
return (
<FormItem>
<FormLabel>Password</FormLabel>
<FormControl>
<Input placeholder="password" {...field} />
</FormControl>
</FormItem>
);
}}
/>
<FormField
name="fullName"
control={form.control}
render={({ field }) => {
return (
<FormItem>
<FormLabel>Fullname</FormLabel>
<FormControl>
<Input placeholder="john smith" {...field} />
</FormControl>
</FormItem>
);
}}
/>
<Button disabled={form.formState.isSubmitting} type="submit">
Submit
</Button>
</form>
</Form>
);
}
export default AdminSignupForm;
```

Evet, artık çalışan bir auth akışınız var. Şimdi çok önemli bir konuya değinelim: sayfa koruması için **yalnızca Next.js middleware’ine güvenmek yeterli değil.** Yakın zamanda ortaya çıkan [CVE-2025–29927](https://nvd.nist.gov/vuln/detail/CVE-2025-29927) açığı, bu yaklaşımın risklerini net bir şekilde gösterdi. Sadece middleware’e bel bağlamak, ciddi güvenlik açıklarına neden olabilir. Bu yüzden, asıl yetkilendirme işlemini her zaman sunucu tarafında yapmalıyız. Browser üzerinde de yetki kontrolü yapabilirsiniz ama buna kritik işler için güvenmeyin,** asıl güvenilir yetki kontrolü her zaman sunucuda yapılmalı.** İşte sunucuda kullanacağımız kod:

```javascript
export async function getCurrentUserServer() {
  const supabase = await createServerClient();
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return {
    user: user.user,
    isAuthenticated: user.user.role === "authenticated",
  };
}
```

ve bunu her sayfa (page.tsx) başında kullanıcı yetkili mi diye kontrol etmek için kullanın:

```javascript
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUserServer } from "@/lib/supabase/data-service";
import { redirect } from "next/navigation";

async function Admin() {
  const userData = await getCurrentUserServer();
  if (!userData) redirect("/admin/auth/login");
  if (!userData.isAuthenticated) redirect("/admin/auth/login");

  return (
    <div>
      <SidebarTrigger className="h-24 w-24 text-black" />
      <div className="mx-auto max-w-7xl p-4"></div>
    </div>
  );
}
export default Admin;
```

Bununla birlikte Supabase email ve parola auth akışı oluşturduk, kullanıcılarınız kayıt olup giriş yapabildiği bir yapı kurduk!

Kaynak koduna [buradan](https://github.com/emrekupcuoglu/the-cozy-nest) ulaşabilirsiniz, auth sadece /admin altında çalışıyor bu yüzden kodlarda ufak farklıklar var.

Sonraki yazımda sosyal giriş seçenekleri (OAuth) ya da Rol Tabanlı Erişim Kontrolüne (Role Based Access Control) gibi konulara değineceğim. Takipte kalın.
