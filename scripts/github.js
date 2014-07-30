var casper = require('casper').create();
var page = require('webpage').create();
var mouse = require('mouse').create(casper);


var utils = {
  padDigits: function(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
  }
};


var URL = 'https://github.com/login';


// Email provided.
// No password provided.
// Forgot password link clicked.
// -> Email not preserved.
casper.start(URL).then(function () {
  var self = this;
  var shot = 1;

  casper.viewport(1024, 768);

  function snap(frames) {
    for (var i = 0; i < (frames || 1); i++) {
      self.capture('../tmp/github_1_' + utils.padDigits(shot++, 3) + '.png');
    }
  }

  snap();
  self.mouse.click('input[name=login]');
  snap();

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    self.sendKeys('input[name=login]', chr, {keepFocus: true});
    snap();
  });

  self.mouse.move('form a[href*=forgot_password]');
  snap();
  self.mouse.click('form a[href*=forgot_password]');
  snap();

  casper.waitForSelector('#forgot_password_form', function() {
    snap(20);
  });
});


// Email provided.
// Incomplete password provided.
// Forgot password link clicked.
// -> Email not preserved.
casper.thenOpen(URL).then(function () {
  var self = this;
  var shot = 1;

  casper.viewport(1024, 768);

  function snap(frames) {
    for (var i = 0; i < (frames || 1); i++) {
      self.capture('../tmp/github_2_' + utils.padDigits(shot++, 3) + '.png');
    }
  }

  snap();
  self.mouse.click('input[name=login]');
  snap();

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    self.sendKeys('input[name=login]', chr, {keepFocus: true});
    snap();
  });

  'swag'.split('').forEach(function (chr) {
    self.sendKeys('input[name=password]', chr, {keepFocus: true});
    snap();
  });

  self.mouse.move('form a[href*=forgot_password]');
  snap();
  self.mouse.click('form a[href*=forgot_password]');
  snap();

  casper.waitForSelector('#forgot_password_form', function() {
    snap(20);
  });
});


// Email provided.
// No password provided.
// Form submitted.
// -> Email not preserved.
casper.thenOpen(URL).then(function () {
  var self = this;
  var shot = 1;

  casper.viewport(1024, 768);

  function snap(frames) {
    for (var i = 0; i < (frames || 1); i++) {
      self.capture('../tmp/github_3_' + utils.padDigits(shot++, 3) + '.png');
    }
  }

  snap();
  self.mouse.click('input[name=login]');
  snap();

  casper.evaluate(function () {
    document.querySelector('input[name=login]').focus();
  });

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    self.sendKeys('input[name=login]', chr, {keepFocus: true});
    snap();
  });

  self.mouse.move('#login input[type=submit]');
  snap();
  self.mouse.click('#login input[type=submit]')
  snap();

  casper.waitForSelector('.flash-messages .flash-error', function() {
    snap(20);

    self.mouse.move('form a[href*=forgot_password]');
    snap();
    self.mouse.click('form a[href*=forgot_password]');
    snap();

    casper.waitForSelector('#forgot_password_form', function() {
      snap(20);
    });
  });
});


// Email provided.
// Incorrect password provided.
// Form submitted.
// -> Email *was* preserved.
casper.thenOpen(URL).then(function () {
  var self = this;
  var shot = 1;

  casper.viewport(1024, 768);

  function snap(frames) {
    for (var i = 0; i < (frames || 1); i++) {
      self.capture('../tmp/github_4_' + utils.padDigits(shot++, 3) + '.png');
    }
  }

  snap();
  self.mouse.click('input[name=login]');
  snap();

  casper.evaluate(function () {
    document.querySelector('input[name=login]').focus();
  });

  'hearcomestreble@gmail.com'.split('').forEach(function (chr) {
    self.sendKeys('input[name=login]', chr, {keepFocus: true});
    snap();
  });

  'swag'.split('').forEach(function (chr) {
    self.sendKeys('input[name=password]', chr, {keepFocus: true});
    snap();
  });

  self.mouse.move('#login input[type=submit]');
  snap();
  self.mouse.click('#login input[type=submit]')
  snap();

  casper.waitForSelector('.flash-messages .flash-error', function() {
    snap(20);

    self.mouse.move('form a[href*=forgot_password]');
    snap();
    self.mouse.click('form a[href*=forgot_password]');
    snap();

    casper.waitForSelector('#forgot_password_form', function() {
      snap(20);
    });
  });
});


// Different email provided.
// No password provided.
// Forgot password link clicked.
// -> Previous email was preserved!
casper.thenOpen(URL).then(function () {
  var self = this;
  var shot = 1;

  casper.viewport(1024, 768);

  function snap(frames) {
    for (var i = 0; i < (frames || 1); i++) {
      self.capture('../tmp/github_5_' + utils.padDigits(shot++, 3) + '.png');
    }
  }

  snap();
  self.mouse.click('input[name=login]');
  snap();

  casper.evaluate(function () {
    document.querySelector('input[name=login]').focus();
  });

  'scrantonicity@gmail.com'.split('').forEach(function (chr) {
    self.sendKeys('input[name=login]', chr, {keepFocus: true});
    snap();
  });

  'yolo4eva'.split('').forEach(function (chr) {
    self.sendKeys('input[name=password]', chr, {keepFocus: true});
    snap();
  });

  self.mouse.move('form a[href*=forgot_password]');
  snap();
  self.mouse.click('form a[href*=forgot_password]');
  snap();

  casper.waitForSelector('#forgot_password_form', function() {
    snap(20);
  });
});


casper.run();
