/**
 * AnylyticsController
 *
 * @description :: Server-side logic for managing anylytics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `AnylyticsController.postviews()`
   */
  postviews: function (req, res) {
    return res.json({
      todo: 'postviews() is not implemented yet!'
      // create logic to get the post uuid and increase the postview count
      // should store what type of person if its a registered user, unique viewer,
      // return veiwer, crawler?
    });
  },


  /**
   * `AnylyticsController.referals()`
   */
  referals: function (req, res) {
    return res.json({
      todo: 'referals() is not implemented yet!'
      // check where the user last came from and store it along with IP, also store
      // where the user went to within the site
    });
  },


  /**
   * `AnylyticsController.sessions()`
   */
  sessions: function (req, res) {
    return res.json({
      todo: 'sessions() is not implemented yet!'
      // show current active sessions, where they are where they came from, how
      // long they have been active, how many links deep are they within the site?
      // Are they a registered user
    });
  },


  /**
   * `AnylyticsController.interaction()`
   */
  interaction: function (req, res) {
    return res.json({
      todo: 'interaction() is not implemented yet!'
      // Types of interactions may be if made a clickthrough to an ad, what post was
      // it on? Maybe they sined up for the newsletter or became a member
    });
  }
};

