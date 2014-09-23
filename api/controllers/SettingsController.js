/**
 * SettingsController
 *
 * @description :: Server-side logic for managing settings
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require( '../blueprints/_util/actionUtil' );
var bcrypt = require('bcrypt-nodejs');

module.exports = {
	
  install: function(req, res) {
    Users.find({type: "superuser"}).exec(function(err, superUser) {
      // If an admin user exists, skip the bootstrap data
      console.log(superUser+"====="+err);
      if (superUser.length > 0) { return res.json({error: 'superuser exists'}); }
      var password;
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          res.json(err);
        }
        bcrypt.hash('password', salt, function() {} , function(err, hash) {
          if (err) {
            res.json(err);
          }
          Users.create({username: 'SuperUser', email: 'superuser@nodepress.org', password: hash, type: 'superuser' }).exec(function(err, superUser){

            Settings.create({id: 1, name: 'NodePress', url: 'www.nodepress.org', administratorEmail: 'admin@nodepress.com', slogan: 'A blogging platform', description: 'NodePress is a blogging platform that out performs all, start out with a lightweight blog and add features as you go.'}).exec(function(err, settings){

              Ads.create({placement: 'top', script: '<h2> Place Ad Here! </h2>'}).exec(function(err,ad){
              Ads.create({placement: 'sidebar-top', script: '<h2> Place Sidebar-Top Ad Here! </h2>'}).exec(function(){});
              Ads.create({placement: 'sidebar-bottom', script: '<h2> Place Sidebar-Bottom Ad Here! </h2>'}).exec(function(){});
              Ads.create({placement: 'comments', script: '<h2> Place Comments Ad Here! </h2>'}).exec(function(){});
              Ads.create({placement: 'articles', script: '<h2> Place Articles Ad Here! </h2>'}).exec(function(){});
                Articles.create({title: 'Cats Stealing Dog’s Beds', heading: 'These poor pups have gotten their beds stolen away!', slug: 'cats-stealing-dogs-beds', status: 'published', coverPhoto: 'http://viralcharge.com/wp-content/uploads/2014/09/cat-seals-dogs-beds-510x300.jpg', body: '<div class="responsive-video"> <iframe src="//www.youtube.com/embed/ovWqEtVVUFs" frameborder="0" allowfullscreen></iframe></div><br><p>These poor pups have gotten their beds stolen away!</p>'}).exec(function(err,article){

                  Tags.create({name: 'Funny'}).exec(function(err, tag){

                    Categorys.create({name: 'General'}).exec(function(err, category){

                      Photos.create({url:'http://sailsjs.org/images/bkgd_squiddy.png', alt: 'NodePress is a pure SailsJS backend and Ember frontend', keywords: ['SailsJS','Ember','NodeJS','NodeGeeks']}).exec(function(err, category) {

                        res.json({message: 'NodePress has been installed!'});

                      });
                    })
                  })
                })
              })
            });
          });
        });
      });
    });

  },

  /**
   * `SettingsController.edit()`
   */
  update: function (req, res) {
    Settings.update({id: 1}, { name: req.body.setting.name, url: req.body.setting.url, administratorEmail: req.body.setting.administratorEmail}).exec(function (err, settings) {
      if (err) {
        return res.serverError(500, {error: err});
      }
      if (settings) {
        var Model = [];
        Model.identity = 'Settings';
        return res.ok( actionUtil.emberizeJSON( Model, settings, req.options.associations, false ) );
      }
    });
  }
};

