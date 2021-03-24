import { Injectable } from '@angular/core';
import { StorageManagerConstants, Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
    /** @nocollapse */ LocalStoreManager.ɵprov = i0.ɵɵdefineInjectable({ token: LocalStoreManager, factory: LocalStoreManager.ɵfac, providedIn: 'root' });
    return LocalStoreManager;
}());
export { LocalStoreManager };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LocalStoreManager, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvbG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE4Qix1QkFBdUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN0SCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUczQzs7RUFFRTtBQUVGO0lBQUE7UUFBQSxpQkEwVkM7UUFuVlcsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUUxQixpQkFBWSxHQUNoQjtZQUNJLFdBQVc7WUFDWCxlQUFlO1lBQ2Ysb0JBQW9CO1lBQ3BCLG1CQUFtQjtZQUNuQixtQkFBbUI7WUFDbkIscUJBQXFCO1lBQ3JCLDBCQUEwQjtZQUMxQix5QkFBeUI7U0FDNUIsQ0FBQztRQWdKRSxrQ0FBNkIsR0FBRyxVQUFDLEtBQW1CO1lBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO2dCQUNqQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksbUJBQW1CLEVBQUU7Z0JBQ2xDLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtvQkFDdkIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLGNBQWMsQ0FBQyxDQUFDO29CQUM5RCxZQUFZLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7aUJBQ2hEO2FBQ0o7aUJBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLG1CQUFtQixFQUFFO2dCQUV6QyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDdkI7Z0JBQ0QsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hDLCtGQUErRjtnQkFFL0YsS0FBSyxJQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUU7b0JBRXBCLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUM1QixLQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDMUQ7aUJBQ0o7Z0JBRUQsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO2lCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSxxQkFBcUIsRUFBRTtnQkFFM0MsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXhDLGlHQUFpRztnQkFFakcsS0FBSSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsSUFBSSwwQkFBMEIsRUFBRTtnQkFFaEQsS0FBSSxDQUFDLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN2RDtpQkFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUkseUJBQXlCLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDeEUsS0FBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7YUFDdEM7aUJBQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxJQUFJLGVBQWUsRUFBRTtnQkFDckMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1QztpQkFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksb0JBQW9CLEVBQUU7Z0JBQzFDLEtBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7UUFDTCxDQUFDLENBQUE7S0EySUo7SUFuVVUseURBQTZCLEdBQXBDO1FBQ0ksSUFBSSxpQkFBaUIsQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLEVBQUU7WUFDbkQsT0FBTztTQUNWO1FBRUQsaUJBQWlCLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSwyREFBK0IsR0FBdEM7UUFDSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqRixpQkFBaUIsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUM7SUFDdEQsQ0FBQztJQUVNLDJDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLG1EQUF1QixHQUE5QjtRQUNJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLFlBQVksQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFM0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxZQUFZLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLHVEQUEyQixHQUFsQztRQUNJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sNkNBQWlCLEdBQXhCO1FBQ0ksWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSwyQ0FBZSxHQUF0QixVQUF1QixJQUFTLEVBQUUsR0FBNkM7UUFBN0Msb0JBQUEsRUFBQSxNQUFNLHVCQUF1QixDQUFDLGVBQWU7UUFDM0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLGlEQUFxQixHQUE1QixVQUE2QixJQUFTLEVBQUUsR0FBNkM7UUFBN0Msb0JBQUEsRUFBQSxNQUFNLHVCQUF1QixDQUFDLGVBQWU7UUFDakYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sNkNBQWlCLEdBQXhCLFVBQXlCLElBQVMsRUFBRSxHQUE2QztRQUE3QyxvQkFBQSxFQUFBLE1BQU0sdUJBQXVCLENBQUMsZUFBZTtRQUM3RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLG9EQUF3QixHQUEvQixVQUFnQyxHQUE2QztRQUE3QyxvQkFBQSxFQUFBLE1BQU0sdUJBQXVCLENBQUMsZUFBZTtRQUN6RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sMERBQThCLEdBQXJDLFVBQXNDLEdBQTZDO1FBQTdDLG9CQUFBLEVBQUEsTUFBTSx1QkFBdUIsQ0FBQyxlQUFlO1FBQy9FLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLHNEQUEwQixHQUFqQyxVQUFrQyxHQUE2QztRQUE3QyxvQkFBQSxFQUFBLE1BQU0sdUJBQXVCLENBQUMsZUFBZTtRQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUvQixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxrQ0FBTSxHQUFiLFVBQWMsR0FBNkM7UUFBN0Msb0JBQUEsRUFBQSxNQUFNLHVCQUF1QixDQUFDLGVBQWU7UUFDdkQsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxJQUFJLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQztRQUVELE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRU0sbUNBQU8sR0FBZCxVQUFlLEdBQTZDO1FBQTdDLG9CQUFBLEVBQUEsTUFBTSx1QkFBdUIsQ0FBQyxlQUFlO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFM0MsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsSUFBSSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSx5Q0FBYSxHQUFwQixVQUF3QixHQUE2QyxFQUFFLFVBQWtCO1FBQWpFLG9CQUFBLEVBQUEsTUFBTSx1QkFBdUIsQ0FBQyxlQUFlO1FBQUUsMkJBQUEsRUFBQSxrQkFBa0I7UUFDckYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDZCxJQUFJLFVBQVUsRUFBRTtnQkFDWixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7WUFDRCxPQUFPLElBQVMsQ0FBQztTQUNwQjthQUFNO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTSxzQ0FBVSxHQUFqQixVQUFrQixHQUE2QztRQUE3QyxvQkFBQSxFQUFBLE1BQU0sdUJBQXVCLENBQUMsZUFBZTtRQUMzRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLHdDQUFZLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUErQ08sOENBQWtCLEdBQTFCO1FBQ0ksWUFBWSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNwRCxZQUFZLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLCtDQUFtQixHQUEzQixVQUE0QixJQUFTLEVBQUUsR0FBVztRQUM5QyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsbUJBQW1CLENBQUMscUJBQXFCLEVBQUUsRUFBRSxHQUFHLEtBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7UUFDL0QsWUFBWSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTyxxREFBeUIsR0FBakMsVUFBa0MsSUFBUyxFQUFFLEdBQVc7UUFDcEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLG9EQUF3QixHQUFoQyxVQUFpQyxXQUFtQjtRQUNoRCxJQUFJLENBQUMsOEJBQThCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTNDLFlBQVksQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDOUQsWUFBWSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTywwREFBOEIsR0FBdEMsVUFBdUMsV0FBbUI7UUFFdEQsY0FBYyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVPLDhDQUFrQixHQUExQixVQUEyQixHQUFXO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDTixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDMUM7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxJQUFJLEdBQUcsRUFBUixDQUFRLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUFvQixHQUFHLGtFQUE4RCxDQUFDLENBQUM7U0FDMUc7SUFDTCxDQUFDO0lBRU8sNENBQWdCLEdBQXhCLFVBQXlCLEdBQVc7UUFFaEMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsSUFBSSxHQUFHLEVBQVIsQ0FBUSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLHdDQUFZLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUN0QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUFFTyxrREFBc0IsR0FBOUIsVUFBK0IsWUFBMkI7UUFBM0IsNkJBQUEsRUFBQSxpQkFBMkI7UUFDdEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRXpFLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNkLE9BQU8sWUFBWSxDQUFDO1NBQ3ZCO2FBQU07WUFDSCxPQUFPLElBQWdCLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU8seUNBQWEsR0FBckIsVUFBc0IsR0FBVztRQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLFlBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLFlBQVksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLCtDQUFtQixHQUEzQixVQUE0QixHQUFXO1FBQ25DLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRXJELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxJQUFJLEdBQUcsRUFBUixDQUFRLENBQUMsRUFBRTtZQUNyQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRU8sb0RBQXdCLEdBQWhDLFVBQWlDLEdBQVc7UUFDeEMsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFckQsSUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLGNBQWMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUM7U0FDL0U7SUFDTCxDQUFDO0lBRU8sK0NBQW1CLEdBQTNCLFVBQTRCLEdBQVc7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyw4Q0FBa0IsR0FBMUIsVUFBMkIsR0FBVztRQUNsQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRW5DLFlBQVksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsWUFBWSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyxvREFBd0IsR0FBaEMsVUFBaUMsR0FBVztRQUN4QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFTywrQ0FBbUIsR0FBM0IsVUFBNEIsR0FBVyxFQUFFLElBQVM7UUFDOUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTyxpREFBcUIsR0FBN0IsVUFBOEIsR0FBVyxFQUFFLElBQVM7UUFDaEQsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTywrQ0FBbUIsR0FBM0IsVUFBNEIsR0FBVztRQUNuQyxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTyxpREFBcUIsR0FBN0IsVUFBOEIsR0FBVztRQUNyQyxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFTyxrQ0FBTSxHQUFkO1FBQUEsaUJBS0M7UUFKRyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBclZjLHlDQUF1QixHQUFHLEtBQUssQ0FBQztJQUV2QixpQ0FBZSxHQUFHLFdBQVcsQ0FBQzt5R0FIN0MsaUJBQWlCO2dGQUFqQixpQkFBaUIsV0FBakIsaUJBQWlCLG1CQUZkLE1BQU07NEJBWHRCO0NBb1dDLEFBMVZELElBMFZDO1NBdlZZLGlCQUFpQjtrREFBakIsaUJBQWlCO2NBSDdCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUxvY2FsU3RvcmVNYW5hZ2VyQ29udHJhY3QsIFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLCBVdGlsaXRpZXMgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5cbi8qKlxuKiBQcm92aWRlcyBhIHdyYXBwZXIgZm9yIGFjY2Vzc2luZyB0aGUgd2ViIHN0b3JhZ2UgQVBJIGFuZCBzeW5jaHJvbml6aW5nIHNlc3Npb24gc3RvcmFnZSBhY3Jvc3MgdGFicy93aW5kb3dzLlxuKi9cblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JlTWFuYWdlciBpbXBsZW1lbnRzIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0IHtcbiAgICBwcml2YXRlIHN0YXRpYyBzeW5jTGlzdGVuZXJJbml0aWFsaXNlZCA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgREJLRVlfU1lOQ19LRVlTID0gJ3N5bmNfa2V5cyc7XG4gICAgcHJpdmF0ZSBzeW5jS2V5czogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIGluaXRFdmVudCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgICBwcml2YXRlIHJlc2VydmVkS2V5czogc3RyaW5nW10gPVxuICAgICAgICBbXG4gICAgICAgICAgICAnc3luY19rZXlzJyxcbiAgICAgICAgICAgICdhZGRUb1N5bmNLZXlzJyxcbiAgICAgICAgICAgICdyZW1vdmVGcm9tU3luY0tleXMnLFxuICAgICAgICAgICAgJ2dldFNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdzZXRTZXNzaW9uU3RvcmFnZScsXG4gICAgICAgICAgICAnYWRkVG9TZXNzaW9uU3RvcmFnZScsXG4gICAgICAgICAgICAncmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlJyxcbiAgICAgICAgICAgICdjbGVhckFsbFNlc3Npb25zU3RvcmFnZSdcbiAgICAgICAgXTtcblxuXG4gICAgcHVibGljIGluaXRpYWxpc2VTdG9yYWdlU3luY0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgTG9jYWxTdG9yZU1hbmFnZXIuc3luY0xpc3RlbmVySW5pdGlhbGlzZWQgPSB0cnVlO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc3RvcmFnZScsIHRoaXMuc2Vzc2lvblN0b3JhZ2VUcmFuc2ZlckhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zeW5jU2Vzc2lvblN0b3JhZ2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGVpbml0aWFsaXNlU3RvcmFnZVN5bmNMaXN0ZW5lcigpIHtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N0b3JhZ2UnLCB0aGlzLnNlc3Npb25TdG9yYWdlVHJhbnNmZXJIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgIExvY2FsU3RvcmVNYW5hZ2VyLnN5bmNMaXN0ZW5lckluaXRpYWxpc2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyQWxsU3RvcmFnZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhckFsbFNlc3Npb25zU3RvcmFnZSgpO1xuICAgICAgICB0aGlzLmNsZWFyTG9jYWxTdG9yYWdlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlKCkge1xuICAgICAgICB0aGlzLmNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjbGVhckFsbFNlc3Npb25zU3RvcmFnZScsICdfZHVtbXknKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsZWFyQWxsU2Vzc2lvbnNTdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFySW5zdGFuY2VTZXNzaW9uU3RvcmFnZSgpIHtcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5zeW5jS2V5cyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhckxvY2FsU3RvcmFnZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVN5bmNLZXlzKGtleSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgZGF0YSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNhdmVTeW5jZWRTZXNzaW9uRGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TZXNzaW9uU3RvcmFnZShkYXRhLCBrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzYXZlUGVybWFuZW50RGF0YShkYXRhOiBhbnksIGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICB0aGlzLnRlc3RGb3JJbnZhbGlkS2V5cyhrZXkpO1xuXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleSk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIHB1YmxpYyBtb3ZlRGF0YVRvU2Vzc2lvblN0b3JhZ2Uoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVNlc3Npb25EYXRhKGRhdGEsIGtleSk7XG4gICAgfVxuXG4gICAgcHVibGljIG1vdmVEYXRhVG9TeW5jZWRTZXNzaW9uU3RvcmFnZShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zYXZlU3luY2VkU2Vzc2lvbkRhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgbW92ZURhdGFUb1Blcm1hbmVudFN0b3JhZ2Uoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0RGF0YShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2F2ZVBlcm1hbmVudERhdGEoZGF0YSwga2V5KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZXhpc3RzKGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSkge1xuICAgICAgICBsZXQgZGF0YSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oa2V5KTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhICE9IG51bGw7XG4gICAgfVxuXG4gICAgcHVibGljIGdldERhdGEoa2V5ID0gU3RvcmFnZU1hbmFnZXJDb25zdGFudHMuREJLRVlfVVNFUl9EQVRBKSB7XG4gICAgICAgIHRoaXMudGVzdEZvckludmFsaWRLZXlzKGtleSk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLnNlc3Npb25TdG9yYWdlR2V0SXRlbShrZXkpO1xuXG4gICAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmxvY2FsU3RvcmFnZUdldEl0ZW0oa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRhT2JqZWN0PFQ+KGtleSA9IFN0b3JhZ2VNYW5hZ2VyQ29uc3RhbnRzLkRCS0VZX1VTRVJfREFUQSwgaXNEYXRlVHlwZSA9IGZhbHNlKTogVCB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXREYXRhKGtleSk7XG5cbiAgICAgICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGlzRGF0ZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gbmV3IERhdGUoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBhcyBUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZGVsZXRlRGF0YShrZXkgPSBTdG9yYWdlTWFuYWdlckNvbnN0YW50cy5EQktFWV9VU0VSX0RBVEEpIHtcbiAgICAgICAgdGhpcy50ZXN0Rm9ySW52YWxpZEtleXMoa2V5KTtcblxuICAgICAgICB0aGlzLnJlbW92ZUZyb21TZXNzaW9uU3RvcmFnZShrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRJbml0RXZlbnQoKTogT2JzZXJ2YWJsZTx7fT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0RXZlbnQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVRyYW5zZmVySGFuZGxlciA9IChldmVudDogU3RvcmFnZUV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghZXZlbnQubmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5rZXkgPT0gJ2dldFNlc3Npb25TdG9yYWdlJykge1xuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbSgnc2V0U2Vzc2lvblN0b3JhZ2UnLCBzZXNzaW9uU3RvcmFnZSk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NldFNlc3Npb25TdG9yYWdlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdzZXRTZXNzaW9uU3RvcmFnZScpIHtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnN5bmNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFN5bmNLZXlzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oXCJTZXQgPT4gS2V5OiBUcmFuc2ZlciBzZXRTZXNzaW9uU3RvcmFnZVwiICsgXCIsICBkYXRhOiBcIiArIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3luY0tleXNDb250YWlucyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VTZXRJdGVtKGtleSwgSlNPTi5wYXJzZShkYXRhW2tleV0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub25Jbml0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09ICdhZGRUb1Nlc3Npb25TdG9yYWdlJykge1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShldmVudC5uZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihcIlNldCA9PiBLZXk6IFRyYW5zZmVyIGFkZFRvU2Vzc2lvblN0b3JhZ2VcIiArIFwiLCAgZGF0YTogXCIgKyBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkVG9TZXNzaW9uU3RvcmFnZUhlbHBlcihkYXRhLmRhdGEsIGRhdGEua2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScpIHtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAnY2xlYXJBbGxTZXNzaW9uc1N0b3JhZ2UnICYmIHNlc3Npb25TdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckluc3RhbmNlU2Vzc2lvblN0b3JhZ2UoKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5rZXkgPT0gJ2FkZFRvU3luY0tleXMnKSB7XG4gICAgICAgICAgICB0aGlzLmFkZFRvU3luY0tleXNIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSAncmVtb3ZlRnJvbVN5bmNLZXlzJykge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoZXZlbnQubmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzeW5jU2Vzc2lvblN0b3JhZ2UoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnZXRTZXNzaW9uU3RvcmFnZScsICdfZHVtbXknKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2dldFNlc3Npb25TdG9yYWdlJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb1Nlc3Npb25TdG9yYWdlKGRhdGE6IGFueSwga2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1Nlc3Npb25TdG9yYWdlSGVscGVyKGRhdGEsIGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbSgnYWRkVG9TZXNzaW9uU3RvcmFnZScsIHsga2V5LCBkYXRhIH0pO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnYWRkVG9TZXNzaW9uU3RvcmFnZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkVG9TZXNzaW9uU3RvcmFnZUhlbHBlcihkYXRhOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0hlbHBlcihrZXkpO1xuICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlU2V0SXRlbShrZXksIGRhdGEpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlKGtleVRvUmVtb3ZlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU2Vzc2lvblN0b3JhZ2VIZWxwZXIoa2V5VG9SZW1vdmUpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0JhY2t1cChrZXlUb1JlbW92ZSk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScsIGtleVRvUmVtb3ZlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlbW92ZUZyb21TZXNzaW9uU3RvcmFnZScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVNlc3Npb25TdG9yYWdlSGVscGVyKGtleVRvUmVtb3ZlOiBzdHJpbmcpIHtcblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKGtleVRvUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoa2V5VG9SZW1vdmUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGVzdEZvckludmFsaWRLZXlzKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGlmICgha2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleSBjYW5ub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnJlc2VydmVkS2V5cy5zb21lKHggPT4geCA9PSBrZXkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBzdG9yYWdlIGtleSBcIiR7a2V5fVwiIGlzIHJlc2VydmVkIGFuZCBjYW5ub3QgYmUgdXNlZC4gUGxlYXNlIHVzZSBhIGRpZmZlcmVudCBrZXlgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc3luY0tleXNDb250YWlucyhrZXk6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnN5bmNLZXlzLnNvbWUoeCA9PiB4ID09IGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2FkU3luY0tleXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN5bmNLZXlzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zeW5jS2V5cyA9IHRoaXMuZ2V0U3luY0tleXNGcm9tU3RvcmFnZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U3luY0tleXNGcm9tU3RvcmFnZShkZWZhdWx0VmFsdWU6IHN0cmluZ1tdID0gW10pOiBzdHJpbmdbXSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmxvY2FsU3RvcmFnZUdldEl0ZW0oTG9jYWxTdG9yZU1hbmFnZXIuREJLRVlfU1lOQ19LRVlTKTtcblxuICAgICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGEgYXMgc3RyaW5nW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXMoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5hZGRUb1N5bmNLZXlzSGVscGVyKGtleSk7XG4gICAgICAgIHRoaXMuYWRkVG9TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhZGRUb1N5bmNLZXlzJywga2V5KTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2FkZFRvU3luY0tleXMnKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXNCYWNrdXAoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3luY0tleXMgPSB0aGlzLmdldFN5bmNLZXlzRnJvbVN0b3JhZ2UoKTtcblxuICAgICAgICBpZiAoIXN0b3JlZFN5bmNLZXlzLnNvbWUoeCA9PiB4ID09IGtleSkpIHtcbiAgICAgICAgICAgIHN0b3JlZFN5bmNLZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxTdG9yYWdlU2V0SXRlbShMb2NhbFN0b3JlTWFuYWdlci5EQktFWV9TWU5DX0tFWVMsIHN0b3JlZFN5bmNLZXlzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRnJvbVN5bmNLZXlzQmFja3VwKGtleTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlZFN5bmNLZXlzID0gdGhpcy5nZXRTeW5jS2V5c0Zyb21TdG9yYWdlKCk7XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSBzdG9yZWRTeW5jS2V5cy5pbmRleE9mKGtleSk7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHN0b3JlZFN5bmNLZXlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZVNldEl0ZW0oTG9jYWxTdG9yZU1hbmFnZXIuREJLRVlfU1lOQ19LRVlTLCBzdG9yZWRTeW5jS2V5cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZFRvU3luY0tleXNIZWxwZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN5bmNLZXlzQ29udGFpbnMoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zeW5jS2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbW92ZUZyb21TeW5jS2V5cyhrZXk6IHN0cmluZykge1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0hlbHBlcihrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21TeW5jS2V5c0JhY2t1cChrZXkpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdyZW1vdmVGcm9tU3luY0tleXMnLCBrZXkpO1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgncmVtb3ZlRnJvbVN5bmNLZXlzJyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVGcm9tU3luY0tleXNIZWxwZXIoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN5bmNLZXlzLmluZGV4T2Yoa2V5KTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zeW5jS2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2VTZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXNzaW9uU3RvcmFnZVNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlR2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLkpzb25UcnlQYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNlc3Npb25TdG9yYWdlR2V0SXRlbShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gVXRpbGl0aWVzLkpzb25UcnlQYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25Jbml0KCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50Lm5leHQoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdEV2ZW50LmNvbXBsZXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==