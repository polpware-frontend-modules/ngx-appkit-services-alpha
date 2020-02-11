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
var ThemeManager = /** @class */ (function () {
    function ThemeManager() {
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
    ThemeManager.prototype.installTheme = /**
     * @param {?=} theme
     * @return {?}
     */
    function (theme) {
        if (theme == null || theme.isDefault) {
            this.removeStyle('theme');
        }
        else {
            this.setStyle('theme', "assets/themes/" + theme.href);
        }
    };
    /**
     * @return {?}
     */
    ThemeManager.prototype.getDefaultTheme = /**
     * @return {?}
     */
    function () {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return theme.isDefault; }));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    ThemeManager.prototype.getThemeByID = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.themes.find((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return theme.id === id; }));
    };
    /**
     * @private
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    ThemeManager.prototype.setStyle = /**
     * @private
     * @param {?} key
     * @param {?} href
     * @return {?}
     */
    function (key, href) {
        this.getLinkElementForKey(key).setAttribute('href', href);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.removeStyle = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var existingLinkElement = this.getExistingLinkElementByKey(key);
        if (existingLinkElement) {
            document.head.removeChild(existingLinkElement);
        }
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.getLinkElementForKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.getExistingLinkElementByKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return document.head.querySelector("link[rel=\"stylesheet\"]." + this.getClassNameForKey(key));
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.createLinkElementWithKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        /** @type {?} */
        var linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.classList.add(this.getClassNameForKey(key));
        document.head.appendChild(linkEl);
        return linkEl;
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    ThemeManager.prototype.getClassNameForKey = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return "style-manager-" + key;
    };
    ThemeManager.decorators = [
        { type: Injectable }
    ];
    return ThemeManager;
}());
export { ThemeManager };
if (false) {
    /** @type {?} */
    ThemeManager.prototype.themes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL3RoZW1lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQztJQUFBO1FBRUksV0FBTSxHQUFvQjtZQUN0QjtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixJQUFJLEVBQUUsZUFBZTtnQkFDckIsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsU0FBUzthQUNuQjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsU0FBUzthQUNuQjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLElBQUksRUFBRSxPQUFPO2dCQUNiLElBQUksRUFBRSxXQUFXO2dCQUNqQixVQUFVLEVBQUUsU0FBUztnQkFDckIsS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxJQUFJLEVBQUUsU0FBUztn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RW1haWw6IGluZm9AZWJlbm1vbm5leS5jb21cbi8vIHd3dy5lYmVubW9ubmV5LmNvbS90ZW1wbGF0ZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwcFRoZW1lLCBJVGhlbWVNYW5hZ2VyQ29udHJhY3QgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVGhlbWVNYW5hZ2VyIGltcGxlbWVudHMgSVRoZW1lTWFuYWdlckNvbnRyYWN0IHtcbiAgICB0aGVtZXM6IEFycmF5PEFwcFRoZW1lPiA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiAnRGVmYXVsdCcsXG4gICAgICAgICAgICBocmVmOiAnYm9vdHN0cmFwLmNzcycsXG4gICAgICAgICAgICBpc0RlZmF1bHQ6IHRydWUsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzAwN2JmZicsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgbmFtZTogJ0Nvc21vJyxcbiAgICAgICAgICAgIGhyZWY6ICdjb3Ntby5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyMyNzgwRTMnLFxuICAgICAgICAgICAgY29sb3I6ICcjMzczYTNjJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgIG5hbWU6ICdMdW1lbicsXG4gICAgICAgICAgICBocmVmOiAnbHVtZW4uY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMTU4Q0JBJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2YwZjBmMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDQsXG4gICAgICAgICAgICBuYW1lOiAnQ2VydWxlYW4nLFxuICAgICAgICAgICAgaHJlZjogJ2NlcnVsZWFuLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzJGQTRFNycsXG4gICAgICAgICAgICBjb2xvcjogJyNlOWVjZWYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiA1LFxuICAgICAgICAgICAgbmFtZTogJ01pbnR5JyxcbiAgICAgICAgICAgIGhyZWY6ICdtaW50eS5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyM3OEMyQUQnLFxuICAgICAgICAgICAgY29sb3I6ICcjRjM5NjlBJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogNixcbiAgICAgICAgICAgIG5hbWU6ICdTa2V0Y2h5JyxcbiAgICAgICAgICAgIGhyZWY6ICdza2V0Y2h5LmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzMzMycsXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogNyxcbiAgICAgICAgICAgIG5hbWU6ICdTbGF0ZScsXG4gICAgICAgICAgICBocmVmOiAnc2xhdGUuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjM0EzRjQ0JyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzdBODI4OCcsXG4gICAgICAgICAgICBpc0Rhcms6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDgsXG4gICAgICAgICAgICBuYW1lOiAnRmxhdGx5JyxcbiAgICAgICAgICAgIGhyZWY6ICdmbGF0bHkuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjMkMzRTUwJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzE4QkM5QydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDksXG4gICAgICAgICAgICBuYW1lOiAnUHVsc2UnLFxuICAgICAgICAgICAgaHJlZjogJ3B1bHNlLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnIzU5MzE5NicsXG4gICAgICAgICAgICBjb2xvcjogJyNBOTkxRDQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMCxcbiAgICAgICAgICAgIG5hbWU6ICdTcGFjZWxhYicsXG4gICAgICAgICAgICBocmVmOiAnc3BhY2VsYWIuY3NzJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcjNDQ2RTlCJyxcbiAgICAgICAgICAgIGNvbG9yOiAnIzk5OSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDExLFxuICAgICAgICAgICAgbmFtZTogJ1VuaXRlZCcsXG4gICAgICAgICAgICBocmVmOiAndW5pdGVkLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0U5NTQyMCcsXG4gICAgICAgICAgICBjb2xvcjogJyNmZmYnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMixcbiAgICAgICAgICAgIG5hbWU6ICdKb3VybmFsJyxcbiAgICAgICAgICAgIGhyZWY6ICdqb3VybmFsLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0VCNjg2NCcsXG4gICAgICAgICAgICBjb2xvcjogJyNhYWEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiAxMyxcbiAgICAgICAgICAgIG5hbWU6ICdTdXBlcmhlcm8nLFxuICAgICAgICAgICAgaHJlZjogJ3N1cGVyaGVyby5jc3MnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJyNERjY5MUEnLFxuICAgICAgICAgICAgY29sb3I6ICcjMkIzRTUwJyxcbiAgICAgICAgICAgIGlzRGFyazogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMTQsXG4gICAgICAgICAgICBuYW1lOiAnU29sYXInLFxuICAgICAgICAgICAgaHJlZjogJ3NvbGFyLmNzcycsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnI0I1ODkwMCcsXG4gICAgICAgICAgICBjb2xvcjogJyMwMDJCMzYnLFxuICAgICAgICAgICAgaXNEYXJrOiB0cnVlXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgcHVibGljIGluc3RhbGxUaGVtZSh0aGVtZT86IEFwcFRoZW1lKSB7XG4gICAgICAgIGlmICh0aGVtZSA9PSBudWxsIHx8IHRoZW1lLmlzRGVmYXVsdCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdHlsZSgndGhlbWUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3R5bGUoJ3RoZW1lJywgYGFzc2V0cy90aGVtZXMvJHt0aGVtZS5ocmVmfWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldERlZmF1bHRUaGVtZSgpOiBBcHBUaGVtZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRoZW1lcy5maW5kKHRoZW1lID0+IHRoZW1lLmlzRGVmYXVsdCk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRoZW1lQnlJRChpZDogbnVtYmVyKTogQXBwVGhlbWUge1xuICAgICAgICByZXR1cm4gdGhpcy50aGVtZXMuZmluZCh0aGVtZSA9PiB0aGVtZS5pZCA9PT0gaWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0U3R5bGUoa2V5OiBzdHJpbmcsIGhyZWY6IHN0cmluZykge1xuICAgICAgICB0aGlzLmdldExpbmtFbGVtZW50Rm9yS2V5KGtleSkuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW1vdmVTdHlsZShrZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBleGlzdGluZ0xpbmtFbGVtZW50ID0gdGhpcy5nZXRFeGlzdGluZ0xpbmtFbGVtZW50QnlLZXkoa2V5KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nTGlua0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQoZXhpc3RpbmdMaW5rRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldExpbmtFbGVtZW50Rm9yS2V5KGtleTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEV4aXN0aW5nTGlua0VsZW1lbnRCeUtleShrZXkpIHx8IHRoaXMuY3JlYXRlTGlua0VsZW1lbnRXaXRoS2V5KGtleSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRFeGlzdGluZ0xpbmtFbGVtZW50QnlLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJzdHlsZXNoZWV0XCJdLiR7dGhpcy5nZXRDbGFzc05hbWVGb3JLZXkoa2V5KX1gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmtFbGVtZW50V2l0aEtleShrZXk6IHN0cmluZykge1xuICAgICAgICBjb25zdCBsaW5rRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIGxpbmtFbC5zZXRBdHRyaWJ1dGUoJ3JlbCcsICdzdHlsZXNoZWV0Jyk7XG4gICAgICAgIGxpbmtFbC5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0Q2xhc3NOYW1lRm9yS2V5KGtleSkpO1xuICAgICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGxpbmtFbCk7XG4gICAgICAgIHJldHVybiBsaW5rRWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRDbGFzc05hbWVGb3JLZXkoa2V5OiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGBzdHlsZS1tYW5hZ2VyLSR7a2V5fWA7XG4gICAgfVxufVxuIl19