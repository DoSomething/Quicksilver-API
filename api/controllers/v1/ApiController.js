/**
 * ApiController
 *
 * @description :: Server-side logic for managing Apiv1s
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `ApiController.index()`
   */
  index(req, res) {
    return res.json({
      user: {
        register: sails.config.appUrl + sails.getUrlFor('v1/UserController.register'),
        password: sails.config.appUrl + sails.getUrlFor('v1/UserController.password')
      }
    });
  }

};
