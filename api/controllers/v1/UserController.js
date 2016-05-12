// UserController
//
// @description :: Server-side logic for managing users
// @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers


module.exports = {

  // `UserController.index()`

  index(req, res) {
    return res.json({
      register: sails.config.appUrl + sails.getUrlFor('v1/UserController.register'),
      password: sails.config.appUrl + sails.getUrlFor('v1/UserController.password')
    });
  },


  // `UserController.register()`

  register(req, res) {
    return res.json({
      todo: 'register() is not implemented yet!'
    });
  },


  // `UserController.password()`

  password(req, res) {
    UserPassword.create(req.params.all())
    .then(result  => res.send(result))
    .caught(error => res.negotiate(error));
  }
};
