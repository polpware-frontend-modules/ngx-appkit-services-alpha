(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('rxjs'), require('@polpware/ngx-appkit-contracts-alpha'), require('@ngx-translate/core')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-appkit-services-alpha', ['exports', '@angular/core', '@angular/common/http', 'rxjs', '@polpware/ngx-appkit-contracts-alpha', '@ngx-translate/core'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-appkit-services-alpha'] = {}), global.ng.core, global.ng.common.http, global.rxjs, global.ngxAppkitContractsAlpha, global.core$1));
}(this, (function (exports, core, http, rxjs, ngxAppkitContractsAlpha, core$1) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var AlertService = /** @class */ (function () {
        function AlertService() {
            this.messages = new rxjs.Subject();
            this.dialogs = new rxjs.Subject();
        }
        AlertService.prototype.showDialog = function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
            if (!type) {
                type = ngxAppkitContractsAlpha.DialogType.alert;
            }
            this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
        };
        AlertService.prototype.showMessage = function (data, separatorOrDetail, severity) {
            var e_1, _a;
            if (!severity) {
                severity = ngxAppkitContractsAlpha.MessageSeverity.default;
            }
            if (data instanceof http.HttpResponseBase) {
                data = ngxAppkitContractsAlpha.Utilities.getHttpResponseMessages(data);
                separatorOrDetail = ngxAppkitContractsAlpha.Utilities.captionAndMessageSeparator;
            }
            if (data instanceof Array) {
                try {
                    for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                        var message = data_1_1.value;
                        var msgObject = ngxAppkitContractsAlpha.Utilities.splitInTwo(message, separatorOrDetail);
                        this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            else {
                this.showMessageHelper(data, separatorOrDetail, severity, false);
            }
        };
        AlertService.prototype.showStickyMessage = function (data, separatorOrDetail, severity, error, onRemove) {
            var e_2, _a;
            if (!severity) {
                severity = ngxAppkitContractsAlpha.MessageSeverity.default;
            }
            if (data instanceof http.HttpResponseBase) {
                data = ngxAppkitContractsAlpha.Utilities.getHttpResponseMessages(data);
                separatorOrDetail = ngxAppkitContractsAlpha.Utilities.captionAndMessageSeparator;
            }
            if (data instanceof Array) {
                try {
                    for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                        var message = data_2_1.value;
                        var msgObject = ngxAppkitContractsAlpha.Utilities.splitInTwo(message, separatorOrDetail);
                        this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
            else {
                if (error) {
                    var msg = "Severity: \"" + ngxAppkitContractsAlpha.MessageSeverity[severity] + "\", Summary: \"" + data + "\", Detail: \"" + separatorOrDetail + "\", Error: \"" + ngxAppkitContractsAlpha.Utilities.safeStringify(error) + "\"";
                    switch (severity) {
                        case ngxAppkitContractsAlpha.MessageSeverity.default:
                            this.logInfo(msg);
                            break;
                        case ngxAppkitContractsAlpha.MessageSeverity.info:
                            this.logInfo(msg);
                            break;
                        case ngxAppkitContractsAlpha.MessageSeverity.success:
                            this.logMessage(msg);
                            break;
                        case ngxAppkitContractsAlpha.MessageSeverity.error:
                            this.logError(msg);
                            break;
                        case ngxAppkitContractsAlpha.MessageSeverity.warn:
                            this.logWarning(msg);
                            break;
                        case ngxAppkitContractsAlpha.MessageSeverity.wait:
                            this.logTrace(msg);
                            break;
                    }
                }
                this.showMessageHelper(data, separatorOrDetail, severity, true, onRemove);
            }
        };
        AlertService.prototype.showMessageHelper = function (summary, detail, severity, isSticky, onRemove) {
            var alertCommand = {
                operation: isSticky ? 'add_sticky' : 'add',
                message: { severity: severity, summary: summary, detail: detail },
                onRemove: onRemove
            };
            this.messages.next(alertCommand);
        };
        AlertService.prototype.resetStickyMessage = function () {
            this.messages.next({ operation: 'clear' });
        };
        AlertService.prototype.startLoadingMessage = function (message, caption) {
            var _this = this;
            if (message === void 0) { message = 'Loading...'; }
            if (caption === void 0) { caption = ''; }
            clearTimeout(this.loadingMessageTimeoutId);
            this.loadingMessageTimeoutId = setTimeout(function () {
                _this.showStickyMessage(caption, message, ngxAppkitContractsAlpha.MessageSeverity.wait);
            }, 1000);
        };
        AlertService.prototype.stopLoadingMessage = function () {
            clearTimeout(this.loadingMessageTimeoutId);
            this.resetStickyMessage();
        };
        AlertService.prototype.logDebug = function (msg) {
            console.debug(msg);
        };
        AlertService.prototype.logError = function (msg) {
            console.error(msg);
        };
        AlertService.prototype.logInfo = function (msg) {
            console.info(msg);
        };
        AlertService.prototype.logMessage = function (msg) {
            console.log(msg);
        };
        AlertService.prototype.logTrace = function (msg) {
            console.trace(msg);
        };
        AlertService.prototype.logWarning = function (msg) {
            console.warn(msg);
        };
        AlertService.prototype.getDialogEvent = function () {
            return this.dialogs.asObservable();
        };
        AlertService.prototype.getMessageEvent = function () {
            return this.messages.asObservable();
        };
        /** @nocollapse */ AlertService.ɵfac = function AlertService_Factory(t) { return new (t || AlertService)(); };
        /** @nocollapse */ AlertService.ɵprov = core.ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac });
        return AlertService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AlertService, [{
            type: core.Injectable
        }], null, null); })();

    var ConfigurationService = /** @class */ (function () {
        function ConfigurationService(localStoreManagerProvider, translationServiceProvider, themeManagerProvider) {
            this.baseUrl = ngxAppkitContractsAlpha.environment.baseUrl || ngxAppkitContractsAlpha.Utilities.baseUrl();
            this.tokenUrl = ngxAppkitContractsAlpha.environment.tokenUrl || ngxAppkitContractsAlpha.environment.baseUrl || ngxAppkitContractsAlpha.Utilities.baseUrl();
            this.loginUrl = ngxAppkitContractsAlpha.environment.loginUrl;
            this.fallbackBaseUrl = 'https://quickapp.ebenmonney.com';
            // ***End of defaults***
            this._language = null;
            this._homeUrl = null;
            this._themeId = null;
            this._showDashboardStatistics = null;
            this._showDashboardNotifications = null;
            this._showDashboardTodo = null;
            this._showDashboardBanner = null;
            this.onConfigurationImported = new rxjs.Subject();
            this.configurationImported$ = this.onConfigurationImported.asObservable();
            this.localStorage = localStoreManagerProvider.get();
            this.translationService = translationServiceProvider.get();
            this.themeManager = themeManagerProvider.get();
            this.loadLocalChanges();
        }
        Object.defineProperty(ConfigurationService.prototype, "language", {
            get: function () {
                return this._language || ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultLanguage;
            },
            set: function (value) {
                this._language = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.LANGUAGE);
                this.translationService.changeLanguage(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigurationService.prototype, "themeId", {
            get: function () {
                return this._themeId || ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultThemeId;
            },
            set: function (value) {
                value = +value;
                this._themeId = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.THEME_ID);
                this.themeManager.installTheme(this.themeManager.getThemeByID(value));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigurationService.prototype, "homeUrl", {
            get: function () {
                return this._homeUrl || ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultHomeUrl;
            },
            set: function (value) {
                this._homeUrl = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.HOME_URL);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigurationService.prototype, "showDashboardStatistics", {
            get: function () {
                return this._showDashboardStatistics != null ? this._showDashboardStatistics : ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultShowDashboardStatistics;
            },
            set: function (value) {
                this._showDashboardStatistics = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_STATISTICS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigurationService.prototype, "showDashboardNotifications", {
            get: function () {
                return this._showDashboardNotifications != null ? this._showDashboardNotifications : ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultShowDashboardNotifications;
            },
            set: function (value) {
                this._showDashboardNotifications = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigurationService.prototype, "showDashboardTodo", {
            get: function () {
                return this._showDashboardTodo != null ? this._showDashboardTodo : ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultShowDashboardTodo;
            },
            set: function (value) {
                this._showDashboardTodo = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_TODO);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ConfigurationService.prototype, "showDashboardBanner", {
            get: function () {
                return this._showDashboardBanner != null ? this._showDashboardBanner : ngxAppkitContractsAlpha.ConfigurationServiceConstants.defaultShowDashboardBanner;
            },
            set: function (value) {
                this._showDashboardBanner = value;
                this.saveToLocalStore(value, ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_BANNER);
            },
            enumerable: true,
            configurable: true
        });
        ConfigurationService.prototype.loadLocalChanges = function () {
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.LANGUAGE)) {
                this._language = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.LANGUAGE, false);
                this.translationService.changeLanguage(this._language);
            }
            else {
                this.resetLanguage();
            }
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.THEME_ID)) {
                this._themeId = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.THEME_ID, false);
                this.themeManager.installTheme(this.themeManager.getThemeByID(this._themeId));
            }
            else {
                this.resetTheme();
            }
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.HOME_URL)) {
                this._homeUrl = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.HOME_URL, false);
            }
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_STATISTICS)) {
                this._showDashboardStatistics = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_STATISTICS, false);
            }
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS)) {
                this._showDashboardNotifications = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS, false);
            }
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_TODO)) {
                this._showDashboardTodo = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_TODO, false);
            }
            if (this.localStorage.exists(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_BANNER)) {
                this._showDashboardBanner = this.localStorage.getDataObject(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_BANNER, false);
            }
        };
        ConfigurationService.prototype.saveToLocalStore = function (data, key) {
            var _this = this;
            setTimeout(function () { return _this.localStorage.savePermanentData(data, key); });
        };
        ConfigurationService.prototype.import = function (jsonValue) {
            this.clearLocalChanges();
            if (jsonValue) {
                var importValue = ngxAppkitContractsAlpha.Utilities.JsonTryParse(jsonValue);
                if (importValue.language != null) {
                    this.language = importValue.language;
                }
                if (importValue.themeId != null) {
                    this.themeId = +importValue.themeId;
                }
                if (importValue.homeUrl != null) {
                    this.homeUrl = importValue.homeUrl;
                }
                if (importValue.showDashboardStatistics != null) {
                    this.showDashboardStatistics = importValue.showDashboardStatistics;
                }
                if (importValue.showDashboardNotifications != null) {
                    this.showDashboardNotifications = importValue.showDashboardNotifications;
                }
                if (importValue.showDashboardTodo != null) {
                    this.showDashboardTodo = importValue.showDashboardTodo;
                }
                if (importValue.showDashboardBanner != null) {
                    this.showDashboardBanner = importValue.showDashboardBanner;
                }
            }
            this.onConfigurationImported.next();
        };
        ConfigurationService.prototype.export = function (changesOnly) {
            if (changesOnly === void 0) { changesOnly = true; }
            var exportValue = {
                language: changesOnly ? this._language : this.language,
                themeId: changesOnly ? this._themeId : this.themeId,
                homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
                showDashboardStatistics: changesOnly ? this._showDashboardStatistics : this.showDashboardStatistics,
                showDashboardNotifications: changesOnly ? this._showDashboardNotifications : this.showDashboardNotifications,
                showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo,
                showDashboardBanner: changesOnly ? this._showDashboardBanner : this.showDashboardBanner
            };
            return JSON.stringify(exportValue);
        };
        ConfigurationService.prototype.clearLocalChanges = function () {
            this._language = null;
            this._themeId = null;
            this._homeUrl = null;
            this._showDashboardStatistics = null;
            this._showDashboardNotifications = null;
            this._showDashboardTodo = null;
            this._showDashboardBanner = null;
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.LANGUAGE);
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.THEME_ID);
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.HOME_URL);
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_STATISTICS);
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_TODO);
            this.localStorage.deleteData(ngxAppkitContractsAlpha.DBkeys.SHOW_DASHBOARD_BANNER);
            this.resetLanguage();
            this.resetTheme();
        };
        ConfigurationService.prototype.resetLanguage = function () {
            var language = this.translationService.useBrowserLanguage();
            if (language) {
                this._language = language;
            }
            else {
                this._language = this.translationService.useDefaultLangage();
            }
        };
        ConfigurationService.prototype.resetTheme = function () {
            this.themeManager.installTheme();
            this._themeId = null;
        };
        /** @nocollapse */ ConfigurationService.ɵfac = function ConfigurationService_Factory(t) { return new (t || ConfigurationService)(core.ɵɵinject(ngxAppkitContractsAlpha.LocalStoreManagerServiceAbstractProvider), core.ɵɵinject(ngxAppkitContractsAlpha.TranslationServiceAbstractProvider), core.ɵɵinject(ngxAppkitContractsAlpha.ThemeManagerAbstractProvider)); };
        /** @nocollapse */ ConfigurationService.ɵprov = core.ɵɵdefineInjectable({ token: ConfigurationService, factory: ConfigurationService.ɵfac });
        return ConfigurationService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(ConfigurationService, [{
            type: core.Injectable
        }], function () { return [{ type: ngxAppkitContractsAlpha.LocalStoreManagerServiceAbstractProvider }, { type: ngxAppkitContractsAlpha.TranslationServiceAbstractProvider }, { type: ngxAppkitContractsAlpha.ThemeManagerAbstractProvider }]; }, null); })();

    var AppTranslationService = /** @class */ (function () {
        function AppTranslationService(translate) {
            this.translate = translate;
            this.onLanguageChanged = new rxjs.Subject();
            this.languageChanged$ = this.onLanguageChanged.asObservable();
            this.addLanguages(['en', 'fr', 'de', 'pt', 'ar', 'ko']);
            this.setDefaultLanguage('en');
        }
        AppTranslationService.prototype.addLanguages = function (lang) {
            this.translate.addLangs(lang);
        };
        AppTranslationService.prototype.setDefaultLanguage = function (lang) {
            this.translate.setDefaultLang(lang);
        };
        AppTranslationService.prototype.getDefaultLanguage = function () {
            return this.translate.defaultLang;
        };
        AppTranslationService.prototype.getBrowserLanguage = function () {
            return this.translate.getBrowserLang();
        };
        AppTranslationService.prototype.getCurrentLanguage = function () {
            return this.translate.currentLang;
        };
        AppTranslationService.prototype.getLoadedLanguages = function () {
            return this.translate.langs;
        };
        AppTranslationService.prototype.useBrowserLanguage = function () {
            var browserLang = this.getBrowserLanguage();
            if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
                this.changeLanguage(browserLang);
                return browserLang;
            }
        };
        AppTranslationService.prototype.useDefaultLangage = function () {
            return this.changeLanguage(null);
        };
        AppTranslationService.prototype.changeLanguage = function (language) {
            var _this = this;
            if (!language) {
                language = this.getDefaultLanguage();
            }
            if (language != this.translate.currentLang) {
                setTimeout(function () {
                    _this.translate.use(language);
                    _this.onLanguageChanged.next(language);
                });
            }
            return language;
        };
        AppTranslationService.prototype.getTranslation = function (key, interpolateParams) {
            return this.translate.instant(key, interpolateParams);
        };
        AppTranslationService.prototype.getTranslationAsync = function (key, interpolateParams) {
            return this.translate.get(key, interpolateParams);
        };
        /** @nocollapse */ AppTranslationService.ɵfac = function AppTranslationService_Factory(t) { return new (t || AppTranslationService)(core.ɵɵinject(core$1.TranslateService)); };
        /** @nocollapse */ AppTranslationService.ɵprov = core.ɵɵdefineInjectable({ token: AppTranslationService, factory: AppTranslationService.ɵfac });
        return AppTranslationService;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(AppTranslationService, [{
            type: core.Injectable
        }], function () { return [{ type: core$1.TranslateService }]; }, null); })();

    var LocalStoreManager = /** @class */ (function () {
        function LocalStoreManager() {
            var _this = this;
            this.syncKeys = [];
            this.initEvent = new rxjs.Subject();
            this.reservedKeys = [
                'sync_keys',
                'addToSyncKeys',
                'removeFromSyncKeys',
                'getSessionStorage',
                'setSessionStorage',
                'addToSessionStorage',
                'removeFromSessionStorage',
                'clearAllSessionsStorage'
            ];
            this.sessionStorageTransferHandler = function (event) {
                if (!event.newValue) {
                    return;
                }
                if (event.key == 'getSessionStorage') {
                    if (sessionStorage.length) {
                        _this.localStorageSetItem('setSessionStorage', sessionStorage);
                        localStorage.removeItem('setSessionStorage');
                    }
                }
                else if (event.key == 'setSessionStorage') {
                    if (!_this.syncKeys.length) {
                        _this.loadSyncKeys();
                    }
                    var data = JSON.parse(event.newValue);
                    // console.info("Set => Key: Transfer setSessionStorage" + ",  data: " + JSON.stringify(data));
                    for (var key in data) {
                        if (_this.syncKeysContains(key)) {
                            _this.sessionStorageSetItem(key, JSON.parse(data[key]));
                        }
                    }
                    _this.onInit();
                }
                else if (event.key == 'addToSessionStorage') {
                    var data = JSON.parse(event.newValue);
                    // console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));
                    _this.addToSessionStorageHelper(data.data, data.key);
                }
                else if (event.key == 'removeFromSessionStorage') {
                    _this.removeFromSessionStorageHelper(event.newValue);
                }
                else if (event.key == 'clearAllSessionsStorage' && sessionStorage.length) {
                    _this.clearInstanceSessionStorage();
                }
                else if (event.key == 'addToSyncKeys') {
                    _this.addToSyncKeysHelper(event.newValue);
                }
                else if (event.key == 'removeFromSyncKeys') {
                    _this.removeFromSyncKeysHelper(event.newValue);
                }
            };
        }
        LocalStoreManager.prototype.initialiseStorageSyncListener = function () {
            if (LocalStoreManager.syncListenerInitialised == true) {
                return;
            }
            LocalStoreManager.syncListenerInitialised = true;
            window.addEventListener('storage', this.sessionStorageTransferHandler, false);
            this.syncSessionStorage();
        };
        LocalStoreManager.prototype.deinitialiseStorageSyncListener = function () {
            window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
            LocalStoreManager.syncListenerInitialised = false;
        };
        LocalStoreManager.prototype.clearAllStorage = function () {
            this.clearAllSessionsStorage();
            this.clearLocalStorage();
        };
        LocalStoreManager.prototype.clearAllSessionsStorage = function () {
            this.clearInstanceSessionStorage();
            localStorage.removeItem(LocalStoreManager.DBKEY_SYNC_KEYS);
            localStorage.setItem('clearAllSessionsStorage', '_dummy');
            localStorage.removeItem('clearAllSessionsStorage');
        };
        LocalStoreManager.prototype.clearInstanceSessionStorage = function () {
            sessionStorage.clear();
            this.syncKeys = [];
        };
        LocalStoreManager.prototype.clearLocalStorage = function () {
            localStorage.clear();
        };
        LocalStoreManager.prototype.saveSessionData = function (data, key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            this.removeFromSyncKeys(key);
            localStorage.removeItem(key);
            this.sessionStorageSetItem(key, data);
        };
        LocalStoreManager.prototype.saveSyncedSessionData = function (data, key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            localStorage.removeItem(key);
            this.addToSessionStorage(data, key);
        };
        LocalStoreManager.prototype.savePermanentData = function (data, key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            this.removeFromSessionStorage(key);
            this.localStorageSetItem(key, data);
        };
        LocalStoreManager.prototype.moveDataToSessionStorage = function (key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            var data = this.getData(key);
            if (data == null) {
                return;
            }
            this.saveSessionData(data, key);
        };
        LocalStoreManager.prototype.moveDataToSyncedSessionStorage = function (key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            var data = this.getData(key);
            if (data == null) {
                return;
            }
            this.saveSyncedSessionData(data, key);
        };
        LocalStoreManager.prototype.moveDataToPermanentStorage = function (key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            var data = this.getData(key);
            if (data == null) {
                return;
            }
            this.savePermanentData(data, key);
        };
        LocalStoreManager.prototype.exists = function (key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            var data = sessionStorage.getItem(key);
            if (data == null) {
                data = localStorage.getItem(key);
            }
            return data != null;
        };
        LocalStoreManager.prototype.getData = function (key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            var data = this.sessionStorageGetItem(key);
            if (data == null) {
                data = this.localStorageGetItem(key);
            }
            return data;
        };
        LocalStoreManager.prototype.getDataObject = function (key, isDateType) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            if (isDateType === void 0) { isDateType = false; }
            var data = this.getData(key);
            if (data != null) {
                if (isDateType) {
                    data = new Date(data);
                }
                return data;
            }
            else {
                return null;
            }
        };
        LocalStoreManager.prototype.deleteData = function (key) {
            if (key === void 0) { key = ngxAppkitContractsAlpha.StorageManagerConstants.DBKEY_USER_DATA; }
            this.testForInvalidKeys(key);
            this.removeFromSessionStorage(key);
            localStorage.removeItem(key);
        };
        LocalStoreManager.prototype.getInitEvent = function () {
            return this.initEvent.asObservable();
        };
        LocalStoreManager.prototype.syncSessionStorage = function () {
            localStorage.setItem('getSessionStorage', '_dummy');
            localStorage.removeItem('getSessionStorage');
        };
        LocalStoreManager.prototype.addToSessionStorage = function (data, key) {
            this.addToSessionStorageHelper(data, key);
            this.addToSyncKeysBackup(key);
            this.localStorageSetItem('addToSessionStorage', { key: key, data: data });
            localStorage.removeItem('addToSessionStorage');
        };
        LocalStoreManager.prototype.addToSessionStorageHelper = function (data, key) {
            this.addToSyncKeysHelper(key);
            this.sessionStorageSetItem(key, data);
        };
        LocalStoreManager.prototype.removeFromSessionStorage = function (keyToRemove) {
            this.removeFromSessionStorageHelper(keyToRemove);
            this.removeFromSyncKeysBackup(keyToRemove);
            localStorage.setItem('removeFromSessionStorage', keyToRemove);
            localStorage.removeItem('removeFromSessionStorage');
        };
        LocalStoreManager.prototype.removeFromSessionStorageHelper = function (keyToRemove) {
            sessionStorage.removeItem(keyToRemove);
            this.removeFromSyncKeysHelper(keyToRemove);
        };
        LocalStoreManager.prototype.testForInvalidKeys = function (key) {
            if (!key) {
                throw new Error('key cannot be empty');
            }
            if (this.reservedKeys.some(function (x) { return x == key; })) {
                throw new Error("The storage key \"" + key + "\" is reserved and cannot be used. Please use a different key");
            }
        };
        LocalStoreManager.prototype.syncKeysContains = function (key) {
            return this.syncKeys.some(function (x) { return x == key; });
        };
        LocalStoreManager.prototype.loadSyncKeys = function () {
            if (this.syncKeys.length) {
                return;
            }
            this.syncKeys = this.getSyncKeysFromStorage();
        };
        LocalStoreManager.prototype.getSyncKeysFromStorage = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = []; }
            var data = this.localStorageGetItem(LocalStoreManager.DBKEY_SYNC_KEYS);
            if (data == null) {
                return defaultValue;
            }
            else {
                return data;
            }
        };
        LocalStoreManager.prototype.addToSyncKeys = function (key) {
            this.addToSyncKeysHelper(key);
            this.addToSyncKeysBackup(key);
            localStorage.setItem('addToSyncKeys', key);
            localStorage.removeItem('addToSyncKeys');
        };
        LocalStoreManager.prototype.addToSyncKeysBackup = function (key) {
            var storedSyncKeys = this.getSyncKeysFromStorage();
            if (!storedSyncKeys.some(function (x) { return x == key; })) {
                storedSyncKeys.push(key);
                this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
            }
        };
        LocalStoreManager.prototype.removeFromSyncKeysBackup = function (key) {
            var storedSyncKeys = this.getSyncKeysFromStorage();
            var index = storedSyncKeys.indexOf(key);
            if (index > -1) {
                storedSyncKeys.splice(index, 1);
                this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
            }
        };
        LocalStoreManager.prototype.addToSyncKeysHelper = function (key) {
            if (!this.syncKeysContains(key)) {
                this.syncKeys.push(key);
            }
        };
        LocalStoreManager.prototype.removeFromSyncKeys = function (key) {
            this.removeFromSyncKeysHelper(key);
            this.removeFromSyncKeysBackup(key);
            localStorage.setItem('removeFromSyncKeys', key);
            localStorage.removeItem('removeFromSyncKeys');
        };
        LocalStoreManager.prototype.removeFromSyncKeysHelper = function (key) {
            var index = this.syncKeys.indexOf(key);
            if (index > -1) {
                this.syncKeys.splice(index, 1);
            }
        };
        LocalStoreManager.prototype.localStorageSetItem = function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        };
        LocalStoreManager.prototype.sessionStorageSetItem = function (key, data) {
            sessionStorage.setItem(key, JSON.stringify(data));
        };
        LocalStoreManager.prototype.localStorageGetItem = function (key) {
            return ngxAppkitContractsAlpha.Utilities.JsonTryParse(localStorage.getItem(key));
        };
        LocalStoreManager.prototype.sessionStorageGetItem = function (key) {
            return ngxAppkitContractsAlpha.Utilities.JsonTryParse(sessionStorage.getItem(key));
        };
        LocalStoreManager.prototype.onInit = function () {
            var _this = this;
            setTimeout(function () {
                _this.initEvent.next();
                _this.initEvent.complete();
            });
        };
        LocalStoreManager.syncListenerInitialised = false;
        LocalStoreManager.DBKEY_SYNC_KEYS = 'sync_keys';
        /** @nocollapse */ LocalStoreManager.ɵfac = function LocalStoreManager_Factory(t) { return new (t || LocalStoreManager)(); };
        /** @nocollapse */ LocalStoreManager.ɵprov = core.ɵɵdefineInjectable({ token: LocalStoreManager, factory: LocalStoreManager.ɵfac });
        return LocalStoreManager;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(LocalStoreManager, [{
            type: core.Injectable
        }], null, null); })();

    // =============================
    var ThemeManager = /** @class */ (function () {
        function ThemeManager() {
            this.themes = [
                {
                    id: 1,
                    name: 'Default',
                    href: 'bootstrap.css',
                    isDefault: true,
                    background: '#007bff',
                    color: '#fff'
                },
                {
                    id: 2,
                    name: 'Cosmo',
                    href: 'cosmo.css',
                    background: '#2780E3',
                    color: '#373a3c'
                },
                {
                    id: 3,
                    name: 'Lumen',
                    href: 'lumen.css',
                    background: '#158CBA',
                    color: '#f0f0f0'
                },
                {
                    id: 4,
                    name: 'Cerulean',
                    href: 'cerulean.css',
                    background: '#2FA4E7',
                    color: '#e9ecef'
                },
                {
                    id: 5,
                    name: 'Minty',
                    href: 'minty.css',
                    background: '#78C2AD',
                    color: '#F3969A'
                },
                {
                    id: 6,
                    name: 'Sketchy',
                    href: 'sketchy.css',
                    background: '#333',
                    color: 'white'
                },
                {
                    id: 7,
                    name: 'Slate',
                    href: 'slate.css',
                    background: '#3A3F44',
                    color: '#7A8288',
                    isDark: true
                },
                {
                    id: 8,
                    name: 'Flatly',
                    href: 'flatly.css',
                    background: '#2C3E50',
                    color: '#18BC9C'
                },
                {
                    id: 9,
                    name: 'Pulse',
                    href: 'pulse.css',
                    background: '#593196',
                    color: '#A991D4'
                },
                {
                    id: 10,
                    name: 'Spacelab',
                    href: 'spacelab.css',
                    background: '#446E9B',
                    color: '#999'
                },
                {
                    id: 11,
                    name: 'United',
                    href: 'united.css',
                    background: '#E95420',
                    color: '#fff'
                },
                {
                    id: 12,
                    name: 'Journal',
                    href: 'journal.css',
                    background: '#EB6864',
                    color: '#aaa'
                },
                {
                    id: 13,
                    name: 'Superhero',
                    href: 'superhero.css',
                    background: '#DF691A',
                    color: '#2B3E50',
                    isDark: true
                },
                {
                    id: 14,
                    name: 'Solar',
                    href: 'solar.css',
                    background: '#B58900',
                    color: '#002B36',
                    isDark: true
                }
            ];
        }
        ThemeManager.prototype.installTheme = function (theme) {
            if (theme == null || theme.isDefault) {
                this.removeStyle('theme');
            }
            else {
                this.setStyle('theme', "assets/themes/" + theme.href);
            }
        };
        ThemeManager.prototype.getDefaultTheme = function () {
            return this.themes.find(function (theme) { return theme.isDefault; });
        };
        ThemeManager.prototype.getThemeByID = function (id) {
            return this.themes.find(function (theme) { return theme.id === id; });
        };
        ThemeManager.prototype.setStyle = function (key, href) {
            this.getLinkElementForKey(key).setAttribute('href', href);
        };
        ThemeManager.prototype.removeStyle = function (key) {
            var existingLinkElement = this.getExistingLinkElementByKey(key);
            if (existingLinkElement) {
                document.head.removeChild(existingLinkElement);
            }
        };
        ThemeManager.prototype.getLinkElementForKey = function (key) {
            return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
        };
        ThemeManager.prototype.getExistingLinkElementByKey = function (key) {
            return document.head.querySelector("link[rel=\"stylesheet\"]." + this.getClassNameForKey(key));
        };
        ThemeManager.prototype.createLinkElementWithKey = function (key) {
            var linkEl = document.createElement('link');
            linkEl.setAttribute('rel', 'stylesheet');
            linkEl.classList.add(this.getClassNameForKey(key));
            document.head.appendChild(linkEl);
            return linkEl;
        };
        ThemeManager.prototype.getClassNameForKey = function (key) {
            return "style-manager-" + key;
        };
        /** @nocollapse */ ThemeManager.ɵfac = function ThemeManager_Factory(t) { return new (t || ThemeManager)(); };
        /** @nocollapse */ ThemeManager.ɵprov = core.ɵɵdefineInjectable({ token: ThemeManager, factory: ThemeManager.ɵfac });
        return ThemeManager;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(ThemeManager, [{
            type: core.Injectable
        }], null, null); })();

    var NgxAppkitServicesAlphaModule = /** @class */ (function () {
        function NgxAppkitServicesAlphaModule() {
        }
        /** @nocollapse */ NgxAppkitServicesAlphaModule.ɵmod = core.ɵɵdefineNgModule({ type: NgxAppkitServicesAlphaModule });
        /** @nocollapse */ NgxAppkitServicesAlphaModule.ɵinj = core.ɵɵdefineInjector({ factory: function NgxAppkitServicesAlphaModule_Factory(t) { return new (t || NgxAppkitServicesAlphaModule)(); }, providers: [
                AlertService,
                ConfigurationService,
                AppTranslationService,
                LocalStoreManager,
                ThemeManager
            ], imports: [[]] });
        return NgxAppkitServicesAlphaModule;
    }());
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgxAppkitServicesAlphaModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [],
                    imports: [],
                    exports: [],
                    providers: [
                        AlertService,
                        ConfigurationService,
                        AppTranslationService,
                        LocalStoreManager,
                        ThemeManager
                    ]
                }]
        }], null, null); })();

    exports.AlertService = AlertService;
    exports.AppTranslationService = AppTranslationService;
    exports.ConfigurationService = ConfigurationService;
    exports.LocalStoreManager = LocalStoreManager;
    exports.NgxAppkitServicesAlphaModule = NgxAppkitServicesAlphaModule;
    exports.ThemeManager = ThemeManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-appkit-services-alpha.umd.js.map
