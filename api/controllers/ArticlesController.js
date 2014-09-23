/**
 * articlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require( '../blueprints/_util/actionUtil' );

module.exports = {
	


  /**
   * `articlesController.add()`
   */
  create: function (req, res) {
    console.log(req.headers);
    Users.find({id: req.headers.id, token: req.headers.token}).exec(function (err, user) {
      if (user) {
        if (user[0].type === 'admin' || user[0].type === 'superuser' || user[0].type === 'author') {
          console.log(req.body);
          if (req.body.article.scheduled) {

          } else {
            console.log(req.body.article.coverPhoto);
            Articles.create({ title: req.body.article.title, shortBody: req.body.article.shortBody, body: req.body.article.body, coverPhoto: req.body.article.coverPhoto, media: req.body.article.media, slug: req.body.article.slug, status: req.body.article.status}).exec(function (err, article) {
              if (err) {
                return res.serverError(err, {error:'something bad happened'});
              }
              if (article) {
                //emit socket message to update anyones pages currently viewing any recent/latest articles so far just index
                var Model = [];
                Model.identity = 'Article';
                return res.ok( actionUtil.emberizeJSON( Model, article, req.options.associations, false ) );
              }
            });
          }
        }
      }
      if (err) {
        return res.json(err, {error: 'token mismatch'})
      }
    });
  },

  update: function(req, res) {
      Users.find({id: req.headers.id, token: req.headers.token}).exec(function (err, user) {
        if (user) {
          if (user[0].type === 'admin') {
            Articles.update({},{ title: req.body.article.title, status: req.body.article.status, shortBody: req.body.article.shortBody, body: req.body.article.body, coverPhoto: req.body.article.coverPhoto, media: req.body.article.media, slug: sluggedTitle}).exec(function (err, article) {
              if (err) {
                return res.serverError(err, {error:'something bad happened'});
              }
              if (article) {
                //emit socket message to update anyones pages currently viewing any recent/latest articles so far just index
                var Model = [];
                Model.identity = 'Article';
                return res.ok( actionUtil.emberizeJSON( Model, article, req.options.associations, false ) );
              }
            });
          } else {
            return res.forbidden({message: 'your not allowed to see this'});
          }
        }
        if (err) {
          return res.json(err, {error: 'token mismatch'})
        }
      });
  },

  /**
   * `articlesController.delete()`
   */
  findBySlug: function (req, res) {
    Articles.findBySlug(req.query.slug).exec( function(err, found){
      if (err){
        return res.serverError({error: err}, 500);
      }
    });
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },

  find: function (req, res) {
    Articles.find().limit(10).sort('datePublished ASC').exec( function(err, found){
      if (err){
        return res.serverError({error: err}, 500);
      }
      if (found) {
        var Model = [];
        Model.identity = 'Article';
        return res.ok( actionUtil.emberizeJSON( Model, found, req.options.associations, false ) );
      }
    });
  }

};

