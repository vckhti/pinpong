"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var pagination_component_1 = require("src/app/shared/modules/pagination/components/pagination/pagination.component");
var utils_service_1 = require("src/app/shared/services/utils.service");
var custom_pagination_component_1 = require("./components/custom-pagination/custom-pagination.component");
var forms_1 = require("@angular/forms");
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule = __decorate([
        (0, core_1.NgModule)({
            imports: [common_1.CommonModule, router_1.RouterModule, forms_1.FormsModule, forms_1.ReactiveFormsModule],
            declarations: [pagination_component_1.PaginationComponent, custom_pagination_component_1.CustomPaginationComponent],
            exports: [pagination_component_1.PaginationComponent, custom_pagination_component_1.CustomPaginationComponent],
            providers: [utils_service_1.UtilsService]
        })
    ], PaginationModule);
    return PaginationModule;
}());
exports.PaginationModule = PaginationModule;
