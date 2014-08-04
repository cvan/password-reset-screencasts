var casper = require('casper').create();


var LOGIN_URL = 'https://github.com/login';
var SLUG = 'github';
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


// Email provided.
// No password provided.
// Forgot password link clicked.
// -> Email is not preserved.
casper.start(LOGIN_URL).then(utils.open(function () {
  utils.snap();
  casper.mouse.click('input[name=login]');
  utils.snap();

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=login]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('form a[href*=forgot_password]');
  utils.snap();
  casper.mouse.click('form a[href*=forgot_password]');
  utils.snap();

  casper.waitForSelector('#forgot_password_form', function() {
    utils.snap(20);
  });
}));


// Email provided.
// Incomplete password provided.
// Forgot password link clicked.
// -> Email is not preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap();
  casper.mouse.click('input[name=login]');
  utils.snap();

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=login]', chr, {keepFocus: true});
    utils.snap();
  });

  'swag'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=password]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('form a[href*=forgot_password]');
  utils.snap();
  casper.mouse.click('form a[href*=forgot_password]');
  utils.snap();

  casper.waitForSelector('#forgot_password_form', function() {
    utils.snap(20);
  });
}));


// Email provided.
// No password provided.
// Form submitted.
// -> Email is not preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap();
  casper.mouse.click('input[name=login]');
  utils.snap();

  casper.evaluate(function () {
    document.querySelector('input[name=login]').focus();
  });

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=login]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('#login input[type=submit]');
  utils.snap();
  casper.mouse.click('#login input[type=submit]');
  utils.snap();

  casper.waitForSelector('.flash-messages .flash-error', function() {
    utils.snap(20);

    casper.mouse.move('form a[href*=forgot_password]');
    utils.snap();
    casper.mouse.click('form a[href*=forgot_password]');
    utils.snap();

    casper.waitForSelector('#forgot_password_form', function() {
      utils.snap(20);
    });
  });
}));


// Email provided.
// Incorrect password provided.
// Form submitted.
// -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap();
  casper.mouse.click('input[name=login]');
  utils.snap();

  casper.evaluate(function () {
    document.querySelector('input[name=login]').focus();
  });

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=login]', chr, {keepFocus: true});
    utils.snap();
  });

  'swaggy123'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=password]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('#login input[type=submit]');
  utils.snap();
  casper.mouse.click('#login input[type=submit]');
  utils.snap();

  casper.waitForSelector('.flash-messages .flash-error', function() {
    utils.snap(20);

    casper.mouse.move('form a[href*=forgot_password]');
    utils.snap();
    casper.mouse.click('form a[href*=forgot_password]');
    utils.snap();

    casper.waitForSelector('#forgot_password_form', function() {
      utils.snap(20);
    });
  });
}));


// Different email provided.
// No password provided.
// Forgot password link clicked.
// -> Previous email is preserved!
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap();
  casper.mouse.click('input[name=login]');
  utils.snap();

  casper.evaluate(function () {
    document.querySelector('input[name=login]').focus();
  });

  'scrantonicity@gmail.com'.split('').forEach(function (chr) {
    casper.sendKeys('input[name=login]', chr, {keepFocus: true});
    utils.snap();
  });

  casper.mouse.move('form a[href*=forgot_password]');
  utils.snap();
  casper.mouse.click('form a[href*=forgot_password]');
  utils.snap();

  casper.waitForSelector('#forgot_password_form', function() {
    utils.snap(20);
  });
}));


casper.run();
