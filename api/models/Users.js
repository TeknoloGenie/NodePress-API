/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    username: {
      type: 'string',
      unique: true,
      required: true
    },

    firstName: {
      type: 'string'
    },

    lastName: {
      type: 'string'
    },

    email: {
      type: 'email',
      unique: true,
      required: true
    },

    link: 'string',

    type: {
      type: 'string',
      defaultsTo: 'subscriber',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    token: {
      type: 'string',
      defaultsTo: 'invalid'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }

  }

};

