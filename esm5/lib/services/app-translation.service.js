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
    /** @nocollapse */ AppTranslationService.ɵprov = i0.ɵɵdefineInjectable({ token: AppTranslationService, factory: AppTranslationService.ɵfac, providedIn: 'root' });
    return AppTranslationService;
}());
export { AppTranslationService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AppTranslationService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.TranslateService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRyYW5zbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcHAtdHJhbnNsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQUUzQztJQVFJLCtCQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUh2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2xELHFCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdyRCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNENBQVksR0FBWixVQUFhLElBQWM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGtEQUFrQixHQUFsQixVQUFtQixJQUFZO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxrREFBa0IsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxrREFBa0IsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELGtEQUFrQixHQUFsQjtRQUNJLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTlDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsT0FBTyxXQUFXLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsaURBQWlCLEdBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCw4Q0FBYyxHQUFkLFVBQWUsUUFBZ0I7UUFBL0IsaUJBYUM7UUFaRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsVUFBVSxDQUFDO2dCQUNQLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBR0QsOENBQWMsR0FBZCxVQUFlLEdBQTJCLEVBQUUsaUJBQTBCO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUdELG1EQUFtQixHQUFuQixVQUFvQixHQUEyQixFQUFFLGlCQUEwQjtRQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7aUhBdEVRLHFCQUFxQjtvRkFBckIscUJBQXFCLFdBQXJCLHFCQUFxQixtQkFGbEIsTUFBTTtnQ0FOdEI7Q0FnRkMsQUEzRUQsSUEyRUM7U0F4RVkscUJBQXFCO2tEQUFyQixxQkFBcUI7Y0FIakMsVUFBVTtlQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNsYXRlU2VydmljZSB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgSVRyYW5zbGF0aW9uU2VydmljZUNvbnRyYWN0IH0gZnJvbSAnQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBcHBUcmFuc2xhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJVHJhbnNsYXRpb25TZXJ2aWNlQ29udHJhY3Qge1xuXG4gICAgcHJpdmF0ZSBvbkxhbmd1YWdlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBsYW5ndWFnZUNoYW5nZWQkID0gdGhpcy5vbkxhbmd1YWdlQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuYWRkTGFuZ3VhZ2VzKFsnZW4nLCAnZnInLCAnZGUnLCAncHQnLCAnYXInLCAna28nXSk7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdExhbmd1YWdlKCdlbicpO1xuICAgIH1cblxuICAgIGFkZExhbmd1YWdlcyhsYW5nOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5hZGRMYW5ncyhsYW5nKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0TGFuZ3VhZ2UobGFuZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRMYW5ndWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmRlZmF1bHRMYW5nO1xuICAgIH1cblxuICAgIGdldEJyb3dzZXJMYW5ndWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldEJyb3dzZXJMYW5nKCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmc7XG4gICAgfVxuXG4gICAgZ2V0TG9hZGVkTGFuZ3VhZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUubGFuZ3M7XG4gICAgfVxuXG4gICAgdXNlQnJvd3Nlckxhbmd1YWdlKCk6IHN0cmluZyB8IHZvaWQge1xuICAgICAgICBjb25zdCBicm93c2VyTGFuZyA9IHRoaXMuZ2V0QnJvd3Nlckxhbmd1YWdlKCk7XG5cbiAgICAgICAgaWYgKGJyb3dzZXJMYW5nLm1hdGNoKC9lbnxmcnxkZXxwdHxhcnxrby8pKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUxhbmd1YWdlKGJyb3dzZXJMYW5nKTtcbiAgICAgICAgICAgIHJldHVybiBicm93c2VyTGFuZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVzZURlZmF1bHRMYW5nYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VMYW5ndWFnZShudWxsKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gdGhpcy5nZXREZWZhdWx0TGFuZ3VhZ2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYW5ndWFnZSAhPSB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkLm5leHQobGFuZ3VhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgfVxuXG5cbiAgICBnZXRUcmFuc2xhdGlvbihrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHwgYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmluc3RhbnQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgfVxuXG5cbiAgICBnZXRUcmFuc2xhdGlvbkFzeW5jKGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxufVxuIl19