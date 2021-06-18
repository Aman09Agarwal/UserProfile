const newLocal = newFunction();
module.exports = {
  mongoURI: newLocal,
};

function newFunction() {
  return "mongodb://localhost:27017/user_profile?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
}
