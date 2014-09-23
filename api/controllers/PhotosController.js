/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require( '../blueprints/_util/actionUtil' );

module.exports = {
	


  /**
   * `MediaController.upload()`
   */
  upload: function (req, res) {
    console.log(req.body);
    req.file('file').upload(function (err, files) {
      console.log(files);
      var url;
      if (err) return res.serverError(err);

      if (files.length >= 1) {

        Settings.find({id: 1}).exec(function(err, settings){
          console.log(settings);
          url = settings[0].url;

          Photos.create({url: url, alt: req.body.alt, keywords: req.body.keywords}).exec(function(err, photo){
            if (err) return res.serverError(err);

            var Model = [];
            Model.identity = 'Photo';
            return res.ok(actionUtil.emberizeJSON(Model, photo, req.options.associations, false));
          });
        })
      }
    });
  },

  /**
   * `MediaController.delete()`
   */
  remove: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

