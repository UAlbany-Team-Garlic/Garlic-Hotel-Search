const sha512 = require("js-sha512");

function hash(string) {
  return sha512.sha512(string);
}

console.log(hash("test"));
