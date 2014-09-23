/**
 * AdsController
 *
 * @description :: Controller for managing AdSpots
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require( '../blueprints/_util/actionUtil' );


module.exports = {

  update: function(req, res){
    console.log(req.body);
    Ads.update({placement: req.body.ad.placement}, {script: req.body.ad.script}).exec(function(err, ad){
      if (err) {
        return res.serverError(err, {error:'something bad happened'});
      }
      if (ad) {
        var Model = [];
        Model.identity = 'Ad';
        return res.ok( actionUtil.emberizeJSON( Model, ad, req.options.associations, false ) );
      }
    });

  }

};

