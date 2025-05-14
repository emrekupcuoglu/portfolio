/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://emrekupcuoglu.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/admin"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },

  transform: async (config, path) => {
    // Blog page and blog posts
    if (path === "/blog" || path.startsWith("/blog/")) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    }

    // Home page
    if (path == "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    // Default for everything else
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
