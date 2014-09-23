/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on routes, check out:
 * http://links.sailsjs.org/docs/config/routes
 */

module.exports.routes = {


  // Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, etc. depending on your
  // default view engine) your home page.
  //
  // (Alternatively, remove this and add an `index.html` file in your `assets` directory)
  '/': {view: 'homepage'},

  'POST /articles': {controller: "Articles", action: "create"},
  'PUT /articles': {controller: "Articles", action: "update"},
  'GET /articles': {controller: "Articles", action: "find"},

  'POST /comments': {controller: "Comments", action: "create"},
  'PUT /comments': {controller: "Comments", action: "update"},

  'POST /users': {controller: "Users", action: "signup"},
  'PUT /users': {controller: "Users", action: "update"},
  'GET /users': {controller: "Users", action: "login"},

  'POST /settings': {controller: "Settings", action: "install"},
  'PUT /settings': {controller: "Settings", action: "update"},

  'POST /photos': {controller: "Photos", action: "upload"},

  'PUT /ads': {controller: "Ads", action: "update"}


};
