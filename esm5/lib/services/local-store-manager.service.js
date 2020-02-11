/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/local-store-manager.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
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
export { LocalStoreManager };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVqRSxPQUFPLEVBRUgsdUJBQXVCLEVBQzFCLE1BQU0sc0NBQXNDLENBQUM7QUFFOUM7SUFBQTtRQUFBLGlCQTJWQztRQW5WVyxhQUFRLEdBQWEsRUFBRSxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRTFCLGlCQUFZLEdBQ2hCO1lBQ0ksV0FBVztZQUNYLGVBQWU7WUFDZixvQkFBb0I7WUFDcEIsbUJBQW1CO1lBQ25CLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsMEJBQTBCO1lBQzFCLHlCQUF5QjtTQUM1QixDQUFDO1FBZ0pFLGtDQUE2Qjs7OztRQUFHLFVBQUMsS0FBbUI7WUFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE9BQU87YUFDVjtZQUVELElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsRUFBRTtnQkFDbEMsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUN2QixLQUFJLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQzlELFlBQVksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztpQkFDaEQ7YUFDSjtpQkFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksbUJBQW1CLEVBQUU7Z0JBRXpDLElB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QUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7Ozs7OztJQUVPLGlEQUFxQjs7Ozs7SUFBN0IsVUFBOEIsR0FBVztRQUNyQyxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBRU8sa0NBQU07Ozs7SUFBZDtRQUFBLGlCQUtDO1FBSkcsVUFBVTs7O1FBQUM7WUFDUCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBclZjLHlDQUF1QixHQUFHLEtBQUssQ0FBQztJQUV2QixpQ0FBZSxHQUFHLFdBQVcsQ0FBQzs7Z0JBUHpELFVBQVU7O0lBMlZYLHdCQUFDO0NBQUEsQUEzVkQsSUEyVkM7U0F2VlksaUJBQWlCOzs7Ozs7SUFDMUIsMENBQStDOzs7OztJQUUvQyxrQ0FBc0Q7Ozs7O0lBQ3RELHFDQUFnQzs7Ozs7SUFDaEMsc0NBQWtDOzs7OztJQUVsQyx5Q0FVTTs7Ozs7SUFnSk4sMERBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFV0aWxpdGllcyB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cbmltcG9ydCB7XG4gICAgSUxvY2FsU3RvcmVNYW5hZ2VyQ29udHJhY3QsXG4gICAgU3RvcmFnZU1hbmFnZXJDb25zdGFudHNcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhJztcblxuQEluamVjdGFibGUoKVxuLyoqXG4qIFByb3ZpZGVzIGEgd3JhcHBlciBmb3IgYWNjZXNzaW5nIHRoZSB3ZWIgc3RvcmFnZSBBUEkgYW5kIHN5bmNocm9uaXppbmcgc2Vzc2lvbiBzdG9yYWdlIGFjcm9zcyB0YWJzL3dpbmRvd3MuXG4qL1xuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmVNYW5hZ2VyIGltcGxlbWVudHMgSUxvY2FsU3RvcmVNYW5hZ2VyQ29udHJhY3Qge1xuICAgIHByaXZhdGUgc3RhdGljIHN5bmNMaXN0ZW5lckluaXRpYWxpc2VkID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBEQktFWV9TWU5DX0tFWVMgPSAnc3luY19rZXlzJztcbiAgICBwcml2YXRlIHN5bmNLZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHByaXZhdGUgaW5pdEV2ZW50ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIHByaXZhdGUgcmVzZXJ2ZWRLZXlzOiBzdHJpbmdbXSA9XG4gICAgICAgIFtcbiAgICAgICAgICAgICdzeW5jX2tleXMnLFxuICAgICAgICAgICAgJ2FkZFRvU3luY0tleXMnLFxuICAgICAgICAgICAgJ3JlbW92ZUZyb21TeW5jS2V5cycsXG4gICAgICAgICAgICAnZ2V0U2Vzc2lvblN0b3JhZ2UnLFxuICAgICAgICAgICAgJ3NldFNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdhZGRUb1Nlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdyZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2UnLFxuICAgICAgICAgICAgJ2NsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlJ1xuICAgICAgICBdO1xuXG5cbiAgICBwdWJsaWMgaW5pdGlhbGlzZVN0b3JhZ2VTeW5jTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmIChMb2NhbFN0b3JlTWFuYWdlci5zeW5jTGlzdGVuZXJJbml0aWFsaXNlZCA9PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBMb2NhbFN0b3JlTWFuYWdlci5zeW5jTGlzdGVuZXJJbml0aWFsaXNlZCA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgdGhpcy5zZXNzaW9uU3RvcmFnZVRyYW5zZmVySGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB0aGlzLnN5bmNTZXNzaW9uU3RvcmFnZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWluaXRpYWxpc2VTdG9yYWdlU3luY0xpc3RlbmVyKCkge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuc2Vzc2lvblN0b3JhZ2VUcmFuc2ZlckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJBbGxTdG9yYWdlKCkge1xuICAgICAgICB0aGlzLmNsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlKCk7XG4gICAgICAgIHRoaXMuY2xlYXJMb2NhbFN0b3JhZ2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJBbGxTZXNzaW9uc1N0b3JhZ2UoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJJbnN0YW5jZVNlc3Npb25TdG9yYWdlKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKExvY2FsU3RvcmVNYW5hZ2VyLkRCS0VZX1NZTkNfS0VZUyk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlJywgJ19kdW1teScpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xlYXJBbGxTZXNzaW9uc1N0b3JhZ2UnKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJJbnN0YW5jZVNlc3Npb25TdG9yYWdlKCkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICB0aGlzLnN5bmNLZXlzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyTG9jYWxTdG9yYWdlKCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZVNlc3Npb25EYXRhKGRhdGE6IGFueSwga2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXMoa2V5KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZVNldEl0ZW0oa2V5LCBkYXRhKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZVN5bmNlZFNlc3Npb25EYXRhKGRhdGE6IGFueSwga2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgdGhpcy5hZGRUb1Nlc3Npb25TdG9yYWdlKGRhdGEsIGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVQZXJtYW5lbnREYXRhKGRhdGE6IGFueSwga2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2Uoa2V5KTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXRJdGVtKGtleSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVEYXRhVG9TZXNzaW9uU3RvcmFnZShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zYXZlU2Vzc2lvbkRhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZURhdGFUb1N5bmNlZFNlc3Npb25TdG9yYWdlKGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmdldERhdGEoa2V5KTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNhdmVTeW5jZWRTZXNzaW9uRGF0YShkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlRGF0YVRvUGVybWFuZW50U3RvcmFnZShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zYXZlUGVybWFuZW50RGF0YShkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBleGlzdHMoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIGxldCBkYXRhID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGEgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RGF0YShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuc2Vzc2lvblN0b3JhZ2VHZXRJdGVtKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMubG9jYWxTdG9yYWdlR2V0SXRlbShrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGFPYmplY3Q8VD4oa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBLCBpc0RhdGVUeXBlID0gZmFsc2UpOiBUIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldERhdGEoa2V5KTtcblxuICAgICAgICBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoaXNEYXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSBuZXcgRGF0ZShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkYXRhIGFzIFQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVEYXRhKGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldEluaXRFdmVudCgpOiBPYnNlcnZhYmxlPHt9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXRFdmVudC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlc3Npb25TdG9yYWdlVHJhbnNmZXJIYW5kbGVyID0gKGV2ZW50OiBTdG9yYWdlRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCFldmVudC5uZXdWYWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PSAnZ2V0U2Vzc2lvblN0b3JhZ2UnKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXRJdGVtKCdzZXRTZXNzaW9uU3RvcmFnZScsIHNlc3Npb25TdG9yYWdlKTtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2V0U2Vzc2lvblN0b3JhZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ3NldFNlc3Npb25TdG9yYWdlJykge1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3luY0tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3luY0tleXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50Lm5ld1ZhbHVlKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbyhcIlNldCA9PiBLZXk6IFRyYW5zZmVyIHNldFNlc3Npb25TdG9yYWdlXCIgKyBcIiwgIGRhdGE6IFwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zeW5jS2V5c0NvbnRhaW5zKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZVNldEl0ZW0oa2V5LCBKU09OLnBhcnNlKGRhdGFba2V5XSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkluaXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ2FkZFRvU2Vzc2lvblN0b3JhZ2UnKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50Lm5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgLy8gY29uc29sZS53YXJuKFwiU2V0ID0+IEtleTogVHJhbnNmZXIgYWRkVG9TZXNzaW9uU3RvcmFnZVwiICsgXCIsICBkYXRhOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRUb1Nlc3Npb25TdG9yYWdlSGVscGVyKGRhdGEuZGF0YSwgZGF0YS5rZXkpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAncmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlJykge1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21TZXNzaW9uU3RvcmFnZUhlbHBlcihldmVudC5uZXdWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdjbGVhckFsbFNlc3Npb25zU3RvcmFnZScgJiYgc2Vzc2lvblN0b3JhZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAnYWRkVG9TeW5jS2V5cycpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0hlbHBlcihldmVudC5uZXdWYWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdyZW1vdmVGcm9tU3luY0tleXMnKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0hlbHBlcihldmVudC5uZXdWYWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHN5bmNTZXNzaW9uU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2dldFNlc3Npb25TdG9yYWdlJywgJ19kdW1teScpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZ2V0U2Vzc2lvblN0b3JhZ2UnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU2Vzc2lvblN0b3JhZ2UoZGF0YTogYW55LCBrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFkZFRvU2Vzc2lvblN0b3JhZ2VIZWxwZXIoZGF0YSwga2V5KTtcbiAgICAgICAgdGhpcy5hZGRUb1N5bmNLZXlzQmFja3VwKGtleSk7XG5cbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXRJdGVtKCdhZGRUb1Nlc3Npb25TdG9yYWdlJywgeyBrZXksIGRhdGEgfSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdhZGRUb1Nlc3Npb25TdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb1Nlc3Npb25TdG9yYWdlSGVscGVyKGRhdGE6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1N5bmNLZXlzSGVscGVyKGtleSk7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2Uoa2V5VG9SZW1vdmU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TZXNzaW9uU3RvcmFnZUhlbHBlcihrZXlUb1JlbW92ZSk7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVN5bmNLZXlzQmFja3VwKGtleVRvUmVtb3ZlKTtcblxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlJywga2V5VG9SZW1vdmUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoa2V5VG9SZW1vdmU6IHN0cmluZykge1xuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oa2V5VG9SZW1vdmUpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0hlbHBlcihrZXlUb1JlbW92ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB0ZXN0Rm9ySW52YWxpZEtleXMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigna2V5IGNhbm5vdCBiZSBlbXB0eScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXJ2ZWRLZXlzLnNvbWUoeCA9PiB4ID09IGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVGhlIHN0b3JhZ2Uga2V5IFwiJHtrZXl9XCIgaXMgcmVzZXJ2ZWQgYW5kIGNhbm5vdCBiZSB1c2VkLiBQbGVhc2UgdXNlIGEgZGlmZmVyZW50IGtleWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzeW5jS2V5c0NvbnRhaW5zKGtleTogc3RyaW5nKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3luY0tleXMuc29tZSh4ID0+IHggPT0ga2V5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGxvYWRTeW5jS2V5cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3luY0tleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN5bmNLZXlzID0gdGhpcy5nZXRTeW5jS2V5c0Zyb21TdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTeW5jS2V5c0Zyb21TdG9yYWdlKGRlZmF1bHRWYWx1ZTogc3RyaW5nW10gPSBbXSk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMubG9jYWxTdG9yYWdlR2V0SXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBzdHJpbmdbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9TeW5jS2V5cyhrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLmFkZFRvU3luY0tleXNIZWxwZXIoa2V5KTtcbiAgICAgICAgdGhpcy5hZGRUb1N5bmNLZXlzQmFja3VwKGtleSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FkZFRvU3luY0tleXMnLCBrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWRkVG9TeW5jS2V5cycpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9TeW5jS2V5c0JhY2t1cChrZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBzdG9yZWRTeW5jS2V5cyA9IHRoaXMuZ2V0U3luY0tleXNGcm9tU3RvcmFnZSgpO1xuXG4gICAgICAgIGlmICghc3RvcmVkU3luY0tleXMuc29tZSh4ID0+IHggPT0ga2V5KSkge1xuICAgICAgICAgICAgc3RvcmVkU3luY0tleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2VTZXRJdGVtKExvY2FsU3RvcmVNYW5hZ2VyLkRCS0VZX1NZTkNfS0VZUywgc3RvcmVkU3luY0tleXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGcm9tU3luY0tleXNCYWNrdXAoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3luY0tleXMgPSB0aGlzLmdldFN5bmNLZXlzRnJvbVN0b3JhZ2UoKTtcblxuICAgICAgICBjb25zdCBpbmRleCA9IHN0b3JlZFN5bmNLZXlzLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc3RvcmVkU3luY0tleXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMsIHN0b3JlZFN5bmNLZXlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9TeW5jS2V5c0hlbHBlcihrZXk6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuc3luY0tleXNDb250YWlucyhrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVN5bmNLZXlzKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVN5bmNLZXlzSGVscGVyKGtleSk7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVN5bmNLZXlzQmFja3VwKGtleSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbW92ZUZyb21TeW5jS2V5cycsIGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdyZW1vdmVGcm9tU3luY0tleXMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUZyb21TeW5jS2V5c0hlbHBlcihrZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuc3luY0tleXMuaW5kZXhPZihrZXkpO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnN5bmNLZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxvY2FsU3RvcmFnZVNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlc3Npb25TdG9yYWdlU2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VHZXRJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBVdGlsaXRpZXMuSnNvblRyeVBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2Vzc2lvblN0b3JhZ2VHZXRJdGVtKGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBVdGlsaXRpZXMuSnNvblRyeVBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkluaXQoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbml0RXZlbnQubmV4dCgpO1xuICAgICAgICAgICAgdGhpcy5pbml0RXZlbnQuY29tcGxldGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19