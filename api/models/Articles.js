/**
* Articles.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    slug: {
      type: 'string',
      unique: true,
      required: true
    },

    scheduled: 'datetime',

    datePublished: {
      type: 'datetime',
      defaultsTo: function (){
        if (!this.scheduled) { return new Date(); } else { return null }
      }
    },

    status: {
      type: 'string',
      required: true
    },

    coverPhoto: 'string',

    heading: 'string',

    body: {
      type: 'string',
      required: true
    },

    categories: 'array',

    tags: 'array'

  }

};

