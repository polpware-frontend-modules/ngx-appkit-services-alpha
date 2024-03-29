import { TranslateService } from '@ngx-translate/core';
import { ITranslationServiceContract } from '@polpware/ngx-appkit-contracts-alpha';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AppTranslationService implements ITranslationServiceContract {
    private translate;
    private onLanguageChanged;
    languageChanged$: Observable<string>;
    constructor(translate: TranslateService);
    addLanguages(lang: string[]): void;
    setDefaultLanguage(lang: string): void;
    getDefaultLanguage(): string;
    getBrowserLanguage(): string;
    getCurrentLanguage(): string;
    getLoadedLanguages(): string[];
    useBrowserLanguage(): string | void;
    useDefaultLangage(): string;
    changeLanguage(language: string): string;
    getTranslation(key: string | Array<string>, interpolateParams?: Object): string | any;
    getTranslationAsync(key: string | Array<string>, interpolateParams?: Object): Observable<string | any>;
    static ɵfac: i0.ɵɵFactoryDef<AppTranslationService, never>;
    static ɵprov: i0.ɵɵInjectableDef<AppTranslationService>;
}
