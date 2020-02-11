import { __values } from 'tslib';
import { Injectable, NgModule } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DialogType, MessageSeverity, Utilities, environment, ConfigurationServiceConstants, DBkeys, LocalStoreManagerServiceAbstractProvider, TranslationServiceAbstractProvider, ThemeManagerAbstractProvider, StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
import { TranslateService } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/alert.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertService = /** @class */ (function () {
    function AlertService() {
        this.messages = new Subject();
        this.dialogs = new Subject();
    }
    /**
     * @param {?} message
     * @param {?=} type
     * @param {?=} okCallback
     * @param {?=} cancelCallback
     * @param {?=} okLabel
     * @param {?=} cancelLabel
     * @param {?=} defaultValue
     * @return {?}
     */
    AlertService.prototype.showDialog = /**
     * @param {?} message
     * @param {?=} type
     * @param {?=} okCallback
     * @param {?=} cancelCallback
     * @param {?=} okLabel
     * @param {?=} cancelLabel
     * @param {?=} defaultValue
     * @return {?}
     */
    function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
    };
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    AlertService.prototype.showMessage = /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    function (data, separatorOrDetail, severity) {
        var e_1, _a;
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            try {
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var message = data_1_1.value;
                    /** @type {?} */
                    var msgObject = Utilities.splitInTwo(message, separatorOrDetail);
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
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    AlertService.prototype.showStickyMessage = /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    function (data, separatorOrDetail, severity, error, onRemove) {
        var e_2, _a;
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            try {
                for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                    var message = data_2_1.value;
                    /** @type {?} */
                    var msgObject = Utilities.splitInTwo(message, separatorOrDetail);
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
                /** @type {?} */
                var msg = "Severity: \"" + MessageSeverity[severity] + "\", Summary: \"" + data + "\", Detail: \"" + separatorOrDetail + "\", Error: \"" + Utilities.safeStringify(error) + "\"";
                switch (severity) {
                    case MessageSeverity.default:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.info:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.success:
                        this.logMessage(msg);
                        break;
                    case MessageSeverity.error:
                        this.logError(msg);
                        break;
                    case MessageSeverity.warn:
                        this.logWarning(msg);
                        break;
                    case MessageSeverity.wait:
                        this.logTrace(msg);
                        break;
                }
            }
            this.showMessageHelper(data, separatorOrDetail, severity, true, onRemove);
        }
    };
    /**
     * @private
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?} isSticky
     * @param {?=} onRemove
     * @return {?}
     */
    AlertService.prototype.showMessageHelper = /**
     * @private
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?} isSticky
     * @param {?=} onRemove
     * @return {?}
     */
    function (summary, detail, severity, isSticky, onRemove) {
        /** @type {?} */
        var alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity: severity, summary: summary, detail: detail },
            onRemove: onRemove
        };
        this.messages.next(alertCommand);
    };
    /**
     * @return {?}
     */
    AlertService.prototype.resetStickyMessage = /**
     * @return {?}
     */
    function () {
        this.messages.next({ operation: 'clear' });
    };
    /**
     * @param {?=} message
     * @param {?=} caption
     * @return {?}
     */
    AlertService.prototype.startLoadingMessage = /**
     * @param {?=} message
     * @param {?=} caption
     * @return {?}
     */
    function (message, caption) {
        var _this = this;
        if (message === void 0) { message = 'Loading...'; }
        if (caption === void 0) { caption = ''; }
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.showStickyMessage(caption, message, MessageSeverity.wait);
        }), 1000);
    };
    /**
     * @return {?}
     */
    AlertService.prototype.stopLoadingMessage = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logDebug = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.debug(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logError = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.error(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logInfo = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.info(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logMessage = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.log(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logTrace = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.trace(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logWarning = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.warn(msg);
    };
    /**
     * @return {?}
     */
    AlertService.prototype.getDialogEvent = /**
     * @return {?}
     */
    function () {
        return this.dialogs.asObservable();
    };
    /**
     * @return {?}
     */
    AlertService.prototype.getMessageEvent = /**
     * @return {?}
     */
    function () {
        return this.messages.asObservable();
    };
    AlertService.decorators = [
        { type: Injectable }
    ];
    return AlertService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.messages;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.dialogs;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.loadingMessageTimeoutId;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/configuration.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function UserConfiguration() { }
if (false) {
    /** @type {?} */
    UserConfiguration.prototype.language;
    /** @type {?} */
    UserConfiguration.prototype.homeUrl;
    /** @type {?} */
    UserConfiguration.prototype.themeId;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardStatistics;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardNotifications;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardTodo;
    /** @type {?} */
    UserConfiguration.prototype.showDashboardBanner;
}
var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(localStoreManagerProvider, translationServiceProvider, themeManagerProvider) {
        this.baseUrl = environment.baseUrl || Utilities.baseUrl();
        this.tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
        this.loginUrl = environment.loginUrl;
        this.fallbackBaseUrl = 'https://quickapp.ebenmonney.com';
        // ***End of defaults***
        this._language = null;
        this._homeUrl = null;
        this._themeId = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.onConfigurationImported = new Subject();
        this.configurationImported$ = this.onConfigurationImported.asObservable();
        this.localStorage = localStoreManagerProvider.get();
        this.translationService = translationServiceProvider.get();
        this.themeManager = themeManagerProvider.get();
        this.loadLocalChanges();
    }
    Object.defineProperty(ConfigurationService.prototype, "language", {
        get: /**
         * @return {?}
         */
        function () {
            return this._language || ConfigurationServiceConstants.defaultLanguage;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._language = value;
            this.saveToLocalStore(value, DBkeys.LANGUAGE);
            this.translationService.changeLanguage(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "themeId", {
        get: /**
         * @return {?}
         */
        function () {
            return this._themeId || ConfigurationServiceConstants.defaultThemeId;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = +value;
            this._themeId = value;
            this.saveToLocalStore(value, DBkeys.THEME_ID);
            this.themeManager.installTheme(this.themeManager.getThemeByID(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "homeUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this._homeUrl || ConfigurationServiceConstants.defaultHomeUrl;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._homeUrl = value;
            this.saveToLocalStore(value, DBkeys.HOME_URL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardStatistics", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showDashboardStatistics != null ? this._showDashboardStatistics : ConfigurationServiceConstants.defaultShowDashboardStatistics;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showDashboardStatistics = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_STATISTICS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardNotifications", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showDashboardNotifications != null ? this._showDashboardNotifications : ConfigurationServiceConstants.defaultShowDashboardNotifications;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showDashboardNotifications = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardTodo", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationServiceConstants.defaultShowDashboardTodo;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showDashboardTodo = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardBanner", {
        get: /**
         * @return {?}
         */
        function () {
            return this._showDashboardBanner != null ? this._showDashboardBanner : ConfigurationServiceConstants.defaultShowDashboardBanner;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showDashboardBanner = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_BANNER);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    ConfigurationService.prototype.loadLocalChanges = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.localStorage.exists(DBkeys.LANGUAGE)) {
            this._language = this.localStorage.getDataObject(DBkeys.LANGUAGE, false);
            this.translationService.changeLanguage(this._language);
        }
        else {
            this.resetLanguage();
        }
        if (this.localStorage.exists(DBkeys.THEME_ID)) {
            this._themeId = this.localStorage.getDataObject(DBkeys.THEME_ID, false);
            this.themeManager.installTheme(this.themeManager.getThemeByID(this._themeId));
        }
        else {
            this.resetTheme();
        }
        if (this.localStorage.exists(DBkeys.HOME_URL)) {
            this._homeUrl = this.localStorage.getDataObject(DBkeys.HOME_URL, false);
        }
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_STATISTICS)) {
            this._showDashboardStatistics = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_STATISTICS, false);
        }
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS)) {
            this._showDashboardNotifications = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS, false);
        }
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_TODO)) {
            this._showDashboardTodo = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_TODO, false);
        }
        if (this.localStorage.exists(DBkeys.SHOW_DASHBOARD_BANNER)) {
            this._showDashboardBanner = this.localStorage.getDataObject(DBkeys.SHOW_DASHBOARD_BANNER, false);
        }
    };
    /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    ConfigurationService.prototype.saveToLocalStore = /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    function (data, key) {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.localStorage.savePermanentData(data, key); }));
    };
    /**
     * @param {?} jsonValue
     * @return {?}
     */
    ConfigurationService.prototype.import = /**
     * @param {?} jsonValue
     * @return {?}
     */
    function (jsonValue) {
        this.clearLocalChanges();
        if (jsonValue) {
            /** @type {?} */
            var importValue = Utilities.JsonTryParse(jsonValue);
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
    /**
     * @param {?=} changesOnly
     * @return {?}
     */
    ConfigurationService.prototype.export = /**
     * @param {?=} changesOnly
     * @return {?}
     */
    function (changesOnly) {
        if (changesOnly === void 0) { changesOnly = true; }
        /** @type {?} */
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
    /**
     * @return {?}
     */
    ConfigurationService.prototype.clearLocalChanges = /**
     * @return {?}
     */
    function () {
        this._language = null;
        this._themeId = null;
        this._homeUrl = null;
        this._showDashboardStatistics = null;
        this._showDashboardNotifications = null;
        this._showDashboardTodo = null;
        this._showDashboardBanner = null;
        this.localStorage.deleteData(DBkeys.LANGUAGE);
        this.localStorage.deleteData(DBkeys.THEME_ID);
        this.localStorage.deleteData(DBkeys.HOME_URL);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_STATISTICS);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_TODO);
        this.localStorage.deleteData(DBkeys.SHOW_DASHBOARD_BANNER);
        this.resetLanguage();
        this.resetTheme();
    };
    /**
     * @private
     * @return {?}
     */
    ConfigurationService.prototype.resetLanguage = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var language = this.translationService.useBrowserLanguage();
        if (language) {
            this._language = language;
        }
        else {
            this._language = this.translationService.useDefaultLangage();
        }
    };
    /**
     * @private
     * @return {?}
     */
    ConfigurationService.prototype.resetTheme = /**
     * @private
     * @return {?}
     */
    function () {
        this.themeManager.installTheme();
        this._themeId = null;
    };
    ConfigurationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigurationService.ctorParameters = function () { return [
        { type: LocalStoreManagerServiceAbstractProvider },
        { type: TranslationServiceAbstractProvider },
        { type: ThemeManagerAbstractProvider }
    ]; };
    return ConfigurationService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype.localStorage;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype.translationService;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype.themeManager;
    /** @type {?} */
    ConfigurationService.prototype.baseUrl;
    /** @type {?} */
    ConfigurationService.prototype.tokenUrl;
    /** @type {?} */
    ConfigurationService.prototype.loginUrl;
    /** @type {?} */
    ConfigurationService.prototype.fallbackBaseUrl;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._language;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._homeUrl;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._themeId;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._showDashboardStatistics;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._showDashboardNotifications;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._showDashboardTodo;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype._showDashboardBanner;
    /**
     * @type {?}
     * @private
     */
    ConfigurationService.prototype.onConfigurationImported;
    /** @type {?} */
    ConfigurationService.prototype.configurationImported$;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/app-translation.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AppTranslationService = /** @class */ (function () {
    function AppTranslationService(translate) {
        this.translate = translate;
        this.onLanguageChanged = new Subject();
        this.languageChanged$ = this.onLanguageChanged.asObservable();
        this.addLanguages(['en', 'fr', 'de', 'pt', 'ar', 'ko']);
        this.setDefaultLanguage('en');
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    AppTranslationService.prototype.addLanguages = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.translate.addLangs(lang);
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    AppTranslationService.prototype.setDefaultLanguage = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.translate.setDefaultLang(lang);
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getDefaultLanguage = /**
     * @return {?}
     */
    function () {
        return this.translate.defaultLang;
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getBrowserLanguage = /**
     * @return {?}
     */
    function () {
        return this.translate.getBrowserLang();
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getCurrentLanguage = /**
     * @return {?}
     */
    function () {
        return this.translate.currentLang;
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getLoadedLanguages = /**
     * @return {?}
     */
    function () {
        return this.translate.langs;
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.useBrowserLanguage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.useDefaultLangage = /**
     * @return {?}
     */
    function () {
        return this.changeLanguage(null);
    };
    /**
     * @param {?} language
     * @return {?}
     */
    AppTranslationService.prototype.changeLanguage = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        var _this = this;
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.translate.use(language);
                _this.onLanguageChanged.next(language);
            }));
        }
        return language;
    };
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    AppTranslationService.prototype.getTranslation = /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    function (key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    };
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    AppTranslationService.prototype.getTranslationAsync = /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    function (key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    };
    AppTranslationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AppTranslationService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return AppTranslationService;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    AppTranslationService.prototype.onLanguageChanged;
    /** @type {?} */
    AppTranslationService.prototype.languageChanged$;
    /**
     * @type {?}
     * @private
     */
    AppTranslationService.prototype.translate;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/local-store-manager.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocalStoreManager = /** @class */ (function () {
    function LocalStoreManager() {
        var _this = this;
        this.syncKeys = [];
        this.initEvent = new Subject();
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
        this.sessionStorageTransferHandler = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
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
                /** @type {?} */
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
                /** @type {?} */
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
        });
    }
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.initialiseStorageSyncListener = /**
     * @return {?}
     */
    function () {
        if (LocalStoreManager.syncListenerInitialised == true) {
            return;
        }
        LocalStoreManager.syncListenerInitialised = true;
        window.addEventListener('storage', this.sessionStorageTransferHandler, false);
        this.syncSessionStorage();
    };
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.deinitialiseStorageSyncListener = /**
     * @return {?}
     */
    function () {
        window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
        LocalStoreManager.syncListenerInitialised = false;
    };
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.clearAllStorage = /**
     * @return {?}
     */
    function () {
        this.clearAllSessionsStorage();
        this.clearLocalStorage();
    };
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.clearAllSessionsStorage = /**
     * @return {?}
     */
    function () {
        this.clearInstanceSessionStorage();
        localStorage.removeItem(LocalStoreManager.DBKEY_SYNC_KEYS);
        localStorage.setItem('clearAllSessionsStorage', '_dummy');
        localStorage.removeItem('clearAllSessionsStorage');
    };
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.clearInstanceSessionStorage = /**
     * @return {?}
     */
    function () {
        sessionStorage.clear();
        this.syncKeys = [];
    };
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.clearLocalStorage = /**
     * @return {?}
     */
    function () {
        localStorage.clear();
    };
    /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.saveSessionData = /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    function (data, key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        this.sessionStorageSetItem(key, data);
    };
    /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.saveSyncedSessionData = /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    function (data, key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    };
    /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.savePermanentData = /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    function (data, key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        this.localStorageSetItem(key, data);
    };
    /**
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.moveDataToSessionStorage = /**
     * @param {?=} key
     * @return {?}
     */
    function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        /** @type {?} */
        var data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSessionData(data, key);
    };
    /**
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.moveDataToSyncedSessionStorage = /**
     * @param {?=} key
     * @return {?}
     */
    function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        /** @type {?} */
        var data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSyncedSessionData(data, key);
    };
    /**
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.moveDataToPermanentStorage = /**
     * @param {?=} key
     * @return {?}
     */
    function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        /** @type {?} */
        var data = this.getData(key);
        if (data == null) {
            return;
        }
        this.savePermanentData(data, key);
    };
    /**
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.exists = /**
     * @param {?=} key
     * @return {?}
     */
    function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        /** @type {?} */
        var data = sessionStorage.getItem(key);
        if (data == null) {
            data = localStorage.getItem(key);
        }
        return data != null;
    };
    /**
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.getData = /**
     * @param {?=} key
     * @return {?}
     */
    function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        /** @type {?} */
        var data = this.sessionStorageGetItem(key);
        if (data == null) {
            data = this.localStorageGetItem(key);
        }
        return data;
    };
    /**
     * @template T
     * @param {?=} key
     * @param {?=} isDateType
     * @return {?}
     */
    LocalStoreManager.prototype.getDataObject = /**
     * @template T
     * @param {?=} key
     * @param {?=} isDateType
     * @return {?}
     */
    function (key, isDateType) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        if (isDateType === void 0) { isDateType = false; }
        /** @type {?} */
        var data = this.getData(key);
        if (data != null) {
            if (isDateType) {
                data = new Date(data);
            }
            return (/** @type {?} */ (data));
        }
        else {
            return null;
        }
    };
    /**
     * @param {?=} key
     * @return {?}
     */
    LocalStoreManager.prototype.deleteData = /**
     * @param {?=} key
     * @return {?}
     */
    function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        localStorage.removeItem(key);
    };
    /**
     * @return {?}
     */
    LocalStoreManager.prototype.getInitEvent = /**
     * @return {?}
     */
    function () {
        return this.initEvent.asObservable();
    };
    /**
     * @private
     * @return {?}
     */
    LocalStoreManager.prototype.syncSessionStorage = /**
     * @private
     * @return {?}
     */
    function () {
        localStorage.setItem('getSessionStorage', '_dummy');
        localStorage.removeItem('getSessionStorage');
    };
    /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.addToSessionStorage = /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    function (data, key) {
        this.addToSessionStorageHelper(data, key);
        this.addToSyncKeysBackup(key);
        this.localStorageSetItem('addToSessionStorage', { key: key, data: data });
        localStorage.removeItem('addToSessionStorage');
    };
    /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.addToSessionStorageHelper = /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    function (data, key) {
        this.addToSyncKeysHelper(key);
        this.sessionStorageSetItem(key, data);
    };
    /**
     * @private
     * @param {?} keyToRemove
     * @return {?}
     */
    LocalStoreManager.prototype.removeFromSessionStorage = /**
     * @private
     * @param {?} keyToRemove
     * @return {?}
     */
    function (keyToRemove) {
        this.removeFromSessionStorageHelper(keyToRemove);
        this.removeFromSyncKeysBackup(keyToRemove);
        localStorage.setItem('removeFromSessionStorage', keyToRemove);
        localStorage.removeItem('removeFromSessionStorage');
    };
    /**
     * @private
     * @param {?} keyToRemove
     * @return {?}
     */
    LocalStoreManager.prototype.removeFromSessionStorageHelper = /**
     * @private
     * @param {?} keyToRemove
     * @return {?}
     */
    function (keyToRemove) {
        sessionStorage.removeItem(keyToRemove);
        this.removeFromSyncKeysHelper(keyToRemove);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.testForInvalidKeys = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!key) {
            throw new Error('key cannot be empty');
        }
        if (this.reservedKeys.some((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x == key; }))) {
            throw new Error("The storage key \"" + key + "\" is reserved and cannot be used. Please use a different key");
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.syncKeysContains = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.syncKeys.some((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x == key; }));
    };
    /**
     * @private
     * @return {?}
     */
    LocalStoreManager.prototype.loadSyncKeys = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.syncKeys.length) {
            return;
        }
        this.syncKeys = this.getSyncKeysFromStorage();
    };
    /**
     * @private
     * @param {?=} defaultValue
     * @return {?}
     */
    LocalStoreManager.prototype.getSyncKeysFromStorage = /**
     * @private
     * @param {?=} defaultValue
     * @return {?}
     */
    function (defaultValue) {
        if (defaultValue === void 0) { defaultValue = []; }
        /** @type {?} */
        var data = this.localStorageGetItem(LocalStoreManager.DBKEY_SYNC_KEYS);
        if (data == null) {
            return defaultValue;
        }
        else {
            return (/** @type {?} */ (data));
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.addToSyncKeys = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.addToSyncKeysHelper(key);
        this.addToSyncKeysBackup(key);
        localStorage.setItem('addToSyncKeys', key);
        localStorage.removeItem('addToSyncKeys');
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.addToSyncKeysBackup = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var storedSyncKeys = this.getSyncKeysFromStorage();
        if (!storedSyncKeys.some((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x == key; }))) {
            storedSyncKeys.push(key);
            this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.removeFromSyncKeysBackup = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var storedSyncKeys = this.getSyncKeysFromStorage();
        /** @type {?} */
        var index = storedSyncKeys.indexOf(key);
        if (index > -1) {
            storedSyncKeys.splice(index, 1);
            this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.addToSyncKeysHelper = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        if (!this.syncKeysContains(key)) {
            this.syncKeys.push(key);
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.removeFromSyncKeys = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.removeFromSyncKeysHelper(key);
        this.removeFromSyncKeysBackup(key);
        localStorage.setItem('removeFromSyncKeys', key);
        localStorage.removeItem('removeFromSyncKeys');
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.removeFromSyncKeysHelper = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var index = this.syncKeys.indexOf(key);
        if (index > -1) {
            this.syncKeys.splice(index, 1);
        }
    };
    /**
     * @private
     * @param {?} key
     * @param {?} data
     * @return {?}
     */
    LocalStoreManager.prototype.localStorageSetItem = /**
     * @private
     * @param {?} key
     * @param {?} data
     * @return {?}
     */
    function (key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    };
    /**
     * @private
     * @param {?} key
     * @param {?} data
     * @return {?}
     */
    LocalStoreManager.prototype.sessionStorageSetItem = /**
     * @private
     * @param {?} key
     * @param {?} data
     * @return {?}
     */
    function (key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.localStorageGetItem = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return Utilities.JsonTryParse(localStorage.getItem(key));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    LocalStoreManager.prototype.sessionStorageGetItem = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return Utilities.JsonTryParse(sessionStorage.getItem(key));
    };
    /**
     * @private
     * @return {?}
     */
    LocalStoreManager.prototype.onInit = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.initEvent.next();
            _this.initEvent.complete();
        }));
    };
    LocalStoreManager.syncListenerInitialised = false;
    LocalStoreManager.DBKEY_SYNC_KEYS = 'sync_keys';
    LocalStoreManager.decorators = [
        { type: Injectable }
    ];
    return LocalStoreManager;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    LocalStoreManager.syncListenerInitialised;
    /**
     * @type {?}
     * @private
     */
    LocalStoreManager.DBKEY_SYNC_KEYS;
    /**
     * @type {?}
     * @private
     */
    LocalStoreManager.prototype.syncKeys;
    /**
     * @type {?}
     * @private
     */
    LocalStoreManager.prototype.initEvent;
    /**
     * @type {?}
     * @private
     */
    LocalStoreManager.prototype.reservedKeys;
    /**
     * @type {?}
     * @private
     */
    LocalStoreManager.prototype.sessionStorageTransferHandler;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/theme-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?=} theme
     * @return {?}
     */
    ThemeManager.prototype.installTheme = /**
     * @param {?=} theme
     * @return {?}
     */
    function (theme) {
        if (theme == null || theme.isDefault) {
            this.removeStyle('theme');
        }
        else {
            this.setStyle('theme', "assets/themes/" + theme.href);
        }
    };
    /**
     * @return {?}
     */
    ThemeManager.prototype.getDefaultTheme = /**
     * @return {?}
     */
    function () {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return theme.isDefault; }));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ThemeManager.prototype.getThemeByID = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return theme.id === id; }));
    };
    /**
     * @private
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    ThemeManager.prototype.setStyle = /**
     * @private
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    function (key, href) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.removeStyle = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var existingLinkElement = this.getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.getLinkElementForKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.getExistingLinkElementByKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return document.head.querySelector("link[rel=\"stylesheet\"]." + this.getClassNameForKey(key));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.createLinkElementWithKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.getClassNameForKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return "style-manager-" + key;
    };
    ThemeManager.decorators = [
        { type: Injectable }
    ];
    return ThemeManager;
}());
if (false) {
    /** @type {?} */
    ThemeManager.prototype.themes;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-appkit-services-alpha.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgxAppkitServicesAlphaModule = /** @class */ (function () {
    function NgxAppkitServicesAlphaModule() {
    }
    NgxAppkitServicesAlphaModule.decorators = [
        { type: NgModule, args: [{
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
                },] }
    ];
    return NgxAppkitServicesAlphaModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: polpware-ngx-appkit-services-alpha.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AlertService, AppTranslationService, ConfigurationService, LocalStoreManager, NgxAppkitServicesAlphaModule, ThemeManager };
//# sourceMappingURL=polpware-ngx-appkit-services-alpha.js.map
