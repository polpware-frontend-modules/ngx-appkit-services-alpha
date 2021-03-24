import { __values } from "tslib";
import { HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogType, MessageSeverity, Utilities } from '@polpware/ngx-appkit-contracts-alpha';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
var AlertService = /** @class */ (function () {
    function AlertService() {
        this.messages = new Subject();
        this.dialogs = new Subject();
    }
    AlertService.prototype.showDialog = function (message, type, okCallback, cancelCallback, okLabel, cancelLabel, defaultValue) {
        if (!type) {
            type = DialogType.alert;
        }
        this.dialogs.next({ message: message, type: type, okCallback: okCallback, cancelCallback: cancelCallback, okLabel: okLabel, cancelLabel: cancelLabel, defaultValue: defaultValue });
    };
    AlertService.prototype.showMessage = function (data, separatorOrDetail, severity) {
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
                for (var data_1 = __values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                    var message = data_1_1.value;
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
    AlertService.prototype.showStickyMessage = function (data, separatorOrDetail, severity, error, onRemove) {
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
                for (var data_2 = __values(data), data_2_1 = data_2.next(); !data_2_1.done; data_2_1 = data_2.next()) {
                    var message = data_2_1.value;
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
    AlertService.prototype.showMessageHelper = function (summary, detail, severity, isSticky, onRemove) {
        var alertCommand = {
            operation: isSticky ? 'add_sticky' : 'add',
            message: { severity: severity, summary: summary, detail: detail },
            onRemove: onRemove
        };
        this.messages.next(alertCommand);
    };
    AlertService.prototype.resetStickyMessage = function () {
        this.messages.next({ operation: 'clear' });
    };
    AlertService.prototype.startLoadingMessage = function (message, caption) {
        var _this = this;
        if (message === void 0) { message = 'Loading...'; }
        if (caption === void 0) { caption = ''; }
        clearTimeout(this.loadingMessageTimeoutId);
        this.loadingMessageTimeoutId = setTimeout(function () {
            _this.showStickyMessage(caption, message, MessageSeverity.wait);
        }, 1000);
    };
    AlertService.prototype.stopLoadingMessage = function () {
        clearTimeout(this.loadingMessageTimeoutId);
        this.resetStickyMessage();
    };
    AlertService.prototype.logDebug = function (msg) {
        console.debug(msg);
    };
    AlertService.prototype.logError = function (msg) {
        console.error(msg);
    };
    AlertService.prototype.logInfo = function (msg) {
        console.info(msg);
    };
    AlertService.prototype.logMessage = function (msg) {
        console.log(msg);
    };
    AlertService.prototype.logTrace = function (msg) {
        console.trace(msg);
    };
    AlertService.prototype.logWarning = function (msg) {
        console.warn(msg);
    };
    AlertService.prototype.getDialogEvent = function () {
        return this.dialogs.asObservable();
    };
    AlertService.prototype.getMessageEvent = function () {
        return this.messages.asObservable();
    };
    /** @nocollapse */ AlertService.ɵfac = function AlertService_Factory(t) { return new (t || AlertService)(); };
    /** @nocollapse */ AlertService.ɵprov = i0.ɵɵdefineInjectable({ token: AlertService, factory: AlertService.ɵfac, providedIn: 'root' });
    return AlertService;
}());
export { AlertService };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AlertService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LXNlcnZpY2VzLWFscGhhLyIsInNvdXJjZXMiOlsibGliL3NlcnZpY2VzL2FsZXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUE2QixVQUFVLEVBQXlCLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNoSixPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDOztBQUUzQztJQUFBO1FBSVksYUFBUSxHQUFHLElBQUksT0FBTyxFQUFnQixDQUFDO1FBQ3ZDLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBZSxDQUFDO0tBbUtoRDtJQTFKRyxpQ0FBVSxHQUFWLFVBQVcsT0FBZSxFQUFFLElBQWlCLEVBQUUsVUFBK0IsRUFBRSxjQUEwQixFQUFFLE9BQWdCLEVBQUUsV0FBb0IsRUFBRSxZQUFxQjtRQUVySyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsSUFBSSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7U0FDM0I7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sU0FBQSxFQUFFLElBQUksTUFBQSxFQUFFLFVBQVUsWUFBQSxFQUFFLGNBQWMsZ0JBQUEsRUFBRSxPQUFPLFNBQUEsRUFBRSxXQUFXLGFBQUEsRUFBRSxZQUFZLGNBQUEsRUFBRSxDQUFDLENBQUM7SUFDekcsQ0FBQztJQVFELGtDQUFXLEdBQVgsVUFBWSxJQUFTLEVBQUUsaUJBQTBCLEVBQUUsUUFBMEI7O1FBRXpFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxRQUFRLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztTQUN0QztRQUVELElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ2xDLElBQUksR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLDBCQUEwQixDQUFDO1NBQzVEO1FBRUQsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFOztnQkFDdkIsS0FBc0IsSUFBQSxTQUFBLFNBQUEsSUFBSSxDQUFBLDBCQUFBLDRDQUFFO29CQUF2QixJQUFNLE9BQU8saUJBQUE7b0JBQ2QsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFFbkUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ3RGOzs7Ozs7Ozs7U0FDSjthQUFNO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDcEU7SUFDTCxDQUFDO0lBUUQsd0NBQWlCLEdBQWpCLFVBQWtCLElBQTBDLEVBQUUsaUJBQTBCLEVBQUUsUUFBMEIsRUFBRSxLQUFXLEVBQUUsUUFBb0I7O1FBRW5KLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDWCxRQUFRLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQztTQUN0QztRQUVELElBQUksSUFBSSxZQUFZLGdCQUFnQixFQUFFO1lBQ2xDLElBQUksR0FBRyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLDBCQUEwQixDQUFDO1NBQzVEO1FBR0QsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFOztnQkFDdkIsS0FBc0IsSUFBQSxTQUFBLFNBQUEsSUFBSSxDQUFBLDBCQUFBLDRDQUFFO29CQUF2QixJQUFNLE9BQU8saUJBQUE7b0JBQ2QsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFFbkUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3JGOzs7Ozs7Ozs7U0FDSjthQUFNO1lBRUgsSUFBSSxLQUFLLEVBQUU7Z0JBRVAsSUFBTSxHQUFHLEdBQUcsaUJBQWMsZUFBZSxDQUFDLFFBQVEsQ0FBQyx1QkFBZ0IsSUFBSSxzQkFBZSxpQkFBaUIscUJBQWMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBRyxDQUFDO2dCQUV2SixRQUFRLFFBQVEsRUFBRTtvQkFDZCxLQUFLLGVBQWUsQ0FBQyxPQUFPO3dCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNsQixNQUFNO29CQUNWLEtBQUssZUFBZSxDQUFDLElBQUk7d0JBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2xCLE1BQU07b0JBQ1YsS0FBSyxlQUFlLENBQUMsT0FBTzt3QkFDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsTUFBTTtvQkFDVixLQUFLLGVBQWUsQ0FBQyxLQUFLO3dCQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixNQUFNO29CQUNWLEtBQUssZUFBZSxDQUFDLElBQUk7d0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1YsS0FBSyxlQUFlLENBQUMsSUFBSTt3QkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDbkIsTUFBTTtpQkFDYjthQUNKO1lBRUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQzdFO0lBQ0wsQ0FBQztJQUVPLHdDQUFpQixHQUF6QixVQUEwQixPQUFlLEVBQUUsTUFBYyxFQUFFLFFBQXlCLEVBQUUsUUFBaUIsRUFBRSxRQUFvQjtRQUV6SCxJQUFNLFlBQVksR0FBaUI7WUFDL0IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLO1lBQzFDLE9BQU8sRUFBRSxFQUFFLFFBQVEsVUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFO1lBQ3RDLFFBQVEsVUFBQTtTQUNYLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQseUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsMENBQW1CLEdBQW5CLFVBQW9CLE9BQXNCLEVBQUUsT0FBWTtRQUF4RCxpQkFNQztRQU5tQix3QkFBQSxFQUFBLHNCQUFzQjtRQUFFLHdCQUFBLEVBQUEsWUFBWTtRQUNwRCxZQUFZLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFVBQVUsQ0FBQztZQUN0QyxLQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVELHlDQUFrQixHQUFsQjtRQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBSUQsK0JBQVEsR0FBUixVQUFTLEdBQUc7UUFDUixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVMsR0FBRztRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELDhCQUFPLEdBQVAsVUFBUSxHQUFHO1FBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsaUNBQVUsR0FBVixVQUFXLEdBQUc7UUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQkFBUSxHQUFSLFVBQVMsR0FBRztRQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxHQUFHO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQscUNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0NBQWUsR0FBZjtRQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QyxDQUFDOytGQXBLUSxZQUFZOzJFQUFaLFlBQVksV0FBWixZQUFZLG1CQUZULE1BQU07dUJBTnRCO0NBNktDLEFBeEtELElBd0tDO1NBcktZLFlBQVk7a0RBQVosWUFBWTtjQUh4QixVQUFVO2VBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVzcG9uc2VCYXNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWxlcnRDb21tYW5kLCBBbGVydERpYWxvZywgRGlhbG9nVHlwZSwgSUFsZXJ0U2VydmljZUNvbnRyYWN0LCBNZXNzYWdlU2V2ZXJpdHksIFV0aWxpdGllcyB9IGZyb20gJ0Bwb2xwd2FyZS9uZ3gtYXBwa2l0LWNvbnRyYWN0cy1hbHBoYSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWxlcnRTZXJ2aWNlIGltcGxlbWVudHMgSUFsZXJ0U2VydmljZUNvbnRyYWN0IHtcbiAgICBwcml2YXRlIG1lc3NhZ2VzID0gbmV3IFN1YmplY3Q8QWxlcnRDb21tYW5kPigpO1xuICAgIHByaXZhdGUgZGlhbG9ncyA9IG5ldyBTdWJqZWN0PEFsZXJ0RGlhbG9nPigpO1xuXG4gICAgcHJpdmF0ZSBsb2FkaW5nTWVzc2FnZVRpbWVvdXRJZDogYW55O1xuXG5cblxuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nKTtcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogRGlhbG9nVHlwZSwgb2tDYWxsYmFjazogKHZhbD86IGFueSkgPT4gYW55KTtcbiAgICBzaG93RGlhbG9nKG1lc3NhZ2U6IHN0cmluZywgdHlwZTogRGlhbG9nVHlwZSwgb2tDYWxsYmFjaz86ICh2YWw/OiBhbnkpID0+IGFueSwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiBhbnksIG9rTGFiZWw/OiBzdHJpbmcsIGNhbmNlbExhYmVsPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpO1xuICAgIHNob3dEaWFsb2cobWVzc2FnZTogc3RyaW5nLCB0eXBlPzogRGlhbG9nVHlwZSwgb2tDYWxsYmFjaz86ICh2YWw/OiBhbnkpID0+IGFueSwgY2FuY2VsQ2FsbGJhY2s/OiAoKSA9PiBhbnksIG9rTGFiZWw/OiBzdHJpbmcsIGNhbmNlbExhYmVsPzogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgIHR5cGUgPSBEaWFsb2dUeXBlLmFsZXJ0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaWFsb2dzLm5leHQoeyBtZXNzYWdlLCB0eXBlLCBva0NhbGxiYWNrLCBjYW5jZWxDYWxsYmFjaywgb2tMYWJlbCwgY2FuY2VsTGFiZWwsIGRlZmF1bHRWYWx1ZSB9KTtcbiAgICB9XG5cblxuXG4gICAgc2hvd01lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nKTtcbiAgICBzaG93TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5KTtcbiAgICBzaG93TWVzc2FnZShzdW1tYXJ5QW5kRGV0YWlsczogc3RyaW5nW10sIHN1bW1hcnlBbmREZXRhaWxzU2VwYXJhdG9yOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dNZXNzYWdlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlLCBpZ25vcmVWYWx1ZV91c2VOdWxsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dNZXNzYWdlKGRhdGE6IGFueSwgc2VwYXJhdG9yT3JEZXRhaWw/OiBzdHJpbmcsIHNldmVyaXR5PzogTWVzc2FnZVNldmVyaXR5KSB7XG5cbiAgICAgICAgaWYgKCFzZXZlcml0eSkge1xuICAgICAgICAgICAgc2V2ZXJpdHkgPSBNZXNzYWdlU2V2ZXJpdHkuZGVmYXVsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgSHR0cFJlc3BvbnNlQmFzZSkge1xuICAgICAgICAgICAgZGF0YSA9IFV0aWxpdGllcy5nZXRIdHRwUmVzcG9uc2VNZXNzYWdlcyhkYXRhKTtcbiAgICAgICAgICAgIHNlcGFyYXRvck9yRGV0YWlsID0gVXRpbGl0aWVzLmNhcHRpb25BbmRNZXNzYWdlU2VwYXJhdG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBtZXNzYWdlIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtc2dPYmplY3QgPSBVdGlsaXRpZXMuc3BsaXRJblR3byhtZXNzYWdlLCBzZXBhcmF0b3JPckRldGFpbCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlSGVscGVyKG1zZ09iamVjdC5maXJzdFBhcnQsIG1zZ09iamVjdC5zZWNvbmRQYXJ0LCBzZXZlcml0eSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZUhlbHBlcihkYXRhLCBzZXBhcmF0b3JPckRldGFpbCwgc2V2ZXJpdHksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc2hvd1N0aWNreU1lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nKTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5OiBzdHJpbmcsIGRldGFpbDogc3RyaW5nLCBzZXZlcml0eTogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSk7XG4gICAgc2hvd1N0aWNreU1lc3NhZ2Uoc3VtbWFyeTogc3RyaW5nLCBkZXRhaWw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSwgZXJyb3I/OiBhbnksIG9uUmVtb3ZlPzogKCkgPT4gYW55KTtcbiAgICBzaG93U3RpY2t5TWVzc2FnZShzdW1tYXJ5QW5kRGV0YWlsczogc3RyaW5nW10sIHN1bW1hcnlBbmREZXRhaWxzU2VwYXJhdG9yOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKHJlc3BvbnNlOiBIdHRwUmVzcG9uc2VCYXNlLCBpZ25vcmVWYWx1ZV91c2VOdWxsOiBzdHJpbmcsIHNldmVyaXR5OiBNZXNzYWdlU2V2ZXJpdHkpO1xuICAgIHNob3dTdGlja3lNZXNzYWdlKGRhdGE6IHN0cmluZyB8IHN0cmluZ1tdIHwgSHR0cFJlc3BvbnNlQmFzZSwgc2VwYXJhdG9yT3JEZXRhaWw/OiBzdHJpbmcsIHNldmVyaXR5PzogTWVzc2FnZVNldmVyaXR5LCBlcnJvcj86IGFueSwgb25SZW1vdmU/OiAoKSA9PiBhbnkpIHtcblxuICAgICAgICBpZiAoIXNldmVyaXR5KSB7XG4gICAgICAgICAgICBzZXZlcml0eSA9IE1lc3NhZ2VTZXZlcml0eS5kZWZhdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2VCYXNlKSB7XG4gICAgICAgICAgICBkYXRhID0gVXRpbGl0aWVzLmdldEh0dHBSZXNwb25zZU1lc3NhZ2VzKGRhdGEpO1xuICAgICAgICAgICAgc2VwYXJhdG9yT3JEZXRhaWwgPSBVdGlsaXRpZXMuY2FwdGlvbkFuZE1lc3NhZ2VTZXBhcmF0b3I7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbWVzc2FnZSBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbXNnT2JqZWN0ID0gVXRpbGl0aWVzLnNwbGl0SW5Ud28obWVzc2FnZSwgc2VwYXJhdG9yT3JEZXRhaWwpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZUhlbHBlcihtc2dPYmplY3QuZmlyc3RQYXJ0LCBtc2dPYmplY3Quc2Vjb25kUGFydCwgc2V2ZXJpdHksIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IGBTZXZlcml0eTogXCIke01lc3NhZ2VTZXZlcml0eVtzZXZlcml0eV19XCIsIFN1bW1hcnk6IFwiJHtkYXRhfVwiLCBEZXRhaWw6IFwiJHtzZXBhcmF0b3JPckRldGFpbH1cIiwgRXJyb3I6IFwiJHtVdGlsaXRpZXMuc2FmZVN0cmluZ2lmeShlcnJvcil9XCJgO1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChzZXZlcml0eSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS5kZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dJbmZvKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlU2V2ZXJpdHkuaW5mbzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nSW5mbyhtc2cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTWVzc2FnZVNldmVyaXR5LnN1Y2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ01lc3NhZ2UobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS5lcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nRXJyb3IobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIE1lc3NhZ2VTZXZlcml0eS53YXJuOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dXYXJuaW5nKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBNZXNzYWdlU2V2ZXJpdHkud2FpdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nVHJhY2UobXNnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZUhlbHBlcihkYXRhLCBzZXBhcmF0b3JPckRldGFpbCwgc2V2ZXJpdHksIHRydWUsIG9uUmVtb3ZlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgc2hvd01lc3NhZ2VIZWxwZXIoc3VtbWFyeTogc3RyaW5nLCBkZXRhaWw6IHN0cmluZywgc2V2ZXJpdHk6IE1lc3NhZ2VTZXZlcml0eSwgaXNTdGlja3k6IGJvb2xlYW4sIG9uUmVtb3ZlPzogKCkgPT4gYW55KSB7XG5cbiAgICAgICAgY29uc3QgYWxlcnRDb21tYW5kOiBBbGVydENvbW1hbmQgPSB7XG4gICAgICAgICAgICBvcGVyYXRpb246IGlzU3RpY2t5ID8gJ2FkZF9zdGlja3knIDogJ2FkZCcsXG4gICAgICAgICAgICBtZXNzYWdlOiB7IHNldmVyaXR5LCBzdW1tYXJ5LCBkZXRhaWwgfSxcbiAgICAgICAgICAgIG9uUmVtb3ZlXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tZXNzYWdlcy5uZXh0KGFsZXJ0Q29tbWFuZCk7XG4gICAgfVxuXG4gICAgcmVzZXRTdGlja3lNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLm5leHQoeyBvcGVyYXRpb246ICdjbGVhcicgfSk7XG4gICAgfVxuXG4gICAgc3RhcnRMb2FkaW5nTWVzc2FnZShtZXNzYWdlID0gJ0xvYWRpbmcuLi4nLCBjYXB0aW9uID0gJycpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGluZ01lc3NhZ2VUaW1lb3V0SWQpO1xuXG4gICAgICAgIHRoaXMubG9hZGluZ01lc3NhZ2VUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0aWNreU1lc3NhZ2UoY2FwdGlvbiwgbWVzc2FnZSwgTWVzc2FnZVNldmVyaXR5LndhaXQpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9XG5cbiAgICBzdG9wTG9hZGluZ01lc3NhZ2UoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRpbmdNZXNzYWdlVGltZW91dElkKTtcbiAgICAgICAgdGhpcy5yZXNldFN0aWNreU1lc3NhZ2UoKTtcbiAgICB9XG5cblxuXG4gICAgbG9nRGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcobXNnKTtcbiAgICB9XG5cbiAgICBsb2dFcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cblxuICAgIGxvZ0luZm8obXNnKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhtc2cpO1xuICAgIH1cblxuICAgIGxvZ01lc3NhZ2UobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG4gICAgbG9nVHJhY2UobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICB9XG5cbiAgICBsb2dXYXJuaW5nKG1zZykge1xuICAgICAgICBjb25zb2xlLndhcm4obXNnKTtcbiAgICB9XG5cbiAgICBnZXREaWFsb2dFdmVudCgpOiBPYnNlcnZhYmxlPEFsZXJ0RGlhbG9nPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpYWxvZ3MuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0TWVzc2FnZUV2ZW50KCk6IE9ic2VydmFibGU8QWxlcnRDb21tYW5kPiB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cbn1cblxuIl19