import { NgModule } from '@angular/core';
import { AlertService } from './services/alert.service';
import { ConfigurationService } from './services/configuration.service';
import { AppTranslationService } from './services/app-translation.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { ThemeManager } from './services/theme-manager';
import * as i0 from "@angular/core";
var NgxAppkitServicesAlphaModule = /** @class */ (function () {
    function NgxAppkitServicesAlphaModule() {
    }
    /** @nocollapse */ NgxAppkitServicesAlphaModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgxAppkitServicesAlphaModule });
    /** @nocollapse */ NgxAppkitServicesAlphaModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgxAppkitServicesAlphaModule_Factory(t) { return new (t || NgxAppkitServicesAlphaModule)(); }, providers: [
            AlertService,
            ConfigurationService,
            AppTranslationService,
            LocalStoreManager,
            ThemeManager
        ], imports: [[]] });
    return NgxAppkitServicesAlphaModule;
}());
export { NgxAppkitServicesAlphaModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcG9scHdhcmUvbmd4LWFwcGtpdC1zZXJ2aWNlcy1hbHBoYS8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUN4RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBR3hEO0lBQUE7S0FjNkM7dUZBQWhDLDRCQUE0Qjs4SkFBNUIsNEJBQTRCLG1CQVQxQjtZQUNQLFlBQVk7WUFDWixvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLGlCQUFpQjtZQUNqQixZQUFZO1NBQ2YsWUFUUSxFQUNSO3VDQVpMO0NBdUI2QyxBQWQ3QyxJQWM2QztTQUFoQyw0QkFBNEI7a0RBQTVCLDRCQUE0QjtjQWR4QyxRQUFRO2VBQUM7Z0JBQ04sWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxFQUNSO2dCQUNELE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRTtvQkFDUCxZQUFZO29CQUNaLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixpQkFBaUI7b0JBQ2pCLFlBQVk7aUJBQ2Y7YUFFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFsZXJ0U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvYXBwLXRyYW5zbGF0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTdG9yZU1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL2xvY2FsLXN0b3JlLW1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBUaGVtZU1hbmFnZXIgfSBmcm9tICcuL3NlcnZpY2VzL3RoZW1lLW1hbmFnZXInO1xuXG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQWxlcnRTZXJ2aWNlLFxuICAgICAgICBDb25maWd1cmF0aW9uU2VydmljZSxcbiAgICAgICAgQXBwVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgICAgICBMb2NhbFN0b3JlTWFuYWdlcixcbiAgICAgICAgVGhlbWVNYW5hZ2VyXG4gICAgXVxuXG59KVxuZXhwb3J0IGNsYXNzIE5neEFwcGtpdFNlcnZpY2VzQWxwaGFNb2R1bGUgeyB9XG4iXX0=