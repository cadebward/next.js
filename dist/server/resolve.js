'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getMatchedRoute = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(segments, base) {
    var files, routes, path, params;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _helpers.getParamRoutes)(base);

          case 2:
            files = _context2.sent;
            routes = files.filter(function (route) {
              return (0, _helpers.compareRoute)((0, _helpers.toParts)(route), segments);
            });

            if (!(routes.length < 1)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', null);

          case 6:
            path = routes[0];
            params = (0, _helpers.toParts)(path).reduce(function (_params, part, i) {
              return !part.startsWith('{') ? _params : (0, _extends4.default)({}, _params, (0, _defineProperty3.default)({}, part.slice(1, -1), segments[i]));
            }, {});
            return _context2.abrupt('return', { path: path, params: params });

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getMatchedRoute(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.resolveFromList = resolveFromList;

var _path = require('path');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(id, base) {
    var paths, segments, matched, file, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _file, err;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            paths = getPaths(id);
            segments = id.replace(base, '').replace(/^\//, '').split('/');
            _context.next = 4;
            return getMatchedRoute(segments, base);

          case 4:
            matched = _context.sent;

            if (!matched) {
              _context.next = 11;
              break;
            }

            file = (0, _path.join)(base, matched.path);
            _context.next = 9;
            return (0, _helpers.isFile)(file);

          case 9:
            if (!_context.sent) {
              _context.next = 11;
              break;
            }

            return _context.abrupt('return', { file: file, params: matched.params });

          case 11:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 14;
            _iterator = (0, _getIterator3.default)(paths);

          case 16:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 25;
              break;
            }

            _file = _step.value;
            _context.next = 20;
            return (0, _helpers.isFile)(_file);

          case 20:
            if (!_context.sent) {
              _context.next = 22;
              break;
            }

            return _context.abrupt('return', { file: _file, params: {} });

          case 22:
            _iteratorNormalCompletion = true;
            _context.next = 16;
            break;

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t0 = _context['catch'](14);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 31:
            _context.prev = 31;
            _context.prev = 32;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 34:
            _context.prev = 34;

            if (!_didIteratorError) {
              _context.next = 37;
              break;
            }

            throw _iteratorError;

          case 37:
            return _context.finish(34);

          case 38:
            return _context.finish(31);

          case 39:
            err = new Error('Cannot find module ' + id);

            err.code = 'ENOENT';
            throw err;

          case 42:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[14, 27, 31, 39], [32,, 34, 38]]);
  }));

  function resolve(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return resolve;
}();

function resolveFromList(id, files) {
  var paths = getPaths(id);
  var set = new _set2.default(files);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = (0, _getIterator3.default)(paths), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var p = _step2.value;

      if (set.has(p)) return p;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function getPaths(id) {
  var i = _path.sep === '/' ? id : id.replace(/\//g, _path.sep);

  if (i.slice(-3) === '.js') return [i];
  if (i[i.length - 1] === _path.sep) return [i + 'index.js'];

  return [i + '.js', (0, _path.join)(i, 'index.js')];
}