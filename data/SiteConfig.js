const config = {
    wordpressRootUri: 'http://comovotar2021.com', // Don't using trailing slash at the end
    wordpressUri: 'http://cms.comovotar2021.local/wp/graphql',
    siteTitle: "CNE Simulador del Voto", // Site title.
    separator: "|",
    siteTitleShort: "Simulador del Voto", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
    siteTitleAlt: "", // Alternative site title for SEO.
    siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
    siteUrl: "https://comovotar2021.com", // Domain of your website without pathPrefix.
    canonicalUrl: "https://comovotar2021.com",
    pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
    siteDescription: "Simulador del Voto para el Consejo Nacional Electoral", // Website description used for RSS feeds/meta description tag.
    siteFBAppID: "", // FB Application ID for using app insights
    googleAnalyticsID: "UA-76678443-1", // GA tracking ID.
    facebookPixel: "",
    disqusShortname: "", // Disqus shortname.
    dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
    dateFormat: "DD/MM/YYYY", // Date format for display.
    postsPerPage: 6, // Amount of posts displayed per listing page.
  
    siteRss: "/rss.xml", // Path to the RSS file.
    siteRssTitle: "RSS feed", // Title of the RSS feed
    userName: "CNE", // Username to display in the author segment.
    userEmail: "cne@domain.com", // Email used for RSS feed's author segment
    userLocation: "", // User location to display in the author segment.
    twitterUsername: "@cneusername", // Optionally renders "Follow Me" in the UserInfo segment.
    
  };
  
  // Make sure pathPrefix is empty if not needed
  if (config.pathPrefix === "/") {
    config.pathPrefix = "";
  } else {
    // Make sure pathPrefix only contains the first forward slash
    config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
  }
  
  // Make sure siteUrl doesn't have an ending forward slash
  if (config.siteUrl.substr(-1) === "/")
    config.siteUrl = config.siteUrl.slice(0, -1);
  
  // Make sure siteRss has a starting forward slash
  if (config.siteRss && config.siteRss[0] !== "/")
    config.siteRss = `/${config.siteRss}`;
  
  module.exports = config;