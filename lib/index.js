'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGroups = exports.Group = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Group = exports.Group = function Group(_ref) {
  var children = _ref.children;
  return _react2.default.Children.only(children);
};

var css = {
  container: {
    margin: "0px"
  },
  title: {
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: "rgb(68, 68, 68)",
    margin: "0px"

  },
  item: {
    background: "#f7f7f7",
    marginTop: "10px",
    padding: 10,
    borderRadius: "4px"
  }
};

var addGroups = exports.addGroups = function addGroups(storiesOf, m, storybook) {

  var stories = storybook();

  var kinds = stories.reduce(function (acc, next) {
    return Object.assign({}, acc, _defineProperty({}, next.kind, next.stories.map(function (story) {
      return story.render();
    }).filter(function (node) {
      return node.type === Group;
    }).reduce(function (acc, node) {
      if (acc[node.props.name]) {
        acc[node.props.name].push(node.props.children);
        return acc;
      }
      acc[node.props.name] = [node.props.children];
      return acc;
    }, {})));
  }, {});

  Object.keys(kinds).forEach(function (kind) {
    storiesOf(kind, m).add('All', function () {
      return _react2.default.createElement(
        'div',
        { style: css.container },
        Object.keys(kinds[kind]).map(function (name) {
          return _react2.default.createElement(
            'div',
            { style: css.item, key: name },
            _react2.default.createElement(
              'h3',
              { style: css.title },
              name
            ),
            kinds[kind][name]
          );
        })
      );
    });
  });
};