/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  var userID = req.body.id;
  var userToken = req.body.token;
  console.log("token: " + userToken);
  Users.findOne({id: userID }).exec( function foundUser (err, user) {

    if (err) return next(err);

    if ( ! user ) return res.forbidden('bad access token');

    if ( user.token !== userToken ) return res.forbidden('bad access token');

    next();
  });

};
