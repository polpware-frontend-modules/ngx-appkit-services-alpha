import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { StorageManagerConstants } from '@polpware/ngx-appkit-contracts-alpha';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ LocalStoreManager.ɵprov = i0.ɵɵdefineInjectable({ token: LocalStoreManager, factory: LocalStoreManager.ɵfac });
    return LocalStoreManager;
}());
export { LocalStoreManager };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LocalStoreManager, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxFQUVILHVCQUF1QixFQUMxQixNQUFNLHNDQUFzQyxDQUFDOztBQUU5QztJQUFBO1FBQUEsaUJBMlZDO1FBblZXLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFMUIsaUJBQVksR0FDaEI7WUFDSSxXQUFXO1lBQ1gsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixtQkFBbUI7WUFDbkIsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQiwwQkFBMEI7WUFDMUIseUJBQXlCO1NBQzVCLENBQUM7UUFnSkUsa0NBQTZCLEdBQUcsVUFBQyxLQUFtQjtZQUN4RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDakIsT0FBTzthQUNWO1lBRUQsSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLG1CQUFtQixFQUFFO2dCQUNsQyxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDOUQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNoRDthQUNKO2lCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsRUFBRTtnQkFFekMsSUFBSSxDQUFD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VSxDQUFDO1lBQ1AsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0QixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXJWYyx5Q0FBdUIsR0FBRyxLQUFLLENBQUM7SUFFdkIsaUNBQWUsR0FBRyxXQUFXLENBQUM7eUdBSDdDLGlCQUFpQjtnRkFBakIsaUJBQWlCLFdBQWpCLGlCQUFpQjs0QkFmOUI7Q0FzV0MsQUEzVkQsSUEyVkM7U0F2VlksaUJBQWlCO2tEQUFqQixpQkFBaUI7Y0FKN0IsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVdGlsaXRpZXMgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5pbXBvcnQge1xuICAgIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0LFxuICAgIFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzXG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cbkBJbmplY3RhYmxlKClcbi8qKlxuKiBQcm92aWRlcyBhIHdyYXBwZXIgZm9yIGFjY2Vzc2luZyB0aGUgd2ViIHN0b3JhZ2UgQVBJIGFuZCBzeW5jaHJvbml6aW5nIHNlc3Npb24gc3RvcmFnZSBhY3Jvc3MgdGFicy93aW5kb3dzLlxuKi9cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlTWFuYWdlciBpbXBsZW1lbnRzIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0IHtcbiAgICBwcml2YXRlIHN0YXRpYyBzeW5jTGlzdGVuZXJJbml0aWFsaXNlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREJLRVlfU1lOQ19LRVlTID0gJ3N5bmNfa2V5cyc7XG4gICAgcHJpdmF0ZSBzeW5jS2V5czogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGluaXRFdmVudCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIHJlc2VydmVkS2V5czogc3RyaW5nW10gPVxuICAgICAgICBbXG4gICAgICAgICAgICAnc3luY19rZXlzJyxcbiAgICAgICAgICAgICdhZGRUb1N5bmNLZXlzJyxcbiAgICAgICAgICAgICdyZW1vdmVGcm9tU3luY0tleXMnLFxuICAgICAgICAgICAgJ2dldFNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdzZXRTZXNzaW9uU3RvcmFnZScsXG4gICAgICAgICAgICAnYWRkVG9TZXNzaW9uU3RvcmFnZScsXG4gICAgICAgICAgICAncmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdjbGVhckFsbFNlc3Npb25zU3RvcmFnZSdcbiAgICAgICAgXTtcblxuXG4gICAgcHVibGljIGluaXRpYWxpc2VTdG9yYWdlU3luY0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuc2Vzc2lvblN0b3JhZ2VUcmFuc2ZlckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zeW5jU2Vzc2lvblN0b3JhZ2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVpbml0aWFsaXNlU3RvcmFnZVN5bmNMaXN0ZW5lcigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCB0aGlzLnNlc3Npb25TdG9yYWdlVHJhbnNmZXJIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIExvY2FsU3RvcmVNYW5hZ2VyLnN5bmNMaXN0ZW5lckluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyQWxsU3RvcmFnZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhckFsbFNlc3Npb25zU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmNsZWFyTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlKCkge1xuICAgICAgICB0aGlzLmNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGVhckFsbFNlc3Npb25zU3RvcmFnZScsICdfZHVtbXknKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zeW5jS2V5cyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVN5bmNLZXlzKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVTeW5jZWRTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TZXNzaW9uU3RvcmFnZShkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlUGVybWFuZW50RGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleSk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlRGF0YVRvU2Vzc2lvblN0b3JhZ2Uoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVNlc3Npb25EYXRhKGRhdGEsIGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVEYXRhVG9TeW5jZWRTZXNzaW9uU3RvcmFnZShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zYXZlU3luY2VkU2Vzc2lvbkRhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZURhdGFUb1Blcm1hbmVudFN0b3JhZ2Uoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVBlcm1hbmVudERhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhpc3RzKGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICBsZXQgZGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhICE9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGEoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNlc3Npb25TdG9yYWdlR2V0SXRlbShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmxvY2FsU3RvcmFnZUdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhT2JqZWN0PFQ+KGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSwgaXNEYXRlVHlwZSA9IGZhbHNlKTogVCB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGlzRGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IERhdGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlRGF0YShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICB0aGlzLnJlbW92ZUZyb21TZXNzaW9uU3RvcmFnZShrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbml0RXZlbnQoKTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0RXZlbnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVRyYW5zZmVySGFuZGxlciA9IChldmVudDogU3RvcmFnZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghZXZlbnQubmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5rZXkgPT0gJ2dldFNlc3Npb25TdG9yYWdlJykge1xuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbSgnc2V0U2Vzc2lvblN0b3JhZ2UnLCBzZXNzaW9uU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NldFNlc3Npb25TdG9yYWdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdzZXRTZXNzaW9uU3RvcmFnZScpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnN5bmNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFN5bmNLZXlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJTZXQgPT4gS2V5OiBUcmFuc2ZlciBzZXRTZXNzaW9uU3RvcmFnZVwiICsgXCIsICBkYXRhOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3luY0tleXNDb250YWlucyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgSlNPTi5wYXJzZShkYXRhW2tleV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdhZGRUb1Nlc3Npb25TdG9yYWdlJykge1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihcIlNldCA9PiBLZXk6IFRyYW5zZmVyIGFkZFRvU2Vzc2lvblN0b3JhZ2VcIiArIFwiLCAgZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkVG9TZXNzaW9uU3RvcmFnZUhlbHBlcihkYXRhLmRhdGEsIGRhdGEua2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScpIHtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAnY2xlYXJBbGxTZXNzaW9uc1N0b3JhZ2UnICYmIHNlc3Npb25TdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckluc3RhbmNlU2Vzc2lvblN0b3JhZ2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ2FkZFRvU3luY0tleXMnKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvU3luY0tleXNIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAncmVtb3ZlRnJvbVN5bmNLZXlzJykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzeW5jU2Vzc2lvblN0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnZXRTZXNzaW9uU3RvcmFnZScsICdfZHVtbXknKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dldFNlc3Npb25TdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb1Nlc3Npb25TdG9yYWdlKGRhdGE6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1Nlc3Npb25TdG9yYWdlSGVscGVyKGRhdGEsIGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbSgnYWRkVG9TZXNzaW9uU3RvcmFnZScsIHsga2V5LCBkYXRhIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWRkVG9TZXNzaW9uU3RvcmFnZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9TZXNzaW9uU3RvcmFnZUhlbHBlcihkYXRhOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0hlbHBlcihrZXkpO1xuICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlU2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleVRvUmVtb3ZlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoa2V5VG9SZW1vdmUpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0JhY2t1cChrZXlUb1JlbW92ZSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScsIGtleVRvUmVtb3ZlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlSGVscGVyKGtleVRvUmVtb3ZlOiBzdHJpbmcpIHtcblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleVRvUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoa2V5VG9SZW1vdmUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdEZvckludmFsaWRLZXlzKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBjYW5ub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2VydmVkS2V5cy5zb21lKHggPT4geCA9PSBrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzdG9yYWdlIGtleSBcIiR7a2V5fVwiIGlzIHJlc2VydmVkIGFuZCBjYW5ub3QgYmUgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBrZXlgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3luY0tleXNDb250YWlucyhrZXk6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNLZXlzLnNvbWUoeCA9PiB4ID09IGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkU3luY0tleXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN5bmNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zeW5jS2V5cyA9IHRoaXMuZ2V0U3luY0tleXNGcm9tU3RvcmFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3luY0tleXNGcm9tU3RvcmFnZShkZWZhdWx0VmFsdWU6IHN0cmluZ1tdID0gW10pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxvY2FsU3RvcmFnZUdldEl0ZW0oTG9jYWxTdG9yZU1hbmFnZXIuREJLRVlfU1lOQ19LRVlTKTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgc3RyaW5nW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1N5bmNLZXlzSGVscGVyKGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhZGRUb1N5bmNLZXlzJywga2V5KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FkZFRvU3luY0tleXMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXNCYWNrdXAoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3luY0tleXMgPSB0aGlzLmdldFN5bmNLZXlzRnJvbVN0b3JhZ2UoKTtcblxuICAgICAgICBpZiAoIXN0b3JlZFN5bmNLZXlzLnNvbWUoeCA9PiB4ID09IGtleSkpIHtcbiAgICAgICAgICAgIHN0b3JlZFN5bmNLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMsIHN0b3JlZFN5bmNLZXlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVN5bmNLZXlzQmFja3VwKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlZFN5bmNLZXlzID0gdGhpcy5nZXRTeW5jS2V5c0Zyb21TdG9yYWdlKCk7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBzdG9yZWRTeW5jS2V5cy5pbmRleE9mKGtleSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHN0b3JlZFN5bmNLZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNldEl0ZW0oTG9jYWxTdG9yZU1hbmFnZXIuREJLRVlfU1lOQ19LRVlTLCBzdG9yZWRTeW5jS2V5cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXNIZWxwZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNLZXlzQ29udGFpbnMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zeW5jS2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUZyb21TeW5jS2V5cyhrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0hlbHBlcihrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZW1vdmVGcm9tU3luY0tleXMnLCBrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVtb3ZlRnJvbVN5bmNLZXlzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN5bmNLZXlzLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zeW5jS2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlR2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLkpzb25UcnlQYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlc3Npb25TdG9yYWdlR2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLkpzb25UcnlQYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50LmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==