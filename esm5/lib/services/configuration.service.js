/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/configuration.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationServiceConstants, TranslationServiceAbstractProvider, LocalStoreManagerServiceAbstractProvider, ThemeManagerAbstractProvider, DBkeys, Utilities, environment } from '@polpware/ngx-appkit-contracts-alpha';
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
export { ConfigurationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlndXJhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNyRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFLSCw2QkFBNkIsRUFDN0Isa0NBQWtDLEVBQ2xDLHdDQUF3QyxFQUN4Qyw0QkFBNEIsRUFDNUIsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ2QsTUFBTSxzQ0FBc0MsQ0FBQzs7OztBQUU5QyxnQ0FRQzs7O0lBUEcscUNBQWlCOztJQUNqQixvQ0FBZ0I7O0lBQ2hCLG9DQUFnQjs7SUFDaEIsb0RBQWlDOztJQUNqQyx1REFBb0M7O0lBQ3BDLDhDQUEyQjs7SUFDM0IsZ0RBQTZCOztBQUdqQztJQU9JLDhCQUFZLHlCQUFtRSxFQUMzRSwwQkFBOEQsRUFDOUQsb0JBQWtEO1FBMEUvQyxZQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckQsYUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUUsYUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDaEMsb0JBQWUsR0FBRyxpQ0FBaUMsQ0FBQzs7UUFHbkQsY0FBUyxHQUFXLElBQUksQ0FBQztRQUN6QixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDeEIsNkJBQXdCLEdBQVksSUFBSSxDQUFDO1FBQ3pDLGdDQUEyQixHQUFZLElBQUksQ0FBQztRQUM1Qyx1QkFBa0Is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QUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFHTyw0Q0FBYTs7OztJQUFyQjs7WUFDVSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFO1FBRTdELElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7U0FDN0I7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDaEU7SUFDTCxDQUFDOzs7OztJQUVPLHlDQUFVOzs7O0lBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOztnQkE5T0osVUFBVTs7OztnQkFqQlAsd0NBQXdDO2dCQUR4QyxrQ0FBa0M7Z0JBRWxDLDRCQUE0Qjs7SUErUGhDLDJCQUFDO0NBQUEsQUEvT0QsSUErT0M7U0E5T1ksb0JBQW9COzs7Ozs7SUFFN0IsNENBQWlEOzs7OztJQUNqRCxrREFBd0Q7Ozs7O0lBQ3hELDRDQUE0Qzs7SUE4RTVDLHVDQUE0RDs7SUFDNUQsd0NBQXFGOztJQUNyRix3Q0FBdUM7O0lBQ3ZDLCtDQUEyRDs7Ozs7SUFHM0QseUNBQWlDOzs7OztJQUNqQyx3Q0FBZ0M7Ozs7O0lBQ2hDLHdDQUFnQzs7Ozs7SUFDaEMsd0RBQWlEOzs7OztJQUNqRCwyREFBb0Q7Ozs7O0lBQ3BELGtEQUEyQzs7Ozs7SUFDM0Msb0RBQTZDOzs7OztJQUU3Qyx1REFBMkU7O0lBQzNFLHNEQUFxRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gICAgSVRyYW5zbGF0aW9uU2VydmljZUNvbnRyYWN0LFxuICAgIElUaGVtZU1hbmFnZXJDb250cmFjdCxcbiAgICBJTG9jYWxTdG9yZU1hbmFnZXJDb250cmFjdCxcbiAgICBJQ29uZmlndXJhdGlvblNlcnZpY2VDb250cmFjdCxcbiAgICBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cyxcbiAgICBUcmFuc2xhdGlvblNlcnZpY2VBYnN0cmFjdFByb3ZpZGVyLFxuICAgIExvY2FsU3RvcmVNYW5hZ2VyU2VydmljZUFic3RyYWN0UHJvdmlkZXIsXG4gICAgVGhlbWVNYW5hZ2VyQWJzdHJhY3RQcm92aWRlcixcbiAgICBEQmtleXMsXG4gICAgVXRpbGl0aWVzLFxuICAgIGVudmlyb25tZW50XG59IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cbmludGVyZmFjZSBVc2VyQ29uZmlndXJhdGlvbiB7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgICBob21lVXJsOiBzdHJpbmc7XG4gICAgdGhlbWVJZDogbnVtYmVyO1xuICAgIHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmRUb2RvOiBib29sZWFuO1xuICAgIHNob3dEYXNoYm9hcmRCYW5uZXI6IGJvb2xlYW47XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElDb25maWd1cmF0aW9uU2VydmljZUNvbnRyYWN0IHtcblxuICAgIHByaXZhdGUgbG9jYWxTdG9yYWdlOiBJTG9jYWxTdG9yZU1hbmFnZXJDb250cmFjdDtcbiAgICBwcml2YXRlIHRyYW5zbGF0aW9uU2VydmljZTogSVRyYW5zbGF0aW9uU2VydmljZUNvbnRyYWN0O1xuICAgIHByaXZhdGUgdGhlbWVNYW5hZ2VyOiBJVGhlbWVNYW5hZ2VyQ29udHJhY3Q7XG5cbiAgICBjb25zdHJ1Y3Rvcihsb2NhbFN0b3JlTWFuYWdlclByb3ZpZGVyOiBMb2NhbFN0b3JlTWFuYWdlclNlcnZpY2VBYnN0cmFjdFByb3ZpZGVyLFxuICAgICAgICB0cmFuc2xhdGlvblNlcnZpY2VQcm92aWRlcjogVHJhbnNsYXRpb25TZXJ2aWNlQWJzdHJhY3RQcm92aWRlcixcbiAgICAgICAgdGhlbWVNYW5hZ2VyUHJvdmlkZXI6IFRoZW1lTWFuYWdlckFic3RyYWN0UHJvdmlkZXIpIHtcblxuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IGxvY2FsU3RvcmVNYW5hZ2VyUHJvdmlkZXIuZ2V0KCk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlID0gdHJhbnNsYXRpb25TZXJ2aWNlUHJvdmlkZXIuZ2V0KCk7XG4gICAgICAgIHRoaXMudGhlbWVNYW5hZ2VyID0gdGhlbWVNYW5hZ2VyUHJvdmlkZXIuZ2V0KCk7XG5cbiAgICAgICAgdGhpcy5sb2FkTG9jYWxDaGFuZ2VzKCk7XG4gICAgfVxuXG4gICAgc2V0IGxhbmd1YWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuTEFOR1VBR0UpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5jaGFuZ2VMYW5ndWFnZSh2YWx1ZSk7XG4gICAgfVxuICAgIGdldCBsYW5ndWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhbmd1YWdlIHx8IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRMYW5ndWFnZTtcbiAgICB9XG5cblxuICAgIHNldCB0aGVtZUlkKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdmFsdWUgPSArdmFsdWU7XG4gICAgICAgIHRoaXMuX3RoZW1lSWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuVEhFTUVfSUQpO1xuICAgICAgICB0aGlzLnRoZW1lTWFuYWdlci5pbnN0YWxsVGhlbWUodGhpcy50aGVtZU1hbmFnZXIuZ2V0VGhlbWVCeUlEKHZhbHVlKSk7XG4gICAgfVxuICAgIGdldCB0aGVtZUlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGhlbWVJZCB8fCBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0VGhlbWVJZDtcbiAgICB9XG5cblxuICAgIHNldCBob21lVXJsKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5faG9tZVVybCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5IT01FX1VSTCk7XG4gICAgfVxuICAgIGdldCBob21lVXJsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faG9tZVVybCB8fCBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0SG9tZVVybDtcbiAgICB9XG5cblxuICAgIHNldCBzaG93RGFzaGJvYXJkU3RhdGlzdGljcyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkU3RhdGlzdGljcyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5TSE9XX0RBU0hCT0FSRF9TVEFUSVNUSUNTKTtcbiAgICB9XG4gICAgZ2V0IHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgIT0gbnVsbCA/IHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzIDogQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdFNob3dEYXNoYm9hcmRTdGF0aXN0aWNzO1xuICAgIH1cblxuXG4gICAgc2V0IHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLlNIT1dfREFTSEJPQVJEX05PVElGSUNBVElPTlMpO1xuICAgIH1cbiAgICBnZXQgc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucyAhPSBudWxsID8gdGhpcy5fc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgOiBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0U2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnM7XG4gICAgfVxuXG5cbiAgICBzZXQgc2hvd0Rhc2hib2FyZFRvZG8odmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuU0hPV19EQVNIQk9BUkRfVE9ETyk7XG4gICAgfVxuICAgIGdldCBzaG93RGFzaGJvYXJkVG9kbygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvICE9IG51bGwgPyB0aGlzLl9zaG93RGFzaGJvYXJkVG9kbyA6IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRTaG93RGFzaGJvYXJkVG9kbztcbiAgICB9XG5cblxuICAgIHNldCBzaG93RGFzaGJvYXJkQmFubmVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRCYW5uZXIgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuU0hPV19EQVNIQk9BUkRfQkFOTkVSKTtcbiAgICB9XG4gICAgZ2V0IHNob3dEYXNoYm9hcmRCYW5uZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyICE9IG51bGwgPyB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyIDogQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdFNob3dEYXNoYm9hcmRCYW5uZXI7XG4gICAgfVxuXG4gICAgcHVibGljIGJhc2VVcmwgPSBlbnZpcm9ubWVudC5iYXNlVXJsIHx8IFV0aWxpdGllcy5iYXNlVXJsKCk7XG4gICAgcHVibGljIHRva2VuVXJsID0gZW52aXJvbm1lbnQudG9rZW5VcmwgfHwgZW52aXJvbm1lbnQuYmFzZVVybCB8fCBVdGlsaXRpZXMuYmFzZVVybCgpO1xuICAgIHB1YmxpYyBsb2dpblVybCA9IGVudmlyb25tZW50LmxvZ2luVXJsO1xuICAgIHB1YmxpYyBmYWxsYmFja0Jhc2VVcmwgPSAnaHR0cHM6Ly9xdWlja2FwcC5lYmVubW9ubmV5LmNvbSc7XG4gICAgLy8gKioqRW5kIG9mIGRlZmF1bHRzKioqXG5cbiAgICBwcml2YXRlIF9sYW5ndWFnZTogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF9ob21lVXJsOiBzdHJpbmcgPSBudWxsO1xuICAgIHByaXZhdGUgX3RoZW1lSWQ6IG51bWJlciA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3M6IGJvb2xlYW4gPSBudWxsO1xuICAgIHByaXZhdGUgX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBib29sZWFuID0gbnVsbDtcbiAgICBwcml2YXRlIF9zaG93RGFzaGJvYXJkVG9kbzogYm9vbGVhbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc2hvd0Rhc2hib2FyZEJhbm5lcjogYm9vbGVhbiA9IG51bGw7XG5cbiAgICBwcml2YXRlIG9uQ29uZmlndXJhdGlvbkltcG9ydGVkOiBTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgICBjb25maWd1cmF0aW9uSW1wb3J0ZWQkID0gdGhpcy5vbkNvbmZpZ3VyYXRpb25JbXBvcnRlZC5hc09ic2VydmFibGUoKTtcblxuXG5cbiAgICBwcml2YXRlIGxvYWRMb2NhbENoYW5nZXMoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuTEFOR1VBR0UpKSB7XG4gICAgICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IHRoaXMubG9jYWxTdG9yYWdlLmdldERhdGFPYmplY3Q8c3RyaW5nPihEQmtleXMuTEFOR1VBR0UsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLmNoYW5nZUxhbmd1YWdlKHRoaXMuX2xhbmd1YWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRMYW5ndWFnZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZXhpc3RzKERCa2V5cy5USEVNRV9JRCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3RoZW1lSWQgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PG51bWJlcj4oREJrZXlzLlRIRU1FX0lELCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnRoZW1lTWFuYWdlci5pbnN0YWxsVGhlbWUodGhpcy50aGVtZU1hbmFnZXIuZ2V0VGhlbWVCeUlEKHRoaXMuX3RoZW1lSWQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRUaGVtZSgpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZXhpc3RzKERCa2V5cy5IT01FX1VSTCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvbWVVcmwgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PHN0cmluZz4oREJrZXlzLkhPTUVfVVJMLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZXhpc3RzKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9TVEFUSVNUSUNTKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PGJvb2xlYW4+KERCa2V5cy5TSE9XX0RBU0hCT0FSRF9TVEFUSVNUSUNTLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZXhpc3RzKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9OT1RJRklDQVRJT05TKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PGJvb2xlYW4+KERCa2V5cy5TSE9XX0RBU0hCT0FSRF9OT1RJRklDQVRJT05TLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZXhpc3RzKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9UT0RPKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PGJvb2xlYW4+KERCa2V5cy5TSE9XX0RBU0hCT0FSRF9UT0RPLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sb2NhbFN0b3JhZ2UuZXhpc3RzKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9CQU5ORVIpKSB7XG4gICAgICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfQkFOTkVSLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHByaXZhdGUgc2F2ZVRvTG9jYWxTdG9yZShkYXRhOiBhbnksIGtleTogc3RyaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5sb2NhbFN0b3JhZ2Uuc2F2ZVBlcm1hbmVudERhdGEoZGF0YSwga2V5KSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaW1wb3J0KGpzb25WYWx1ZTogc3RyaW5nKSB7XG5cbiAgICAgICAgdGhpcy5jbGVhckxvY2FsQ2hhbmdlcygpO1xuXG4gICAgICAgIGlmIChqc29uVmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IGltcG9ydFZhbHVlOiBVc2VyQ29uZmlndXJhdGlvbiA9IFV0aWxpdGllcy5Kc29uVHJ5UGFyc2UoanNvblZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKGltcG9ydFZhbHVlLmxhbmd1YWdlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxhbmd1YWdlID0gaW1wb3J0VmFsdWUubGFuZ3VhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS50aGVtZUlkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRoZW1lSWQgPSAraW1wb3J0VmFsdWUudGhlbWVJZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGltcG9ydFZhbHVlLmhvbWVVcmwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaG9tZVVybCA9IGltcG9ydFZhbHVlLmhvbWVVcmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkU3RhdGlzdGljcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGFzaGJvYXJkU3RhdGlzdGljcyA9IGltcG9ydFZhbHVlLnNob3dEYXNoYm9hcmRTdGF0aXN0aWNzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgPSBpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGltcG9ydFZhbHVlLnNob3dEYXNoYm9hcmRUb2RvICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEYXNoYm9hcmRUb2RvID0gaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZFRvZG87XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkQmFubmVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEYXNoYm9hcmRCYW5uZXIgPSBpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkQmFubmVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vbkNvbmZpZ3VyYXRpb25JbXBvcnRlZC5uZXh0KCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgZXhwb3J0KGNoYW5nZXNPbmx5ID0gdHJ1ZSk6IHN0cmluZyB7XG5cbiAgICAgICAgY29uc3QgZXhwb3J0VmFsdWU6IFVzZXJDb25maWd1cmF0aW9uID0ge1xuICAgICAgICAgICAgbGFuZ3VhZ2U6IGNoYW5nZXNPbmx5ID8gdGhpcy5fbGFuZ3VhZ2UgOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgICAgICAgdGhlbWVJZDogY2hhbmdlc09ubHkgPyB0aGlzLl90aGVtZUlkIDogdGhpcy50aGVtZUlkLFxuICAgICAgICAgICAgaG9tZVVybDogY2hhbmdlc09ubHkgPyB0aGlzLl9ob21lVXJsIDogdGhpcy5ob21lVXJsLFxuICAgICAgICAgICAgc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3M6IGNoYW5nZXNPbmx5ID8gdGhpcy5fc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgOiB0aGlzLnNob3dEYXNoYm9hcmRTdGF0aXN0aWNzLFxuICAgICAgICAgICAgc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnM6IGNoYW5nZXNPbmx5ID8gdGhpcy5fc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgOiB0aGlzLnNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zLFxuICAgICAgICAgICAgc2hvd0Rhc2hib2FyZFRvZG86IGNoYW5nZXNPbmx5ID8gdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gOiB0aGlzLnNob3dEYXNoYm9hcmRUb2RvLFxuICAgICAgICAgICAgc2hvd0Rhc2hib2FyZEJhbm5lcjogY2hhbmdlc09ubHkgPyB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyIDogdGhpcy5zaG93RGFzaGJvYXJkQmFubmVyXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGV4cG9ydFZhbHVlKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBjbGVhckxvY2FsQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLl90aGVtZUlkID0gbnVsbDtcbiAgICAgICAgdGhpcy5faG9tZVVybCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkVG9kbyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRCYW5uZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLkxBTkdVQUdFKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZGVsZXRlRGF0YShEQmtleXMuVEhFTUVfSUQpO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5IT01FX1VSTCk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLlNIT1dfREFTSEJPQVJEX1NUQVRJU1RJQ1MpO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9OT1RJRklDQVRJT05TKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZGVsZXRlRGF0YShEQmtleXMuU0hPV19EQVNIQk9BUkRfVE9ETyk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLlNIT1dfREFTSEJPQVJEX0JBTk5FUik7XG5cbiAgICAgICAgdGhpcy5yZXNldExhbmd1YWdlKCk7XG4gICAgICAgIHRoaXMucmVzZXRUaGVtZSgpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSByZXNldExhbmd1YWdlKCkge1xuICAgICAgICBjb25zdCBsYW5ndWFnZSA9IHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnVzZUJyb3dzZXJMYW5ndWFnZSgpO1xuXG4gICAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSBsYW5ndWFnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xhbmd1YWdlID0gdGhpcy50cmFuc2xhdGlvblNlcnZpY2UudXNlRGVmYXVsdExhbmdhZ2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgcmVzZXRUaGVtZSgpIHtcbiAgICAgICAgdGhpcy50aGVtZU1hbmFnZXIuaW5zdGFsbFRoZW1lKCk7XG4gICAgICAgIHRoaXMuX3RoZW1lSWQgPSBudWxsO1xuICAgIH1cbn1cbiJdfQ==