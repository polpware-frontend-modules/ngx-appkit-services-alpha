import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵinject, ɵɵdefineNgModule, ɵɵdefineInjector, NgModule } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DialogType, MessageSeverity, Utilities, environment, DBkeys, ConfigurationServiceConstants, LocalStoreManagerServiceAbstractProvider, TranslationServiceAbstractProvider, ThemeManagerAbstractProvider, StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
import { TranslateService } from '@ngx-translate/core';

// =============================
class AlertService {
    constructor() {
        this.messages = new Subject();
        this.dialogs = new Subject();
    }
    showDialog(message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue });
    }
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
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    }
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
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
            }
        }
        else {
            if (error) {
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
    showMessageHelper(summary, detail, severity, isSticky, onRemove) {
        const alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity, summary, detail },
            onRemove
        };
        this.messages.next(alertCommand);
    }
    resetStickyMessage() {
        this.messages.next({ operation: 'clear' });
    }
    startLoadingMessage(message = 'Loading...', caption = '') {
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout(() => {
            this.showStickyMessage(caption, message, MessageSeverity.wait);
        }, 1000);
    }
    stopLoadingMessage() {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    }
    logDebug(msg) {
        console.debug(msg);
    }
    logError(msg) {
        console.error(msg);
    }
    logInfo(msg) {
        console.info(msg);
    }
    logMessage(msg) {
        console.log(msg);
    }
    logTrace(msg) {
        console.trace(msg);
    }
    logWarning(msg) {
        console.warn(msg);
    }
    getDialogEvent() {
        return this.dialogs.asObservable();
    }
    getMessageEvent() {
        return this.messages.asObservable();
    }
}
/** @nocollapse */ AlertService.ɵfac = function AlertService_Factory(t) { return new (t || AlertService)(); };
/** @nocollapse */ AlertService.ɵprov = ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AlertService, [{
        type: Injectable
    }], null, null); })();

class ConfigurationService {
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
    set language(value) {
        this._language = value;
        this.saveToLocalStore(value, DBkeys.LANGUAGE);
        this.translationService.changeLanguage(value);
    }
    get language() {
        return this._language || ConfigurationServiceConstants.defaultLanguage;
    }
    set themeId(value) {
        value = +value;
        this._themeId = value;
        this.saveToLocalStore(value, DBkeys.THEME_ID);
        this.themeManager.installTheme(this.themeManager.getThemeByID(value));
    }
    get themeId() {
        return this._themeId || ConfigurationServiceConstants.defaultThemeId;
    }
    set homeUrl(value) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DBkeys.HOME_URL);
    }
    get homeUrl() {
        return this._homeUrl || ConfigurationServiceConstants.defaultHomeUrl;
    }
    set showDashboardStatistics(value) {
        this._showDashboardStatistics = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_STATISTICS);
    }
    get showDashboardStatistics() {
        return this._showDashboardStatistics != null ? this._showDashboardStatistics : ConfigurationServiceConstants.defaultShowDashboardStatistics;
    }
    set showDashboardNotifications(value) {
        this._showDashboardNotifications = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_NOTIFICATIONS);
    }
    get showDashboardNotifications() {
        return this._showDashboardNotifications != null ? this._showDashboardNotifications : ConfigurationServiceConstants.defaultShowDashboardNotifications;
    }
    set showDashboardTodo(value) {
        this._showDashboardTodo = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_TODO);
    }
    get showDashboardTodo() {
        return this._showDashboardTodo != null ? this._showDashboardTodo : ConfigurationServiceConstants.defaultShowDashboardTodo;
    }
    set showDashboardBanner(value) {
        this._showDashboardBanner = value;
        this.saveToLocalStore(value, DBkeys.SHOW_DASHBOARD_BANNER);
    }
    get showDashboardBanner() {
        return this._showDashboardBanner != null ? this._showDashboardBanner : ConfigurationServiceConstants.defaultShowDashboardBanner;
    }
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
    saveToLocalStore(data, key) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }
    import(jsonValue) {
        this.clearLocalChanges();
        if (jsonValue) {
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
    export(changesOnly = true) {
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
    resetLanguage() {
        const language = this.translationService.useBrowserLanguage();
        if (language) {
            this._language = language;
        }
        else {
            this._language = this.translationService.useDefaultLangage();
        }
    }
    resetTheme() {
        this.themeManager.installTheme();
        this._themeId = null;
    }
}
/** @nocollapse */ ConfigurationService.ɵfac = function ConfigurationService_Factory(t) { return new (t || ConfigurationService)(ɵɵinject(LocalStoreManagerServiceAbstractProvider), ɵɵinject(TranslationServiceAbstractProvider), ɵɵinject(ThemeManagerAbstractProvider)); };
/** @nocollapse */ ConfigurationService.ɵprov = ɵɵdefineInjectable({ token: ConfigurationService, factory: ConfigurationService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ConfigurationService, [{
        type: Injectable
    }], function () { return [{ type: LocalStoreManagerServiceAbstractProvider }, { type: TranslationServiceAbstractProvider }, { type: ThemeManagerAbstractProvider }]; }, null); })();

class AppTranslationService {
    constructor(translate) {
        this.translate = translate;
        this.onLanguageChanged = new Subject();
        this.languageChanged$ = this.onLanguageChanged.asObservable();
        this.addLanguages(['en', 'fr', 'de', 'pt', 'ar', 'ko']);
        this.setDefaultLanguage('en');
    }
    addLanguages(lang) {
        this.translate.addLangs(lang);
    }
    setDefaultLanguage(lang) {
        this.translate.setDefaultLang(lang);
    }
    getDefaultLanguage() {
        return this.translate.defaultLang;
    }
    getBrowserLanguage() {
        return this.translate.getBrowserLang();
    }
    getCurrentLanguage() {
        return this.translate.currentLang;
    }
    getLoadedLanguages() {
        return this.translate.langs;
    }
    useBrowserLanguage() {
        const browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    }
    useDefaultLangage() {
        return this.changeLanguage(null);
    }
    changeLanguage(language) {
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout(() => {
                this.translate.use(language);
                this.onLanguageChanged.next(language);
            });
        }
        return language;
    }
    getTranslation(key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    }
    getTranslationAsync(key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    }
}
/** @nocollapse */ AppTranslationService.ɵfac = function AppTranslationService_Factory(t) { return new (t || AppTranslationService)(ɵɵinject(TranslateService)); };
/** @nocollapse */ AppTranslationService.ɵprov = ɵɵdefineInjectable({ token: AppTranslationService, factory: AppTranslationService.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AppTranslationService, [{
        type: Injectable
    }], function () { return [{ type: TranslateService }]; }, null); })();

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
        this.sessionStorageTransferHandler = (event) => {
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
        };
    }
    initialiseStorageSyncListener() {
        if (LocalStoreManager.syncListenerInitialised == true) {
            return;
        }
        LocalStoreManager.syncListenerInitialised = true;
        window.addEventListener('storage', this.sessionStorageTransferHandler, false);
        this.syncSessionStorage();
    }
    deinitialiseStorageSyncListener() {
        window.removeEventListener('storage', this.sessionStorageTransferHandler, false);
        LocalStoreManager.syncListenerInitialised = false;
    }
    clearAllStorage() {
        this.clearAllSessionsStorage();
        this.clearLocalStorage();
    }
    clearAllSessionsStorage() {
        this.clearInstanceSessionStorage();
        localStorage.removeItem(LocalStoreManager.DBKEY_SYNC_KEYS);
        localStorage.setItem('clearAllSessionsStorage', '_dummy');
        localStorage.removeItem('clearAllSessionsStorage');
    }
    clearInstanceSessionStorage() {
        sessionStorage.clear();
        this.syncKeys = [];
    }
    clearLocalStorage() {
        localStorage.clear();
    }
    saveSessionData(data, key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSyncKeys(key);
        localStorage.removeItem(key);
        this.sessionStorageSetItem(key, data);
    }
    saveSyncedSessionData(data, key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        localStorage.removeItem(key);
        this.addToSessionStorage(data, key);
    }
    savePermanentData(data, key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        this.localStorageSetItem(key, data);
    }
    moveDataToSessionStorage(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSessionData(data, key);
    }
    moveDataToSyncedSessionStorage(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.saveSyncedSessionData(data, key);
    }
    moveDataToPermanentStorage(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        const data = this.getData(key);
        if (data == null) {
            return;
        }
        this.savePermanentData(data, key);
    }
    exists(key = StorageManagerConstants.DBKEY_USER_DATA) {
        let data = sessionStorage.getItem(key);
        if (data == null) {
            data = localStorage.getItem(key);
        }
        return data != null;
    }
    getData(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        let data = this.sessionStorageGetItem(key);
        if (data == null) {
            data = this.localStorageGetItem(key);
        }
        return data;
    }
    getDataObject(key = StorageManagerConstants.DBKEY_USER_DATA, isDateType = false) {
        let data = this.getData(key);
        if (data != null) {
            if (isDateType) {
                data = new Date(data);
            }
            return data;
        }
        else {
            return null;
        }
    }
    deleteData(key = StorageManagerConstants.DBKEY_USER_DATA) {
        this.testForInvalidKeys(key);
        this.removeFromSessionStorage(key);
        localStorage.removeItem(key);
    }
    getInitEvent() {
        return this.initEvent.asObservable();
    }
    syncSessionStorage() {
        localStorage.setItem('getSessionStorage', '_dummy');
        localStorage.removeItem('getSessionStorage');
    }
    addToSessionStorage(data, key) {
        this.addToSessionStorageHelper(data, key);
        this.addToSyncKeysBackup(key);
        this.localStorageSetItem('addToSessionStorage', { key, data });
        localStorage.removeItem('addToSessionStorage');
    }
    addToSessionStorageHelper(data, key) {
        this.addToSyncKeysHelper(key);
        this.sessionStorageSetItem(key, data);
    }
    removeFromSessionStorage(keyToRemove) {
        this.removeFromSessionStorageHelper(keyToRemove);
        this.removeFromSyncKeysBackup(keyToRemove);
        localStorage.setItem('removeFromSessionStorage', keyToRemove);
        localStorage.removeItem('removeFromSessionStorage');
    }
    removeFromSessionStorageHelper(keyToRemove) {
        sessionStorage.removeItem(keyToRemove);
        this.removeFromSyncKeysHelper(keyToRemove);
    }
    testForInvalidKeys(key) {
        if (!key) {
            throw new Error('key cannot be empty');
        }
        if (this.reservedKeys.some(x => x == key)) {
            throw new Error(`The storage key "${key}" is reserved and cannot be used. Please use a different key`);
        }
    }
    syncKeysContains(key) {
        return this.syncKeys.some(x => x == key);
    }
    loadSyncKeys() {
        if (this.syncKeys.length) {
            return;
        }
        this.syncKeys = this.getSyncKeysFromStorage();
    }
    getSyncKeysFromStorage(defaultValue = []) {
        const data = this.localStorageGetItem(LocalStoreManager.DBKEY_SYNC_KEYS);
        if (data == null) {
            return defaultValue;
        }
        else {
            return data;
        }
    }
    addToSyncKeys(key) {
        this.addToSyncKeysHelper(key);
        this.addToSyncKeysBackup(key);
        localStorage.setItem('addToSyncKeys', key);
        localStorage.removeItem('addToSyncKeys');
    }
    addToSyncKeysBackup(key) {
        const storedSyncKeys = this.getSyncKeysFromStorage();
        if (!storedSyncKeys.some(x => x == key)) {
            storedSyncKeys.push(key);
            this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    }
    removeFromSyncKeysBackup(key) {
        const storedSyncKeys = this.getSyncKeysFromStorage();
        const index = storedSyncKeys.indexOf(key);
        if (index > -1) {
            storedSyncKeys.splice(index, 1);
            this.localStorageSetItem(LocalStoreManager.DBKEY_SYNC_KEYS, storedSyncKeys);
        }
    }
    addToSyncKeysHelper(key) {
        if (!this.syncKeysContains(key)) {
            this.syncKeys.push(key);
        }
    }
    removeFromSyncKeys(key) {
        this.removeFromSyncKeysHelper(key);
        this.removeFromSyncKeysBackup(key);
        localStorage.setItem('removeFromSyncKeys', key);
        localStorage.removeItem('removeFromSyncKeys');
    }
    removeFromSyncKeysHelper(key) {
        const index = this.syncKeys.indexOf(key);
        if (index > -1) {
            this.syncKeys.splice(index, 1);
        }
    }
    localStorageSetItem(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
    sessionStorageSetItem(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    }
    localStorageGetItem(key) {
        return Utilities.JsonTryParse(localStorage.getItem(key));
    }
    sessionStorageGetItem(key) {
        return Utilities.JsonTryParse(sessionStorage.getItem(key));
    }
    onInit() {
        setTimeout(() => {
            this.initEvent.next();
            this.initEvent.complete();
        });
    }
}
LocalStoreManager.syncListenerInitialised = false;
LocalStoreManager.DBKEY_SYNC_KEYS = 'sync_keys';
/** @nocollapse */ LocalStoreManager.ɵfac = function LocalStoreManager_Factory(t) { return new (t || LocalStoreManager)(); };
/** @nocollapse */ LocalStoreManager.ɵprov = ɵɵdefineInjectable({ token: LocalStoreManager, factory: LocalStoreManager.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(LocalStoreManager, [{
        type: Injectable
    }], null, null); })();

// =============================
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
    installTheme(theme) {
        if (theme == null || theme.isDefault) {
            this.removeStyle('theme');
        }
        else {
            this.setStyle('theme', `assets/themes/${theme.href}`);
        }
    }
    getDefaultTheme() {
        return this.themes.find(theme => theme.isDefault);
    }
    getThemeByID(id) {
        return this.themes.find(theme => theme.id === id);
    }
    setStyle(key, href) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    }
    removeStyle(key) {
        const existingLinkElement = this.getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }
    getLinkElementForKey(key) {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    }
    getExistingLinkElementByKey(key) {
        return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
    }
    createLinkElementWithKey(key) {
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    }
    getClassNameForKey(key) {
        return `style-manager-${key}`;
    }
}
/** @nocollapse */ ThemeManager.ɵfac = function ThemeManager_Factory(t) { return new (t || ThemeManager)(); };
/** @nocollapse */ ThemeManager.ɵprov = ɵɵdefineInjectable({ token: ThemeManager, factory: ThemeManager.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ThemeManager, [{
        type: Injectable
    }], null, null); })();

class NgxAppkitServicesAlphaModule {
}
/** @nocollapse */ NgxAppkitServicesAlphaModule.ɵmod = ɵɵdefineNgModule({ type: NgxAppkitServicesAlphaModule });
/** @nocollapse */ NgxAppkitServicesAlphaModule.ɵinj = ɵɵdefineInjector({ factory: function NgxAppkitServicesAlphaModule_Factory(t) { return new (t || NgxAppkitServicesAlphaModule)(); }, providers: [
        AlertService,
        ConfigurationService,
        AppTranslationService,
        LocalStoreManager,
        ThemeManager
    ], imports: [[]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxAppkitServicesAlphaModule, [{
        type: NgModule,
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

/*
 * Public API Surface of ngx-appkit-services-alpha
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AlertService, AppTranslationService, ConfigurationService, LocalStoreManager, NgxAppkitServicesAlphaModule, ThemeManager };
//# sourceMappingURL=polpware-ngx-appkit-services-alpha.js.map
