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
      user: {
        register: sails.getBaseUrl() + sails.getUrlFor('v1/UserController.register'),
        password: sails.getBaseUrl() + sails.getUrlFor('v1/UserController.password'),
      }
    });
  },

};

