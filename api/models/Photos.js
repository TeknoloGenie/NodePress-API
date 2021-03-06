/**
* Media.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    url: {
      type: 'string',
      required: true
    },

    alt: 'string',

    keywords: 'array',

    dateUploaded: {
      type: 'datetime',
      defaultsTo: function(){
        return new Date();
      }
    }

  }
};

