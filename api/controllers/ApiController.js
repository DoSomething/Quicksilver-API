/**
 * ApiController
 *
 * @description :: Server-side logic for managing Apiv1s
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `UserController.index()`
   */
  index: function (req, res) {
    return res.json({
      v1: sails.config.appUrl + sails.getUrlFor('v1/ApiController.index'),
    });
  },

};

