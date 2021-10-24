/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require("path");
const urljoin = require("url-join");
const config = require("./data/SiteConfig");

require('dotenv').config({
  path: `.env${ (process.env.NODE_ENV === 'development' ) ? '.development' : (process.env.NODE_ENV) ? '.'+process.env.NODE_ENV : ''}`
})

module.exports = {

  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true
  },

  pathPrefix: config.pathPrefix === "" ? "/" : config.pathPrefix,

  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    title: config.siteTitle,
    titleTemplate: "%s"+' '+config.separator+' '+config.siteTitle,
    description: config.siteDescription,
    url: config.siteUrl,
    image: config.siteLogo,
    twitterUsername: config.twitterUsername,

    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(
        config.siteUrl,
        config.pathPrefix
      )}/logos/logo-512.png`,
      copyright: config.copyright
    }
  },

  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: config.wordpressUri,
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-HPK4DN9PG6",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {},
        failOnError: true,
        stripMetadata: true,
        defaultQuality: 60,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },

    /*
    * Redirect
    * Must be the last in the array
    */
    `gatsby-plugin-meta-redirect`,
    
  ],
};