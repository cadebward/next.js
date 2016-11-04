'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderJSON = exports.render = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var render = exports.render = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(url) {
    var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$dir = _ref2.dir,
        dir = _ref2$dir === undefined ? process.cwd() : _ref2$dir,
        _ref2$dev = _ref2.dev,
        dev = _ref2$dev === undefined ? false : _ref2$dev,
        _ref2$staticMarkup = _ref2.staticMarkup,
        staticMarkup = _ref2$staticMarkup === undefined ? false : _ref2$staticMarkup;

    var distBase, path, modResult, Component, props, bundlesBase, dataResult, component, _renderStatic, html, css, ids, head, config, files, doc;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            distBase = (0, _path.join)(dir, '.next', 'dist', 'pages');
            path = getPath(url);
            _context.next = 4;
            return (0, _require2.default)((0, _path.join)(distBase, path), distBase);

          case 4:
            modResult = _context.sent;
            Component = modResult.module.default || modResult.module;
            _context.next = 8;
            return Component.getInitialProps ? Component.getInitialProps((0, _extends3.default)({}, ctx, { params: modResult.params })) : {};

          case 8:
            props = _context.sent;
            bundlesBase = (0, _path.join)(dir, '.next', 'bundles', 'pages');
            _context.next = 12;
            return (0, _read2.default)((0, _path.join)(bundlesBase, path), bundlesBase);

          case 12:
            dataResult = _context.sent;
            component = dataResult.data;
            _renderStatic = (0, _server2.renderStatic)(function () {
              var app = (0, _react.createElement)(_app2.default, {
                Component: Component,
                props: props,
                router: new _router2.default(ctx.req ? ctx.req.url : url)
              });

              return (staticMarkup ? _server.renderToStaticMarkup : _server.renderToString)(app);
            }), html = _renderStatic.html, css = _renderStatic.css, ids = _renderStatic.ids;
            head = _head2.default.rewind() || [];
            _context.next = 18;
            return (0, _config2.default)(dir);

          case 18:
            config = _context.sent;
            _context.next = 21;
            return (0, _helpers.getParamRoutes)(bundlesBase);

          case 21:
            files = _context.sent;
            doc = (0, _react.createElement)(_document2.default, {
              html: html,
              head: head,
              css: css,
              data: {
                component: component,
                props: props,
                ids: ids,
                err: ctx.err ? errorToJSON(ctx.err) : null,
                params: dataResult.params,
                paramRoutes: files.map(function (r) {
                  return (0, _helpers.toParts)(r);
                })
              },
              dev: dev,
              staticMarkup: staticMarkup,
              cdn: config.cdn
            });
            return _context.abrupt('return', '<!DOCTYPE html>' + (0, _server.renderToStaticMarkup)(doc));

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function render(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var renderJSON = exports.renderJSON = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(url) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$dir = _ref4.dir,
        dir = _ref4$dir === undefined ? process.cwd() : _ref4$dir;

    var base, path, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            base = (0, _path.join)(dir, '.next', 'bundles', 'pages');
            path = getPath(url);
            _context2.next = 4;
            return (0, _read2.default)((0, _path.join)(base, path), base);

          case 4:
            result = _context2.sent;
            return _context2.abrupt('return', { component: result.data, params: result.params });

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function renderJSON(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.errorToJSON = errorToJSON;

var _path = require('path');

var _url = require('url');

var _react = require('react');

var _server = require('react-dom/server');

var _server2 = require('glamor/server');

var _helpers = require('./helpers');

var _require = require('./require');

var _require2 = _interopRequireDefault(_require);

var _read = require('./read');

var _read2 = _interopRequireDefault(_read);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _router = require('../lib/router');

var _router2 = _interopRequireDefault(_router);

var _document = require('../lib/document');

var _document2 = _interopRequireDefault(_document);

var _head = require('../lib/head');

var _head2 = _interopRequireDefault(_head);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorToJSON(err) {
  var name = err.name,
      message = err.message,
      stack = err.stack;

  var json = { name: name, message: message, stack: stack };

  if (name === 'ModuleBuildError') {
    // webpack compilation error
    var rawRequest = err.module.rawRequest;

    json.module = { rawRequest: rawRequest };
  }

  return json;
}

function getPath(url) {
  return (0, _url.parse)(url || '/').pathname.replace(/\.json$/, '');
}