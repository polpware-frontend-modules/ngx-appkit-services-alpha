/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/app-translation.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
var AppTranslationService = /** @class */ (function () {
    function AppTranslationService(translate) {
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
    AppTranslationService.prototype.addLanguages = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.translate.addLangs(lang);
    };
    /**
     * @param {?} lang
     * @return {?}
     */
    AppTranslationService.prototype.setDefaultLanguage = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        this.translate.setDefaultLang(lang);
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getDefaultLanguage = /**
     * @return {?}
     */
    function () {
        return this.translate.defaultLang;
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getBrowserLanguage = /**
     * @return {?}
     */
    function () {
        return this.translate.getBrowserLang();
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getCurrentLanguage = /**
     * @return {?}
     */
    function () {
        return this.translate.currentLang;
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.getLoadedLanguages = /**
     * @return {?}
     */
    function () {
        return this.translate.langs;
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.useBrowserLanguage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var browserLang = this.getBrowserLanguage();
        if (browserLang.match(/en|fr|de|pt|ar|ko/)) {
            this.changeLanguage(browserLang);
            return browserLang;
        }
    };
    /**
     * @return {?}
     */
    AppTranslationService.prototype.useDefaultLangage = /**
     * @return {?}
     */
    function () {
        return this.changeLanguage(null);
    };
    /**
     * @param {?} language
     * @return {?}
     */
    AppTranslationService.prototype.changeLanguage = /**
     * @param {?} language
     * @return {?}
     */
    function (language) {
        var _this = this;
        if (!language) {
            language = this.getDefaultLanguage();
        }
        if (language != this.translate.currentLang) {
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.translate.use(language);
                _this.onLanguageChanged.next(language);
            }));
        }
        return language;
    };
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    AppTranslationService.prototype.getTranslation = /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    function (key, interpolateParams) {
        return this.translate.instant(key, interpolateParams);
    };
    /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    AppTranslationService.prototype.getTranslationAsync = /**
     * @param {?} key
     * @param {?=} interpolateParams
     * @return {?}
     */
    function (key, interpolateParams) {
        return this.translate.get(key, interpolateParams);
    };
    AppTranslationService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AppTranslationService.ctorParameters = function () { return [
        { type: TranslateService }
    ]; };
    return AppTranslationService;
}());
export { AppTranslationService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXRyYW5zbGF0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9hcHAtdHJhbnNsYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBQ3hFLE9BQU8sRUFBYyxPQUFPLEVBQU0sTUFBTSxNQUFNLENBQUM7QUFJL0M7SUFNSSwrQkFBb0IsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7UUFIdkMsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNsRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFHckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7SUFFRCw0Q0FBWTs7OztJQUFaLFVBQWEsSUFBYztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7OztJQUVELGtEQUFrQjs7OztJQUFsQixVQUFtQixJQUFZO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCxrREFBa0I7OztJQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELGtEQUFrQjs7O0lBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNDLENBQUM7Ozs7SUFFRCxrREFBa0I7OztJQUFsQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVELGtEQUFrQjs7O0lBQWxCO1FBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDOzs7O0lBRUQsa0RBQWtCOzs7SUFBbEI7O1lBQ1UsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtRQUU3QyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sV0FBVyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQzs7OztJQUVELGlEQUFpQjs7O0lBQWpCO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsOENBQWM7Ozs7SUFBZCxVQUFlLFFBQWdCO1FBQS9CLGlCQWFDO1FBWkcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUN4QztRQUVELElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ3hDLFVBQVU7OztZQUFDO2dCQUNQLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLENBQUMsRUFBQyxDQUFDO1NBQ047UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDOzs7Ozs7SUFHRCw4Q0FBYzs7Ozs7SUFBZCxVQUFlLEdBQTJCLEVBQUUsaUJBQTBCO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7O0lBR0QsbURBQW1COzs7OztJQUFuQixVQUFvQixHQUEyQixFQUFFLGlCQUEwQjtRQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O2dCQXZFSixVQUFVOzs7O2dCQUxGLGdCQUFnQjs7SUE4RXpCLDRCQUFDO0NBQUEsQUF6RUQsSUF5RUM7U0F4RVkscUJBQXFCOzs7Ozs7SUFFOUIsa0RBQWtEOztJQUNsRCxpREFBeUQ7Ozs7O0lBRTdDLDBDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyYW5zbGF0ZVNlcnZpY2UsIFRyYW5zbGF0ZUxvYWRlciB9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdCB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFwcFRyYW5zbGF0aW9uU2VydmljZSBpbXBsZW1lbnRzIElUcmFuc2xhdGlvblNlcnZpY2VDb250cmFjdCB7XG5cbiAgICBwcml2YXRlIG9uTGFuZ3VhZ2VDaGFuZ2VkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuICAgIGxhbmd1YWdlQ2hhbmdlZCQgPSB0aGlzLm9uTGFuZ3VhZ2VDaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0cmFuc2xhdGU6IFRyYW5zbGF0ZVNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy5hZGRMYW5ndWFnZXMoWydlbicsICdmcicsICdkZScsICdwdCcsICdhcicsICdrbyddKTtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0TGFuZ3VhZ2UoJ2VuJyk7XG4gICAgfVxuXG4gICAgYWRkTGFuZ3VhZ2VzKGxhbmc6IHN0cmluZ1tdKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlLmFkZExhbmdzKGxhbmcpO1xuICAgIH1cblxuICAgIHNldERlZmF1bHRMYW5ndWFnZShsYW5nOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUuc2V0RGVmYXVsdExhbmcobGFuZyk7XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdExhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZGVmYXVsdExhbmc7XG4gICAgfVxuXG4gICAgZ2V0QnJvd3Nlckxhbmd1YWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuZ2V0QnJvd3NlckxhbmcoKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50TGFuZ3VhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5jdXJyZW50TGFuZztcbiAgICB9XG5cbiAgICBnZXRMb2FkZWRMYW5ndWFnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5sYW5ncztcbiAgICB9XG5cbiAgICB1c2VCcm93c2VyTGFuZ3VhZ2UoKTogc3RyaW5nIHwgdm9pZCB7XG4gICAgICAgIGNvbnN0IGJyb3dzZXJMYW5nID0gdGhpcy5nZXRCcm93c2VyTGFuZ3VhZ2UoKTtcblxuICAgICAgICBpZiAoYnJvd3NlckxhbmcubWF0Y2goL2VufGZyfGRlfHB0fGFyfGtvLykpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlTGFuZ3VhZ2UoYnJvd3NlckxhbmcpO1xuICAgICAgICAgICAgcmV0dXJuIGJyb3dzZXJMYW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXNlRGVmYXVsdExhbmdhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZUxhbmd1YWdlKG51bGwpO1xuICAgIH1cblxuICAgIGNoYW5nZUxhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCFsYW5ndWFnZSkge1xuICAgICAgICAgICAgbGFuZ3VhZ2UgPSB0aGlzLmdldERlZmF1bHRMYW5ndWFnZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhbmd1YWdlICE9IHRoaXMudHJhbnNsYXRlLmN1cnJlbnRMYW5nKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZS51c2UobGFuZ3VhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub25MYW5ndWFnZUNoYW5nZWQubmV4dChsYW5ndWFnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYW5ndWFnZTtcbiAgICB9XG5cblxuICAgIGdldFRyYW5zbGF0aW9uKGtleTogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgaW50ZXJwb2xhdGVQYXJhbXM/OiBPYmplY3QpOiBzdHJpbmcgfCBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGUuaW5zdGFudChrZXksIGludGVycG9sYXRlUGFyYW1zKTtcbiAgICB9XG5cblxuICAgIGdldFRyYW5zbGF0aW9uQXN5bmMoa2V5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBpbnRlcnBvbGF0ZVBhcmFtcz86IE9iamVjdCk6IE9ic2VydmFibGU8c3RyaW5nIHwgYW55PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZS5nZXQoa2V5LCBpbnRlcnBvbGF0ZVBhcmFtcyk7XG4gICAgfVxuXG59XG4iXX0=