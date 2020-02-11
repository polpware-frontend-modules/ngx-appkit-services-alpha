/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/app-translation.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
export class AppTranslationService {
    /**
     * @param {?} translate
     */
    constructor(translate) {
        this.translate = translate;
        this.onLanguageChanged = new Subject();
        this.languageChanged$ = this.onLanguageChanged.asObservable();
        this.addLanguages(['en', 'fr', 'de', 'pt', 'ar', 'ko']);
        this.setDefaultLanguage('en');
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    addLanguages(lang) {
        this.translate.addLangs(lang);
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    setDefaultLanguage(lang) {
        this.translate.setDefaultLang(lang);
    }
    /**
     * @return {?}
     */
    getDefaultLanguage() {
        return this.translate.defaultLang;
    }
    /**
     * @return {?}
     */
    getBrowserLanguage() {
        return this.translate.getBrowserLang();
    }
    /**
     * @return {?}
     */
    getCurrentLanguage() {
        return this.translate.currentLang;
    }
    /**
     * @return {?}
     */
    getLoadedLanguages() {
        return this.translate.langs;
    }
    /**
     * @return {?}
     */
    useBrowserLanguage() {
        /** @type {?} */
        const browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    }
    /**
     * @return {?}
     */
    useDefaultLangage() {
        return this.changeLanguage(null);
    }
    /**
     * @param {?} language
     * @return {?}
     */
    changeLanguage(language) {
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.translate.use(language);
                this.onLanguageChanged.next(language);
            }));
        }
        return language;
    }
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    getTranslation(key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    }
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    getTranslationAsync(key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    }
}
AppTranslationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AppTranslationService.ctorParameters = () => [
    { type: TranslateService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AppTranslationService.prototype.onLanguageChanged;
    /** @type {?} */
    AppTranslationService.prototype.languageChanged$;
    /**
     * @type {?}
     * @private
     */
    AppTranslationService.prototype.translate;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRyYW5zbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcHAtdHJhbnNsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBYyxPQUFPLEVBQU0sTUFBTSxNQUFNLENBQUM7QUFLL0MsTUFBTSxPQUFPLHFCQUFxQjs7OztJQUs5QixZQUFvQixTQUEyQjtRQUEzQixjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUh2QyxzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2xELHFCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUdyRCxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELFlBQVksQ0FBQyxJQUFjO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsSUFBWTtRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQztJQUN0QyxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFFRCxrQkFBa0I7O2NBQ1IsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUU3QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sV0FBVyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7OztJQUVELGlCQUFpQjtRQUNiLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELGNBQWMsQ0FBQyxRQUFnQjtRQUMzQixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDeEMsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBQyxDQUFDO1NBQ047UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFHRCxjQUFjLENBQUMsR0FBMkIsRUFBRSxpQkFBMEI7UUFDbEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFHRCxtQkFBbUIsQ0FBQyxHQUEyQixFQUFFLGlCQUEwQjtRQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7OztZQXZFSixVQUFVOzs7O1lBTEYsZ0JBQWdCOzs7Ozs7O0lBUXJCLGtEQUFrRDs7SUFDbEQsaURBQXlEOzs7OztJQUU3QywwQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGVTZXJ2aWNlLCBUcmFuc2xhdGVMb2FkZXIgfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJVHJhbnNsYXRpb25TZXJ2aWNlQ29udHJhY3QgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBcHBUcmFuc2xhdGlvblNlcnZpY2UgaW1wbGVtZW50cyBJVHJhbnNsYXRpb25TZXJ2aWNlQ29udHJhY3Qge1xuXG4gICAgcHJpdmF0ZSBvbkxhbmd1YWdlQ2hhbmdlZCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgICBsYW5ndWFnZUNoYW5nZWQkID0gdGhpcy5vbkxhbmd1YWdlQ2hhbmdlZC5hc09ic2VydmFibGUoKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHJhbnNsYXRlOiBUcmFuc2xhdGVTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuYWRkTGFuZ3VhZ2VzKFsnZW4nLCAnZnInLCAnZGUnLCAncHQnLCAnYXInLCAna28nXSk7XG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdExhbmd1YWdlKCdlbicpO1xuICAgIH1cblxuICAgIGFkZExhbmd1YWdlcyhsYW5nOiBzdHJpbmdbXSkge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZS5hZGRMYW5ncyhsYW5nKTtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0TGFuZ3VhZ2UobGFuZzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLnNldERlZmF1bHRMYW5nKGxhbmcpO1xuICAgIH1cblxuICAgIGdldERlZmF1bHRMYW5ndWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmRlZmF1bHRMYW5nO1xuICAgIH1cblxuICAgIGdldEJyb3dzZXJMYW5ndWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmdldEJyb3dzZXJMYW5nKCk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudExhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuY3VycmVudExhbmc7XG4gICAgfVxuXG4gICAgZ2V0TG9hZGVkTGFuZ3VhZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUubGFuZ3M7XG4gICAgfVxuXG4gICAgdXNlQnJvd3Nlckxhbmd1YWdlKCk6IHN0cmluZyB8IHZvaWQge1xuICAgICAgICBjb25zdCBicm93c2VyTGFuZyA9IHRoaXMuZ2V0QnJvd3Nlckxhbmd1YWdlKCk7XG5cbiAgICAgICAgaWYgKGJyb3dzZXJMYW5nLm1hdGNoKC9lbnxmcnxkZXxwdHxhcnxrby8pKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZUxhbmd1YWdlKGJyb3dzZXJMYW5nKTtcbiAgICAgICAgICAgIHJldHVybiBicm93c2VyTGFuZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVzZURlZmF1bHRMYW5nYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VMYW5ndWFnZShudWxsKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICghbGFuZ3VhZ2UpIHtcbiAgICAgICAgICAgIGxhbmd1YWdlID0gdGhpcy5nZXREZWZhdWx0TGFuZ3VhZ2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYW5ndWFnZSAhPSB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGUudXNlKGxhbmd1YWdlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkLm5leHQobGFuZ3VhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGFuZ3VhZ2U7XG4gICAgfVxuXG5cbiAgICBnZXRUcmFuc2xhdGlvbihrZXk6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGludGVycG9sYXRlUGFyYW1zPzogT2JqZWN0KTogc3RyaW5nIHwgYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlLmluc3RhbnQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgfVxuXG5cbiAgICBnZXRUcmFuc2xhdGlvbkFzeW5jKGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBPYnNlcnZhYmxlPHN0cmluZyB8IGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0KGtleSwgaW50ZXJwb2xhdGVQYXJhbXMpO1xuICAgIH1cblxufVxuIl19