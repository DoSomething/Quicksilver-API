'use strict';
/* eslint prefer-arrow-callback: "off" */
/* Ignore arrow callbacks, needed for this.timeout().  */

const sails = require('sails');

before(function (done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(20000);
  sails.lift({}, (err) => {
    if (err) {
      return done(err);
    }

    // here you can load fixtures, etc.
    return done(err, sails);
  });
});

after(done => sails.lower(done));
