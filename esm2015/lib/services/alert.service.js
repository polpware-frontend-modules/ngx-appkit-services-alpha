/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/alert.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { DialogType, MessageSeverity } from '@polpware/ngx-appkit-contracts-alpha';
export class AlertService {
    constructor() {
        this.messages = new Subject();
        this.dialogs = new Subject();
    }
    /**
     * @param {?} message
     * @param {?=} type
     * @param {?=} okCallback
     * @param {?=} cancelCallback
     * @param {?=} okLabel
     * @param {?=} cancelLabel
     * @param {?=} defaultValue
     * @return {?}
     */
    showDialog(message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue });
    }
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    showMessage(data, separatorOrDetail, severity) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (const message of data) {
                /** @type {?} */
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    }
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    showStickyMessage(data, separatorOrDetail, severity, error, onRemove) {
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            for (const message of data) {
                /** @type {?} */
                const msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
            }
        }
        else {
            if (error) {
                /** @type {?} */
                const msg = `Severity: "${MessageSeverity[severity]}", Summary: "${data}", Detail: "${separatorOrDetail}", Error: "${Utilities.safeStringify(error)}"`;
                switch (severity) {
                    case MessageSeverity.default:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.info:
                        this.logInfo(msg);
                        break;
                    case MessageSeverity.success:
                        this.logMessage(msg);
                        break;
                    case MessageSeverity.error:
                        this.logError(msg);
                        break;
                    case MessageSeverity.warn:
                        this.logWarning(msg);
                        break;
                    case MessageSeverity.wait:
                        this.logTrace(msg);
                        break;
                }
            }
            this.showMessageHelper(data, separatorOrDetail, severity, true, onRemove);
        }
    }
    /**
     * @private
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?} isSticky
     * @param {?=} onRemove
     * @return {?}
     */
    showMessageHelper(summary, detail, severity, isSticky, onRemove) {
        /** @type {?} */
        const alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity, summary, detail },
            onRemove
        };
        this.messages.next(alertCommand);
    }
    /**
     * @return {?}
     */
    resetStickyMessage() {
        this.messages.next({ operation: 'clear' });
    }
    /**
     * @param {?=} message
     * @param {?=} caption
     * @return {?}
     */
    startLoadingMessage(message = 'Loading...', caption = '') {
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout((/**
         * @return {?}
         */
        () => {
            this.showStickyMessage(caption, message, MessageSeverity.wait);
        }), 1000);
    }
    /**
     * @return {?}
     */
    stopLoadingMessage() {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logDebug(msg) {
        console.debug(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logError(msg) {
        console.error(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logInfo(msg) {
        console.info(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logMessage(msg) {
        console.log(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logTrace(msg) {
        console.trace(msg);
    }
    /**
     * @param {?} msg
     * @return {?}
     */
    logWarning(msg) {
        console.warn(msg);
    }
    /**
     * @return {?}
     */
    getDialogEvent() {
        return this.dialogs.asObservable();
    }
    /**
     * @return {?}
     */
    getMessageEvent() {
        return this.messages.asObservable();
    }
}
AlertService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.messages;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.dialogs;
    /**
     * @type {?}
     * @private
     */
    AlertService.prototype.loadingMessageTimeoutId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FsZXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN4RCxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUVqRSxPQUFPLEVBSUgsVUFBVSxFQUNWLGVBQWUsRUFDbEIsTUFBTSxzQ0FBc0MsQ0FBQztBQUk5QyxNQUFNLE9BQU8sWUFBWTtJQUR6QjtRQUVZLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN2QyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWUsQ0FBQztJQW1LakQsQ0FBQzs7Ozs7Ozs7Ozs7SUExSkcsVUFBVSxDQUFDLE9BQWUsRUFBRSxJQUFpQixFQUFFLFVBQStCLEVBQUUsY0FBMEIsRUFBRSxPQUFnQixFQUFFLFdBQW9CLEVBQUUsWUFBcUI7UUFFckssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7Ozs7Ozs7SUFRRCxXQUFXLENBQUMsSUFBUyxFQUFFLGlCQUEwQixFQUFFLFFBQTBCO1FBRXpFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxRQUFRLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztTQUN0QztRQUVELElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ2xDLElBQUksR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLDBCQUEwQixDQUFDO1NBQzVEO1FBRUQsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3ZCLEtBQUssTUFBTSxPQUFPLElBQUksSUFBSSxFQUFFOztzQkFDbEIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLGlCQUFpQixDQUFDO2dCQUVsRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN0RjtTQUNKO2FBQU07WUFDSCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7Ozs7Ozs7OztJQVFELGlCQUFpQixDQUFDLElBQTBDLEVBQUUsaUJBQTBCLEVBQUUsUUFBMEIsRUFBRSxLQUFXLEVBQUUsUUFBb0I7UUFFbkosSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLFFBQVEsR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxJQUFJLFlBQVksZ0JBQWdCLEVBQUU7WUFDbEMsSUFBSSxHQUFHLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsMEJBQTBCLENBQUM7U0FDNUQ7UUFHRCxJQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7WUFDdkIsS0FBSyxNQUFNLE9BQU8sSUFBSSxJQUFJLEVBQUU7O3NCQUNsQixTQUFTLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7Z0JBRWxFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JGO1NBQ0o7YUFBTTtZQUVILElBQUksS0FBSyxFQUFFOztzQkFFRCxHQUFHLEdBQUcsY0FBYyxlQUFlLENBQUMsUUFBUSxDQUFDLGdCQUFnQixJQUFJLGVBQWUsaUJBQWlCLGNBQWMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFFdEosUUFBUSxRQUFRLEVBQUU7b0JBQ2QsS0FBSyxlQUFlLENBQUMsT0FBTzt3QkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDVixLQUFLLGVBQWUsQ0FBQyxJQUFJO3dCQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixNQUFNO29CQUNWLEtBQUssZUFBZSxDQUFDLE9BQU87d0JBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1YsS0FBSyxlQUFlLENBQUMsS0FBSzt3QkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsTUFBTTtvQkFDVixLQUFLLGVBQWUsQ0FBQyxJQUFJO3dCQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixNQUFNO29CQUNWLEtBQUssZUFBZSxDQUFDLElBQUk7d0JBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ25CLE1BQU07aUJBQ2I7YUFDSjtZQUVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM3RTtJQUNMLENBQUM7Ozs7Ozs7Ozs7SUFFTyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLFFBQXlCLEVBQUUsUUFBaUIsRUFBRSxRQUFvQjs7Y0FFbkgsWUFBWSxHQUFpQjtZQUMvQixTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDMUMsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUU7WUFDdEMsUUFBUTtTQUNYO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7O0lBRUQsbUJBQW1CLENBQUMsT0FBTyxHQUFHLFlBQVksRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUNwRCxZQUFZLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFVBQVU7OztRQUFDLEdBQUcsRUFBRTtZQUMzQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxHQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQzs7OztJQUVELGtCQUFrQjtRQUNkLFlBQVksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDOzs7OztJQUlELFFBQVEsQ0FBQyxHQUFHO1FBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxHQUFHO1FBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxHQUFHO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFHO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxHQUFHO1FBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxHQUFHO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDOzs7O0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsZUFBZTtRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDOzs7WUFyS0osVUFBVTs7Ozs7OztJQUVQLGdDQUErQzs7Ozs7SUFDL0MsK0JBQTZDOzs7OztJQUU3QywrQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRW1haWw6IGluZm9AZWJlbm1vbm5leS5jb21cbi8vIHd3dy5lYmVubW9ubmV5LmNvbS90ZW1wbGF0ZXNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBSZXNwb25zZUJhc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IFV0aWxpdGllcyB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5cbmltcG9ydCB7XG4gICAgSUFsZXJ0U2VydmljZUNvbnRyYWN0LFxuICAgIEFsZXJ0Q29tbWFuZCxcbiAgICBBbGVydERpYWxvZyxcbiAgICBEaWFsb2dUeXBlLFxuICAgIE1lc3NhZ2VTZXZlcml0eVxufSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbGVydFNlcnZpY2UgaW1wbGVtZW50cyBJQWxlcnRTZXJ2aWNlQ29udHJhY3Qge1xuICAgIHByaXZhdGUgbWVzc2FnZXMgPSBuZXcgU3ViamVjdDxBbGVydENvbW1hbmQ+KCk7XG4gICAgcHJpdmF0ZSBkaWFsb2dzID0gbmV3IFN1YmplY3Q8QWxlcnREaWFsb2c+KCk7XG5cbiAgICBwcml2YXRlIGxvYWRpbmdNZXNzYWdlVGltZW91dElkOiBhbnk7XG5cblxuXG4gICAgc2hvd0RpYWxvZyhtZXNzYWdlOiBzdHJpbmcpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlOiBEaWFsb2dUeXBlLCBva0NhbGxiYWNrOiAodmFsPzogYW55KSA9PiBhbnkpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlOiBEaWFsb2dUeXBlLCBva0NhbGxiYWNrPzogKHZhbD86IGFueSkgPT4gYW55LCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IGFueSwgb2tMYWJlbD86IHN0cmluZywgY2FuY2VsTGFiZWw/OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZyk7XG4gICAgc2hvd0RpYWxvZyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU/OiBEaWFsb2dUeXBlLCBva0NhbGxiYWNrPzogKHZhbD86IGFueSkgPT4gYW55LCBjYW5jZWxDYWxsYmFjaz86ICgpID0+IGFueSwgb2tMYWJlbD86IHN0cmluZywgY2FuY2VsTGFiZWw/OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IHN0cmluZykge1xuXG4gICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgdHlwZSA9IERpYWxvZ1R5cGUuYWxlcnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpYWxvZ3MubmV4dCh7IG1lc3NhZ2UsIHR5cGUsIG9rQ2FsbGJhY2ssIGNhbmNlbENhbGxiYWNrLCBva0xhYmVsLCBjYW5jZWxMYWJlbCwgZGVmYXVsdFZhbHVlIH0pO1xuICAgIH1cblxuXG5cbiAgICBzaG93TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcpO1xuICAgIHNob3dNZXNzYWdlKHN1bW1hcnk6IHN0cmluZywgZGV0YWlsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dNZXNzYWdlKHN1bW1hcnlBbmREZXRhaWxzOiBzdHJpbmdbXSwgc3VtbWFyeUFuZERldGFpbHNTZXBhcmF0b3I6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd01lc3NhZ2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UsIGlnbm9yZVZhbHVlX3VzZU51bGw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd01lc3NhZ2UoZGF0YTogYW55LCBzZXBhcmF0b3JPckRldGFpbD86IHN0cmluZywgc2V2ZXJpdHk/OiBNZXNzYWdlU2V2ZXJpdHkpIHtcblxuICAgICAgICBpZiAoIXNldmVyaXR5KSB7XG4gICAgICAgICAgICBzZXZlcml0eSA9IE1lc3NhZ2VTZXZlcml0eS5kZWZhdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICBkYXRhID0gVXRpbGl0aWVzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpO1xuICAgICAgICAgICAgc2VwYXJhdG9yT3JEZXRhaWwgPSBVdGlsaXRpZXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3I7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1zZ09iamVjdCA9IFV0aWxpdGllcy5zcGxpdEluVHdvKG1lc3NhZ2UsIHNlcGFyYXRvck9yRGV0YWlsKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2VIZWxwZXIobXNnT2JqZWN0LmZpcnN0UGFydCwgbXNnT2JqZWN0LnNlY29uZFBhcnQsIHNldmVyaXR5LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlSGVscGVyKGRhdGEsIHNlcGFyYXRvck9yRGV0YWlsLCBzZXZlcml0eSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHN1bW1hcnk6IHN0cmluZywgZGV0YWlsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHksIGVycm9yPzogYW55KTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSwgb25SZW1vdmU/OiAoKSA9PiBhbnkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHN1bW1hcnlBbmREZXRhaWxzOiBzdHJpbmdbXSwgc3VtbWFyeUFuZERldGFpbHNTZXBhcmF0b3I6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2UocmVzcG9uc2U6IEh0dHBSZXNwb25zZUJhc2UsIGlnbm9yZVZhbHVlX3VzZU51bGw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2UoZGF0YTogc3RyaW5nIHwgc3RyaW5nW10gfCBIdHRwUmVzcG9uc2VCYXNlLCBzZXBhcmF0b3JPckRldGFpbD86IHN0cmluZywgc2V2ZXJpdHk/OiBNZXNzYWdlU2V2ZXJpdHksIGVycm9yPzogYW55LCBvblJlbW92ZT86ICgpID0+IGFueSkge1xuXG4gICAgICAgIGlmICghc2V2ZXJpdHkpIHtcbiAgICAgICAgICAgIHNldmVyaXR5ID0gTWVzc2FnZVNldmVyaXR5LmRlZmF1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZUJhc2UpIHtcbiAgICAgICAgICAgIGRhdGEgPSBVdGlsaXRpZXMuZ2V0SHR0cFJlc3BvbnNlTWVzc2FnZXMoZGF0YSk7XG4gICAgICAgICAgICBzZXBhcmF0b3JPckRldGFpbCA9IFV0aWxpdGllcy5jYXB0aW9uQW5kTWVzc2FnZVNlcGFyYXRvcjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2dPYmplY3QgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCBzZXBhcmF0b3JPckRldGFpbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlSGVscGVyKG1zZ09iamVjdC5maXJzdFBhcnQsIG1zZ09iamVjdC5zZWNvbmRQYXJ0LCBzZXZlcml0eSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgbXNnID0gYFNldmVyaXR5OiBcIiR7TWVzc2FnZVNldmVyaXR5W3NldmVyaXR5XX1cIiwgU3VtbWFyeTogXCIke2RhdGF9XCIsIERldGFpbDogXCIke3NlcGFyYXRvck9yRGV0YWlsfVwiLCBFcnJvcjogXCIke1V0aWxpdGllcy5zYWZlU3RyaW5naWZ5KGVycm9yKX1cImA7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHNldmVyaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVNldmVyaXR5LmRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ0luZm8obXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS5pbmZvOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dJbmZvKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlU2V2ZXJpdHkuc3VjY2VzczpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nTWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVNldmVyaXR5LmVycm9yOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dFcnJvcihtc2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVNldmVyaXR5Lndhcm46XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ1dhcm5pbmcobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS53YWl0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dUcmFjZShtc2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlSGVscGVyKGRhdGEsIHNlcGFyYXRvck9yRGV0YWlsLCBzZXZlcml0eSwgdHJ1ZSwgb25SZW1vdmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzaG93TWVzc2FnZUhlbHBlcihzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LCBpc1N0aWNreTogYm9vbGVhbiwgb25SZW1vdmU/OiAoKSA9PiBhbnkpIHtcblxuICAgICAgICBjb25zdCBhbGVydENvbW1hbmQ6IEFsZXJ0Q29tbWFuZCA9IHtcbiAgICAgICAgICAgIG9wZXJhdGlvbjogaXNTdGlja3kgPyAnYWRkX3N0aWNreScgOiAnYWRkJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHsgc2V2ZXJpdHksIHN1bW1hcnksIGRldGFpbCB9LFxuICAgICAgICAgICAgb25SZW1vdmVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1lc3NhZ2VzLm5leHQoYWxlcnRDb21tYW5kKTtcbiAgICB9XG5cbiAgICByZXNldFN0aWNreU1lc3NhZ2UoKSB7XG4gICAgICAgIHRoaXMubWVzc2FnZXMubmV4dCh7IG9wZXJhdGlvbjogJ2NsZWFyJyB9KTtcbiAgICB9XG5cbiAgICBzdGFydExvYWRpbmdNZXNzYWdlKG1lc3NhZ2UgPSAnTG9hZGluZy4uLicsIGNhcHRpb24gPSAnJykge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkaW5nTWVzc2FnZVRpbWVvdXRJZCk7XG5cbiAgICAgICAgdGhpcy5sb2FkaW5nTWVzc2FnZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93U3RpY2t5TWVzc2FnZShjYXB0aW9uLCBtZXNzYWdlLCBNZXNzYWdlU2V2ZXJpdHkud2FpdCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICAgIHN0b3BMb2FkaW5nTWVzc2FnZSgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGluZ01lc3NhZ2VUaW1lb3V0SWQpO1xuICAgICAgICB0aGlzLnJlc2V0U3RpY2t5TWVzc2FnZSgpO1xuICAgIH1cblxuXG5cbiAgICBsb2dEZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5kZWJ1Zyhtc2cpO1xuICAgIH1cblxuICAgIGxvZ0Vycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgbG9nSW5mbyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5pbmZvKG1zZyk7XG4gICAgfVxuXG4gICAgbG9nTWVzc2FnZShtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBsb2dUcmFjZShtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIGxvZ1dhcm5pbmcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihtc2cpO1xuICAgIH1cblxuICAgIGdldERpYWxvZ0V2ZW50KCk6IE9ic2VydmFibGU8QWxlcnREaWFsb2c+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlhbG9ncy5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBnZXRNZXNzYWdlRXZlbnQoKTogT2JzZXJ2YWJsZTxBbGVydENvbW1hbmQ+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZXMuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxufVxuXG4iXX0=