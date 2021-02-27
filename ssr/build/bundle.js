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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-router-config");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_home__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_tickets__ = __webpack_require__(11);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Routes = [_objectSpread(_objectSpread({
  path: '/'
}, __WEBPACK_IMPORTED_MODULE_0__pages_home__["a" /* default */]), {}, {
  exact: true
}), _objectSpread({
  path: '/tickets'
}, __WEBPACK_IMPORTED_MODULE_1__pages_tickets__["a" /* default */])];
/* harmony default export */ __webpack_exports__["a"] = (Routes);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUsers", function() { return fetchUsers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var fetchUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
    var _yield$axios$get, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch({
              type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["b" /* FETCH_USERS_PENDING */]
            });
            _context.prev = 1;
            _context.next = 4;
            return __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('https://jsonplaceholder.typicode.com/users');

          case 4:
            _yield$axios$get = _context.sent;
            data = _yield$axios$get.data;
            dispatch({
              type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["c" /* FETCH_USERS_SUCCESS */],
              payload: data
            });
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            dispatch({
              type: __WEBPACK_IMPORTED_MODULE_0__actionTypes__["a" /* FETCH_USERS_FAILED */],
              payload: _context.t0
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function fetchUsers(_x) {
    return _ref.apply(this, arguments);
  };
}(); // import {
//   REQUEST_ROBOTS_PENDING,
//   REQUEST_ROBOTS_SUCCESS,
//   REQUEST_ROBOTS_FAILED,
// } from './actionTypes';
// import axios from 'axios';
// Setting search text in a state
// export const setUserToken = (token) => ({
//   // we wanna recieve text here
//   type: UserToken,
//   payload: token,
// });
// async action function
// export const requestRobots = async (dispatch) => {
//   dispatch({ type: REQUEST_ROBOTS_PENDING });
//   try {
//     const { data } = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error });
//   }
// };

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FETCH_USERS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FETCH_USERS_PENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FETCH_USERS_FAILED; });
// export const UserToken = "UserToken";
var FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
var FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
var FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client_routes_routes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__helpers_for_server_renderer__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__helpers_for_server_server_redux_store__ = __webpack_require__(16);
//? serving as a root file for the server
 // to use async await






var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a["static"]('public')); // very important line of code , to run js functionality
// if "*" does not work , i can directly use ingress-nginx thru http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/*

app.get('*', function (req, res) {
  var store = Object(__WEBPACK_IMPORTED_MODULE_5__helpers_for_server_server_redux_store__["a" /* default */])(); // some logic to initialize and load data into store

  var promises = Object(__WEBPACK_IMPORTED_MODULE_2_react_router_config__["matchRoutes"])(__WEBPACK_IMPORTED_MODULE_3__client_routes_routes__["a" /* default */], req.path).map(function (_ref) {
    var route = _ref.route;
    return route.loadData ? route.loadData(store) : null;
  });
  Promise.all(promises).then(function () {
    res.send(Object(__WEBPACK_IMPORTED_MODULE_4__helpers_for_server_renderer__["a" /* default */])(req, store));
  });
});
app.listen(3000, function () {
  console.log('Server Side of SSR running on port -- 3000');
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__);



var Home = function Home() {
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("h1", null, "Im a Home Component "), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", {
    onClick: function onClick() {
      return console.log('You Pressed Me!');
    }
  }, "Press Me - !"), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["Link"], {
    to: "/tickets"
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("button", null, "Get me to Tickets")));
};

/* harmony default export */ __webpack_exports__["a"] = ({
  component: Home // this styling is for Routes file specially

});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__redux_1_actions__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__redux_4_connect__ = __webpack_require__(13);




var Tickets = function Tickets(props) {
  Object(__WEBPACK_IMPORTED_MODULE_0_react__["useEffect"])(function () {
    // this fetch is already happening on the server side, if user navigates to this page, he will automatically get users list
    // but if he somehow navigate to this page thru the way, from where, server side is not rendered
    // then, we should also have data on client side, so thats y, we will fetch data here too
    props.fetchingUsers();
  }, []);
  return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", null, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", null, " Tickets "), /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("ul", null, props.users.map(function (user) {
    return /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("li", {
      key: user.id + user.name
    }, user.name);
  })));
};

function loadData(store) {
  // return store.dispatch(fetchUsers());
  if (store) {
    if (store.dispatch) {
      return store.dispatch(__WEBPACK_IMPORTED_MODULE_1__redux_1_actions__["fetchUsers"]); // not calling
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = ({
  loadData: loadData,
  component: Object(__WEBPACK_IMPORTED_MODULE_2__redux_4_connect__["a" /* Connect */])(Tickets)
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export mapStateToProps */
/* unused harmony export mapDispatchToProps */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react_redux__);


var _require = __webpack_require__(4),
    fetchUsers = _require.fetchUsers; // here we will map the properties we want to be in props from reducers ..


var mapStateToProps = function mapStateToProps(state) {
  return {
    // userToken: state.userToken.userToken,
    users: state.FetchUsersReducer.users
  };
}; // dispatch means triggering an action

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // setUserToken: (token) => {
    //   return dispatch(setUserToken(token)); // idk y but event.currentTarget.value is not working and just event is working
    // },
    // async dispatch function
    fetchingUsers: function fetchingUsers() {
      return fetchUsers(dispatch);
    }
  }; // setSearchField is an action which wants text .
  // and onSearchChange will occur when we will call it in an input .. so it will be having event.currentTarget.value
};
var Connect = function Connect(App) {
  return Object(__WEBPACK_IMPORTED_MODULE_0_react_redux__["connect"])(mapStateToProps, mapDispatchToProps)(App);
};

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom_server___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_router_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__client_routes_routes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_router_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_router_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_serialize_javascript__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_serialize_javascript___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_serialize_javascript__);






 // this works as JSON.stringify() but when some malicious script tag is placed as a normal data
// serialize will also replace that special script tag with a normal string
// and it will replace "<" ">" characters with their unit codes
//? the attack is called xss attack -- cross side script attack

var renderer = function renderer(req, store) {
  var content = Object(__WEBPACK_IMPORTED_MODULE_1_react_dom_server__["renderToString"])( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_4_react_redux__["Provider"], {
    store: store
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"](__WEBPACK_IMPORTED_MODULE_2_react_router_dom__["StaticRouter"], {
    location: req.path,
    context: {}
  }, /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_react__["createElement"]("div", null, Object(__WEBPACK_IMPORTED_MODULE_5_react_router_config__["renderRoutes"])(__WEBPACK_IMPORTED_MODULE_3__client_routes_routes__["a" /* default */])))));
  return "\n  <html>\n  <head></head>\n  <body>\n  <div id=\"root\">".concat(content, "</div>\n  <script> window.INITIAL_STATE = ").concat(__WEBPACK_IMPORTED_MODULE_6_serialize_javascript___default()(store.getState()), " </script>\n  <script src=\"bundle.js\" ></script>\n  </body>\n  </html>\n  ");
};

/* harmony default export */ __webpack_exports__["a"] = (renderer);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_logger__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__client_redux_2_reducers__ = __webpack_require__(21);
// server side redux file





var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  FetchUsersReducer: __WEBPACK_IMPORTED_MODULE_4__client_redux_2_reducers__["a" /* FetchUsersReducer */]
}); // reducers will be coming from client folder

var logger = Object(__WEBPACK_IMPORTED_MODULE_1_redux_logger__["createLogger"])();

var CreateStore = function CreateStore() {
  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(rootReducer, Object(__WEBPACK_IMPORTED_MODULE_2_redux_devtools_extension__["composeWithDevTools"])(Object(__WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"])(__WEBPACK_IMPORTED_MODULE_3_redux_thunk___default.a)) // add (thunkMiddleware , logger ) if wish
  ); // logger is for console

  return store;
}; // that's how we use store on the server side


/* harmony default export */ __webpack_exports__["a"] = (CreateStore);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("redux-devtools-extension");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FetchUsersReducer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionTypes__ = __webpack_require__(5);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var usersInitialState = {
  isPending: false,
  users: [],
  error: ''
}; // async reducer function

var FetchUsersReducer = function FetchUsersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : usersInitialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === __WEBPACK_IMPORTED_MODULE_0__actionTypes__["b" /* FETCH_USERS_PENDING */]) {
    return _objectSpread(_objectSpread({}, state), {}, {
      isPending: true
    });
  } else if (action.type === __WEBPACK_IMPORTED_MODULE_0__actionTypes__["c" /* FETCH_USERS_SUCCESS */]) {
    return _objectSpread(_objectSpread({}, state), {}, {
      users: action.payload,
      isPending: false
    });
  } else if (action.type === __WEBPACK_IMPORTED_MODULE_0__actionTypes__["a" /* FETCH_USERS_FAILED */]) {
    return _objectSpread(_objectSpread({}, state), {}, {
      error: action.payload,
      isPending: false
    });
  } else return state;
}; // it takes the action and spits out the state
// import { UserToken } from "./actionTypes";
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
// import {
//   REQUEST_ROBOTS_PENDING,
//   REQUEST_ROBOTS_SUCCESS,
//   REQUEST_ROBOTS_FAILED,
// } from "./actionTypes";
// const initialStateRobots = {
//   isPending: false,
//   robots: [],
//   error: "",
// };
// // async reducer function
// export const requestRobots = (state = initialStateRobots, action = {}) => {
//   if (action.type === REQUEST_ROBOTS_PENDING) {
//     return { ...state, isPending: true };
//   } else if (action.type === REQUEST_ROBOTS_SUCCESS) {
//     return { ...state, robots: action.payload, isPending: false };
//   } else if (action.type === REQUEST_ROBOTS_FAILED) {
//     return { ...state, error: action.payload, isPending: false };
//   } else return state;
// };

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ })
/******/ ]);