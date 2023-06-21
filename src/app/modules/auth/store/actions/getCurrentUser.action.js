"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserFailureAction = exports.getCurrentUserLiteSuccessAction = exports.getCurrentUserSuccessAction = exports.getCurrentUserAction = void 0;
var store_1 = require("@ngrx/store");
var actionTypes_1 = require("../actionTypes");
exports.getCurrentUserAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.GET_CURRENT_USER);
exports.getCurrentUserSuccessAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.GET_CURRENT_USER_SUCCESS, (0, store_1.props)());
exports.getCurrentUserLiteSuccessAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.GET_CURRENT_USER_SUCCESS, (0, store_1.props)());
exports.getCurrentUserFailureAction = (0, store_1.createAction)(actionTypes_1.ActionTypes.GET_CURRENT_USER_FAILURE);
