import { __values } from 'tslib';
import { HttpResponseBase } from '@angular/common/http';
import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵinject, ɵɵdefineNgModule, ɵɵdefineInjector, NgModule } from '@angular/core';
import { DialogType, MessageSeverity, Utilities, environment, ConfigurationServiceConstants, DBkeys, LocalStoreManagerServiceAbstractProvider, TranslationServiceAbstractProvider, ThemeManagerAbstractProvider, StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

var AlertService = /** @class */ (function () {
    function AlertService() {
        this.messages = new Subject();
        this.dialogs = new Subject();
    }
    AlertService.prototype.showDialog = function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
    };
    AlertService.prototype.showMessage = function (data, separatorOrDetail, severity) {
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
    AlertService.prototype.showStickyMessage = function (data, separatorOrDetail, severity, error, onRemove) {
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
            _this.showStickyMessage(caption, message, MessageSeverity.wait);
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
    /** @nocollapse */ AlertService.ɵprov = ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac, providedIn: 'root' });
    return AlertService;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(AlertService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

var ConfigurationService = /** @class */ (function () {
    function ConfigurationService(localStoreManagerProvider, translationServiceProvider, themeManagerProvider) {
        this.baseUrl = environment.baseUrl || Utilities.baseUrl();
        this.tokenUrl = environment.tokenUrl || environment.baseUrl || Utilities.baseUrl();
        this.loginUrl = environment.loginUrl;
        this.fallbackBaseUrl = '';
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
        get: function () {
            return this._language || ConfigurationServiceConstants.defaultLanguage;
        },
        set: function (value) {
            this._language = value;
            this.saveToLocalStore(value, DBkeys.LANGUAGE);
            this.translationService.changeLanguage(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "themeId", {
        get: function () {
            return this._themeId || ConfigurationServiceConstants.defaultThemeId;
        },
        set: function (value) {
            value = +value;
            this._themeId = value;
            this.saveToLocalStore(value, DBkeys.THEME_ID);
            this.themeManager.installTheme(this.themeManager.getThemeByID(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "homeUrl", {
        get: function () {
            return this._homeUrl || ConfigurationServiceConstants.defaultHomeUrl;
        },
        set: function (value) {
            this._homeUrl = value;
            this.saveToLocalStore(value, DBkeys.HOME_URL);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardStatistics", {
        get: function () {
            return this._showDashboardStatistics != null ? this._showDashboardStatistics : ConfigurationServiceConstants.defaultShowDashboardStatistics;
        },
        set: function (value) {
            this._showDashboardStatistics = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_STATISTICS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardNotifications", {
        get: function () {
            return this._showDashboardNotifications != null ? this._showDashboardNotifications : ConfigurationServiceConstants.defaultShowDashboardNotifications;
        },
        set: function (value) {
            this._showDashboardNotifications = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardTodo", {
        get: function () {
            return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationServiceConstants.defaultShowDashboardTodo;
        },
        set: function (value) {
            this._showDashboardTodo = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "showDashboardBanner", {
        get: function () {
            return this._showDashboardBanner != null ? this._showDashboardBanner : ConfigurationServiceConstants.defaultShowDashboardBanner;
        },
        set: function (value) {
            this._showDashboardBanner = value;
            this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_BANNER);
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationService.prototype.loadLocalChanges = function () {
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
    ConfigurationService.prototype.saveToLocalStore = function (data, key) {
        var _this = this;
        setTimeout(function () { return _this.localStorage.savePermanentData(data, key); });
    };
    ConfigurationService.prototype.import = function (jsonValue) {
        this.clearLocalChanges();
        if (jsonValue) {
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
    /** @nocollapse */ ConfigurationService.ɵfac = function ConfigurationService_Factory(t) { return new (t || ConfigurationService)(ɵɵinject(LocalStoreManagerServiceAbstractProvider), ɵɵinject(TranslationServiceAbstractProvider), ɵɵinject(ThemeManagerAbstractProvider)); };
    /** @nocollapse */ ConfigurationService.ɵprov = ɵɵdefineInjectable({ token: ConfigurationService, factory: ConfigurationService.ɵfac, providedIn: 'root' });
    return ConfigurationService;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(ConfigurationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: LocalStoreManagerServiceAbstractProvider }, { type: TranslationServiceAbstractProvider }, { type: ThemeManagerAbstractProvider }]; }, null); })();

var AppTranslationService = /** @class */ (function () {
    function AppTranslationService(translate) {
        this.translate = translate;
        this.onLanguageChanged = new Subject();
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
    /** @nocollapse */ AppTranslationService.ɵfac = function AppTranslationService_Factory(t) { return new (t || AppTranslationService)(ɵɵinject(TranslateService)); };
    /** @nocollapse */ AppTranslationService.ɵprov = ɵɵdefineInjectable({ token: AppTranslationService, factory: AppTranslationService.ɵfac, providedIn: 'root' });
    return AppTranslationService;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(AppTranslationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: TranslateService }]; }, null); })();

/**
* Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
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
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        this.sessionStorageSetItem(key, data);
    };
    LocalStoreManager.prototype.saveSyncedSessionData = function (data, key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    };
    LocalStoreManager.prototype.savePermanentData = function (data, key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        this.localStorageSetItem(key, data);
    };
    LocalStoreManager.prototype.moveDataToSessionStorage = function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        var data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSessionData(data, key);
    };
    LocalStoreManager.prototype.moveDataToSyncedSessionStorage = function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        var data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSyncedSessionData(data, key);
    };
    LocalStoreManager.prototype.moveDataToPermanentStorage = function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        var data = this.getData(key);
        if (data == null) {
            return;
        }
        this.savePermanentData(data, key);
    };
    LocalStoreManager.prototype.exists = function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        var data = sessionStorage.getItem(key);
        if (data == null) {
            data = localStorage.getItem(key);
        }
        return data != null;
    };
    LocalStoreManager.prototype.getData = function (key) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
        this.testForInvalidKeys(key);
        var data = this.sessionStorageGetItem(key);
        if (data == null) {
            data = this.localStorageGetItem(key);
        }
        return data;
    };
    LocalStoreManager.prototype.getDataObject = function (key, isDateType) {
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
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
        if (key === void 0) { key = StorageManagerConstants.DBKEY_USER_DATA; }
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
        return Utilities.JsonTryParse(localStorage.getItem(key));
    };
    LocalStoreManager.prototype.sessionStorageGetItem = function (key) {
        return Utilities.JsonTryParse(sessionStorage.getItem(key));
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
    /** @nocollapse */ LocalStoreManager.ɵprov = ɵɵdefineInjectable({ token: LocalStoreManager, factory: LocalStoreManager.ɵfac, providedIn: 'root' });
    return LocalStoreManager;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(LocalStoreManager, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

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
    /** @nocollapse */ ThemeManager.ɵprov = ɵɵdefineInjectable({ token: ThemeManager, factory: ThemeManager.ɵfac, providedIn: 'root' });
    return ThemeManager;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(ThemeManager, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

var NgxAppkitServicesAlphaModule = /** @class */ (function () {
    function NgxAppkitServicesAlphaModule() {
    }
    /** @nocollapse */ NgxAppkitServicesAlphaModule.ɵmod = ɵɵdefineNgModule({ type: NgxAppkitServicesAlphaModule });
    /** @nocollapse */ NgxAppkitServicesAlphaModule.ɵinj = ɵɵdefineInjector({ factory: function NgxAppkitServicesAlphaModule_Factory(t) { return new (t || NgxAppkitServicesAlphaModule)(); }, providers: [], imports: [[]] });
    return NgxAppkitServicesAlphaModule;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxAppkitServicesAlphaModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [],
                exports: [],
                providers: []
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-appkit-services-alpha
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AlertService, AppTranslationService, ConfigurationService, LocalStoreManager, NgxAppkitServicesAlphaModule, ThemeManager };
//# sourceMappingURL=polpware-ngx-appkit-services-alpha.js.map
