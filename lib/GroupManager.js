"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GroupManager = function () {
  function GroupManager() {
    (0, _classCallCheck3.default)(this, GroupManager);

    this.groupStore = {};
  }

  (0, _createClass3.default)(GroupManager, [{
    key: "wrap",
    value: function wrap(story, context) {
      if (context.story !== "All" && context.story.split("-")[1]) {
        var key = context.kind + ":" + context.story;
        this.groupStore[key] = story;
      }
    }
  }, {
    key: "get",
    value: function get() {
      return this.groupStore;
    }
  }]);
  return GroupManager;
}();

exports.default = GroupManager;