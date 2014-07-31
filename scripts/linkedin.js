var casper = require('casper').create();


var URL = 'https://www.linkedin.com/';
var SLUG = 'linkedin';
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
// No password provided.
// Forgot password link clicked.
// -> Email is not preserved.
casper.start(URL).then(utils.open(function () {
  utils.snap(15);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_key]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('.forgot-pwd');
  utils.snap();
  casper.mouse.click('.forgot-pwd');
  utils.snap();

  casper.waitForSelector('.request-password-reset', function () {
    utils.snap(20);
  });
}));


// On homepage.
// Email provided.
// Incorrect password provided.
// Form submitted.
// -> Email *is* preserved.
casper.thenOpen(URL).then(utils.open(function () {
  utils.snap(15);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_key]', chr, {keepFocus: true});
    utils.snap();
  });

  'swaggy'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_password]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('input[name=signin]');
  utils.snap();
  casper.mouse.click('input[name=signin]');
  utils.snap();

  casper.waitForSelector('#global-error .error', function () {
    casper.mouse.click('html');  // So the email isn't autofocussed.

    utils.snap(20);
  });
}));


URL = 'https://www.linkedin.com/uas/login';


// On Log In page.
// Email provided.
// No password provided.
// -> Email *is* preserved but no link.
casper.thenOpen(URL).then(utils.open(function () {
  utils.snap(5);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_key]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('input[name=signin]');
  utils.snap();
  casper.mouse.click('input[name=signin]');
  utils.snap();

  casper.waitForSelector('#global-error .error', function () {
    casper.mouse.click('html');  // So the email isn't autofocussed.

    utils.snap(20);
  });
}));


// On Log In page.
// Email provided.
// Incomplete password provided.
// -> Email *is* preserved but no link.
casper.thenOpen(URL).then(utils.open(function () {
  utils.snap(15);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_key]', chr, {keepFocus: true});
    utils.snap();
  });

  'swag'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_password]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('input[name=signin]');
  utils.snap();
  casper.mouse.click('input[name=signin]');
  utils.snap();

  casper.waitForSelector('#global-error .error', function () {
    casper.mouse.click('html');  // So the email isn't autofocussed.

    utils.snap(20);
  });
}));


// On Log In page.
// Email provided.
// Incomplete password provided.
// -> Email is preserved and a link to reset password appears.
casper.thenOpen(URL).then(utils.open(function () {
  utils.snap(15);

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_key]', chr, {keepFocus: true});
    utils.snap();
  });

  'swaggy'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=session_password]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('#login input[name=signin]');
  utils.snap();
  casper.mouse.click('#login input[name=signin]');
  utils.snap();

  casper.waitForSelector('#global-alert-queue .error', function () {
    utils.snap(20);

    casper.mouse.move('#session_password-login-error a');
    utils.snap();
    casper.mouse.click('#session_password-login-error a');
    utils.snap();

    casper.waitForSelector('.request-password-reset', function () {
      utils.snap(20);
    });
  });
}));


casper.run();
