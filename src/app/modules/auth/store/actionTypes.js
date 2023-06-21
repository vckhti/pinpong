"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionTypes = void 0;
var ActionTypes;
(function (ActionTypes) {
    ActionTypes["REGISTER"] = "[Auth] Register";
    ActionTypes["REGISTER_SUCCESS"] = "[Auth] Register success";
    ActionTypes["REGISTER_FAILURE"] = "[Auth] Register failure";
    ActionTypes["LOGIN"] = "[Auth] Login";
    ActionTypes["LOGIN_SUCCESS"] = "[Auth] Login success";
    ActionTypes["LOGIN_FAILURE"] = "[Auth] Login failure";
    ActionTypes["GET_CURRENT_USER"] = "[Auth] Get current user";
    ActionTypes["GET_CURRENT_USER_SUCCESS"] = "[Auth] Get current user success";
    ActionTypes["GET_CURRENT_USER_FAILURE"] = "[Auth] Get current user failure";
    ActionTypes["LOGOUT"] = "[Auth] Logout";
})(ActionTypes = exports.ActionTypes || (exports.ActionTypes = {}));
