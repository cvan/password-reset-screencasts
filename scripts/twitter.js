var casper = require('casper').create();


var LOGIN_URL = 'https://twitter.com/';
var SLUG = 'twitter';
var DIMENSIONS = {width: 1024, height: 768};
var shot = 0;
var scenario = 0;


if (typeof Array.from === 'undefined') {
  // Incomplete polyfill, but suits our needs.
  Array.from = function (arrayLike) {
    if (typeof arrayLike === 'string') {
      return arrayLike.split('');
    }
  };
}

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


// On "Log in" page.
// Only email provided.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.start(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
    casper.sendKeys('#signin-email', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('.remember-forgot');
  utils.snap();
  casper.mouse.click('.remember-forgot');
  utils.snap();

  return casper.waitUntilVisible('form[action*="begin_password_reset"]');
})).then(function () {
  utils.snap(20);
});


// On "Log in" page.
// Email and password provided.
// "Forgot password" link clicked.
// -> Email is not preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
    casper.sendKeys('#signin-email', chr, {keepFocus: true});
    utils.snap();
  });

  Array.from('swaggy123').forEach(function (chr) {
    casper.sendKeys('#signin-password', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('.remember-forgot');
  utils.snap();
  casper.mouse.click('.remember-forgot');
  utils.snap();

  return casper.waitUntilVisible('form[action*="begin_password_reset"]');
})).then(function () {
  utils.snap(20);
});


// On "Log in" page.
// Only email provided.
// Form submitted.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
    casper.sendKeys('#signin-email', chr, {keepFocus: true});
    utils.snap();
  });

  // For some reason CasperJS can't otherwise click the submit button.
  this.evaluate(function() {
    $('.signin button[type="submit"]').mouseover().click();
  });

  return casper.waitForSelector('#message-drawer');
})).then(function () {
  utils.snap(20);
});


// On "Log in" page.
// Email and password provided.
// Form submitted.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
    casper.sendKeys('#signin-email', chr, {keepFocus: true});
    utils.snap();
  });

  Array.from('swaggy123').forEach(function (chr) {
    casper.sendKeys('#signin-password', chr, {keepFocus: true});
    utils.snap();
  });

  // For some reason CasperJS can't otherwise click the submit button.
  this.evaluate(function() {
    $('.signin button[type="submit"]').mouseover().click();
  });

  return casper.waitForSelector('#message-drawer');
})).then(function () {
  utils.snap(20);
});


// On "Log in" page.
// Different email and password provided.
// "Forgot password" link clicked.
// -> New email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  Array.from('scrantonicity@gmail.com').forEach(function (chr) {
    casper.sendKeys('#signin-email', chr, {keepFocus: true});
    utils.snap();
  });

  Array.from('yolo123').forEach(function (chr) {
    casper.sendKeys('#signin-password', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('.remember-forgot');
  utils.snap();
  casper.mouse.click('.remember-forgot');
  utils.snap();

  return casper.waitUntilVisible('form[action*="begin_password_reset"]');
})).then(function () {
  utils.snap(20);
});


casper.run();
