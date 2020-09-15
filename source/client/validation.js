// configs
const PW_MIN_LENGTH = 8;
const PW_MAX_LENGTH = 69; //set to whatever the db supports

// pw being validated
var pw = "penis123";

// check pw length
if (pw.length >= PW_MIN_LENGTH && pw.length <= PW_MAX_LENGTH) {
  // check if pw matches regex
  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]/.test(pw)) {
    const sha512 = require("js-sha512");
    var hashedPw = sha512.sha512(pw);
    // send hashedPw to server
  } else {
    // need symbol/number/uppercase error
  }
} else {
  // need to stay in length bounds error
}
