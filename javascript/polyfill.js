if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length > targetLength) {
          return String(this);
      } else {
          targetLength = targetLength - this.length;

          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length);
          }
          return padString.slice(0, targetLength) + String(this);
      }
  }
}


if (!String.prototype.padEnd) {
  String.prototype.padEnd = function padEnd(targetLength, padString) {
      targetLength = targetLength >> 0;
      padString = String(typeof padString !== 'undefined' ? padString : ' ');
      if (this.length > targetLength) {
          return String(this);
      } else {
          targetLength = targetLength - this.length;

          if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length);
          }

          return String(this) + padString.slice(0, targetLength);
      }
  }
}


if (!Object.entries) {
  Object.entries = function(obj) {
      var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i);

      while (i--) {
          resArray[i] = [ownProps[i], obj[ownProps[i]]];
      }

      return resArray;
  }
}

if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
      value: function(searchElement, formIndex) {
          if (this == null) {
              throw new TypeError(`"this" is null or not defined`);
          }

          var o = Object(this);
          var len = o.length >>> 0;

          if (len === 0) {
              return false;
          }

          var n = formIndex | 0;
          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

          function someValueZero(x, y) {
              return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
          }

          while (k < len) {
              if (someValueZero(o[k], searchElement)) {
                  return true;
              }

              k++
          }

          return false;
      }
  })
}
