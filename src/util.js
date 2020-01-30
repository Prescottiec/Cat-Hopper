const Util = {
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  },
  numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Print an integer in JS with commas as thousands separators
  },
  createCookie(name, value, days) {
      if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000)); // expires in 2038
          let expires = "; expires =" + date.toUTCString();
      } else {
          let expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
  },
  readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      for ( var i = 0; i < ca.length; i++ ) {
          var c = ca[i];
          while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
          }
          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
      }
      return null;
  }
};

module.exports = Util;