'use strict';

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `UserController.index()`
   */
  index(req, res) {
    return res.json({
      register: sails.config.appUrl + sails.getUrlFor('v1/UserController.register'),
      password: sails.config.appUrl + sails.getUrlFor('v1/UserController.password'),
    });
  },


  /**
   * `UserController.register()`
   */
  register(req, res) {
    return res.json({
      todo: 'register() is not implemented yet!',
    });
  },


  /**
   * `UserController.password()`
   */
  password(req, res) {
    return UserPassword.create(req.params.all())
    .then((userPassword) => {
      console.dir(userPassword.message.data, { colors: true, showHidden: true });
      return {};
      // return userPassword.message;
      // return UserPasswordResetTransactionalMessage.create({data: userPassword});
    })
    .then(message => res.send(message))
    .caught(error => res.negotiate(error));
  },
};
