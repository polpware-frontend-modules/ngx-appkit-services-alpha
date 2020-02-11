import { Injectable, NgModule } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DialogType, MessageSeverity, Utilities, environment, DBkeys, ConfigurationServiceConstants, LocalStoreManagerServiceAbstractProvider, TranslationServiceAbstractProvider, ThemeManagerAbstractProvider, StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
import { TranslateService } from '@ngx-translate/core';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/alert.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AlertService {
    constructor() {
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
    showDialog(message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue });
    }
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    showMessage(data, separatorOrDetail, severity) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (const message of data) {
                /** @type {?} */
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    }
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    showStickyMessage(data, separatorOrDetail, severity, error, onRemove) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (const message of data) {
                /** @type {?} */
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
            }
        }
        else {
            if (error) {
                /** @type {?} */
                const msg = `Severity: "${MessageSeverity[severity]}", Summary: "${data}", Detail: "${separatorOrDetail}", Error: "${Utilities.safeStringify(error)}"`;
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
    }
    /**
     * @private
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?} isSticky
     * @param {?=} onRemove
     * @return {?}
     */
    showMessageHelper(summary, detail, severity, isSticky, onRemove) {
        /** @type {?} */
        const alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity, summary, detail },
            onRemove
        };
        this.messages.next(alertCommand);
    }
    /**
     * @return {?}
     */
    resetStickyMessage() {
        this.messages.next({ operation: 'clear' });
    }
    /**
     * @param {?=} message
     * @param {?=} caption
     * @return {?}
     */
    startLoadingMessage(message = 'Loading...', caption = '') {
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout((/**
         * @return {?}
         */
        () => {
            this.showStickyMessage(caption, message, MessageSeverity.wait);
        }), 1000);
    }
    /**
     * @return {?}
     */
    stopLoadingMessage() {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logDebug(msg) {
        console.debug(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logError(msg) {
        console.error(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logInfo(msg) {
        console.info(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logMessage(msg) {
        console.log(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logTrace(msg) {
        console.trace(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logWarning(msg) {
        console.warn(msg);
    }
    /**
     * @return {?}
     */
    getDialogEvent() {
        return this.dialogs.asObservable();
    }
    /**
     * @return {?}
     */
    getMessageEvent() {
        return this.messages.asObservable();
    }
}
AlertService.decorators = [
    { type: Injectable }
];
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
class ConfigurationService {
    /**
     * @param {?} localStoreManagerProvider
     * @param {?} translationServiceProvider
     * @param {?} themeManagerProvider
     */
    constructor(localStoreManagerProvider, translationServiceProvider, themeManagerProvider) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set language(value) {
        this._language = value;
        this.saveToLocalStore(value, DBkeys.LANGUAGE);
        this.translationService.changeLanguage(value);
    }
    /**
     * @return {?}
     */
    get language() {
        return this._language || ConfigurationServiceConstants.defaultLanguage;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set themeId(value) {
        value = +value;
        this._themeId = value;
        this.saveToLocalStore(value, DBkeys.THEME_ID);
        this.themeManager.installTheme(this.themeManager.getThemeByID(value));
    }
    /**
     * @return {?}
     */
    get themeId() {
        return this._themeId || ConfigurationServiceConstants.defaultThemeId;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set homeUrl(value) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DBkeys.HOME_URL);
    }
    /**
     * @return {?}
     */
    get homeUrl() {
        return this._homeUrl || ConfigurationServiceConstants.defaultHomeUrl;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showDashboardStatistics(value) {
        this._showDashboardStatistics = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_STATISTICS);
    }
    /**
     * @return {?}
     */
    get showDashboardStatistics() {
        return this._showDashboardStatistics != null ? this._showDashboardStatistics : ConfigurationServiceConstants.defaultShowDashboardStatistics;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showDashboardNotifications(value) {
        this._showDashboardNotifications = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
    }
    /**
     * @return {?}
     */
    get showDashboardNotifications() {
        return this._showDashboardNotifications != null ? this._showDashboardNotifications : ConfigurationServiceConstants.defaultShowDashboardNotifications;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showDashboardTodo(value) {
        this._showDashboardTodo = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
    }
    /**
     * @return {?}
     */
    get showDashboardTodo() {
        return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationServiceConstants.defaultShowDashboardTodo;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showDashboardBanner(value) {
        this._showDashboardBanner = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_BANNER);
    }
    /**
     * @return {?}
     */
    get showDashboardBanner() {
        return this._showDashboardBanner != null ? this._showDashboardBanner : ConfigurationServiceConstants.defaultShowDashboardBanner;
    }
    /**
     * @private
     * @return {?}
     */
    loadLocalChanges() {
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
    }
    /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    saveToLocalStore(data, key) {
        setTimeout((/**
         * @return {?}
         */
        () => this.localStorage.savePermanentData(data, key)));
    }
    /**
     * @param {?} jsonValue
     * @return {?}
     */
    import(jsonValue) {
        this.clearLocalChanges();
        if (jsonValue) {
            /** @type {?} */
            const importValue = Utilities.JsonTryParse(jsonValue);
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
    }
    /**
     * @param {?=} changesOnly
     * @return {?}
     */
    export(changesOnly = true) {
        /** @type {?} */
        const exportValue = {
            language: changesOnly ? this._language : this.language,
            themeId: changesOnly ? this._themeId : this.themeId,
            homeUrl: changesOnly ? this._homeUrl : this.homeUrl,
            showDashboardStatistics: changesOnly ? this._showDashboardStatistics : this.showDashboardStatistics,
            showDashboardNotifications: changesOnly ? this._showDashboardNotifications : this.showDashboardNotifications,
            showDashboardTodo: changesOnly ? this._showDashboardTodo : this.showDashboardTodo,
            showDashboardBanner: changesOnly ? this._showDashboardBanner : this.showDashboardBanner
        };
        return JSON.stringify(exportValue);
    }
    /**
     * @return {?}
     */
    clearLocalChanges() {
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
    }
    /**
     * @private
     * @return {?}
     */
    resetLanguage() {
        /** @type {?} */
        const language = this.translationService.useBrowserLanguage();
        if (language) {
            this._language = language;
        }
        else {
            this._language = this.translationService.useDefaultLangage();
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetTheme() {
        this.themeManager.installTheme();
        this._themeId = null;
    }
}
ConfigurationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigurationService.ctorParameters = () => [
    { type: LocalStoreManagerServiceAbstractProvider },
    { type: TranslationServiceAbstractProvider },
    { type: ThemeManagerAbstractProvider }
];
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
class AppTranslationService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
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
    addLanguages(lang) {
        this.translate.addLangs(lang);
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setDefaultLanguage(lang) {
        this.translate.setDefaultLang(lang);
    }
    /**
     * @return {?}
     */
    getDefaultLanguage() {
        return this.translate.defaultLang;
    }
    /**
     * @return {?}
     */
    getBrowserLanguage() {
        return this.translate.getBrowserLang();
    }
    /**
     * @return {?}
     */
    getCurrentLanguage() {
        return this.translate.currentLang;
    }
    /**
     * @return {?}
     */
    getLoadedLanguages() {
        return this.translate.langs;
    }
    /**
     * @return {?}
     */
    useBrowserLanguage() {
        /** @type {?} */
        const browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    }
    /**
     * @return {?}
     */
    useDefaultLangage() {
        return this.changeLanguage(null);
    }
    /**
     * @param {?} language
     * @return {?}
     */
    changeLanguage(language) {
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.translate.use(language);
                this.onLanguageChanged.next(language);
            }));
        }
        return language;
    }
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    getTranslation(key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    }
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    getTranslationAsync(key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    }
}
AppTranslationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AppTranslationService.ctorParameters = () => [
    { type: TranslateService }
];
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
/**
* Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
*/
class LocalStoreManager {
    constructor() {
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
        (event) => {
            if (!event.newValue) {
                return;
            }
            if (event.key == 'getSessionStorage') {
                if (sessionStorage.length) {
                    this.localStorageSetItem('setSessionStorage', sessionStorage);
                    localStorage.removeItem('setSessionStorage');
                }
            }
            else if (event.key == 'setSessionStorage') {
                if (!this.syncKeys.length) {
                    this.loadSyncKeys();
                }
                /** @type {?} */
                const data = JSON.parse(event.newValue);
                // console.info("Set => Key: Transfer setSessionStorage" + ",  data: " + JSON.stringify(data));
                for (const key in data) {
                    if (this.syncKeysContains(key)) {
                        this.sessionStorageSetItem(key, JSON.parse(data[key]));
                    }
                }
                this.onInit();
            }
            else if (event.key == 'addToSessionStorage') {
                /** @type {?} */
                const data = JSON.parse(event.newValue);
                // console.warn("Set => Key: Transfer addToSessionStorage" + ",  data: " + JSON.stringify(data));
                this.addToSessionStorageHelper(data.data, data.key);
            }
            else if (event.key == 'removeFromSessionStorage') {
                this.removeFromSessionStorageHelper(event.newValue);
            }
            else if (event.key == 'clearAllSessionsStorage' && sessionStorage.length) {
                this.clearInstanceSessionStorage();
            }
            else if (event.key == 'addToSyncKeys') {
                this.addToSyncKeysHelper(event.newValue);
            }
            else if (event.key == 'removeFromSyncKeys') {
                this.removeFromSyncKeysHelper(event.newValue);
            }
        });
    }
    /**
     * @return {?}
     */
    initialiseStorageSyncListener() {
        if (LocalStoreManager.syncListenerInitialised == true) {
            return;
        }
        LocalStoreManager.syncListenerInitialised = true;
        window.addEventListener('storage', this.sessionStorageTransferHandler, false);
        this.syncSessionStorage();
    }
    /**
     * @return {?}
     */
    deinitialiseStorageSyncListener() {
        window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
        LocalStoreManager.syncListenerInitialised = false;
    }
    /**
     * @return {?}
     */
    clearAllStorage() {
        this.clearAllSessionsStorage();
        this.clearLocalStorage();
    }
    /**
     * @return {?}
     */
    clearAllSessionsStorage() {
        this.clearInstanceSessionStorage();
        localStorage.removeItem(LocalStoreManager.DBKEY_SYNC_KEYS);
        localStorage.setItem('clearAllSessionsStorage', '_dummy');
        localStorage.removeItem('clearAllSessionsStorage');
    }
    /**
     * @return {?}
     */
    clearInstanceSessionStorage() {
        sessionStorage.clear();
        this.syncKeys = [];
    }
    /**
     * @return {?}
     */
    clearLocalStorage() {
        localStorage.clear();
    }
    /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    saveSessionData(data, key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        this.sessionStorageSetItem(key, data);
    }
    /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    saveSyncedSessionData(data, key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    }
    /**
     * @param {?} data
     * @param {?=} key
     * @return {?}
     */
    savePermanentData(data, key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        this.localStorageSetItem(key, data);
    }
    /**
     * @param {?=} key
     * @return {?}
     */
    moveDataToSessionStorage(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        /** @type {?} */
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSessionData(data, key);
    }
    /**
     * @param {?=} key
     * @return {?}
     */
    moveDataToSyncedSessionStorage(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        /** @type {?} */
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSyncedSessionData(data, key);
    }
    /**
     * @param {?=} key
     * @return {?}
     */
    moveDataToPermanentStorage(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        /** @type {?} */
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.savePermanentData(data, key);
    }
    /**
     * @param {?=} key
     * @return {?}
     */
    exists(key = StorageManagerConstants.DBKEY_USER_DATA) {
        /** @type {?} */
        let data = sessionStorage.getItem(key);
        if (data == null) {
            data = localStorage.getItem(key);
        }
        return data != null;
    }
    /**
     * @param {?=} key
     * @return {?}
     */
    getData(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        /** @type {?} */
        let data = this.sessionStorageGetItem(key);
        if (data == null) {
            data = this.localStorageGetItem(key);
        }
        return data;
    }
    /**
     * @template T
     * @param {?=} key
     * @param {?=} isDateType
     * @return {?}
     */
    getDataObject(key = StorageManagerConstants.DBKEY_USER_DATA, isDateType = false) {
        /** @type {?} */
        let data = this.getData(key);
        if (data != null) {
            if (isDateType) {
                data = new Date(data);
            }
            return (/** @type {?} */ (data));
        }
        else {
            return null;
        }
    }
    /**
     * @param {?=} key
     * @return {?}
     */
    deleteData(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        localStorage.removeItem(key);
    }
    /**
     * @return {?}
     */
    getInitEvent() {
        return this.initEvent.asObservable();
    }
    /**
     * @private
     * @return {?}
     */
    syncSessionStorage() {
        localStorage.setItem('getSessionStorage', '_dummy');
        localStorage.removeItem('getSessionStorage');
    }
    /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    addToSessionStorage(data, key) {
        this.addToSessionStorageHelper(data, key);
        this.addToSyncKeysBackup(key);
        this.localStorageSetItem('addToSessionStorage', { key, data });
        localStorage.removeItem('addToSessionStorage');
    }
    /**
     * @private
     * @param {?} data
     * @param {?} key
     * @return {?}
     */
    addToSessionStorageHelper(data, key) {
        this.addToSyncKeysHelper(key);
        this.sessionStorageSetItem(key, data);
    }
    /**
     * @private
     * @param {?} keyToRemove
     * @return {?}
     */
    removeFromSessionStorage(keyToRemove) {
        this.removeFromSessionStorageHelper(keyToRemove);
        this.removeFromSyncKeysBackup(keyToRemove);
        localStorage.setItem('removeFromSessionStorage', keyToRemove);
        localStorage.removeItem('removeFromSessionStorage');
    }
    /**
     * @private
     * @param {?} keyToRemove
     * @return {?}
     */
    removeFromSessionStorageHelper(keyToRemove) {
        sessionStorage.removeItem(keyToRemove);
        this.removeFromSyncKeysHelper(keyToRemove);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    testForInvalidKeys(key) {
        if (!key) {
            throw new Error('key cannot be empty');
        }
        if (this.reservedKeys.some((/**
         * @param {?} x
         * @return {?}
         */
        x => x == key))) {
            throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    syncKeysContains(key) {
        return this.syncKeys.some((/**
         * @param {?} x
         * @return {?}
         */
        x => x == key));
    }
    /**
     * @private
     * @return {?}
     */
    loadSyncKeys() {
        if (this.syncKeys.length) {
            return;
        }
        this.syncKeys = this.getSyncKeysFromStorage();
    }
    /**
     * @private
     * @param {?=} defaultValue
     * @return {?}
     */
    getSyncKeysFromStorage(defaultValue = []) {
        /** @type {?} */
        const data = this.localStorageGetItem(LocalStoreManager.DBKEY_SYNC_KEYS);
        if (data == null) {
            return defaultValue;
        }
        else {
            return (/** @type {?} */ (data));
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    addToSyncKeys(key) {
        this.addToSyncKeysHelper(key);
        this.addToSyncKeysBackup(key);
        localStorage.setItem('addToSyncKeys', key);
        localStorage.removeItem('addToSyncKeys');
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    addToSyncKeysBackup(key) {
        /** @type {?} */
        const storedSyncKeys = this.getSyncKeysFromStorage();
        if (!storedSyncKeys.some((/**
         * @param {?} x
         * @return {?}
         */
        x => x == key))) {
            storedSyncKeys.push(key);
            this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    removeFromSyncKeysBackup(key) {
        /** @type {?} */
        const storedSyncKeys = this.getSyncKeysFromStorage();
        /** @type {?} */
        const index = storedSyncKeys.indexOf(key);
        if (index > -1) {
            storedSyncKeys.splice(index, 1);
            this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    addToSyncKeysHelper(key) {
        if (!this.syncKeysContains(key)) {
            this.syncKeys.push(key);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    removeFromSyncKeys(key) {
        this.removeFromSyncKeysHelper(key);
        this.removeFromSyncKeysBackup(key);
        localStorage.setItem('removeFromSyncKeys', key);
        localStorage.removeItem('removeFromSyncKeys');
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    removeFromSyncKeysHelper(key) {
        /** @type {?} */
        const index = this.syncKeys.indexOf(key);
        if (index > -1) {
            this.syncKeys.splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} key
     * @param {?} data
     * @return {?}
     */
    localStorageSetItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    /**
     * @private
     * @param {?} key
     * @param {?} data
     * @return {?}
     */
    sessionStorageSetItem(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    localStorageGetItem(key) {
        return Utilities.JsonTryParse(localStorage.getItem(key));
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    sessionStorageGetItem(key) {
        return Utilities.JsonTryParse(sessionStorage.getItem(key));
    }
    /**
     * @private
     * @return {?}
     */
    onInit() {
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.initEvent.next();
            this.initEvent.complete();
        }));
    }
}
LocalStoreManager.syncListenerInitialised = false;
LocalStoreManager.DBKEY_SYNC_KEYS = 'sync_keys';
LocalStoreManager.decorators = [
    { type: Injectable }
];
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
class ThemeManager {
    constructor() {
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
    installTheme(theme) {
        if (theme == null || theme.isDefault) {
            this.removeStyle('theme');
        }
        else {
            this.setStyle('theme', `assets/themes/${theme.href}`);
        }
    }
    /**
     * @return {?}
     */
    getDefaultTheme() {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        theme => theme.isDefault));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getThemeByID(id) {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        theme => theme.id === id));
    }
    /**
     * @private
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    setStyle(key, href) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    removeStyle(key) {
        /** @type {?} */
        const existingLinkElement = this.getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getLinkElementForKey(key) {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getExistingLinkElementByKey(key) {
        return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    createLinkElementWithKey(key) {
        /** @type {?} */
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getClassNameForKey(key) {
        return `style-manager-${key}`;
    }
}
ThemeManager.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ThemeManager.prototype.themes;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-appkit-services-alpha.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxAppkitServicesAlphaModule {
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
