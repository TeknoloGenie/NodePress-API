/**
* Comments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    articleID: {
      type: 'integer',
      required: true
    },

    username: {
      type: 'string',
      required: true
    },

    userURL: 'string',

    commentBody: {
      type: 'string',
      required: true
    },

    approved: {

      type: 'boolean',
      defaultsTo: false
    }


  }
};

