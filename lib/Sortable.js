'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2; /* eslint consistent-return: 0 */


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _sortablejs = require('sortablejs');

var _sortablejs2 = _interopRequireDefault(_sortablejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var store = {
    nextSibling: null,
    activeComponent: null
};

var Sortable = (_temp2 = _class = function (_PureComponent) {
    _inherits(Sortable, _PureComponent);

    function Sortable() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Sortable);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sortable.__proto__ || Object.getPrototypeOf(Sortable)).call.apply(_ref, [this].concat(args))), _this), _this.sortable = null, _this.createSortable = function () {
            _this.destroySortable();
            var options = _extends({}, _this.props.options);
            ['onChoose', 'onStart', 'onEnd', 'onAdd', 'onUpdate', 'onSort', 'onRemove', 'onFilter', 'onMove', 'onClone'].forEach(function (name) {
                var eventHandler = options[name];

                options[name] = function () {
                    for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                        params[_key2] = arguments[_key2];
                    }

                    var evt = params[0];


                    if (name === 'onChoose') {
                        store.nextSibling = evt.item.nextElementSibling;
                        store.activeComponent = _this;
                    } else if ((name === 'onAdd' || name === 'onUpdate') && _this.props.onChange) {
                        var items = _this.sortable.toArray();
                        var remote = store.activeComponent;
                        var remoteItems = remote.sortable.toArray();

                        var referenceNode = store.nextSibling && store.nextSibling.parentNode !== null ? store.nextSibling : null;
                        evt.from.insertBefore(evt.item, referenceNode);
                        if (remote !== _this) {
                            var remoteOptions = remote.props.options || {};

                            if (_typeof(remoteOptions.group) === 'object' && remoteOptions.group.pull === 'clone') {
                                // Remove the node with the same data-reactid
                                evt.item.parentNode.removeChild(evt.item);
                            }

                            remote.props.onChange && remote.props.onChange(remoteItems, remote.sortable, evt);
                        }

                        _this.props.onChange && _this.props.onChange(items, _this.sortable, evt);
                    }

                    if (evt.type === 'move') {
                        var _evt = params[0],
                            originalEvent = params[1];

                        var canMove = eventHandler ? eventHandler(_evt, originalEvent) : true;
                        return canMove;
                    }

                    setTimeout(function () {
                        eventHandler && eventHandler(evt);
                    }, 0);
                };
            });
            _this.sortable = _sortablejs2.default.create(_reactDom2.default.findDOMNode(_this), options);
        }, _this.destroySortable = function () {
            store.nextSibling = null;
            store.activeComponent = null;
            if (_this.sortable) {
                _this.sortable.destroy();
                _this.sortable = null;
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Sortable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.createSortable();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.options !== this.props.options || prevProps.onChange !== this.props.onChange) {
                this.createSortable();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.destroySortable();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                Component = _props.tag,
                props = _objectWithoutProperties(_props, ['tag']);

            delete props.options;
            delete props.onChange;

            return _react2.default.createElement(Component, props);
        }
    }]);

    return Sortable;
}(_react.PureComponent), _class.propTypes = {
    options: _propTypes2.default.object,
    onChange: _propTypes2.default.func,
    tag: _propTypes2.default.string,
    style: _propTypes2.default.object
}, _class.defaultProps = {
    options: {},
    tag: 'div',
    style: {}
}, _temp2);
exports.default = Sortable;