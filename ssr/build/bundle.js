/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FETCH_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FETCH_USERS_PENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_USERS_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return fetchUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_CURRENT_USER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return fetchCurrentUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_ADMINS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return fetchAdmins; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
var FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
var FETCH_USERS_FAILED = 'FETCH_USERS_FAILED'; //? async requests - way

var fetchUsers = function fetchUsers() {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState, api) {
      var _yield$api$get, data;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //? api: axiosInstance , we sent this in the store . details are there
              dispatch({
                type: FETCH_USERS_PENDING
              });
              _context.prev = 1;
              _context.next = 4;
              return api.get('/users');

            case 4:
              _yield$api$get = _context.sent;
              data = _yield$api$get.data;
              dispatch({
                type: FETCH_USERS_SUCCESS,
                payload: data
              });
              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              dispatch({
                type: FETCH_USERS_FAILED,
                payload: _context.t0
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};
var FETCH_CURRENT_USER = 'FETCH_CURRENT_USER'; //? async requests - way

var fetchCurrentUser = function fetchCurrentUser() {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState, api) {
      var _yield$api$get2, data;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return api.get('/current_user');

            case 2:
              _yield$api$get2 = _context2.sent;
              data = _yield$api$get2.data;
              dispatch({
                type: FETCH_CURRENT_USER,
                payload: data
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
};
var FETCH_ADMINS = 'FETCH_ADMINS'; //? async requests - way

var fetchAdmins = function fetchAdmins() {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState, api) {
      var _yield$api$get3, data;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return api.get('/admins');

            case 2:
              _yield$api$get3 = _context3.sent;
              data = _yield$api$get3.data;
              dispatch({
                type: FETCH_ADMINS,
                payload: data
              });

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x7, _x8, _x9) {
      return _ref3.apply(this, arguments);
    };
  }();
}; //? sync reducer action
// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_usersList__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_not_found__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_admins__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_test__ = __webpack_require__(17);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/* harmony default export */ __webpack_exports__["a"] = ([_objectSpread(_objectSpread({}, __WEBPACK_IMPORTED_MODULE_2__App__["a" /* default */]), {}, {
  routes: [_objectSpread(_objectSpread({
    path: '/'
  }, __WEBPACK_IMPORTED_MODULE_0__pages_home__["a" /* default */]), {}, {
    exact: true
  }), _objectSpread({
    path: '/users'
  }, __WEBPACK_IMPORTED_MODULE_1__pages_usersList__["a" /* default */]), _objectSpread({
    path: '/admins'
  }, __WEBPACK_IMPORTED_MODULE_4__pages_admins__["a" /* default */]), _objectSpread({
    path: '/test'
  }, __WEBPACK_IMPORTED_MODULE_5__pages_test__["a" /* default */]), _objectSpread({}, __WEBPACK_IMPORTED_MODULE_3__pages_not_found__["a" /* default */]) // this is how we use not-found page -- by not providing path
  ]
})]);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }




/* harmony default export */ __webpack_exports__["a"] = (function (ChildComponent) {
  var RequireAuth = /*#__PURE__*/function (_Component) {
    _inherits(RequireAuth, _Component);

    var _super = _createSuper(RequireAuth);

    function RequireAuth() {
      _classCallCheck(this, RequireAuth);

      return _super.apply(this, arguments);
    }

    _createClass(RequireAuth, [{
      key: "render",
      value: function render() {
        console.log(' Current User is ', this.props.currentUser);
        if (this.props.currentUser === false) return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["Redirect"], {
          to: "/"
        });
        if (this.props.currentUser === null) return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, "Loading...");
        return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(ChildComponent, this.props);
      }
    }]);

    return RequireAuth;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  function mapStateToProps(_ref) {
    var currentUser = _ref.currentUser;
    return {
      currentUser: currentUser
    };
  }

  return Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps)(RequireAuth);
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client_routes_routes__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_for_server_renderer__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_http_proxy__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_express_http_proxy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_express_http_proxy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__helpers_for_server_server_redux_store__ = __webpack_require__(22);
//? serving as a root file for the server
 // to use async await







var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
app.use('/api', __WEBPACK_IMPORTED_MODULE_5_express_http_proxy___default()('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator: function proxyReqOptDecorator(opts) {
    opts.headers['x-forwarded-host'] = 'localhost:3000';
    return opts;
  }
})); //? so every request coming with '/api' , /api will be replaced with the provided domain name
//? proxy setup is only gonna handle requests coming from browser, and not from server
//? so, only provide the domain name, that can be handled by browser
//? may be in micro-services and k8s, we could only use '/' this
//? and we can use ingress-nginx way in the server side redux store -- where server requests will be handled
// important - 2nd option is only for this course -- just to easily pass the google auth security measures

app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a["static"]('public')); // very important line of code , to run js functionality
// if "*" does not work , i can directly use ingress-nginx thru http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/*

app.get('*', function (req, res) {
  var store = Object(__WEBPACK_IMPORTED_MODULE_6__helpers_for_server_server_redux_store__["a" /* default */])(req); // some logic to initialize and load data into store

  var promises = Object(__WEBPACK_IMPORTED_MODULE_2_react_router_config__["matchRoutes"])(__WEBPACK_IMPORTED_MODULE_3__client_routes_routes__["a" /* default */], req.path).map(function (_ref) {
    var route = _ref.route;
    return route.loadData ? route.loadData(store) : null;
  }).map(function (promise) {
    if (promise) {
      return new Promise(function (resolve, reject) {
        promise.then(resolve)["catch"](resolve); // always render the page and not stuck if get some error from backend
      });
    }
  }); // 2nd map statement is to catch errors, coming from backend -

  Promise.all(promises).then(function () {
    var context = {};
    var content = Object(__WEBPACK_IMPORTED_MODULE_4__helpers_for_server_renderer__["a" /* default */])(req, store, context);
    console.log('context is:', context);
    if (context.url) return res.redirect(301, context.url); // will handle redirection
    // this is how i may redirect to the url, user was already redirected from

    if (context.notFound) res.status(404); // this setting is for notFoundPage

    res.send(content);
  });
});
app.listen(3000, function () {
  console.log('Server Side of SSR running on port -- 3000');
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_helmet__);




var Home = function Home() {
  var head = function head() {
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_helmet__["Helmet"], null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("title", null, "Home Component"), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("meta", {
      property: "og:title",
      content: "Home"
    }));
  };

  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, head(), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Im a Home Component "), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", {
    onClick: function onClick() {
      return console.log('You Pressed Me!');
    }
  }, "Press Me - !"), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("br", null), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: "/users"
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", null, "Get me to Users")));
};

/* harmony default export */ __webpack_exports__["a"] = ({
  component: Home // this styling is for Routes file specially

});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Store_actions_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_helmet__);





var UsersList = function UsersList(props) {
  Object(__WEBPACK_IMPORTED_MODULE_0_react__["useEffect"])(function () {
    props.fetchUsers();
  }, []);

  var head = function head() {
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_helmet__["Helmet"], null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("title", null, "".concat(props.users.data.length, " Users Loaded")), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
      property: "og:title",
      content: "Users List"
    }));
  };

  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, head(), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", null, " UsersList "), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h4", null, "User Data is: ", props.currentUser.googleId), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", null, props.users.data.map(function (user) {
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
      key: user.id + user.name
    }, user.name);
  })));
};

function mapStateToProps(_ref) {
  var users = _ref.users,
      currentUser = _ref.currentUser;
  return {
    users: users,
    currentUser: currentUser
  };
}

/* harmony default export */ __webpack_exports__["a"] = ({
  loadData: function loadData(_ref2) {
    var dispatch = _ref2.dispatch;
    return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__Store_actions_index__["h" /* fetchUsers */])());
  },
  component: Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {
    fetchUsers: __WEBPACK_IMPORTED_MODULE_2__Store_actions_index__["h" /* fetchUsers */]
  })(UsersList)
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_header__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Store_actions__ = __webpack_require__(2);



 // any route, that is matched by matchRoutes fn, will be passed to this App

var App = function App(_ref) {
  var route = _ref.route;
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2__components_header__["a" /* default */], null), Object(__WEBPACK_IMPORTED_MODULE_1_react_router_config__["renderRoutes"])(route.routes));
}; // function loadData(store) {
//   //? Here, we will load currentUser Data
//   if (store) {
//     if (store.dispatch) {
//       return store.dispatch(fetchCurrentUser());
//     }
//   }
// }


/* harmony default export */ __webpack_exports__["a"] = ({
  component: App,
  loadData: function loadData(_ref2) {
    var dispatch = _ref2.dispatch;
    return dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__Store_actions__["g" /* fetchCurrentUser */])());
  }
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_redux__);




var Header = function Header(props) {
  var authButton = props.currentUser ? /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", {
    href: "/api/logout"
  }, "Logout") : /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("a", {
    href: "/api/auth/google"
  }, "Login");
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", {
    className: "nav-wrapper"
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: "/",
    className: "brand-logo"
  }, "React SSR"), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("ul", {
    className: "right"
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: "/users"
  }, "Users")), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: "/admins"
  }, "Admins")), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("li", null, authButton)));
};

function mapStateToProps(_ref) {
  var currentUser = _ref.currentUser;
  return {
    currentUser: currentUser
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps)(Header)); // note -- we want currentUser details to be rendered by server itself only
// thats y we are not using mapDispatch to props ..

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var NotFound = function NotFound(_ref) {
  var _ref$staticContext = _ref.staticContext,
      staticContext = _ref$staticContext === void 0 ? {
    notFound: false
  } : _ref$staticContext;
  staticContext.notFound = true;
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Oops.. Page Not Found ");
};

/* harmony default export */ __webpack_exports__["a"] = ({
  component: NotFound
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Store_actions_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_hocs_require_auth__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_helmet__);






var Admins = function Admins(props) {
  Object(__WEBPACK_IMPORTED_MODULE_0_react__["useEffect"])(function () {
    props.fetchAdmins();
  }, []);

  var head = function head() {
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_helmet__["Helmet"], null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("title", null, "".concat(props.admins.length, " Admins Loaded")), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("meta", {
      property: "og:title",
      content: "Admins List"
    }));
  };

  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, head(), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", null, "Protected List Of Routes"), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", null, props.admins.map(function (admin) {
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
      key: admin.id
    }, admin.name);
  })));
};

function mapStateToProps(_ref) {
  var admins = _ref.admins;
  return {
    admins: admins
  };
}

/* harmony default export */ __webpack_exports__["a"] = ({
  loadData: function loadData(_ref2) {
    var dispatch = _ref2.dispatch;
    return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__Store_actions_index__["f" /* fetchAdmins */])());
  },
  // short way of loadData fn
  component: Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["connect"])(mapStateToProps, {
    fetchAdmins: __WEBPACK_IMPORTED_MODULE_2__Store_actions_index__["f" /* fetchAdmins */]
  })(Object(__WEBPACK_IMPORTED_MODULE_3__components_hocs_require_auth__["a" /* default */])(Admins))
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_hocs_require_auth__ = __webpack_require__(6);



var Test = function Test(props) {
  console.log(props.currentUser);
  return 'Im a test Page';
};

function mapStateToProps(_ref) {
  var currentUser = _ref.currentUser;
  return {
    currentUser: currentUser
  };
}

/* harmony default export */ __webpack_exports__["a"] = ({
  component: Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps)(Object(__WEBPACK_IMPORTED_MODULE_1__components_hocs_require_auth__["a" /* default */])(Test))
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client_routes_routes__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_helmet__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_serialize_javascript__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_serialize_javascript__);







 // this works as JSON.stringify() but when some malicious script tag is placed as a normal data
// serialize will also replace that special script tag with a normal string
// and it will replace "<" ">" characters with their unit codes
//? the attack is called xss attack -- cross side script attack

var renderer = function renderer(req, store, context) {
  // context, we are providing in context prop, it will send data into the renderer page on the browser
  // here , we are using it in NotFound Page
  var content = Object(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToString"])( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4_react_redux__["Provider"], {
    store: store
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["StaticRouter"], {
    location: req.path,
    context: context
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, Object(__WEBPACK_IMPORTED_MODULE_5_react_router_config__["renderRoutes"])(__WEBPACK_IMPORTED_MODULE_3__client_routes_routes__["a" /* default */]))))); //! Difference btw renderToString() and renderToNodeStream
  // renderToString() -- we will send the request -- it will build all the data and will send back the response
  // renderToNodeStream() -- we will send req, it will build a small snippet/bid of data and will send response with that data
  // then, it will again build a small snippet of data and will send that
  // and this process will continue until all the data is send to the browser
  // renderToNodeStream() has a huge positive impact on performance, as its first bid of data will be tremendously faster to retrieve than the bid of renderToString()
  // as renderToNodeStream()'s first bid will be a small snippet and renderToString()'s 1st bid will be all the data
  // but there is a gotcha with this approach
  // if user go to the page, server will send 1st!! small snippet/bid of data instantaneously.
  // if user!!! , instantaneously, clicks a button to go on a page, he will instantaneously go to that page
  // but when 2nd!! or 3rd!! snippet of that data arrives... it comes to know that it had to redirect the user to home page due to some reason
  // so, user will not be redirected, once it has already opened the page
  // important -- thats y we will stick into the renderToString()

  var helmet = __WEBPACK_IMPORTED_MODULE_6_react_helmet__["Helmet"].renderStatic(); //? to pull all the tags, we have provided to the components/pages
  // have added Materialize css cdn here

  return "\n  <html>\n  <head>\n    ".concat(helmet.title.toString(), "\n    ").concat(helmet.meta.toString(), "\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css\">\n  </head>\n  <body>\n  <div id=\"root\">").concat(content, "</div>\n  <script> window.INITIAL_STATE = ").concat(__WEBPACK_IMPORTED_MODULE_7_serialize_javascript___default()(store.getState()), " </script>\n  <script src=\"bundle.js\" ></script>\n  </body>\n  </html>\n  ");
}; // note -- all the meta tags for image, desc will be pull by ${helmet.meta.toString()}


/* harmony default export */ __webpack_exports__["a"] = (renderer);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("express-http-proxy");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__client_Store_reducers_index__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_logger__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux_logger__);
// server side redux file






var logger = Object(__WEBPACK_IMPORTED_MODULE_5_redux_logger__["createLogger"])();

var CreateStore = function CreateStore(req) {
  var serverAxiosInstance = __WEBPACK_IMPORTED_MODULE_3_axios___default.a.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: {
      cookie: req.get('cookie') || ''
    } // important -- we may need to handle 'cookie', if there is some difference in casing -- like 'Cookie' or so

  }); //? server side proxy instance is not gonna go into the proxy setup in index.tsx
  //? we have to provide full route
  //? in our micro-services and k8s -- i can apply ingress-service route here

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_4__client_Store_reducers_index__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_1_redux_devtools_extension__["composeWithDevTools"])(Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_2_redux_thunk___default.a.withExtraArgument(serverAxiosInstance))) // add (thunkMiddleware , logger ) if wish -- logger
  );
  return store;
}; // that's how we use store on the server side


/* harmony default export */ __webpack_exports__["a"] = (CreateStore);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__current_user__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__usersListReducer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admins__ = __webpack_require__(29);




var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  users: __WEBPACK_IMPORTED_MODULE_2__usersListReducer__["a" /* FetchUsersReducer */],
  currentUser: __WEBPACK_IMPORTED_MODULE_1__current_user__["a" /* FetchCurrentUserReducer */],
  admins: __WEBPACK_IMPORTED_MODULE_3__admins__["a" /* FetchAdminsReducer */]
});
/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchCurrentUserReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_index__ = __webpack_require__(2);
 //? async reducer function

var FetchCurrentUserReducer = function FetchCurrentUserReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_index__["b" /* FETCH_CURRENT_USER */]:
      return action.payload || false;

    default:
      return state;
  }
};

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchUsersReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_index__ = __webpack_require__(2);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var initialState = {
  isPending: false,
  data: [],
  error: ''
}; //? async reducer function

var FetchUsersReducer = function FetchUsersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_index__["d" /* FETCH_USERS_PENDING */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        isPending: true
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_index__["e" /* FETCH_USERS_SUCCESS */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        data: action.payload,
        isPending: false
      });

    case __WEBPACK_IMPORTED_MODULE_0__actions_index__["c" /* FETCH_USERS_FAILED */]:
      return _objectSpread(_objectSpread({}, state), {}, {
        error: action.payload,
        isPending: false
      });

    default:
      return state;
  }
}; //? sync redux reducer
// const initialStateSearch = {
//   userToken: "",
// };
// we cannot change our state . so we will have to recreate it with some changes we need
// export const userToken = (state = initialStateSearch, action = {}) => {
//   if (action.type === UserToken) {
//     console.log(action.payload);
//     return { ...state, userToken: action.payload };
//   } else return state; // reducers must be returning something
// };

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchAdminsReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_index__ = __webpack_require__(2);
 //? async reducer function

var FetchAdminsReducer = function FetchAdminsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_index__["a" /* FETCH_ADMINS */]:
      return action.payload;

    default:
      return state;
  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("react-helmet");

/***/ })
/******/ ]);