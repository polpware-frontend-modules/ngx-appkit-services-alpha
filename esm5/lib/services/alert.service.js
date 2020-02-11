/**
 * @fileoverview added by tsickle
 * Generated from: lib/services/alert.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================
import { Injectable } from '@angular/core';
import { HttpResponseBase } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { DialogType, MessageSeverity } from '@polpware/ngx-appkit-contracts-alpha';
var AlertService = /** @class */ (function () {
    function AlertService() {
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
    AlertService.prototype.showDialog = /**
     * @param {?} message
     * @param {?=} type
     * @param {?=} okCallback
     * @param {?=} cancelCallback
     * @param {?=} okLabel
     * @param {?=} cancelLabel
     * @param {?=} defaultValue
     * @return {?}
     */
    function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
    };
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    AlertService.prototype.showMessage = /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @return {?}
     */
    function (data, separatorOrDetail, severity) {
        var e_1, _a;
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            try {
                for (var data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var message = data_1_1.value;
                    /** @type {?} */
                    var msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                    this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, false);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.showMessageHelper(data, separatorOrDetail, severity, false);
        }
    };
    /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    AlertService.prototype.showStickyMessage = /**
     * @param {?} data
     * @param {?=} separatorOrDetail
     * @param {?=} severity
     * @param {?=} error
     * @param {?=} onRemove
     * @return {?}
     */
    function (data, separatorOrDetail, severity, error, onRemove) {
        var e_2, _a;
        if (!severity) {
            severity = MessageSeverity.default;
        }
        if (data instanceof HttpResponseBase) {
            data = Utilities.getHttpResponseMessages(data);
            separatorOrDetail = Utilities.captionAndMessageSeparator;
        }
        if (data instanceof Array) {
            try {
                for (var data_2 = tslib_1.__values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                    var message = data_2_1.value;
                    /** @type {?} */
                    var msgObject = Utilities.splitInTwo(message, separatorOrDetail);
                    this.showMessageHelper(msgObject.firstPart, msgObject.secondPart, severity, true);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (data_2_1 && !data_2_1.done && (_a = data_2.return)) _a.call(data_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            if (error) {
                /** @type {?} */
                var msg = "Severity: \"" + MessageSeverity[severity] + "\", Summary: \"" + data + "\", Detail: \"" + separatorOrDetail + "\", Error: \"" + Utilities.safeStringify(error) + "\"";
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
    };
    /**
     * @private
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?} isSticky
     * @param {?=} onRemove
     * @return {?}
     */
    AlertService.prototype.showMessageHelper = /**
     * @private
     * @param {?} summary
     * @param {?} detail
     * @param {?} severity
     * @param {?} isSticky
     * @param {?=} onRemove
     * @return {?}
     */
    function (summary, detail, severity, isSticky, onRemove) {
        /** @type {?} */
        var alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity: severity, summary: summary, detail: detail },
            onRemove: onRemove
        };
        this.messages.next(alertCommand);
    };
    /**
     * @return {?}
     */
    AlertService.prototype.resetStickyMessage = /**
     * @return {?}
     */
    function () {
        this.messages.next({ operation: 'clear' });
    };
    /**
     * @param {?=} message
     * @param {?=} caption
     * @return {?}
     */
    AlertService.prototype.startLoadingMessage = /**
     * @param {?=} message
     * @param {?=} caption
     * @return {?}
     */
    function (message, caption) {
        var _this = this;
        if (message === void 0) { message = 'Loading...'; }
        if (caption === void 0) { caption = ''; }
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout((/**
         * @return {?}
         */
        function () {
            _this.showStickyMessage(caption, message, MessageSeverity.wait);
        }), 1000);
    };
    /**
     * @return {?}
     */
    AlertService.prototype.stopLoadingMessage = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logDebug = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.debug(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logError = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.error(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logInfo = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.info(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logMessage = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.log(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logTrace = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.trace(msg);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    AlertService.prototype.logWarning = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        console.warn(msg);
    };
    /**
     * @return {?}
     */
    AlertService.prototype.getDialogEvent = /**
     * @return {?}
     */
    function () {
        return this.dialogs.asObservable();
    };
    /**
     * @return {?}
     */
    AlertService.prototype.getMessageEvent = /**
     * @return {?}
     */
    function () {
        return this.messages.asObservable();
    };
    AlertService.decorators = [
        { type: Injectable }
    ];
    return AlertService;
}());
export { AlertService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FsZXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxFQUlILFVBQVUsRUFDVixlQUFlLEVBQ2xCLE1BQU0sc0NBQXNDLENBQUM7QUFHOUM7SUFBQTtRQUVZLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBZ0IsQ0FBQztRQUN2QyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQWUsQ0FBQztJQW1LakQsQ0FBQzs7Ozs7Ozs7Ozs7SUExSkcsaUNBQVU7Ozs7Ozs7Ozs7SUFBVixVQUFXLE9BQWUsRUFBRSxJQUFpQixFQUFFLFVBQStCLEVBQUUsY0FBMEIsRUFBRSxPQUFnQixFQUFFLFdBQW9CLEVBQUUsWUFBcUI7UUFFckssSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLFNBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxjQUFjLGdCQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsV0FBVyxhQUFBLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7Ozs7Ozs7SUFRRCxrQ0FBVzs7Ozs7O0lBQVgsVUFBWSxJQUFTLEVBQUUsaUJBQTBCLEVBQUUsUUFBMEI7O1FB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QUM7SUFDOUIsQ0FBQzs7Ozs7SUFJRCwrQkFBUTs7OztJQUFSLFVBQVMsR0FBRztRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCwrQkFBUTs7OztJQUFSLFVBQVMsR0FBRztRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCw4QkFBTzs7OztJQUFQLFVBQVEsR0FBRztRQUNQLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFFRCxpQ0FBVTs7OztJQUFWLFVBQVcsR0FBRztRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFFRCwrQkFBUTs7OztJQUFSLFVBQVMsR0FBRztRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFRCxpQ0FBVTs7OztJQUFWLFVBQVcsR0FBRztRQUNWLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELHFDQUFjOzs7SUFBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDOzs7O0lBRUQsc0NBQWU7OztJQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7O2dCQXJLSixVQUFVOztJQXNLWCxtQkFBQztDQUFBLEFBdEtELElBc0tDO1NBcktZLFlBQVk7Ozs7OztJQUNyQixnQ0FBK0M7Ozs7O0lBQy9DLCtCQUE2Qzs7Ozs7SUFFN0MsK0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEVtYWlsOiBpbmZvQGViZW5tb25uZXkuY29tXG4vLyB3d3cuZWJlbm1vbm5leS5jb20vdGVtcGxhdGVzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwUmVzcG9uc2VCYXNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBVdGlsaXRpZXMgfSBmcm9tICdAcG9scHdhcmUvbmd4LWFwcGtpdC1jb250cmFjdHMtYWxwaGEnO1xuXG5pbXBvcnQge1xuICAgIElBbGVydFNlcnZpY2VDb250cmFjdCxcbiAgICBBbGVydENvbW1hbmQsXG4gICAgQWxlcnREaWFsb2csXG4gICAgRGlhbG9nVHlwZSxcbiAgICBNZXNzYWdlU2V2ZXJpdHlcbn0gZnJvbSAnQHBvbHB3YXJlL25neC1hcHBraXQtY29udHJhY3RzLWFscGhhJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWxlcnRTZXJ2aWNlIGltcGxlbWVudHMgSUFsZXJ0U2VydmljZUNvbnRyYWN0IHtcbiAgICBwcml2YXRlIG1lc3NhZ2VzID0gbmV3IFN1YmplY3Q8QWxlcnRDb21tYW5kPigpO1xuICAgIHByaXZhdGUgZGlhbG9ncyA9IG5ldyBTdWJqZWN0PEFsZXJ0RGlhbG9nPigpO1xuXG4gICAgcHJpdmF0ZSBsb2FkaW5nTWVzc2FnZVRpbWVvdXRJZDogYW55O1xuXG5cblxuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nKTtcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogRGlhbG9nVHlwZSwgb2tDYWxsYmFjazogKHZhbD86IGFueSkgPT4gYW55KTtcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogRGlhbG9nVHlwZSwgb2tDYWxsYmFjaz86ICh2YWw/OiBhbnkpID0+IGFueSwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiBhbnksIG9rTGFiZWw/OiBzdHJpbmcsIGNhbmNlbExhYmVsPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogRGlhbG9nVHlwZSwgb2tDYWxsYmFjaz86ICh2YWw/OiBhbnkpID0+IGFueSwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiBhbnksIG9rTGFiZWw/OiBzdHJpbmcsIGNhbmNlbExhYmVsPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSBEaWFsb2dUeXBlLmFsZXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaWFsb2dzLm5leHQoeyBtZXNzYWdlLCB0eXBlLCBva0NhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaywgb2tMYWJlbCwgY2FuY2VsTGFiZWwsIGRlZmF1bHRWYWx1ZSB9KTtcbiAgICB9XG5cblxuXG4gICAgc2hvd01lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nKTtcbiAgICBzaG93TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5KTtcbiAgICBzaG93TWVzc2FnZShzdW1tYXJ5QW5kRGV0YWlsczogc3RyaW5nW10sIHN1bW1hcnlBbmREZXRhaWxzU2VwYXJhdG9yOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dNZXNzYWdlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlLCBpZ25vcmVWYWx1ZV91c2VOdWxsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dNZXNzYWdlKGRhdGE6IGFueSwgc2VwYXJhdG9yT3JEZXRhaWw/OiBzdHJpbmcsIHNldmVyaXR5PzogTWVzc2FnZVNldmVyaXR5KSB7XG5cbiAgICAgICAgaWYgKCFzZXZlcml0eSkge1xuICAgICAgICAgICAgc2V2ZXJpdHkgPSBNZXNzYWdlU2V2ZXJpdHkuZGVmYXVsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgZGF0YSA9IFV0aWxpdGllcy5nZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhKTtcbiAgICAgICAgICAgIHNlcGFyYXRvck9yRGV0YWlsID0gVXRpbGl0aWVzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2dPYmplY3QgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCBzZXBhcmF0b3JPckRldGFpbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlSGVscGVyKG1zZ09iamVjdC5maXJzdFBhcnQsIG1zZ09iamVjdC5zZWNvbmRQYXJ0LCBzZXZlcml0eSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZUhlbHBlcihkYXRhLCBzZXBhcmF0b3JPckRldGFpbCwgc2V2ZXJpdHksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc2hvd1N0aWNreU1lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nKTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nLCBkZXRhaWw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSwgZXJyb3I/OiBhbnksIG9uUmVtb3ZlPzogKCkgPT4gYW55KTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5QW5kRGV0YWlsczogc3RyaW5nW10sIHN1bW1hcnlBbmREZXRhaWxzU2VwYXJhdG9yOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlLCBpZ25vcmVWYWx1ZV91c2VOdWxsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKGRhdGE6IHN0cmluZyB8IHN0cmluZ1tdIHwgSHR0cFJlc3BvbnNlQmFzZSwgc2VwYXJhdG9yT3JEZXRhaWw/OiBzdHJpbmcsIHNldmVyaXR5PzogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSwgb25SZW1vdmU/OiAoKSA9PiBhbnkpIHtcblxuICAgICAgICBpZiAoIXNldmVyaXR5KSB7XG4gICAgICAgICAgICBzZXZlcml0eSA9IE1lc3NhZ2VTZXZlcml0eS5kZWZhdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICBkYXRhID0gVXRpbGl0aWVzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpO1xuICAgICAgICAgICAgc2VwYXJhdG9yT3JEZXRhaWwgPSBVdGlsaXRpZXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3I7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXNnT2JqZWN0ID0gVXRpbGl0aWVzLnNwbGl0SW5Ud28obWVzc2FnZSwgc2VwYXJhdG9yT3JEZXRhaWwpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZUhlbHBlcihtc2dPYmplY3QuZmlyc3RQYXJ0LCBtc2dPYmplY3Quc2Vjb25kUGFydCwgc2V2ZXJpdHksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGBTZXZlcml0eTogXCIke01lc3NhZ2VTZXZlcml0eVtzZXZlcml0eV19XCIsIFN1bW1hcnk6IFwiJHtkYXRhfVwiLCBEZXRhaWw6IFwiJHtzZXBhcmF0b3JPckRldGFpbH1cIiwgRXJyb3I6IFwiJHtVdGlsaXRpZXMuc2FmZVN0cmluZ2lmeShlcnJvcil9XCJgO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzZXZlcml0eSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS5kZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dJbmZvKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlU2V2ZXJpdHkuaW5mbzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nSW5mbyhtc2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVNldmVyaXR5LnN1Y2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ01lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS5lcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nRXJyb3IobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS53YXJuOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dXYXJuaW5nKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlU2V2ZXJpdHkud2FpdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nVHJhY2UobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZUhlbHBlcihkYXRhLCBzZXBhcmF0b3JPckRldGFpbCwgc2V2ZXJpdHksIHRydWUsIG9uUmVtb3ZlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd01lc3NhZ2VIZWxwZXIoc3VtbWFyeTogc3RyaW5nLCBkZXRhaWw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSwgaXNTdGlja3k6IGJvb2xlYW4sIG9uUmVtb3ZlPzogKCkgPT4gYW55KSB7XG5cbiAgICAgICAgY29uc3QgYWxlcnRDb21tYW5kOiBBbGVydENvbW1hbmQgPSB7XG4gICAgICAgICAgICBvcGVyYXRpb246IGlzU3RpY2t5ID8gJ2FkZF9zdGlja3knIDogJ2FkZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7IHNldmVyaXR5LCBzdW1tYXJ5LCBkZXRhaWwgfSxcbiAgICAgICAgICAgIG9uUmVtb3ZlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlcy5uZXh0KGFsZXJ0Q29tbWFuZCk7XG4gICAgfVxuXG4gICAgcmVzZXRTdGlja3lNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLm5leHQoeyBvcGVyYXRpb246ICdjbGVhcicgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRMb2FkaW5nTWVzc2FnZShtZXNzYWdlID0gJ0xvYWRpbmcuLi4nLCBjYXB0aW9uID0gJycpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGluZ01lc3NhZ2VUaW1lb3V0SWQpO1xuXG4gICAgICAgIHRoaXMubG9hZGluZ01lc3NhZ2VUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0aWNreU1lc3NhZ2UoY2FwdGlvbiwgbWVzc2FnZSwgTWVzc2FnZVNldmVyaXR5LndhaXQpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBzdG9wTG9hZGluZ01lc3NhZ2UoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRpbmdNZXNzYWdlVGltZW91dElkKTtcbiAgICAgICAgdGhpcy5yZXNldFN0aWNreU1lc3NhZ2UoKTtcbiAgICB9XG5cblxuXG4gICAgbG9nRGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcbiAgICB9XG5cbiAgICBsb2dFcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxvZ0luZm8obXNnKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhtc2cpO1xuICAgIH1cblxuICAgIGxvZ01lc3NhZ2UobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG4gICAgbG9nVHJhY2UobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICB9XG5cbiAgICBsb2dXYXJuaW5nKG1zZykge1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICB9XG5cbiAgICBnZXREaWFsb2dFdmVudCgpOiBPYnNlcnZhYmxlPEFsZXJ0RGlhbG9nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0TWVzc2FnZUV2ZW50KCk6IE9ic2VydmFibGU8QWxlcnRDb21tYW5kPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cblxuIl19