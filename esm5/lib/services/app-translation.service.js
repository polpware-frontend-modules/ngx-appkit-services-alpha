import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@ngx-translate/core";
var AppTranslationService = /** @class */ (function () {
    function AppTranslationService(translate) {
        this.translate = translate;
        this.onLanguageChanged = new Subject();
        this.languageChanged$ = this.onLanguageChanged.asObservable();
        this.addLanguages(['en', 'fr', 'de', 'pt', 'ar', 'ko']);
        this.setDefaultLanguage('en');
    }
    AppTranslationService.prototype.addLanguages = function (lang) {
        this.translate.addLangs(lang);
    };
    AppTranslationService.prototype.setDefaultLanguage = function (lang) {
        this.translate.setDefaultLang(lang);
    };
    AppTranslationService.prototype.getDefaultLanguage = function () {
        return this.translate.defaultLang;
    };
    AppTranslationService.prototype.getBrowserLanguage = function () {
        return this.translate.getBrowserLang();
    };
    AppTranslationService.prototype.getCurrentLanguage = function () {
        return this.translate.currentLang;
    };
    AppTranslationService.prototype.getLoadedLanguages = function () {
        return this.translate.langs;
    };
    AppTranslationService.prototype.useBrowserLanguage = function () {
        var browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    };
    AppTranslationService.prototype.useDefaultLangage = function () {
        return this.changeLanguage(null);
    };
    AppTranslationService.prototype.changeLanguage = function (language) {
        var _this = this;
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout(function () {
                _this.translate.use(language);
                _this.onLanguageChanged.next(language);
            });
        }
        return language;
    };
    AppTranslationService.prototype.getTranslation = function (key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    };
    AppTranslationService.prototype.getTranslationAsync = function (key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    };
    /** @nocollapse */ AppTranslationService.ɵfac = function AppTranslationService_Factory(t) { return new (t || AppTranslationService)(i0.ɵɵinject(i1.TranslateService)); };
    /** @nocollapse */ AppTranslationService.ɵprov = i0.ɵɵdefineInjectable({ token: AppTranslationService, factory: AppTranslationService.ɵfac });
    return AppTranslationService;
}());
export { AppTranslationService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AppTranslationService, [{
        type: Injectable
    }], function () { return [{ type: i1.TranslateService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRyYW5zbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcHAtdHJhbnNsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBYyxPQUFPLEVBQU0sTUFBTSxNQUFNLENBQUM7OztBQUkvQztJQU1JLCtCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUh2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2xELHFCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdyRCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLElBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGtEQUFrQixHQUFsQixVQUFtQixJQUFZO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxrREFBa0IsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxrREFBa0IsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTlDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsT0FBTyxXQUFXLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCw4Q0FBYyxHQUFkLFVBQWUsUUFBZ0I7UUFBL0IsaUJBYUM7UUFaRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsVUFBVSxDQUFDO2dCQUNQLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBR0QsOENBQWMsR0FBZCxVQUFlLEdBQTJCLEVBQUUsaUJBQTBCO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELG1EQUFtQixHQUFuQixVQUFvQixHQUEyQixFQUFFLGlCQUEwQjtRQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7aUhBdEVRLHFCQUFxQjtvRkFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjtnQ0FQbEM7Q0ErRUMsQUF6RUQsSUF5RUM7U0F4RVkscUJBQXFCO2tEQUFyQixxQkFBcUI7Y0FEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UsIFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdCB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcFRyYW5zbGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdCB7XG5cbiAgICBwcml2YXRlIG9uTGFuZ3VhZ2VDaGFuZ2VkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGxhbmd1YWdlQ2hhbmdlZCQgPSB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hZGRMYW5ndWFnZXMoWydlbicsICdmcicsICdkZScsICdwdCcsICdhcicsICdrbyddKTtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0TGFuZ3VhZ2UoJ2VuJyk7XG4gICAgfVxuXG4gICAgYWRkTGFuZ3VhZ2VzKGxhbmc6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLmFkZExhbmdzKGxhbmcpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdExhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZGVmYXVsdExhbmc7XG4gICAgfVxuXG4gICAgZ2V0QnJvd3Nlckxhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0QnJvd3NlckxhbmcoKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZztcbiAgICB9XG5cbiAgICBnZXRMb2FkZWRMYW5ndWFnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5sYW5ncztcbiAgICB9XG5cbiAgICB1c2VCcm93c2VyTGFuZ3VhZ2UoKTogc3RyaW5nIHwgdm9pZCB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXJMYW5nID0gdGhpcy5nZXRCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICAgICAgICBpZiAoYnJvd3NlckxhbmcubWF0Y2goL2VufGZyfGRlfHB0fGFyfGtvLykpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZ3VhZ2UoYnJvd3NlckxhbmcpO1xuICAgICAgICAgICAgcmV0dXJuIGJyb3dzZXJMYW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXNlRGVmYXVsdExhbmdhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUxhbmd1YWdlKG51bGwpO1xuICAgIH1cblxuICAgIGNoYW5nZUxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkge1xuICAgICAgICAgICAgbGFuZ3VhZ2UgPSB0aGlzLmdldERlZmF1bHRMYW5ndWFnZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlICE9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZS51c2UobGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZWQubmV4dChsYW5ndWFnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG5cblxuICAgIGdldFRyYW5zbGF0aW9uKGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBzdHJpbmcgfCBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaW5zdGFudChrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICB9XG5cblxuICAgIGdldFRyYW5zbGF0aW9uQXN5bmMoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5nZXQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgfVxuXG59XG4iXX0=