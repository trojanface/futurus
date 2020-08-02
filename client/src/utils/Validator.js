export default {
    isInputEmpty: function (inputValue) {
      if (inputValue.length <= 0) {
          return true;
      } else {
          return false;
      }
    },
    isNumber: function (inputValue) {
        if (isNaN(inputValue)) {
            return false;
        } else {
            return true;
        }
      }
}