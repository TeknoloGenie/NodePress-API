/**
 * CommentsController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `CommentsController.add()`
   */
  create: function (req, res) {
    Comments.create({articleID: req.body.comment.articleID, username: req.body.comment.username, userURL: req.body.comment.userURL, commentBody: req.body.comment.commentBody, approved: false }).exec(function (err, comment){
      if (err) {
        return res.serverError(err, {error:'something bad happened'});
      }
      if (comment) {
        //emit socket message to update any ones pages currently viewing any recent/latest articles so far just index
        var Model = [];
        Model.identity = 'Comment';
        return res.ok( actionUtil.emberizeJSON( Model, comment, req.options.associations, false ) );
      }
    });
  },

  /**
   * `CommentsController.edit()`
   */
  update: function (req, res) {
    Comments.update({id: req.body.comment.id},{commentBody: req.body.comment.commentBod, approved: req.body.comment.approved}).exec(function(err, comment){
      if (err) {
        return res.serverError(err, {error:'something bad happened'});
      }
      if (comment) {
        var Model = [];
        Model.identity = 'Comment';
        return res.ok( actionUtil.emberizeJSON( Model, comment, req.options.associations, false ) );
      }
    })
  }
};

