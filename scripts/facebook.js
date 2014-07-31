var casper = require('casper').create();


var URL = 'https://www.facebook.com/';
var SLUG = 'facebook';
var DIMENSIONS = {width: 1024, height: 768};
var shot = 0;
var scenario = 0;


var utils = {
  open: function (func) {
    return function () {
      scenario++;
      shot = 1;

      casper.viewport(DIMENSIONS.width, DIMENSIONS.height);
      casper.scrollTo(0, 0);

      func.apply(this, arguments);
    };
  },
  padDigits: function (number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  },
  snap: function (frames) {
    for (var i = 0; i < (frames || 1); i++) {
      casper.capture('../tmp/' + SLUG + '_' + scenario + '_' + utils.padDigits(shot++, 3) + '.png', {
        top: 0,
        left: 0,
        width: DIMENSIONS.width,
        height: DIMENSIONS.height
      });
    }
  }
};


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
