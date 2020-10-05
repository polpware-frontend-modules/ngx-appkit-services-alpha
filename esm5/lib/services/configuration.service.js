import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationServiceConstants, DBkeys, Utilities, environment } from '@polpware/ngx-appkit-contracts-alpha';
import * as i0 from "@angular/core";
import * as i1 from "@polpware/ngx-appkit-contracts-alpha";
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
    /** @nocollapse */ ConfigurationService.ɵprov = i0.ɵɵdefineInjectable({ token: ConfigurationService, factory: ConfigurationService.ɵfac });
    return ConfigurationService;
}());
export { ConfigurationService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ConfigurationService, [{
        type: Injectable
    }], function () { return [{ type: i1.LocalStoreManagerServiceAbstractProvider }, { type: i1.TranslationServiceAbstractProvider }, { type: i1.ThemeManagerAbstractProvider }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBvbHB3YXJlL25neC1hcHBraXQtc2VydmljZXMtYWxwaGEvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY29uZmlndXJhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBS0gsNkJBQTZCLEVBSTdCLE1BQU0sRUFDTixTQUFTLEVBQ1QsV0FBVyxFQUNkLE1BQU0sc0NBQXNDLENBQUM7OztBQVk5QztJQU9JLDhCQUFZLHlCQUFtRSxFQUMzRSwwQkFBOEQsRUFDOUQsb0JBQWtEO1FBMEUvQyxZQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckQsYUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUUsYUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7UUFDaEMsb0JBQWUsR0FBRyxpQ0FBaUMsQ0FBQztRQUMzRCx3QkFBd0I7UUFFaEIsY0FBUyxHQUFXLElBQUksQ0FBQztRQUN6QixhQUFRLEdBQVcsSUFBSSxDQUFDO1FBQ3hCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDeEIsNkJBQXdCLEdBQVksSUFBSSxDQUFDO1FBQ3pDLGdDQUEyQixHQUFZLElBQUksQ0FBQztRQUM1Qyx1QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFDbkMseUJBQW9CLEdBQVksSUFBSSxDQUFDO1FBRXJDLDRCQUF1QixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQzNFLDJCQUFzQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQXZGakUs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QUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDaEU7SUFDTCxDQUFDO0lBRU8seUNBQVUsR0FBbEI7UUFDSSxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7K0dBN09RLG9CQUFvQjttRkFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQjsrQkE1QmpDO0NBMFFDLEFBL09ELElBK09DO1NBOU9ZLG9CQUFvQjtrREFBcEIsb0JBQW9CO2NBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICAgIElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdCxcbiAgICBJVGhlbWVNYW5hZ2VyQ29udHJhY3QsXG4gICAgSUxvY2FsU3RvcmVNYW5hZ2VyQ29udHJhY3QsXG4gICAgSUNvbmZpZ3VyYXRpb25TZXJ2aWNlQ29udHJhY3QsXG4gICAgQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMsXG4gICAgVHJhbnNsYXRpb25TZXJ2aWNlQWJzdHJhY3RQcm92aWRlcixcbiAgICBMb2NhbFN0b3JlTWFuYWdlclNlcnZpY2VBYnN0cmFjdFByb3ZpZGVyLFxuICAgIFRoZW1lTWFuYWdlckFic3RyYWN0UHJvdmlkZXIsXG4gICAgREJrZXlzLFxuICAgIFV0aWxpdGllcyxcbiAgICBlbnZpcm9ubWVudFxufSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5pbnRlcmZhY2UgVXNlckNvbmZpZ3VyYXRpb24ge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG4gICAgaG9tZVVybDogc3RyaW5nO1xuICAgIHRoZW1lSWQ6IG51bWJlcjtcbiAgICBzaG93RGFzaGJvYXJkU3RhdGlzdGljczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkVG9kbzogYm9vbGVhbjtcbiAgICBzaG93RGFzaGJvYXJkQmFubmVyOiBib29sZWFuO1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJQ29uZmlndXJhdGlvblNlcnZpY2VDb250cmFjdCB7XG5cbiAgICBwcml2YXRlIGxvY2FsU3RvcmFnZTogSUxvY2FsU3RvcmVNYW5hZ2VyQ29udHJhY3Q7XG4gICAgcHJpdmF0ZSB0cmFuc2xhdGlvblNlcnZpY2U6IElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdDtcbiAgICBwcml2YXRlIHRoZW1lTWFuYWdlcjogSVRoZW1lTWFuYWdlckNvbnRyYWN0O1xuXG4gICAgY29uc3RydWN0b3IobG9jYWxTdG9yZU1hbmFnZXJQcm92aWRlcjogTG9jYWxTdG9yZU1hbmFnZXJTZXJ2aWNlQWJzdHJhY3RQcm92aWRlcixcbiAgICAgICAgdHJhbnNsYXRpb25TZXJ2aWNlUHJvdmlkZXI6IFRyYW5zbGF0aW9uU2VydmljZUFic3RyYWN0UHJvdmlkZXIsXG4gICAgICAgIHRoZW1lTWFuYWdlclByb3ZpZGVyOiBUaGVtZU1hbmFnZXJBYnN0cmFjdFByb3ZpZGVyKSB7XG5cbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBsb2NhbFN0b3JlTWFuYWdlclByb3ZpZGVyLmdldCgpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZSA9IHRyYW5zbGF0aW9uU2VydmljZVByb3ZpZGVyLmdldCgpO1xuICAgICAgICB0aGlzLnRoZW1lTWFuYWdlciA9IHRoZW1lTWFuYWdlclByb3ZpZGVyLmdldCgpO1xuXG4gICAgICAgIHRoaXMubG9hZExvY2FsQ2hhbmdlcygpO1xuICAgIH1cblxuICAgIHNldCBsYW5ndWFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLkxBTkdVQUdFKTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2UuY2hhbmdlTGFuZ3VhZ2UodmFsdWUpO1xuICAgIH1cbiAgICBnZXQgbGFuZ3VhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYW5ndWFnZSB8fCBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0TGFuZ3VhZ2U7XG4gICAgfVxuXG5cbiAgICBzZXQgdGhlbWVJZCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuICAgICAgICB0aGlzLl90aGVtZUlkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLlRIRU1FX0lEKTtcbiAgICAgICAgdGhpcy50aGVtZU1hbmFnZXIuaW5zdGFsbFRoZW1lKHRoaXMudGhlbWVNYW5hZ2VyLmdldFRoZW1lQnlJRCh2YWx1ZSkpO1xuICAgIH1cbiAgICBnZXQgdGhlbWVJZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RoZW1lSWQgfHwgQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdFRoZW1lSWQ7XG4gICAgfVxuXG5cbiAgICBzZXQgaG9tZVVybCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2hvbWVVcmwgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuSE9NRV9VUkwpO1xuICAgIH1cbiAgICBnZXQgaG9tZVVybCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvbWVVcmwgfHwgQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdEhvbWVVcmw7XG4gICAgfVxuXG5cbiAgICBzZXQgc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3ModmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5zYXZlVG9Mb2NhbFN0b3JlKHZhbHVlLCBEQmtleXMuU0hPV19EQVNIQk9BUkRfU1RBVElTVElDUyk7XG4gICAgfVxuICAgIGdldCBzaG93RGFzaGJvYXJkU3RhdGlzdGljcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzICE9IG51bGwgPyB0aGlzLl9zaG93RGFzaGJvYXJkU3RhdGlzdGljcyA6IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRTaG93RGFzaGJvYXJkU3RhdGlzdGljcztcbiAgICB9XG5cblxuICAgIHNldCBzaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucyh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucyA9IHZhbHVlO1xuICAgICAgICB0aGlzLnNhdmVUb0xvY2FsU3RvcmUodmFsdWUsIERCa2V5cy5TSE9XX0RBU0hCT0FSRF9OT1RJRklDQVRJT05TKTtcbiAgICB9XG4gICAgZ2V0IHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnMgIT0gbnVsbCA/IHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zIDogQ29uZmlndXJhdGlvblNlcnZpY2VDb25zdGFudHMuZGVmYXVsdFNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zO1xuICAgIH1cblxuXG4gICAgc2V0IHNob3dEYXNoYm9hcmRUb2RvKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLlNIT1dfREFTSEJPQVJEX1RPRE8pO1xuICAgIH1cbiAgICBnZXQgc2hvd0Rhc2hib2FyZFRvZG8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG93RGFzaGJvYXJkVG9kbyAhPSBudWxsID8gdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gOiBDb25maWd1cmF0aW9uU2VydmljZUNvbnN0YW50cy5kZWZhdWx0U2hvd0Rhc2hib2FyZFRvZG87XG4gICAgfVxuXG5cbiAgICBzZXQgc2hvd0Rhc2hib2FyZEJhbm5lcih2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyID0gdmFsdWU7XG4gICAgICAgIHRoaXMuc2F2ZVRvTG9jYWxTdG9yZSh2YWx1ZSwgREJrZXlzLlNIT1dfREFTSEJPQVJEX0JBTk5FUik7XG4gICAgfVxuICAgIGdldCBzaG93RGFzaGJvYXJkQmFubmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciAhPSBudWxsID8gdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciA6IENvbmZpZ3VyYXRpb25TZXJ2aWNlQ29uc3RhbnRzLmRlZmF1bHRTaG93RGFzaGJvYXJkQmFubmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBiYXNlVXJsID0gZW52aXJvbm1lbnQuYmFzZVVybCB8fCBVdGlsaXRpZXMuYmFzZVVybCgpO1xuICAgIHB1YmxpYyB0b2tlblVybCA9IGVudmlyb25tZW50LnRva2VuVXJsIHx8IGVudmlyb25tZW50LmJhc2VVcmwgfHwgVXRpbGl0aWVzLmJhc2VVcmwoKTtcbiAgICBwdWJsaWMgbG9naW5VcmwgPSBlbnZpcm9ubWVudC5sb2dpblVybDtcbiAgICBwdWJsaWMgZmFsbGJhY2tCYXNlVXJsID0gJ2h0dHBzOi8vcXVpY2thcHAuZWJlbm1vbm5leS5jb20nO1xuICAgIC8vICoqKkVuZCBvZiBkZWZhdWx0cyoqKlxuXG4gICAgcHJpdmF0ZSBfbGFuZ3VhZ2U6IHN0cmluZyA9IG51bGw7XG4gICAgcHJpdmF0ZSBfaG9tZVVybDogc3RyaW5nID0gbnVsbDtcbiAgICBwcml2YXRlIF90aGVtZUlkOiBudW1iZXIgPSBudWxsO1xuICAgIHByaXZhdGUgX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBib29sZWFuID0gbnVsbDtcbiAgICBwcml2YXRlIF9zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9uczogYm9vbGVhbiA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc2hvd0Rhc2hib2FyZFRvZG86IGJvb2xlYW4gPSBudWxsO1xuICAgIHByaXZhdGUgX3Nob3dEYXNoYm9hcmRCYW5uZXI6IGJvb2xlYW4gPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBvbkNvbmZpZ3VyYXRpb25JbXBvcnRlZDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gICAgY29uZmlndXJhdGlvbkltcG9ydGVkJCA9IHRoaXMub25Db25maWd1cmF0aW9uSW1wb3J0ZWQuYXNPYnNlcnZhYmxlKCk7XG5cblxuXG4gICAgcHJpdmF0ZSBsb2FkTG9jYWxDaGFuZ2VzKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmxvY2FsU3RvcmFnZS5leGlzdHMoREJrZXlzLkxBTkdVQUdFKSkge1xuICAgICAgICAgICAgdGhpcy5fbGFuZ3VhZ2UgPSB0aGlzLmxvY2FsU3RvcmFnZS5nZXREYXRhT2JqZWN0PHN0cmluZz4oREJrZXlzLkxBTkdVQUdFLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS5jaGFuZ2VMYW5ndWFnZSh0aGlzLl9sYW5ndWFnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0TGFuZ3VhZ2UoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuVEhFTUVfSUQpKSB7XG4gICAgICAgICAgICB0aGlzLl90aGVtZUlkID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxudW1iZXI+KERCa2V5cy5USEVNRV9JRCwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy50aGVtZU1hbmFnZXIuaW5zdGFsbFRoZW1lKHRoaXMudGhlbWVNYW5hZ2VyLmdldFRoZW1lQnlJRCh0aGlzLl90aGVtZUlkKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VGhlbWUoKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuSE9NRV9VUkwpKSB7XG4gICAgICAgICAgICB0aGlzLl9ob21lVXJsID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxzdHJpbmc+KERCa2V5cy5IT01FX1VSTCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfU1RBVElTVElDUykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfU1RBVElTVElDUywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfVE9ETykpIHtcbiAgICAgICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0RGF0YU9iamVjdDxib29sZWFuPihEQmtleXMuU0hPV19EQVNIQk9BUkRfVE9ETywgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubG9jYWxTdG9yYWdlLmV4aXN0cyhEQmtleXMuU0hPV19EQVNIQk9BUkRfQkFOTkVSKSkge1xuICAgICAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciA9IHRoaXMubG9jYWxTdG9yYWdlLmdldERhdGFPYmplY3Q8Ym9vbGVhbj4oREJrZXlzLlNIT1dfREFTSEJPQVJEX0JBTk5FUiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHNhdmVUb0xvY2FsU3RvcmUoZGF0YTogYW55LCBrZXk6IHN0cmluZykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMubG9jYWxTdG9yYWdlLnNhdmVQZXJtYW5lbnREYXRhKGRhdGEsIGtleSkpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGltcG9ydChqc29uVmFsdWU6IHN0cmluZykge1xuXG4gICAgICAgIHRoaXMuY2xlYXJMb2NhbENoYW5nZXMoKTtcblxuICAgICAgICBpZiAoanNvblZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBpbXBvcnRWYWx1ZTogVXNlckNvbmZpZ3VyYXRpb24gPSBVdGlsaXRpZXMuSnNvblRyeVBhcnNlKGpzb25WYWx1ZSk7XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5sYW5ndWFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYW5ndWFnZSA9IGltcG9ydFZhbHVlLmxhbmd1YWdlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUudGhlbWVJZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aGVtZUlkID0gK2ltcG9ydFZhbHVlLnRoZW1lSWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5ob21lVXJsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvbWVVcmwgPSBpbXBvcnRWYWx1ZS5ob21lVXJsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Rhc2hib2FyZFN0YXRpc3RpY3MgPSBpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkU3RhdGlzdGljcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGltcG9ydFZhbHVlLnNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZE5vdGlmaWNhdGlvbnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpbXBvcnRWYWx1ZS5zaG93RGFzaGJvYXJkVG9kbyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGFzaGJvYXJkVG9kbyA9IGltcG9ydFZhbHVlLnNob3dEYXNoYm9hcmRUb2RvO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZEJhbm5lciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGFzaGJvYXJkQmFubmVyID0gaW1wb3J0VmFsdWUuc2hvd0Rhc2hib2FyZEJhbm5lcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25Db25maWd1cmF0aW9uSW1wb3J0ZWQubmV4dCgpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGV4cG9ydChjaGFuZ2VzT25seSA9IHRydWUpOiBzdHJpbmcge1xuXG4gICAgICAgIGNvbnN0IGV4cG9ydFZhbHVlOiBVc2VyQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIGxhbmd1YWdlOiBjaGFuZ2VzT25seSA/IHRoaXMuX2xhbmd1YWdlIDogdGhpcy5sYW5ndWFnZSxcbiAgICAgICAgICAgIHRoZW1lSWQ6IGNoYW5nZXNPbmx5ID8gdGhpcy5fdGhlbWVJZCA6IHRoaXMudGhlbWVJZCxcbiAgICAgICAgICAgIGhvbWVVcmw6IGNoYW5nZXNPbmx5ID8gdGhpcy5faG9tZVVybCA6IHRoaXMuaG9tZVVybCxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmRTdGF0aXN0aWNzOiBjaGFuZ2VzT25seSA/IHRoaXMuX3Nob3dEYXNoYm9hcmRTdGF0aXN0aWNzIDogdGhpcy5zaG93RGFzaGJvYXJkU3RhdGlzdGljcyxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmROb3RpZmljYXRpb25zOiBjaGFuZ2VzT25seSA/IHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zIDogdGhpcy5zaG93RGFzaGJvYXJkTm90aWZpY2F0aW9ucyxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmRUb2RvOiBjaGFuZ2VzT25seSA/IHRoaXMuX3Nob3dEYXNoYm9hcmRUb2RvIDogdGhpcy5zaG93RGFzaGJvYXJkVG9kbyxcbiAgICAgICAgICAgIHNob3dEYXNoYm9hcmRCYW5uZXI6IGNoYW5nZXNPbmx5ID8gdGhpcy5fc2hvd0Rhc2hib2FyZEJhbm5lciA6IHRoaXMuc2hvd0Rhc2hib2FyZEJhbm5lclxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShleHBvcnRWYWx1ZSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgY2xlYXJMb2NhbENoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuX2xhbmd1YWdlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fdGhlbWVJZCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2hvbWVVcmwgPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkU3RhdGlzdGljcyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3Nob3dEYXNoYm9hcmROb3RpZmljYXRpb25zID0gbnVsbDtcbiAgICAgICAgdGhpcy5fc2hvd0Rhc2hib2FyZFRvZG8gPSBudWxsO1xuICAgICAgICB0aGlzLl9zaG93RGFzaGJvYXJkQmFubmVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5MQU5HVUFHRSk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLlRIRU1FX0lEKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZGVsZXRlRGF0YShEQmtleXMuSE9NRV9VUkwpO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9TVEFUSVNUSUNTKTtcbiAgICAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZGVsZXRlRGF0YShEQmtleXMuU0hPV19EQVNIQk9BUkRfTk9USUZJQ0FUSU9OUyk7XG4gICAgICAgIHRoaXMubG9jYWxTdG9yYWdlLmRlbGV0ZURhdGEoREJrZXlzLlNIT1dfREFTSEJPQVJEX1RPRE8pO1xuICAgICAgICB0aGlzLmxvY2FsU3RvcmFnZS5kZWxldGVEYXRhKERCa2V5cy5TSE9XX0RBU0hCT0FSRF9CQU5ORVIpO1xuXG4gICAgICAgIHRoaXMucmVzZXRMYW5ndWFnZSgpO1xuICAgICAgICB0aGlzLnJlc2V0VGhlbWUoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgcmVzZXRMYW5ndWFnZSgpIHtcbiAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS51c2VCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICAgICAgICBpZiAobGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhbmd1YWdlID0gbGFuZ3VhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9sYW5ndWFnZSA9IHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnVzZURlZmF1bHRMYW5nYWdlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0VGhlbWUoKSB7XG4gICAgICAgIHRoaXMudGhlbWVNYW5hZ2VyLmluc3RhbGxUaGVtZSgpO1xuICAgICAgICB0aGlzLl90aGVtZUlkID0gbnVsbDtcbiAgICB9XG59XG4iXX0=