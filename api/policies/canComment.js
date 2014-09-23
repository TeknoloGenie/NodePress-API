module.exports = function canWrite (req, res, next) {
  var userId = req.session.user.uuid,
      allowedTypes = ['author', 'admin', 'user'];
  Users.findOneByUuid( userId ).exec( function foundUser (err, user) {

      if (err) return next(err);

      if (!user) return res.redirect('/notAllowed');

      if (user.type == allowedTypes.map()) return next()

      else return res.redirect('/notAllowed')

    });

};
