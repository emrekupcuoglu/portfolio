---
kicker: React'i gerçekten anlıyor musunuz?
title: useState ve useEffect Nasıl Çalışır? React'in İçine Bir Yolculuk!
subtitle: React'in nasıl çalıştığını gerçekten anlamak istiyorsanız, kendi hook sisteminizi yazmak en iyi yollardan biri. Bu yazıda useState ve useEffect'in perde arkasına birlikte bakıyoruz.
slug: sifirdan-react-hook-yapimi
---

![](/blog/sıfırdan-react-hook-yapımı/react-hooks-title.png)

> Ya bu useState sihir gibi çalışıyor… Ama nasıl oluyor bu iş?

İşte bu yazıda tam olarak bunu yapacağız: useState ve useEffect hook'larının perde arkasında nasıl çalıştığını, sıfırdan bir örnekle anlayacağız. Hazırladığımız örnek kendini React zanneden küçük bir React olacak.

Yani useState'i biz yazacağız, useEffect'i de biz, render fonksiyonunu bile kendimiz kontrol edeceğiz. Böylece React'in neden belirli kurallara sahip olduğunu (örneğin hook'ların sıraya bağlı olması gibi) çok daha iyi anlayacağız.

## useState

İlk hedefimiz useState'i anlamak, önce safça bir yöntem deneyelim

```javascript
const useState = (initialVal) => {
  let state = initialVal;
  const setState = (val) => {
    state = val;
  };

  return [state, setState];
};
const [count, setCount] = useState(0);
console.log(count);
setCount(count + 1);
console.log(count);
setCount(count + 1);
console.log(count);
```

Bu kod beklediğimiz gibi çalışsa her şey çok güzel olurdu fakat closures sağolsun alacağımız tek çıktı 0 olacak. Fonksiyonun içindeki değer güncellenmesine rağmen count değişkeni güncellenmeyecek çünkü count değişkeni canlı bir değişken değil, ilk oluşturulduğu andaki değerin bir kopyası. Bunu çözmek için getter fonksiyonu kullanabiliriz.

```javascript
const useState = (initialVal) => {
let \_val = initialVal;
let state = () => \_val;
const setState = (val) => {
\_val = val;
};
return [state, setState];
};

const [count, setCount] = useState(0);
console.log(count());
setCount(count() + 1);
console.log(count());
```

Getter sayesinde closure içerisindeki güncel değeri okuyabiliyoruz. Fakat React, getter ile değil direkt olarak değişkenin kendisi ile çalışıyor.

### Basit Renderer

Öncelikle basit bir React renderer ve örnek bir component oluşturalım.
Burada demomuz için kullanacağımız bir React iskeleti oluşturduk, IIFE kullandık çünkü React instance'ından sadece bir tane olmasını istiyoruz. render metodunda component'ı geri dödürüyoruz, bu ilerde işimize yarayacak.

```javascript
const React = (function () {
let \_val;

const render = (Component) => {
const C = Component();
C.render();
return C;
};
return { useState, render };
})();
```

**Bu da demomuzda kullanacağımız React fonksiyonumuz**

```javascript
function Component() {
  const [count, setCount] = React.useState(0);

  return {
    render: () => console.log({ count }),
    click: () => {
      setCount(count + 1);
    },
  };
}
```

**useState'i ekleyelim**

```javascript
const useState = (initialVal) => {
let state = \_val || initialVal;
const setState = (val) => {
\_val = val;
};
return [state, setState];
};
```

Artık hazırız, useState'i sıfırdan yazdık!

> Not: React setState çalıştırıldığında, React component'ın yeniden render edilmesi gerektiğini anlar ve bu süreci kendisi yönetir. Biz burada React'in iç işleyişini adım adım daha net görebilmek için bu yeniden render adımını manuel yapıyoruz. alkdjawkdljakldajdlk ajdkajdalwkdj awlkdjalkdjawkldajdklawjdal kdjakdjaklakldjawkldjawkldjawlkdjaw awdjawkdjawlkdjaw aw lkdjawkld jawkld jawkld jadkl ajdklajdawkldjawkld jawk djadkl ajd lkajdakl jdawkld jawk

```javascript
let App = React.render(Component);
App.click();
App = React.render(Component);
App = React.render(Component);
App.click();
App = React.render(Component);
App = React.render(Component);
App.click();
App = React.render(Component);
App.click();
App = React.render(Component);
```

Ama o da ne, biraz kurcaladığımızda birden fazla useState eklediğimizde sapıttığını görüyoruz. Çünkü değerlerimizi \_val üzerinde saklıyoruz. Bize bir array gerek…

## Çoklu useState

Aslında birden fazla state takip etmek oldukça basit. Sadece bir array ve pointer'den oluşuyor! useState ve diğer hookları if else gibi koşullu ifadelerin içine yazmamızın yasak olmasının da sebebi bu aslında. React hookları her zaman aynı sırada bekliyor.

```javascript
if (Math.random() > 0.5) {
  const [count, setCount] = useState(0);
}
```

Yani eğer _hook[0] = count_ ise React bunu her zaman 0. pozisyonda olmasını bekler. Eğer biz useState'i koşullu olarak oluşturursak count 1. sırada da olabilir 0. sırada da.
Öncelikle \_val kaldırıp bunu ekleyelim

```javascript
const hooks = [];
let index = 0;
useState fonksiyonunu güncelleyelim
const useState = (initialVal) => {
let state = hooks[index] || initialVal;

    const setState = (val) => {
      hooks[index] = val;
    };
    index++;
    return [state, setState];

};
```

Component fonksiyonu:

```javascript
function Component() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState("Hello");

  return {
    render: () => console.log({ count, text }),
    click: () => {
      setCount(count + 1);
    },
    type: (newWord) => {
      setText(newWord);
    },
  };
}
```

Unutmadan render fonksiyonun başına bunu ekleyin, çünkü her "render"dan sonra hook pointer'ımızı sıfırlamalıyız.

```javascript
index = 0;
```

Ve büyük an geldi aşağıdaki kodu çalıştırın ve…

```javascript
let App = React.render(Component);
App.click();
App = React.render(Component);
App.type("world");
App = React.render(Component);
```

iyice bozulduğunu görün 😬. Merak etmeyin çözümü basit ama gözden kaçması kolay detay.
Stale Closures

!["stale closures decorative image](/blog/sıfırdan-react-hook-yapımı/react-hooks-stale-closure.png)

JavaScript'i ilk öğrenirken sürekli closure'ların çok karışık olduğunu duymuştum, ama örnekleri görünce "millet ne kadar abartıyor ne varki bunda" demiştim. Ve uzun bir süre boyunca da karşıma çıkmadı, bazen farkında olarak bazense farkında olmadan sürekli closure'ları kulanıyordum. Fakat derinlere inince ne kadar karmaşık olabileceğini gördüm. Kodumuzun çalışmamasının nedeni "stale closure". Stale yani bayat, eski. Buradaki çözüm ise aslında biraz ironik gelebilir: setState fonksiyonunun, global index'in ileride alacağı değerlere göre "bayat" kalacak olan, kendi oluşturulduğu andaki index değerini yakalayan bir kapanış (closure) oluşturmasını sağlamaktır.
Burada index = 0 ataması yapıyoruz, fakat setState her renderdan sonra çalıştırılıyor ve setState çalışana kadar index tekrar 0 oluyor, bunu çözmek için index'i dondurmamız gerek.

```javascript
const render = (Component) => {
  index = 0;
  const C = Component();
  C.render();
  return C;
};
```

Neyseki bu çok basit, tek yapmamız gereken index değişkenin bir kopyasını yapmak ve hook pointer olarak onu kullanmak. Bunu yaptığımızda setState global index değişkenin üzerine kapanmak (close over) yerine içindeki "donmuş" \_index değşikenin üzerinde kapanacak, ve beklediğimiz gibi çalışacak.

```javascript
const useState = (initialVal) => {
  let state = hooks[index] || initialVal;

  const _index = index;
  const setState = (val) => {
    hooks[_index] = val;
  };
  index++;
  return [state, setState];
};
```

Bununla birlikte useState hazır, sıra useEffect'te

## useEffect

![](/blog/sıfırdan-react-hook-yapımı/react-hooks-diagram.png)

İşin zor kısmını hallettik, useEffect'in daha zor olacağını düşünüyorsanız yanılıyorsunuz, aslında çok kolay. Tek yapmamız gereken eski bağlı değişkenlerle yenileri karşılaştırmak ve fark varsa eğer callback fonksiyonunu çalıştırmak. Fakat önce useEffect'in mantığına bakalım

useEffect'i yan etkileri yönetmek için kullanıyoruz, yan etkiler React'in render döngüsünün dışında kaldığı için React'in döngüsünden çıkıp kod çalıştırmamız gerektiği zamanlarda kullanıyoruz

Çalışma mantığı aslında çok basit tek gerekenler:

1. Her hangi bir dependency değiştiğinde çalışacak bir callback
2. Ve izlenecek değişkenler (dependencies)

Aslında useEffect'in dependency array ile yaptığı şey verdiğimiz fonksiyonu, önbelleklemeklemeye benziyor (cache etmek). Fakta bir değeri ya da referansı önbelleklemek yerine, aynı temel prensipleri kullanarak fonksiyonun ne zaman çalışması gerektiğine karar veriyor. Fonksiyonun (cb) gereksiz yere tekrar tekrar çalışmasını engellemek için, girdilerinin (deps) değişip değişmediğini kontrol ederiz. Eğer girdiler aynıysa, sonucu (yani fonksiyonu çalıştırmayı) atlarız.

Bu mantık, React'teki diğer optimizasyon hook'ları olan useMemo ve useCallback ile de yakından ilişkilidir:

- useMemo: Bir fonksiyonun dönüş değerini memoize eder. Bağımlılıkları değişmediği sürece, fonksiyonu tekrar çalıştırmak yerine önbelleğe alınmış değeri döndürür. Ağır hesaplamalar için birebir
- useCallback: Bir fonksiyonun kendisini memoize eder. Bağımlı değişkenler aynı kaldığı sürece, aynı fonksiyon referansını döndürür. Bu da özellikle child component'lara fonksiyon geçerken gereksiz render'ları engeller.

```javascript
const useEffect = (cb, deps) => {
  const oldDeps = hooks[index];
  let hasChanged = true;

  if (oldDeps) {
    hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
  }

  if (hasChanged) cb();
  hooks[index] = deps;
};
```

Bizim useEffect'imiz React'te bulunan bazı kritik özellikleri içermiyor, bunlar:

- dependency array olmadığında her renderda çalışması: React dependency array olmadığında yan etkileri her renderdan sonra çalıştırır, bu genelde istenmeyen bir davranıştır o yüzden dependency array'inize callback fonksiyonunuzdaki bütün değikenleri ekleyin. React'a asla yalan söylemeyin (rules of hook). Dependency array, renderların ne zaman olmasını kontrol ettiğiniz bir yer değildir, eğer deps array'i eksik girerek istediğiniz sonucu alıyorsanız emin olun bunun %99 daha iyi bir yolu vardır.
- Temizleme(cleanup) fonksiyonu eksikliği: Cleanup fonksiyonu fonksiyonunuz DOM'dan kaldırılmadan önce ve callback fonksiyonu çalışmadan hemen önce çalışır. Genelde effect çalışmadan önce zamanlayıcıları ve abonelikleri (sub-pub, event listeners) kaldırmada kullanılır.

Eşitliği kontrol ederken Object.is kullandık çünkü JavaScript'in NaN ile imtihanını çözüyor hem de React kendisi de bunu kullanıyor.

Artık kendi useState ve useEffect implementasyonunuzu yazabildiğinize göre, React'in neden bu kadar kurallı çalıştığını (rules of hooks) daha iyi anlayabilirsiniz. Bu küçük örnek, React'in iç mimarisine dair büyük bir pencere aralıyor.
