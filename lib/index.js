'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGroups = exports.Group = exports.Groups = exports.GroupComponent = exports.withGroups = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _addonKnobs = require('@storybook/addon-knobs');

var _react4 = require('@storybook/react');

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _GroupManager = require('./GroupManager');

var _GroupManager2 = _interopRequireDefault(_GroupManager);

var _Wrap = require('./Wrap');

var _Wrap2 = _interopRequireDefault(_Wrap);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  GroupComponent: {
    displayName: 'GroupComponent'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'dist/index.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

var manager = new _GroupManager2.default();

var withGroups = exports.withGroups = function withGroups(storyFn, context) {
  var all = manager.groupStore;
  var props = { storyFn: storyFn, context: context, all: all };
  return _react3.default.createElement(_Wrap2.default, props);
};

var css = {
  title: {
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: "rgb(68, 68, 68)",
    marginTop: "0px",
    marginLeft: "20px"
  },
  group: {
    background: "#f7f7f7",
    marginTop: "10px",
    padding: "15px 15px 15px 0px",
    borderRadius: "4px",
    border: "1px solid rgb(228, 221, 221)",
    marginLeft: "20px"
  },
  container: {
    display: "flex",
    flexFlow: "row wrap"
  },
  item: {
    marginLeft: "20px"
  },
  items: {
    display: "flex"
  }
};

var GroupComponent = exports.GroupComponent = _wrapComponent('GroupComponent')(function (_React$Component) {
  (0, _inherits3.default)(GroupComponent, _React$Component);

  function GroupComponent(props) {
    (0, _classCallCheck3.default)(this, GroupComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GroupComponent.__proto__ || (0, _getPrototypeOf2.default)(GroupComponent)).call(this, props));

    _this.state = { mounted: false, css: {} };
    return _this;
  }

  (0, _createClass3.default)(GroupComponent, [{
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

      this.setState({ mounted: true, css: this.props.style || css });
    }
  }, {
    key: 'makeGroups',
    value: function makeGroups(store) {
      var storeKeys = (0, _keys2.default)(store);

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

      for (var i = 0; i < (0, _keys2.default)(group).length; i++) {
        if (group[(0, _keys2.default)(group)[i]].length !== 0) {
          g.push({ name: (0, _keys2.default)(group)[i], items: group[(0, _keys2.default)(group)[i]] });
        }
      }

      return g;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'div',
        { style: this.state.css.container },
        this.makeGroups(manager.groupStore).map(function (v, index) {
          var _this2 = this;

          return _react3.default.createElement(
            'div',
            { key: index, style: this.state.css.group },
            _react3.default.createElement(
              'div',
              null,
              _react3.default.createElement(
                'h1',
                { style: this.state.css.title },
                v.name
              )
            ),
            _react3.default.createElement(
              'div',
              { style: this.state.css.items },
              v.items.map(function (h, index) {
                return _react3.default.createElement(
                  'div',
                  { key: index, style: _this2.state.css.item },
                  h
                );
              })
            )
          );
        }, this)
      );
    }
  }]);
  return GroupComponent;
}(_react3.default.Component));

GroupComponent.contextTypes = {
  storybookGroupsKind: _propTypes2.default.string
};

//with knobs
var Groups = exports.Groups = function Groups(style) {
  return _react3.default.createElement(GroupComponent, { groupStore: manager.groupStore, getStorybook: _react4.getStorybook, style: style.style });
};

//without knobs
var Group = exports.Group = function Group(_ref) {
  var children = _ref.children;
  return _react3.default.Children.only(children);
};

var addGroups = exports.addGroups = function addGroups(storiesOf, m, storybook) {

  var stories = storybook();

  var kinds = stories.reduce(function (acc, next) {
    return (0, _assign2.default)({}, acc, (0, _defineProperty3.default)({}, next.kind, next.stories.map(function (story) {
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

  (0, _keys2.default)(kinds).forEach(function (kind) {
    storiesOf(kind, m).add('All', function () {
      return _react3.default.createElement(
        'div',
        { style: css.container },
        (0, _keys2.default)(kinds[kind]).map(function (name) {
          return _react3.default.createElement(
            'div',
            { style: css.item, key: name },
            _react3.default.createElement(
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