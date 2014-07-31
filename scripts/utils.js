module.exports = function () {
  return {
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
};
