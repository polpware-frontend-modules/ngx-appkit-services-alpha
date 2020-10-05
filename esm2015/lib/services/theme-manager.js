// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ThemeManager {
    constructor() {
        this.themes = [
            {
                id: 1,
                name: 'Default',
                href: 'bootstrap.css',
                isDefault: true,
                background: '#007bff',
                color: '#fff'
            },
            {
                id: 2,
                name: 'Cosmo',
                href: 'cosmo.css',
                background: '#2780E3',
                color: '#373a3c'
            },
            {
                id: 3,
                name: 'Lumen',
                href: 'lumen.css',
                background: '#158CBA',
                color: '#f0f0f0'
            },
            {
                id: 4,
                name: 'Cerulean',
                href: 'cerulean.css',
                background: '#2FA4E7',
                color: '#e9ecef'
            },
            {
                id: 5,
                name: 'Minty',
                href: 'minty.css',
                background: '#78C2AD',
                color: '#F3969A'
            },
            {
                id: 6,
                name: 'Sketchy',
                href: 'sketchy.css',
                background: '#333',
                color: 'white'
            },
            {
                id: 7,
                name: 'Slate',
                href: 'slate.css',
                background: '#3A3F44',
                color: '#7A8288',
                isDark: true
            },
            {
                id: 8,
                name: 'Flatly',
                href: 'flatly.css',
                background: '#2C3E50',
                color: '#18BC9C'
            },
            {
                id: 9,
                name: 'Pulse',
                href: 'pulse.css',
                background: '#593196',
                color: '#A991D4'
            },
            {
                id: 10,
                name: 'Spacelab',
                href: 'spacelab.css',
                background: '#446E9B',
                color: '#999'
            },
            {
                id: 11,
                name: 'United',
                href: 'united.css',
                background: '#E95420',
                color: '#fff'
            },
            {
                id: 12,
                name: 'Journal',
                href: 'journal.css',
                background: '#EB6864',
                color: '#aaa'
            },
            {
                id: 13,
                name: 'Superhero',
                href: 'superhero.css',
                background: '#DF691A',
                color: '#2B3E50',
                isDark: true
            },
            {
                id: 14,
                name: 'Solar',
                href: 'solar.css',
                background: '#B58900',
                color: '#002B36',
                isDark: true
            }
        ];
    }
    installTheme(theme) {
        if (theme == null || theme.isDefault) {
            this.removeStyle('theme');
        }
        else {
            this.setStyle('theme', `assets/themes/${theme.href}`);
        }
    }
    getDefaultTheme() {
        return this.themes.find(theme => theme.isDefault);
    }
    getThemeByID(id) {
        return this.themes.find(theme => theme.id === id);
    }
    setStyle(key, href) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    }
    removeStyle(key) {
        const existingLinkElement = this.getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }
    getLinkElementForKey(key) {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    }
    getExistingLinkElementByKey(key) {
        return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
    }
    createLinkElementWithKey(key) {
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    }
    getClassNameForKey(key) {
        return `style-manager-${key}`;
    }
}
/** @nocollapse */ ThemeManager.ɵfac = function ThemeManager_Factory(t) { return new (t || ThemeManager)(); };
/** @nocollapse */ ThemeManager.ɵprov = i0.ɵɵdefineInjectable({ token: ThemeManager, factory: ThemeManager.ɵfac });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ThemeManager, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RoZW1lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0NBQWdDO0FBQ2hDLDZCQUE2QjtBQUM3QiwrQkFBK0I7QUFDL0IsZ0NBQWdDO0FBRWhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTyxZQUFZO0lBRHpCO1FBRUksV0FBTSxHQUFvQjtZQUN0QjtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsZUFBZTtnQkFDckIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsU0FBUzthQUNuQjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsU0FBUzthQUNuQjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFF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O1FBQ2xFLElBQUksbUJBQW1CLEVBQUU7WUFDckIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNsRDtJQUNMLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RixDQUFDO0lBRU8sMkJBQTJCLENBQUMsR0FBVztRQUMzQyxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLDBCQUEwQixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxHQUFXO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLGtCQUFrQixDQUFDLEdBQVc7UUFDbEMsT0FBTyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7MkZBdkpRLFlBQVk7dUVBQVosWUFBWSxXQUFaLFlBQVk7a0RBQVosWUFBWTtjQUR4QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEVtYWlsOiBpbmZvQGViZW5tb25uZXkuY29tXG4vLyB3d3cuZWJlbm1vbm5leS5jb20vdGVtcGxhdGVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBcHBUaGVtZSwgSVRoZW1lTWFuYWdlckNvbnRyYWN0IH0gZnJvbSAnQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRoZW1lTWFuYWdlciBpbXBsZW1lbnRzIElUaGVtZU1hbmFnZXJDb250cmFjdCB7XG4gICAgdGhlbWVzOiBBcnJheTxBcHBUaGVtZT4gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgbmFtZTogJ0RlZmF1bHQnLFxuICAgICAgICAgICAgaHJlZjogJ2Jvb3RzdHJhcC5jc3MnLFxuICAgICAgICAgICAgaXNEZWZhdWx0OiB0cnVlLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyMwMDdiZmYnLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgIG5hbWU6ICdDb3NtbycsXG4gICAgICAgICAgICBocmVmOiAnY29zbW8uY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMjc4MEUzJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzM3M2EzYydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICBuYW1lOiAnTHVtZW4nLFxuICAgICAgICAgICAgaHJlZjogJ2x1bWVuLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzE1OENCQScsXG4gICAgICAgICAgICBjb2xvcjogJyNmMGYwZjAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgICAgbmFtZTogJ0NlcnVsZWFuJyxcbiAgICAgICAgICAgIGhyZWY6ICdjZXJ1bGVhbi5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyRkE0RTcnLFxuICAgICAgICAgICAgY29sb3I6ICcjZTllY2VmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgIG5hbWU6ICdNaW50eScsXG4gICAgICAgICAgICBocmVmOiAnbWludHkuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjNzhDMkFEJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI0YzOTY5QSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDYsXG4gICAgICAgICAgICBuYW1lOiAnU2tldGNoeScsXG4gICAgICAgICAgICBocmVmOiAnc2tldGNoeS5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyMzMzMnLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDcsXG4gICAgICAgICAgICBuYW1lOiAnU2xhdGUnLFxuICAgICAgICAgICAgaHJlZjogJ3NsYXRlLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzNBM0Y0NCcsXG4gICAgICAgICAgICBjb2xvcjogJyM3QTgyODgnLFxuICAgICAgICAgICAgaXNEYXJrOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiA4LFxuICAgICAgICAgICAgbmFtZTogJ0ZsYXRseScsXG4gICAgICAgICAgICBocmVmOiAnZmxhdGx5LmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzJDM0U1MCcsXG4gICAgICAgICAgICBjb2xvcjogJyMxOEJDOUMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiA5LFxuICAgICAgICAgICAgbmFtZTogJ1B1bHNlJyxcbiAgICAgICAgICAgIGhyZWY6ICdwdWxzZS5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyM1OTMxOTYnLFxuICAgICAgICAgICAgY29sb3I6ICcjQTk5MUQ0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTAsXG4gICAgICAgICAgICBuYW1lOiAnU3BhY2VsYWInLFxuICAgICAgICAgICAgaHJlZjogJ3NwYWNlbGFiLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzQ0NkU5QicsXG4gICAgICAgICAgICBjb2xvcjogJyM5OTknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMSxcbiAgICAgICAgICAgIG5hbWU6ICdVbml0ZWQnLFxuICAgICAgICAgICAgaHJlZjogJ3VuaXRlZC5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNFOTU0MjAnLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTIsXG4gICAgICAgICAgICBuYW1lOiAnSm91cm5hbCcsXG4gICAgICAgICAgICBocmVmOiAnam91cm5hbC5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNFQjY4NjQnLFxuICAgICAgICAgICAgY29sb3I6ICcjYWFhJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTMsXG4gICAgICAgICAgICBuYW1lOiAnU3VwZXJoZXJvJyxcbiAgICAgICAgICAgIGhyZWY6ICdzdXBlcmhlcm8uY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjREY2OTFBJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzJCM0U1MCcsXG4gICAgICAgICAgICBpc0Rhcms6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDE0LFxuICAgICAgICAgICAgbmFtZTogJ1NvbGFyJyxcbiAgICAgICAgICAgIGhyZWY6ICdzb2xhci5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNCNTg5MDAnLFxuICAgICAgICAgICAgY29sb3I6ICcjMDAyQjM2JyxcbiAgICAgICAgICAgIGlzRGFyazogdHJ1ZVxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHB1YmxpYyBpbnN0YWxsVGhlbWUodGhlbWU/OiBBcHBUaGVtZSkge1xuICAgICAgICBpZiAodGhlbWUgPT0gbnVsbCB8fCB0aGVtZS5pc0RlZmF1bHQpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3R5bGUoJ3RoZW1lJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0eWxlKCd0aGVtZScsIGBhc3NldHMvdGhlbWVzLyR7dGhlbWUuaHJlZn1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXREZWZhdWx0VGhlbWUoKTogQXBwVGhlbWUge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVtZXMuZmluZCh0aGVtZSA9PiB0aGVtZS5pc0RlZmF1bHQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUaGVtZUJ5SUQoaWQ6IG51bWJlcik6IEFwcFRoZW1lIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGhlbWVzLmZpbmQodGhlbWUgPT4gdGhlbWUuaWQgPT09IGlkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFN0eWxlKGtleTogc3RyaW5nLCBocmVmOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5nZXRMaW5rRWxlbWVudEZvcktleShrZXkpLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlU3R5bGUoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmdMaW5rRWxlbWVudCA9IHRoaXMuZ2V0RXhpc3RpbmdMaW5rRWxlbWVudEJ5S2V5KGtleSk7XG4gICAgICAgIGlmIChleGlzdGluZ0xpbmtFbGVtZW50KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGV4aXN0aW5nTGlua0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRMaW5rRWxlbWVudEZvcktleShrZXk6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRFeGlzdGluZ0xpbmtFbGVtZW50QnlLZXkoa2V5KSB8fCB0aGlzLmNyZWF0ZUxpbmtFbGVtZW50V2l0aEtleShrZXkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RXhpc3RpbmdMaW5rRWxlbWVudEJ5S2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3IoYGxpbmtbcmVsPVwic3R5bGVzaGVldFwiXS4ke3RoaXMuZ2V0Q2xhc3NOYW1lRm9yS2V5KGtleSl9YCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5rRWxlbWVudFdpdGhLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgbGlua0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBsaW5rRWwuc2V0QXR0cmlidXRlKCdyZWwnLCAnc3R5bGVzaGVldCcpO1xuICAgICAgICBsaW5rRWwuY2xhc3NMaXN0LmFkZCh0aGlzLmdldENsYXNzTmFtZUZvcktleShrZXkpKTtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rRWwpO1xuICAgICAgICByZXR1cm4gbGlua0VsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q2xhc3NOYW1lRm9yS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBgc3R5bGUtbWFuYWdlci0ke2tleX1gO1xuICAgIH1cbn1cbiJdfQ==