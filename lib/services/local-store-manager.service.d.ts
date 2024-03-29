import { ILocalStoreManagerContract } from '@polpware/ngx-appkit-contracts-alpha';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
/**
* Provides a wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
*/
export declare class LocalStoreManager implements ILocalStoreManagerContract {
    private static syncListenerInitialised;
    private static readonly DBKEY_SYNC_KEYS;
    private syncKeys;
    private initEvent;
    private reservedKeys;
    initialiseStorageSyncListener(): void;
    deinitialiseStorageSyncListener(): void;
    clearAllStorage(): void;
    clearAllSessionsStorage(): void;
    clearInstanceSessionStorage(): void;
    clearLocalStorage(): void;
    saveSessionData(data: any, key?: string): void;
    saveSyncedSessionData(data: any, key?: string): void;
    savePermanentData(data: any, key?: string): void;
    moveDataToSessionStorage(key?: string): void;
    moveDataToSyncedSessionStorage(key?: string): void;
    moveDataToPermanentStorage(key?: string): void;
    exists(key?: string): boolean;
    getData(key?: string): any;
    getDataObject<T>(key?: string, isDateType?: boolean): T;
    deleteData(key?: string): void;
    getInitEvent(): Observable<{}>;
    private sessionStorageTransferHandler;
    private syncSessionStorage;
    private addToSessionStorage;
    private addToSessionStorageHelper;
    private removeFromSessionStorage;
    private removeFromSessionStorageHelper;
    private testForInvalidKeys;
    private syncKeysContains;
    private loadSyncKeys;
    private getSyncKeysFromStorage;
    private addToSyncKeys;
    private addToSyncKeysBackup;
    private removeFromSyncKeysBackup;
    private addToSyncKeysHelper;
    private removeFromSyncKeys;
    private removeFromSyncKeysHelper;
    private localStorageSetItem;
    private sessionStorageSetItem;
    private localStorageGetItem;
    private sessionStorageGetItem;
    private onInit;
    static ɵfac: i0.ɵɵFactoryDef<LocalStoreManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<LocalStoreManager>;
}
