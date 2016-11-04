'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFile = exports.getParamRoutes = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getParamRoutes = exports.getParamRoutes = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(base) {
    var files, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _globPromise2.default)((0, _path.join)(base, '**'));

          case 2:
            files = _context.sent;
            _context.next = 5;
            return _promise2.default.all(files.map(function (f) {
              return isFile(f);
            }));

          case 5:
            result = _context.sent;

            files = result.reduce(function (_files, isFile, i) {
              return isFile ? [].concat((0, _toConsumableArray3.default)(_files), [files[i]]) : _files;
            });

            files = files.filter(function (f) {
              return f.indexOf('}') > 0;
            });
            files = files.map(function (f) {
              return f.replace(base, '');
            });
            return _context.abrupt('return', files);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getParamRoutes(_x) {
    return _ref.apply(this, arguments);
  };
}();

var isFile = exports.isFile = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(p) {
    var stat;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            stat = void 0;
            _context2.prev = 1;
            _context2.next = 4;
            return _fs2.default.stat(p);

          case 4:
            stat = _context2.sent;
            _context2.next = 12;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2['catch'](1);

            if (!(_context2.t0.code === 'ENOENT')) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', false);

          case 11:
            throw _context2.t0;

          case 12:
            return _context2.abrupt('return', stat.isFile() || stat.isFIFO());

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 7]]);
  }));

  return function isFile(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.toParts = toParts;
exports.compareRoute = compareRoute;

var _path = require('path');

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toParts(route) {
  return route.replace(/^\/|\.js$/g, '').split('/');
}

function compareRoute(parts, segments) {
  // parts:    ['user', '{id}', 'action']
  // segments: ['user', '1234', 'action']
  if (parts.length === segments.length) {
    return parts.map(function (p, i) {
      return p.startsWith('{') || segments[i] === parts[i];
    }).every(function (ok) {
      return ok;
    });
  }
  return false;
}