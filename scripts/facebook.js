var fs = require('fs');
var casper = require('casper').create();


var URL = 'https://www.facebook.com/';
var SLUG = 'facebook';
var DIMENSIONS = {width: 1024, height: 768};
var shot = 0;
var scenario = 0;

var utils = require(fs.workingDirectory + '/utils')();



// On homepage.
// Email provided.
// Incorrect password provided.
// Form submitted.
// Forgot password link clicked.
// -> Email is not preserved.
casper.start(URL).then(utils.open(function () {
  utils.snap(15);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('#email', chr, {keepFocus: true});
    utils.snap();
  });

  'swaggy'.split('').forEach(function (chr) {
    casper.sendKeys('#pass', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('#login_form input[type=submit]');
  utils.snap();
  casper.mouse.click('#login_form input[type=submit]');
  utils.snap();

  casper.waitForSelector('.login_error_box', function () {
    utils.snap(20);

    casper.mouse.move('a[href*="recover"]');
    utils.snap();
    casper.mouse.click('a[href*="recover"]');
    utils.snap();

    casper.waitForSelector('#identify_yourself_flow', function () {
      casper.mouse.click('body');  // So the email isn't autofocussed.
      utils.snap(20);
    });
  });
}));


// On homepage.
// Email provided.
// Incorrect password provided.
// Forgot password link clicked.
// -> Email is not preserved.
casper.thenOpen(URL).then(utils.open(function () {
  utils.snap(15);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('#email', chr, {keepFocus: true});
    utils.snap();
  });

  'swaggy'.split('').forEach(function (chr) {
    casper.sendKeys('#pass', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('a[href*="recover"]');
  utils.snap();
  casper.mouse.click('a[href*="recover"]');
  utils.snap();

  casper.waitForSelector('#identify_yourself_flow', function () {
    casper.mouse.click('body');  // So the email isn't autofocussed.
    utils.snap(20);
  });
}));


casper.run();
