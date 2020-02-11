/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/theme-manager.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
import { Injectable } from '@angular/core';
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
    /**
     * @param {?=} theme
     * @return {?}
     */
    installTheme(theme) {
        if (theme == null || theme.isDefault) {
            this.removeStyle('theme');
        }
        else {
            this.setStyle('theme', `assets/themes/${theme.href}`);
        }
    }
    /**
     * @return {?}
     */
    getDefaultTheme() {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        theme => theme.isDefault));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getThemeByID(id) {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        theme => theme.id === id));
    }
    /**
     * @private
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    setStyle(key, href) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    removeStyle(key) {
        /** @type {?} */
        const existingLinkElement = this.getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getLinkElementForKey(key) {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getExistingLinkElementByKey(key) {
        return document.head.querySelector(`link[rel="stylesheet"].${this.getClassNameForKey(key)}`);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    createLinkElementWithKey(key) {
        /** @type {?} */
        const linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getClassNameForKey(key) {
        return `style-manager-${key}`;
    }
}
ThemeManager.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    ThemeManager.prototype.themes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RoZW1lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQyxNQUFNLE9BQU8sWUFBWTtJQUR6QjtRQUVJLFdBQU0sR0FBb0I7WUFDdEI7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFNBQVMsRUFBRSxJQUFJO2dCQUNmLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxTQUFTO2FBQ25CO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLElBQUksRUFBRSxjQUFjO2dCQUNwQixVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsT0FBTztnQkFDYixJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxTQUFTO2FBQ25CO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0ws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QUFFO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDbEQ7SUFDTCxDQUFDOzs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxHQUFXO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLDJCQUEyQixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RixDQUFDOzs7Ozs7SUFFTywyQkFBMkIsQ0FBQyxHQUFXO1FBQzNDLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsMEJBQTBCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakcsQ0FBQzs7Ozs7O0lBRU8sd0JBQXdCLENBQUMsR0FBVzs7Y0FDbEMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25ELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Ozs7OztJQUVPLGtCQUFrQixDQUFDLEdBQVc7UUFDbEMsT0FBTyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7O1lBeEpKLFVBQVU7Ozs7SUFFUCw4QkF1R0UiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRW1haWw6IGluZm9AZWJlbm1vbm5leS5jb21cbi8vIHd3dy5lYmVubW9ubmV5LmNvbS90ZW1wbGF0ZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwcFRoZW1lLCBJVGhlbWVNYW5hZ2VyQ29udHJhY3QgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGhlbWVNYW5hZ2VyIGltcGxlbWVudHMgSVRoZW1lTWFuYWdlckNvbnRyYWN0IHtcbiAgICB0aGVtZXM6IEFycmF5PEFwcFRoZW1lPiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAnRGVmYXVsdCcsXG4gICAgICAgICAgICBocmVmOiAnYm9vdHN0cmFwLmNzcycsXG4gICAgICAgICAgICBpc0RlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzAwN2JmZicsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgbmFtZTogJ0Nvc21vJyxcbiAgICAgICAgICAgIGhyZWY6ICdjb3Ntby5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyNzgwRTMnLFxuICAgICAgICAgICAgY29sb3I6ICcjMzczYTNjJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgIG5hbWU6ICdMdW1lbicsXG4gICAgICAgICAgICBocmVmOiAnbHVtZW4uY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMTU4Q0JBJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2YwZjBmMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDQsXG4gICAgICAgICAgICBuYW1lOiAnQ2VydWxlYW4nLFxuICAgICAgICAgICAgaHJlZjogJ2NlcnVsZWFuLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzJGQTRFNycsXG4gICAgICAgICAgICBjb2xvcjogJyNlOWVjZWYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiA1LFxuICAgICAgICAgICAgbmFtZTogJ01pbnR5JyxcbiAgICAgICAgICAgIGhyZWY6ICdtaW50eS5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyM3OEMyQUQnLFxuICAgICAgICAgICAgY29sb3I6ICcjRjM5NjlBJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogNixcbiAgICAgICAgICAgIG5hbWU6ICdTa2V0Y2h5JyxcbiAgICAgICAgICAgIGhyZWY6ICdza2V0Y2h5LmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzMzMycsXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogNyxcbiAgICAgICAgICAgIG5hbWU6ICdTbGF0ZScsXG4gICAgICAgICAgICBocmVmOiAnc2xhdGUuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjM0EzRjQ0JyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzdBODI4OCcsXG4gICAgICAgICAgICBpc0Rhcms6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDgsXG4gICAgICAgICAgICBuYW1lOiAnRmxhdGx5JyxcbiAgICAgICAgICAgIGhyZWY6ICdmbGF0bHkuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMkMzRTUwJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzE4QkM5QydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDksXG4gICAgICAgICAgICBuYW1lOiAnUHVsc2UnLFxuICAgICAgICAgICAgaHJlZjogJ3B1bHNlLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzU5MzE5NicsXG4gICAgICAgICAgICBjb2xvcjogJyNBOTkxRDQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMCxcbiAgICAgICAgICAgIG5hbWU6ICdTcGFjZWxhYicsXG4gICAgICAgICAgICBocmVmOiAnc3BhY2VsYWIuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjNDQ2RTlCJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzk5OSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDExLFxuICAgICAgICAgICAgbmFtZTogJ1VuaXRlZCcsXG4gICAgICAgICAgICBocmVmOiAndW5pdGVkLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0U5NTQyMCcsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMixcbiAgICAgICAgICAgIG5hbWU6ICdKb3VybmFsJyxcbiAgICAgICAgICAgIGhyZWY6ICdqb3VybmFsLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0VCNjg2NCcsXG4gICAgICAgICAgICBjb2xvcjogJyNhYWEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMyxcbiAgICAgICAgICAgIG5hbWU6ICdTdXBlcmhlcm8nLFxuICAgICAgICAgICAgaHJlZjogJ3N1cGVyaGVyby5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNERjY5MUEnLFxuICAgICAgICAgICAgY29sb3I6ICcjMkIzRTUwJyxcbiAgICAgICAgICAgIGlzRGFyazogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTQsXG4gICAgICAgICAgICBuYW1lOiAnU29sYXInLFxuICAgICAgICAgICAgaHJlZjogJ3NvbGFyLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0I1ODkwMCcsXG4gICAgICAgICAgICBjb2xvcjogJyMwMDJCMzYnLFxuICAgICAgICAgICAgaXNEYXJrOiB0cnVlXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgcHVibGljIGluc3RhbGxUaGVtZSh0aGVtZT86IEFwcFRoZW1lKSB7XG4gICAgICAgIGlmICh0aGVtZSA9PSBudWxsIHx8IHRoZW1lLmlzRGVmYXVsdCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHlsZSgndGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoJ3RoZW1lJywgYGFzc2V0cy90aGVtZXMvJHt0aGVtZS5ocmVmfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldERlZmF1bHRUaGVtZSgpOiBBcHBUaGVtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRoZW1lcy5maW5kKHRoZW1lID0+IHRoZW1lLmlzRGVmYXVsdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRoZW1lQnlJRChpZDogbnVtYmVyKTogQXBwVGhlbWUge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVtZXMuZmluZCh0aGVtZSA9PiB0aGVtZS5pZCA9PT0gaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUoa2V5OiBzdHJpbmcsIGhyZWY6IHN0cmluZykge1xuICAgICAgICB0aGlzLmdldExpbmtFbGVtZW50Rm9yS2V5KGtleSkuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZShrZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBleGlzdGluZ0xpbmtFbGVtZW50ID0gdGhpcy5nZXRFeGlzdGluZ0xpbmtFbGVtZW50QnlLZXkoa2V5KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nTGlua0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoZXhpc3RpbmdMaW5rRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExpbmtFbGVtZW50Rm9yS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4aXN0aW5nTGlua0VsZW1lbnRCeUtleShrZXkpIHx8IHRoaXMuY3JlYXRlTGlua0VsZW1lbnRXaXRoS2V5KGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFeGlzdGluZ0xpbmtFbGVtZW50QnlLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJzdHlsZXNoZWV0XCJdLiR7dGhpcy5nZXRDbGFzc05hbWVGb3JLZXkoa2V5KX1gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmtFbGVtZW50V2l0aEtleShrZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBsaW5rRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmtFbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gICAgICAgIGxpbmtFbC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yS2V5KGtleSkpO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbCk7XG4gICAgICAgIHJldHVybiBsaW5rRWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDbGFzc05hbWVGb3JLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGBzdHlsZS1tYW5hZ2VyLSR7a2V5fWA7XG4gICAgfVxufVxuIl19