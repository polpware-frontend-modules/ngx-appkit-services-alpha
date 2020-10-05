import { AppTheme, IThemeManagerContract } from '@polpware/ngx-appkit-contracts-alpha';
import * as i0 from "@angular/core";
export declare class ThemeManager implements IThemeManagerContract {
    themes: Array<AppTheme>;
    installTheme(theme?: AppTheme): void;
    getDefaultTheme(): AppTheme;
    getThemeByID(id: number): AppTheme;
    private setStyle;
    private removeStyle;
    private getLinkElementForKey;
    private getExistingLinkElementByKey;
    private createLinkElementWithKey;
    private getClassNameForKey;
    static ɵfac: i0.ɵɵFactoryDef<ThemeManager, never>;
    static ɵprov: i0.ɵɵInjectableDef<ThemeManager>;
}
