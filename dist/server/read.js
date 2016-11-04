'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cache = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * resolve a file like `require.resolve`,
 * and read and cache the file content
 */

var read = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, base) {
    var resolved, file, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _resolve2.default)(path, base);

          case 2:
            resolved = _context.sent;
            file = resolved.file;

            if (!cache.hasOwnProperty(file)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', {
              data: cache[file],
              params: resolved.params
            });

          case 6:
            _context.next = 8;
            return _fs2.default.readFile(file, 'utf8');

          case 8:
            data = _context.sent;

            cache[file] = data;

            return _context.abrupt('return', {
              data: data,
              params: resolved.params
            });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function read(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = read;
var cache = exports.cache = {};

read.cache = cache;