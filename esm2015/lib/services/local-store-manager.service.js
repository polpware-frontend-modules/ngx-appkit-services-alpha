/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/local-store-manager.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
/**
* Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
*/
export class LocalStoreManager {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVqRSxPQUFPLEVBRUgsdUJBQXVCLEVBQzFCLE1BQU0sc0NBQXNDLENBQUM7QUFHOUM7O0VBRUU7QUFDRixNQUFNLE9BQU8saUJBQWlCO0lBSjlCO1FBUVksYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUUxQixpQkFBWSxHQUNoQjtZQUNJLFdBQVc7WUFDWCxlQUFlO1lBQ2Ysb0JBQW9CO1lBQ3BCLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLDBCQUEwQjtZQUMxQix5QkFBeUI7U0FDNUIsQ0FBQztRQWdKRSxrQ0FBNkI7Ozs7UUFBRyxDQUFDLEtBQW1CLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDakIsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLG1CQUFtQixFQUFFO2dCQUNsQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDOUQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNoRDthQUNKO2lCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcs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QztTQUNsQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxHQUFXLEVBQUUsSUFBUztRQUM5QyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7OztJQUVPLHFCQUFxQixDQUFDLEdBQVcsRUFBRSxJQUFTO1FBQ2hELGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDOzs7Ozs7SUFFTyxtQkFBbUIsQ0FBQyxHQUFXO1FBQ25DLE9BQU8sU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Ozs7O0lBRU8scUJBQXFCLENBQUMsR0FBVztRQUNyQyxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBRU8sTUFBTTtRQUNWLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O0FBclZjLHlDQUF1QixHQUFHLEtBQUssQ0FBQztBQUV2QixpQ0FBZSxHQUFHLFdBQVcsQ0FBQzs7WUFQekQsVUFBVTs7Ozs7OztJQUtQLDBDQUErQzs7Ozs7SUFFL0Msa0NBQXNEOzs7OztJQUN0RCxxQ0FBZ0M7Ozs7O0lBQ2hDLHNDQUFrQzs7Ozs7SUFFbEMseUNBVU07Ozs7O0lBZ0pOLDBEQTJDQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVdGlsaXRpZXMgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5pbXBvcnQge1xuICAgIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0LFxuICAgIFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzXG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cbkBJbmplY3RhYmxlKClcbi8qKlxuKiBQcm92aWRlcyBhIHdyYXBwZXIgZm9yIGFjY2Vzc2luZyB0aGUgd2ViIHN0b3JhZ2UgQVBJIGFuZCBzeW5jaHJvbml6aW5nIHNlc3Npb24gc3RvcmFnZSBhY3Jvc3MgdGFicy93aW5kb3dzLlxuKi9cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlTWFuYWdlciBpbXBsZW1lbnRzIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0IHtcbiAgICBwcml2YXRlIHN0YXRpYyBzeW5jTGlzdGVuZXJJbml0aWFsaXNlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREJLRVlfU1lOQ19LRVlTID0gJ3N5bmNfa2V5cyc7XG4gICAgcHJpdmF0ZSBzeW5jS2V5czogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGluaXRFdmVudCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIHJlc2VydmVkS2V5czogc3RyaW5nW10gPVxuICAgICAgICBbXG4gICAgICAgICAgICAnc3luY19rZXlzJyxcbiAgICAgICAgICAgICdhZGRUb1N5bmNLZXlzJyxcbiAgICAgICAgICAgICdyZW1vdmVGcm9tU3luY0tleXMnLFxuICAgICAgICAgICAgJ2dldFNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdzZXRTZXNzaW9uU3RvcmFnZScsXG4gICAgICAgICAgICAnYWRkVG9TZXNzaW9uU3RvcmFnZScsXG4gICAgICAgICAgICAncmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdjbGVhckFsbFNlc3Npb25zU3RvcmFnZSdcbiAgICAgICAgXTtcblxuXG4gICAgcHVibGljIGluaXRpYWxpc2VTdG9yYWdlU3luY0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuc2Vzc2lvblN0b3JhZ2VUcmFuc2ZlckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zeW5jU2Vzc2lvblN0b3JhZ2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVpbml0aWFsaXNlU3RvcmFnZVN5bmNMaXN0ZW5lcigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCB0aGlzLnNlc3Npb25TdG9yYWdlVHJhbnNmZXJIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIExvY2FsU3RvcmVNYW5hZ2VyLnN5bmNMaXN0ZW5lckluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyQWxsU3RvcmFnZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhckFsbFNlc3Npb25zU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmNsZWFyTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlKCkge1xuICAgICAgICB0aGlzLmNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGVhckFsbFNlc3Npb25zU3RvcmFnZScsICdfZHVtbXknKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zeW5jS2V5cyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVN5bmNLZXlzKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVTeW5jZWRTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TZXNzaW9uU3RvcmFnZShkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlUGVybWFuZW50RGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleSk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlRGF0YVRvU2Vzc2lvblN0b3JhZ2Uoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVNlc3Npb25EYXRhKGRhdGEsIGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVEYXRhVG9TeW5jZWRTZXNzaW9uU3RvcmFnZShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zYXZlU3luY2VkU2Vzc2lvbkRhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZURhdGFUb1Blcm1hbmVudFN0b3JhZ2Uoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVBlcm1hbmVudERhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhpc3RzKGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICBsZXQgZGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhICE9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGEoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNlc3Npb25TdG9yYWdlR2V0SXRlbShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmxvY2FsU3RvcmFnZUdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhT2JqZWN0PFQ+KGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSwgaXNEYXRlVHlwZSA9IGZhbHNlKTogVCB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGlzRGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IERhdGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlRGF0YShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICB0aGlzLnJlbW92ZUZyb21TZXNzaW9uU3RvcmFnZShrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbml0RXZlbnQoKTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0RXZlbnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVRyYW5zZmVySGFuZGxlciA9IChldmVudDogU3RvcmFnZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghZXZlbnQubmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5rZXkgPT0gJ2dldFNlc3Npb25TdG9yYWdlJykge1xuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbSgnc2V0U2Vzc2lvblN0b3JhZ2UnLCBzZXNzaW9uU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NldFNlc3Npb25TdG9yYWdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdzZXRTZXNzaW9uU3RvcmFnZScpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnN5bmNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFN5bmNLZXlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJTZXQgPT4gS2V5OiBUcmFuc2ZlciBzZXRTZXNzaW9uU3RvcmFnZVwiICsgXCIsICBkYXRhOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3luY0tleXNDb250YWlucyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgSlNPTi5wYXJzZShkYXRhW2tleV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdhZGRUb1Nlc3Npb25TdG9yYWdlJykge1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihcIlNldCA9PiBLZXk6IFRyYW5zZmVyIGFkZFRvU2Vzc2lvblN0b3JhZ2VcIiArIFwiLCAgZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkVG9TZXNzaW9uU3RvcmFnZUhlbHBlcihkYXRhLmRhdGEsIGRhdGEua2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScpIHtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAnY2xlYXJBbGxTZXNzaW9uc1N0b3JhZ2UnICYmIHNlc3Npb25TdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckluc3RhbmNlU2Vzc2lvblN0b3JhZ2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ2FkZFRvU3luY0tleXMnKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvU3luY0tleXNIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAncmVtb3ZlRnJvbVN5bmNLZXlzJykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzeW5jU2Vzc2lvblN0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnZXRTZXNzaW9uU3RvcmFnZScsICdfZHVtbXknKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dldFNlc3Npb25TdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb1Nlc3Npb25TdG9yYWdlKGRhdGE6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1Nlc3Npb25TdG9yYWdlSGVscGVyKGRhdGEsIGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbSgnYWRkVG9TZXNzaW9uU3RvcmFnZScsIHsga2V5LCBkYXRhIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWRkVG9TZXNzaW9uU3RvcmFnZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9TZXNzaW9uU3RvcmFnZUhlbHBlcihkYXRhOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0hlbHBlcihrZXkpO1xuICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlU2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleVRvUmVtb3ZlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoa2V5VG9SZW1vdmUpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0JhY2t1cChrZXlUb1JlbW92ZSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScsIGtleVRvUmVtb3ZlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlSGVscGVyKGtleVRvUmVtb3ZlOiBzdHJpbmcpIHtcblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleVRvUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoa2V5VG9SZW1vdmUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdEZvckludmFsaWRLZXlzKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBjYW5ub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2VydmVkS2V5cy5zb21lKHggPT4geCA9PSBrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzdG9yYWdlIGtleSBcIiR7a2V5fVwiIGlzIHJlc2VydmVkIGFuZCBjYW5ub3QgYmUgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBrZXlgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3luY0tleXNDb250YWlucyhrZXk6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNLZXlzLnNvbWUoeCA9PiB4ID09IGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkU3luY0tleXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN5bmNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zeW5jS2V5cyA9IHRoaXMuZ2V0U3luY0tleXNGcm9tU3RvcmFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3luY0tleXNGcm9tU3RvcmFnZShkZWZhdWx0VmFsdWU6IHN0cmluZ1tdID0gW10pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxvY2FsU3RvcmFnZUdldEl0ZW0oTG9jYWxTdG9yZU1hbmFnZXIuREJLRVlfU1lOQ19LRVlTKTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgc3RyaW5nW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1N5bmNLZXlzSGVscGVyKGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhZGRUb1N5bmNLZXlzJywga2V5KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FkZFRvU3luY0tleXMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXNCYWNrdXAoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3luY0tleXMgPSB0aGlzLmdldFN5bmNLZXlzRnJvbVN0b3JhZ2UoKTtcblxuICAgICAgICBpZiAoIXN0b3JlZFN5bmNLZXlzLnNvbWUoeCA9PiB4ID09IGtleSkpIHtcbiAgICAgICAgICAgIHN0b3JlZFN5bmNLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMsIHN0b3JlZFN5bmNLZXlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVN5bmNLZXlzQmFja3VwKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlZFN5bmNLZXlzID0gdGhpcy5nZXRTeW5jS2V5c0Zyb21TdG9yYWdlKCk7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBzdG9yZWRTeW5jS2V5cy5pbmRleE9mKGtleSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHN0b3JlZFN5bmNLZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNldEl0ZW0oTG9jYWxTdG9yZU1hbmFnZXIuREJLRVlfU1lOQ19LRVlTLCBzdG9yZWRTeW5jS2V5cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXNIZWxwZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNLZXlzQ29udGFpbnMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zeW5jS2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUZyb21TeW5jS2V5cyhrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0hlbHBlcihrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZW1vdmVGcm9tU3luY0tleXMnLCBrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVtb3ZlRnJvbVN5bmNLZXlzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN5bmNLZXlzLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zeW5jS2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlR2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLkpzb25UcnlQYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlc3Npb25TdG9yYWdlR2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLkpzb25UcnlQYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50LmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==