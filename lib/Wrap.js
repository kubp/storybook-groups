'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  Wrap: {
    displayName: 'Wrap'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'dist/Wrap.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

var Wrap = _wrapComponent('Wrap')(function (_React$Component) {
  (0, _inherits3.default)(Wrap, _React$Component);

  function Wrap(props) {
    (0, _classCallCheck3.default)(this, Wrap);
    return (0, _possibleConstructorReturn3.default)(this, (Wrap.__proto__ || (0, _getPrototypeOf2.default)(Wrap)).call(this, props));
  }

  (0, _createClass3.default)(Wrap, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { "storybookGroupsKind": this.props.context.kind };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'div',
        null,
        this.props.storyFn()
      );
    }
  }]);
  return Wrap;
}(_react3.default.Component));

exports.default = Wrap;


Wrap.childContextTypes = {
  storybookGroupsKind: _propTypes2.default.string
};