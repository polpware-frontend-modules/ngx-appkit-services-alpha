import { NgModule } from '@angular/core';
import { AlertService } from './services/alert.service';
import { ConfigurationService } from './services/configuration.service';
import { AppTranslationService } from './services/app-translation.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { ThemeManager } from './services/theme-manager';
import * as i0 from "@angular/core";
export class NgxAppkitServicesAlphaModule {
}
/** @nocollapse */ NgxAppkitServicesAlphaModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxAppkitServicesAlphaModule });
/** @nocollapse */ NgxAppkitServicesAlphaModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxAppkitServicesAlphaModule_Factory(t) { return new (t || NgxAppkitServicesAlphaModule)(); }, providers: [
        AlertService,
        ConfigurationService,
        AppTranslationService,
        LocalStoreManager,
        ThemeManager
    ], imports: [[]] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgxAppkitServicesAlphaModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [],
                exports: [],
                providers: [
                    AlertService,
                    ConfigurationService,
                    AppTranslationService,
                    LocalStoreManager,
                    ThemeManager
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBaUJ4RCxNQUFNLE9BQU8sNEJBQTRCOzttRkFBNUIsNEJBQTRCOzBKQUE1Qiw0QkFBNEIsbUJBVDFCO1FBQ1AsWUFBWTtRQUNaLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLFlBQVk7S0FDZixZQVRRLEVBQ1I7a0RBV1EsNEJBQTRCO2NBZHhDLFFBQVE7ZUFBQztnQkFDTixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFFLEVBQ1I7Z0JBQ0QsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLGlCQUFpQjtvQkFDakIsWUFBWTtpQkFDZjthQUVKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWd1cmF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwVHJhbnNsYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9hcHAtdHJhbnNsYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbFN0b3JlTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvbG9jYWwtc3RvcmUtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFRoZW1lTWFuYWdlciB9IGZyb20gJy4vc2VydmljZXMvdGhlbWUtbWFuYWdlcic7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBkZWNsYXJhdGlvbnM6IFtdLFxuICAgIGltcG9ydHM6IFtcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBbGVydFNlcnZpY2UsXG4gICAgICAgIENvbmZpZ3VyYXRpb25TZXJ2aWNlLFxuICAgICAgICBBcHBUcmFuc2xhdGlvblNlcnZpY2UsXG4gICAgICAgIExvY2FsU3RvcmVNYW5hZ2VyLFxuICAgICAgICBUaGVtZU1hbmFnZXJcbiAgICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgTmd4QXBwa2l0U2VydmljZXNBbHBoYU1vZHVsZSB7IH1cbiJdfQ==