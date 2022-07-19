var DataTypes = require("sequelize").DataTypes;
var _item = require("./item");

function initModels(sequelize) {
  var items = _item(sequelize, DataTypes);


  return {
    items,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
