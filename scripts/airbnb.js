var casper = require('casper').create();
var page = require('webpage').create();
var mouse = require('mouse').create(casper);


var URL = 'https://www.airbnb.com/';
var SLUG = 'airbnb';
var DIMENSIONS = {width: 1024, height: 768};
var shot = 0;
var scenario = 0;


var utils = {
  snap: function(frames) {
    for (var i = 0; i < (frames || 1); i++) {
      casper.capture('../tmp/' + SLUG + '_' + scenario + '_' + utils.padDigits(shot++, 3) + '.png', {
        top: 0,
        left: 0,
        width: DIMENSIONS.width,
        height: DIMENSIONS.height
      });
    }
  },
  padDigits: function(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  }
};


// On homepage.
// Email provided.
// No password provided.
// Forgot password link clicked.
// -> Email *is* preserved.
casper.start(URL).then(function () {
  scenario++;
  shot = 1;

  casper.viewport(DIMENSIONS.width, DIMENSIONS.height).then(function () {
    this.scrollTo(0, 0);

    utils.snap(15);
    casper.mouse.move('#login a');
    utils.snap();
    casper.mouse.click('#login a');
    utils.snap();

    casper.waitForSelector('.login-form', function () {
      'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
        casper.sendKeys('#signin_email', chr, {keepFocus: true});
        utils.snap();
      });

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container', function () {
        utils.snap(20);
      });
    });
  });
});


// On Log In page.
// Email provided.
// No password provided.
// Forgot password link clicked.
// -> Email *is* preserved.
casper.start(URL).then(function () {
  scenario++;
  shot = 1;

  casper.viewport(DIMENSIONS.width, DIMENSIONS.height).then(function () {
    this.scrollTo(0, 0);

    utils.snap(15);
    casper.mouse.move('#login a');
    utils.snap();
    casper.mouse.click('#login a');
    utils.snap();

    casper.waitForSelector('.login-form', function () {
      'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
        casper.sendKeys('#signin_email', chr, {keepFocus: true});
        utils.snap();
      });

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container', function () {
        utils.snap(20);
      });
    });
  });
});


casper.run();
