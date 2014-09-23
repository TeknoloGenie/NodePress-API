/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require( '../blueprints/_util/actionUtil' );
var nodemailer = require("nodemailer");
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  login: function (req, res) {
    if (req.query.email) {
      console.log(req.query.email);
      var thingToEncrypt = "viral" + _.random(598, 78905478) + "charge"+ _.random(23, 8300000000);
      Users.findOne().where({email: req.query.email})
      .then(function (user) {
        if (!user) {
          return res.serverError({error: 'no user exists'});
        } else if (user) {
          console.log(req.query.password);
          bcrypt.compare(req.query.password, user.password, function (err, match) {
            if (err) {
              return res.serverError({ error: err }, 500);
            }
            if (match) {
              console.log(match);
              bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                  return res.serverError({ error: err }, 500);
                }
                bcrypt.hash(thingToEncrypt, salt, function () {
                }, function (err, hash) {
                  if (err) {
                    return res.serverError({ error: err }, 500);
                  }
                  console.log({id: user.id}, {token: hash});
                  Users.update({id: user.id}, {token: hash})
                      .then(function (updated) {
                        //todo: figure out why we must hard set this hackish way to emerbize the JSON return
                        var Model = [];
                        Model.identity = 'User';
                        return res.ok(actionUtil.emberizeJSON(Model, updated, req.options.associations, false));
                      })
                      .fail(function (err) {
                        return res.serverError(err);
                      });
                });
              });
            } else {
              if (req.session.user) req.session.user = null;
              res.serverError({ error: 'Invalid password' }, 401);
            }
          });
        }
      })
      .fail(function(err) {
        return res.serverError(err);
      });
    } else if(parseInt(req.headers.id) >= 1){
      console.log("user found with a valid ID in header");
      Users.find({id: req.headers.id}).exec(function (err, user) {
        console.log(req.headers.token);
        if(req.headers.token === user[0].token) {
          var userType = 'user';

          console.log("user had matching id and token lets get its userType")
          userType = user[0].type;

          if (userType === 'superuser' || userType === 'admin' || userType === 'author') {
            console.log("user isnt a user... welcome admin/superuser/author!! sorry about the misunderstanding sir/ma'am");
            Users.find().exec(function aftwards(err, user) {
              if (err) {
                return res.json(err);
              }
              if (user) {
                console.log("returning user data to client");
                var Model = [];
                Model.identity = 'User';
                return res.ok( actionUtil.emberizeJSON( Model, user, req.options.associations, false ) );
              }
            });
          } else {
            console.log("user was rejected due to non authorized userType");
            return res.forbidden({message: 'your not allowed to see this'});
          }
        } else {
          console.log("token mismatch");
          return res.json({error: err})
        }

        if (err) {
          return res.json(err, {error: 'something bad happened'})
        }
      });
    }  else {
      console.log("user was rejected due to non valid userID");
      return res.forbidden({message: 'your not allowed to see this'});
    }

  },

  signup: function (req, res) {

    console.log(req.body);
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        res.json(err);
      }
      bcrypt.hash(req.body.user.password, salt, function() {} , function(err, hash) {
        if (err) {
          res.json(err);
        }
        req.body.user.password = hash;
        bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            res.json(err);
          }
          bcrypt.hash(hash, salt, function() {} , function(err, hash2) {
            req.body.user.token = hash2;
          });
        });
        Users.find({username: req.body.username}).exec( function (err, found) {
          if (found.length >= 1) {
            res.json({exists: 'this username already exists', errorCode: 'USERNAME_EXISTS'})
          } else if (found ==  null || found == undefined || found.length < 1) {
            Users.find({email: req.body.email}).exec( function (err, found) {
              if (found.length >= 1) {
                res.json({exists: 'this email already exists', errorCode: 'EMAIL_EXISTS'})
              } else if (found ==  null || found == undefined || found.length < 1) {
                //check if the user is admin that is creating the user if so allow whatever was passed through the browser req.body.user.type if not then its a normal user signing up and the req.body.user.type needs to be forced to 'user'
                Users.create({ username: req.body.user.username, firstName: req.body.user.firstName, lastName: req.body.user.lastName, email: req.body.user.email, password: req.body.user.password, type: req.body.user.type, token: req.body.user.token}).exec(function (err, user) {
                  if (user) {
                    //todo: check to see if this is a admin creating the account, and display appropriate email text/subject
                    var transport = nodemailer.createTransport();
                    var mailOptions = {
                      from: 'noreply@viralcharge.com',
                      to: req.body.email,
                      subject: 'Welcome to ViralCharge!',
                      text: 'Welcome to ViralCharge'
                    };
                    transport.sendMail(mailOptions, function(error, response){
                      if(error){
                        console.log(error);
                        return;
                      }
                      response.statusHandler.once("failed", function(data){
                        console.log(
                          "Permanently failed delivering message to %s with the following response: %s",
                          data.domain, data.response);
                      });

                      response.statusHandler.once("requeue", function(data){
                        console.log("Temporarily failed delivering message to %s", data.domain);
                      });

                      response.statusHandler.once("sent", function(data){
                        console.log("Message was accepted by %s", data.domain);
                      });
                    });
                    var Model = [];
                    Model.identity = 'User';
                    return res.ok( actionUtil.emberizeJSON( Model, user, req.options.associations, false ) );
                  } else if (err) {
                    console.log(err);
                    res.json({ error: 'Could not create user' }, 404);
                  }
                });
              }
              if (err) {
                res.json({ error: 'Could not create hash' }, 404);
              }
            })
          }
          if (err) {
            res.json(err);
          }
        });
      });
    });
  },

  update: function(req, res) {
    Users.find({id: req.headers.id}).exec(function (err, user) {
      if (user) {
        var updatingUserID = req.headers.id;
        if (user[0].type === 'admin' ) {
          updatingUserID = req.body.user.id;
        }
        Users.update({id: parseInt(updatingUserID)},{token: 'invalid'}).exec(function (err, updatedUser) {
          console.log(updatedUser);
          if (updatedUser) {
            var Model = [];
            Model.identity = 'User';
            return res.ok( actionUtil.emberizeJSON( Model, updatedUser, req.options.associations, false ) );
          }
        });
      }
    });
  }

};

