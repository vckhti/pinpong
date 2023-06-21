"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutAction = exports.loginFailureAction = exports.loginSuccessAction = exports.loginAction = void 0;
var store_1 = require("@ngrx/store");
var actionTypes_1 = require("../actionTypes");
exports.loginAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.LOGIN, (0, store_1.props)());
exports.loginSuccessAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.LOGIN_SUCCESS, (0, store_1.props)());
exports.loginFailureAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.LOGIN_FAILURE, (0, store_1.props)());
exports.logOutAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.LOGOUT);
