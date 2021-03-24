import { Injectable } from '@angular/core';
import { ConfigurationServiceConstants, DBkeys, environment, Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@polpware/ngx-appkit-contracts-alpha";
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
    /** @nocollapse */ ConfigurationService.ɵfac = function ConfigurationService_Factory(t) { return new (t || ConfigurationService)(i0.ɵɵinject(i1.LocalStoreManagerServiceAbstractProvider), i0.ɵɵinject(i1.TranslationServiceAbstractProvider), i0.ɵɵinject(i1.ThemeManagerAbstractProvider)); };
    /** @nocollapse */ ConfigurationService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigurationService, factory: ConfigurationService.ɵfac, providedIn: 'root' });
    return ConfigurationService;
}());
export { ConfigurationService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ConfigurationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.LocalStoreManagerServiceAbstractProvider }, { type: i1.TranslationServiceAbstractProvider }, { type: i1.ThemeManagerAbstractProvider }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlndXJhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQTZOLFNBQVMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hWLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQWEvQjtJQVNJLDhCQUFZLHlCQUFtRSxFQUMzRSwwQkFBOEQsRUFDOUQsb0JBQWtEO1FBMEUvQyxZQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckQsYUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUUsYUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDaEMsb0JBQWUsR0FBRyxFQUFFLENBQUM7UUFDNUIsd0JBQXdCO1FBRWhCLGNBQVMsR0FBVyxJQUFJLENBQUM7UUFDekIsYUFBUSxHQUFXLElBQUksQ0FBQztRQUN4QixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLDZCQUF3QixHQUFZLElBQUksQ0FBQztRQUN6QyxnQ0FBMkIsR0FBWSxJQUFJLENBQUM7UUFDNUMsdUJBQWtCLEdBQVksSUFBSSxDQUFDO1FBQ25DLHlCQUFvQixHQUFZLElBQUksQ0FBQztRQUVyQyw0QkFBdUIsR0FBcUIsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUMzRSwyQkFBc0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUM7UUF2RmpFLElB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a0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ2hFO0lBQ0wsQ0FBQztJQUVPLHlDQUFVLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOytHQTdPUSxvQkFBb0I7bUZBQXBCLG9CQUFvQixXQUFwQixvQkFBb0IsbUJBRmpCLE1BQU07K0JBaEJ0QjtDQWdRQyxBQWpQRCxJQWlQQztTQTlPWSxvQkFBb0I7a0RBQXBCLG9CQUFvQjtjQUhoQyxVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cywgREJrZXlzLCBlbnZpcm9ubWVudCwgSUNvbmZpZ3VyYXRpb25TZXJ2aWNlQ29udHJhY3QsIElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0LCBJVGhlbWVNYW5hZ2VyQ29udHJhY3QsIElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdCwgTG9jYWxTdG9yZU1hbmFnZXJTZXJ2aWNlQWJzdHJhY3RQcm92aWRlciwgVGhlbWVNYW5hZ2VyQWJzdHJhY3RQcm92aWRlciwgVHJhbnNsYXRpb25TZXJ2aWNlQWJzdHJhY3RQcm92aWRlciwgVXRpbGl0aWVzIH0gZnJvbSAnQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuXG5pbnRlcmZhY2UgVXNlckNvbmZpZ3VyYXRpb24ge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG4gICAgaG9tZVVybDogc3RyaW5nO1xuICAgIHRoZW1lSWQ6IG51bWJlcjtcbiAgICBzaG93RGFzaGJvYXJkU3RhdGlzdGljczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkVG9kbzogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkQmFubmVyOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25TZXJ2aWNlIGltcGxlbWVudHMgSUNvbmZpZ3VyYXRpb25TZXJ2aWNlQ29udHJhY3Qge1xuXG4gICAgcHJpdmF0ZSBsb2NhbFN0b3JhZ2U6IElMb2NhbFN0b3JlTWFuYWdlckNvbnRyYWN0O1xuICAgIHByaXZhdGUgdHJhbnNsYXRpb25TZXJ2aWNlOiBJVHJhbnNsYXRpb25TZXJ2aWNlQ29udHJhY3Q7XG4gICAgcHJpdmF0ZSB0aGVtZU1hbmFnZXI6IElUaGVtZU1hbmFnZXJDb250cmFjdDtcblxuICAgIGNvbnN0cnVjdG9yKGxvY2FsU3RvcmVNYW5hZ2VyUHJvdmlkZXI6IExvY2FsU3RvcmVNYW5hZ2VyU2VydmljZUFic3RyYWN0UHJvdmlkZXIsXG4gICAgICAgIHRyYW5zbGF0aW9uU2VydmljZVByb3ZpZGVyOiBUcmFuc2xhdGlvblNlcnZpY2VBYnN0cmFjdFByb3ZpZGVyLFxuICAgICAgICB0aGVtZU1hbmFnZXJQcm92aWRlcjogVGhlbWVNYW5hZ2VyQWJzdHJhY3RQcm92aWRlcikge1xuXG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlID0gbG9jYWxTdG9yZU1hbmFnZXJQcm92aWRlci5nZXQoKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2UgPSB0cmFuc2xhdGlvblNlcnZpY2VQcm92aWRlci5nZXQoKTtcbiAgICAgICAgdGhpcy50aGVtZU1hbmFnZXIgPSB0aGVtZU1hbmFnZXJQcm92aWRlci5nZXQoKTtcblxuICAgICAgICB0aGlzLmxvYWRMb2NhbENoYW5nZXMoKTtcbiAgICB9XG5cbiAgICBzZXQgbGFuZ3VhZ2UodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5MQU5HVUFHRSk7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLmNoYW5nZUxhbmd1YWdlKHZhbHVlKTtcbiAgICB9XG4gICAgZ2V0IGxhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGFuZ3VhZ2UgfHwgQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdExhbmd1YWdlO1xuICAgIH1cblxuXG4gICAgc2V0IHRoZW1lSWQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB2YWx1ZSA9ICt2YWx1ZTtcbiAgICAgICAgdGhpcy5fdGhlbWVJZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5USEVNRV9JRCk7XG4gICAgICAgIHRoaXMudGhlbWVNYW5hZ2VyLmluc3RhbGxUaGVtZSh0aGlzLnRoZW1lTWFuYWdlci5nZXRUaGVtZUJ5SUQodmFsdWUpKTtcbiAgICB9XG4gICAgZ2V0IHRoZW1lSWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aGVtZUlkIHx8IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRUaGVtZUlkO1xuICAgIH1cblxuXG4gICAgc2V0IGhvbWVVcmwodmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9ob21lVXJsID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLkhPTUVfVVJMKTtcbiAgICB9XG4gICAgZ2V0IGhvbWVVcmwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob21lVXJsIHx8IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRIb21lVXJsO1xuICAgIH1cblxuXG4gICAgc2V0IHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLlNIT1dfREFTSEJPQVJEX1NUQVRJU1RJQ1MpO1xuICAgIH1cbiAgICBnZXQgc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93RGFzaGJvYXJkU3RhdGlzdGljcyAhPSBudWxsID8gdGhpcy5fc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgOiBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0U2hvd0Rhc2hib2FyZFN0YXRpc3RpY3M7XG4gICAgfVxuXG5cbiAgICBzZXQgc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnModmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUyk7XG4gICAgfVxuICAgIGdldCBzaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zICE9IG51bGwgPyB0aGlzLl9zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucyA6IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRTaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucztcbiAgICB9XG5cblxuICAgIHNldCBzaG93RGFzaGJvYXJkVG9kbyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkVG9kbyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5TSE9XX0RBU0hCT0FSRF9UT0RPKTtcbiAgICB9XG4gICAgZ2V0IHNob3dEYXNoYm9hcmRUb2RvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gIT0gbnVsbCA/IHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvIDogQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdFNob3dEYXNoYm9hcmRUb2RvO1xuICAgIH1cblxuXG4gICAgc2V0IHNob3dEYXNoYm9hcmRCYW5uZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5TSE9XX0RBU0hCT0FSRF9CQU5ORVIpO1xuICAgIH1cbiAgICBnZXQgc2hvd0Rhc2hib2FyZEJhbm5lcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dEYXNoYm9hcmRCYW5uZXIgIT0gbnVsbCA/IHRoaXMuX3Nob3dEYXNoYm9hcmRCYW5uZXIgOiBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0U2hvd0Rhc2hib2FyZEJhbm5lcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgYmFzZVVybCA9IGVudmlyb25tZW50LmJhc2VVcmwgfHwgVXRpbGl0aWVzLmJhc2VVcmwoKTtcbiAgICBwdWJsaWMgdG9rZW5VcmwgPSBlbnZpcm9ubWVudC50b2tlblVybCB8fCBlbnZpcm9ubWVudC5iYXNlVXJsIHx8IFV0aWxpdGllcy5iYXNlVXJsKCk7XG4gICAgcHVibGljIGxvZ2luVXJsID0gZW52aXJvbm1lbnQubG9naW5Vcmw7XG4gICAgcHVibGljIGZhbGxiYWNrQmFzZVVybCA9ICcnO1xuICAgIC8vICoqKkVuZCBvZiBkZWZhdWx0cyoqKlxuXG4gICAgcHJpdmF0ZSBfbGFuZ3VhZ2U6IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaG9tZVVybDogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF90aGVtZUlkOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBib29sZWFuID0gbnVsbDtcbiAgICBwcml2YXRlIF9zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc2hvd0Rhc2hib2FyZFRvZG86IGJvb2xlYW4gPSBudWxsO1xuICAgIHByaXZhdGUgX3Nob3dEYXNoYm9hcmRCYW5uZXI6IGJvb2xlYW4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBvbkNvbmZpZ3VyYXRpb25JbXBvcnRlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgY29uZmlndXJhdGlvbkltcG9ydGVkJCA9IHRoaXMub25Db25maWd1cmF0aW9uSW1wb3J0ZWQuYXNPYnNlcnZhYmxlKCk7XG5cblxuXG4gICAgcHJpdmF0ZSBsb2FkTG9jYWxDaGFuZ2VzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZS5leGlzdHMoREJrZXlzLkxBTkdVQUdFKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PHN0cmluZz4oREJrZXlzLkxBTkdVQUdFLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5jaGFuZ2VMYW5ndWFnZSh0aGlzLl9sYW5ndWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0TGFuZ3VhZ2UoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuVEhFTUVfSUQpKSB7XG4gICAgICAgICAgICB0aGlzLl90aGVtZUlkID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxudW1iZXI+KERCa2V5cy5USEVNRV9JRCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy50aGVtZU1hbmFnZXIuaW5zdGFsbFRoZW1lKHRoaXMudGhlbWVNYW5hZ2VyLmdldFRoZW1lQnlJRCh0aGlzLl90aGVtZUlkKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VGhlbWUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuSE9NRV9VUkwpKSB7XG4gICAgICAgICAgICB0aGlzLl9ob21lVXJsID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxzdHJpbmc+KERCa2V5cy5IT01FX1VSTCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfU1RBVElTVElDUykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfU1RBVElTVElDUywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfVE9ETykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfVE9ETywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfQkFOTkVSKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciA9IHRoaXMubG9jYWxTdG9yYWdlLmdldERhdGFPYmplY3Q8Ym9vbGVhbj4oREJrZXlzLlNIT1dfREFTSEJPQVJEX0JBTk5FUiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHNhdmVUb0xvY2FsU3RvcmUoZGF0YTogYW55LCBrZXk6IHN0cmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMubG9jYWxTdG9yYWdlLnNhdmVQZXJtYW5lbnREYXRhKGRhdGEsIGtleSkpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGltcG9ydChqc29uVmFsdWU6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMuY2xlYXJMb2NhbENoYW5nZXMoKTtcblxuICAgICAgICBpZiAoanNvblZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnRWYWx1ZTogVXNlckNvbmZpZ3VyYXRpb24gPSBVdGlsaXRpZXMuSnNvblRyeVBhcnNlKGpzb25WYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5sYW5ndWFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGltcG9ydFZhbHVlLmxhbmd1YWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUudGhlbWVJZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZUlkID0gK2ltcG9ydFZhbHVlLnRoZW1lSWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5ob21lVXJsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbWVVcmwgPSBpbXBvcnRWYWx1ZS5ob21lVXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgPSBpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkU3RhdGlzdGljcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGltcG9ydFZhbHVlLnNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkVG9kbyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGFzaGJvYXJkVG9kbyA9IGltcG9ydFZhbHVlLnNob3dEYXNoYm9hcmRUb2RvO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZEJhbm5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGFzaGJvYXJkQmFubmVyID0gaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZEJhbm5lcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Db25maWd1cmF0aW9uSW1wb3J0ZWQubmV4dCgpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGV4cG9ydChjaGFuZ2VzT25seSA9IHRydWUpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IGV4cG9ydFZhbHVlOiBVc2VyQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIGxhbmd1YWdlOiBjaGFuZ2VzT25seSA/IHRoaXMuX2xhbmd1YWdlIDogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgICAgIHRoZW1lSWQ6IGNoYW5nZXNPbmx5ID8gdGhpcy5fdGhlbWVJZCA6IHRoaXMudGhlbWVJZCxcbiAgICAgICAgICAgIGhvbWVVcmw6IGNoYW5nZXNPbmx5ID8gdGhpcy5faG9tZVVybCA6IHRoaXMuaG9tZVVybCxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBjaGFuZ2VzT25seSA/IHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzIDogdGhpcy5zaG93RGFzaGJvYXJkU3RhdGlzdGljcyxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBjaGFuZ2VzT25seSA/IHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zIDogdGhpcy5zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucyxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmRUb2RvOiBjaGFuZ2VzT25seSA/IHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvIDogdGhpcy5zaG93RGFzaGJvYXJkVG9kbyxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmRCYW5uZXI6IGNoYW5nZXNPbmx5ID8gdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciA6IHRoaXMuc2hvd0Rhc2hib2FyZEJhbm5lclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShleHBvcnRWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgY2xlYXJMb2NhbENoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGhlbWVJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2hvbWVVcmwgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkU3RhdGlzdGljcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5MQU5HVUFHRSk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLlRIRU1FX0lEKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZGVsZXRlRGF0YShEQmtleXMuSE9NRV9VUkwpO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9TVEFUSVNUSUNTKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZGVsZXRlRGF0YShEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUyk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLlNIT1dfREFTSEJPQVJEX1RPRE8pO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9CQU5ORVIpO1xuXG4gICAgICAgIHRoaXMucmVzZXRMYW5ndWFnZSgpO1xuICAgICAgICB0aGlzLnJlc2V0VGhlbWUoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgcmVzZXRMYW5ndWFnZSgpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS51c2VCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICAgICAgICBpZiAobGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnVzZURlZmF1bHRMYW5nYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0VGhlbWUoKSB7XG4gICAgICAgIHRoaXMudGhlbWVNYW5hZ2VyLmluc3RhbGxUaGVtZSgpO1xuICAgICAgICB0aGlzLl90aGVtZUlkID0gbnVsbDtcbiAgICB9XG59XG4iXX0=