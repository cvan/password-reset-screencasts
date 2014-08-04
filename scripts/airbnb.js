var casper = require('casper').create();


var LOGIN_URL = 'https://www.airbnb.com/';
var SLUG = 'airbnb';
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


// On homepage.
// Only email provided.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.start(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.forgot-password');
    utils.snap();
    casper.mouse.click('.forgot-password');
    utils.snap();

    casper.waitForSelector('#forgot_password_container').then(function () {
      utils.snap(20);
    });
  });
}));


// On homepage.
// Email and password provided.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    Array.from('swaggy123').forEach(function (chr) {
      casper.sendKeys('#signin_password', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.forgot-password');
    utils.snap();
    casper.mouse.click('.forgot-password');
    utils.snap();

    casper.waitForSelector('#forgot_password_container').then(function () {
      utils.snap(20);
    });
  });
}));


// On homepage.
// Only email provided.
// Form submitted.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.login-form button[type=submit]');
    utils.snap();
    casper.mouse.click('.login-form button[type=submit]');
    utils.snap();

    casper.waitForSelector('label[for="signin_password"].error').then(function () {
      utils.snap(20);

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container').then(function () {
        utils.snap(20);
      });
    });
  });
}));


// On homepage.
// Email and password provided.
// Form submitted.
// "Forgot password" link clicked.
// -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    Array.from('swaggy123').forEach(function (chr) {
      casper.sendKeys('#signin_password', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.login-form button[type=submit]');
    utils.snap();
    casper.mouse.click('.login-form button[type=submit]');
    utils.snap();

    casper.waitFor(function () {
      return this.evaluate(function () {
        return !!document.getElementById('notice').innerHTML;
      });
    }).then(function () {
      utils.snap(20);

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container').then(function () {
        utils.snap(20);
      });
    });
  });
}));


// On homepage.
// Different email and password provided.
// Form submitted.
// "Forgot password" link clicked.
// -> New email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('scrantonicity4eva@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    Array.from('yolo123').forEach(function (chr) {
      casper.sendKeys('#signin_password', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.login-form button[type=submit]');
    utils.snap();
    casper.mouse.click('.login-form button[type=submit]');
    utils.snap();

    casper.waitFor(function () {
      return casper.evaluate(function () {
        return !!document.getElementById('notice').innerHTML;
      });
    }).then(function () {
      utils.snap(20);

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container').then(function () {
        utils.snap(20);
      });
    });
  });
}));


LOGIN_URL = 'https://www.airbnb.com/login';


// On "Log In" page.
// Only email provided.
// "Forgot password" link clicked.
// -> Email is not preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.forgot-password');
    utils.snap();
    casper.mouse.click('.forgot-password');
    utils.snap();

    casper.waitForSelector('#forgot_password_container').then(function () {
      utils.snap(20);
    });
  });
}));


// On "Log In" page.
// Email and password provided.
// "Forgot password" link clicked.
// -> Email is not preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    Array.from('swaggy123').forEach(function (chr) {
      casper.sendKeys('#signin_password', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.forgot-password');
    utils.snap();
    casper.mouse.click('.forgot-password');
    utils.snap();

    casper.waitForSelector('#forgot_password_container').then(function () {
      utils.snap(20);
    });
  });
}));


// On "Log In" page.
// Only email provided.
// Form submitted.
// "Forgot password" link clicked.
// -> Email is not preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.login-form button[type=submit]');
    utils.snap();
    casper.mouse.click('.login-form button[type=submit]');
    utils.snap();

    casper.waitForSelector('label[for=signin_password].error').then(function () {
      utils.snap(20);

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container').then(function () {
        utils.snap(20);
      });
    });
  });
}));


// // On "Log In" page.
// // Email and password provided.
// // Form submitted.
// // -> Email *is* preserved.
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('hearcomestreble@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    Array.from('swaggy123').forEach(function (chr) {
      casper.sendKeys('#signin_password', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.login-form button[type=submit]');
    utils.snap();
    casper.mouse.click('.login-form button[type=submit]');
    utils.snap();

    casper.waitForSelector('.alert').then(function () {
      utils.snap(20);

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container').then(function () {
        utils.snap(20);
      });
    });
  });
}));


// On homepage.
// Different email and password provided.
// Form submitted.
// "Forgot password" link clicked.
// -> New email is not preserved (nor is old email preserved).
casper.thenOpen(LOGIN_URL).then(utils.open(function () {
  utils.snap(15);

  casper.mouse.move('#login a');
  utils.snap();
  casper.mouse.click('#login a');
  utils.snap();

  casper.waitForSelector('.login-form').then(function () {
    Array.from('scrantonicity4eva@gmail.com').forEach(function (chr) {
      casper.sendKeys('#signin_email', chr, {keepFocus: true});
      utils.snap();
    });

    Array.from('yolo123').forEach(function (chr) {
      casper.sendKeys('#signin_password', chr, {keepFocus: true});
      utils.snap();
    });

    casper.mouse.move('.login-form button[type=submit]');
    utils.snap();
    casper.mouse.click('.login-form button[type=submit]');
    utils.snap();

    casper.waitForSelector('.alert').then(function () {
      utils.snap(20);

      casper.mouse.move('.forgot-password');
      utils.snap();
      casper.mouse.click('.forgot-password');
      utils.snap();

      casper.waitForSelector('#forgot_password_container').then(function () {
        utils.snap(20);
      });
    });
  });
}));


casper.run();
