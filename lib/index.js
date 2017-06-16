'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGroups = exports.Group = exports.Groups = exports.GroupComponent = exports.withGroups = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storybookAddonKnobs = require('@kadira/storybook-addon-knobs');

var _storybook = require('@kadira/storybook');

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _GroupManager = require('./GroupManager');

var _GroupManager2 = _interopRequireDefault(_GroupManager);

var _Wrap = require('./Wrap');

var _Wrap2 = _interopRequireDefault(_Wrap);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var manager = new _GroupManager2.default();

var withGroups = exports.withGroups = function withGroups(storyFn, context) {
  var all = manager.groupStore;
  var props = { storyFn: storyFn, context: context, all: all };
  return _react2.default.createElement(_Wrap2.default, props);
};

var css = {
  title: {
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: "rgb(68, 68, 68)",
    marginTop: "0px"

  },
  item: {
    background: "#f7f7f7",
    marginTop: "10px",
    padding: 10,
    borderRadius: "4px"
  }
};

var GroupComponent = exports.GroupComponent = function (_React$Component) {
  _inherits(GroupComponent, _React$Component);

  function GroupComponent(props) {
    _classCallCheck(this, GroupComponent);

    var _this = _possibleConstructorReturn(this, (GroupComponent.__proto__ || Object.getPrototypeOf(GroupComponent)).call(this, props));

    _this.state = { mounted: false };
    return _this;
  }

  _createClass(GroupComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var storybook = this.props.getStorybook();
      for (var i = 0; i < storybook.length; i++) {
        if (storybook[i].kind === this.context.storybookGroupsKind) {
          var story = storybook[i];
        }
      }

      //dodelat pro vic
      for (var i = 0; i < story.stories.length - 1; i++) {
        var context = { kind: story.kind, story: story.stories[i].name };
        story.stories[i].render(context);
        manager.wrap(story.stories[i].render(context), context);
      }

      this.setState({ mounted: true });
    }
  }, {
    key: 'makeGroups',
    value: function makeGroups(store) {
      var storeKeys = Object.keys(store);

      var group = {};
      var g = [];

      for (var i = 0; i < storeKeys.length; i++) {
        if (!group[storeKeys[i].split("-")[1]]) {
          group[storeKeys[i].split("-")[1]] = [];
        }

        if (storeKeys[i].split(":")[0] === this.context.storybookGroupsKind) {
          group[storeKeys[i].split("-")[1]].push(store[storeKeys[i]]);
        }
      }

      for (var i = 0; i < Object.keys(group).length; i++) {
        if (group[Object.keys(group)[i]].length !== 0) {
          g.push({ name: Object.keys(group)[i], items: group[Object.keys(group)[i]] });
        }
      }

      return g;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.makeGroups(manager.groupStore).map(function (v, index) {
          return _react2.default.createElement(
            'div',
            { key: index, style: css.item },
            _react2.default.createElement(
              'h1',
              { style: css.title },
              v.name
            ),
            v.items.map(function (h, index) {
              return _react2.default.createElement(
                'div',
                { key: index },
                h
              );
            })
          );
        }, this)
      );
    }
  }]);

  return GroupComponent;
}(_react2.default.Component);

GroupComponent.contextTypes = {
  storybookGroupsKind: _propTypes2.default.string
};

//with knobs
var Groups = exports.Groups = function Groups() {
  return _react2.default.createElement(GroupComponent, { groupStore: manager.groupStore, getStorybook: _storybook.getStorybook });
};

//without knobs
var Group = exports.Group = function Group(_ref) {
  var children = _ref.children;
  return _react2.default.Children.only(children);
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