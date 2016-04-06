System.register(['moment'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment_1;
    var EmailDelivery;
    return {
        setters:[
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }],
        execute: function() {
            EmailDelivery = (function () {
                function EmailDelivery(delivery) {
                    this.DATE_FORMAT = 'MMM D, YYYY';
                    this.TIME_FORMAT = 'h:mm a';
                    this.Id = delivery.Id;
                    this.From = delivery.From;
                    this.To = delivery.To;
                    this.Bcc = delivery.Bcc;
                    this.Subject = delivery.Subject;
                    this.Message = delivery.Message;
                    this.OrderId = delivery.OrderId;
                    this.Sent = delivery.Sent;
                    this.SentBy = delivery.SentBy;
                    this.DeliveredDate = delivery.DeliveredDate;
                    this.BouncedDate = delivery.BouncedDate;
                    this.OpenedDate = delivery.OpenedDate;
                }
                Object.defineProperty(EmailDelivery.prototype, "sentDisplay", {
                    get: function () {
                        if (this.Sent == null)
                            return 'Unknown';
                        var text = moment_1.default(this.Sent).format(this.DATE_FORMAT) + " at " + moment_1.default(this.Sent).format(this.TIME_FORMAT) + ".";
                        if (this.BouncedDate) {
                            text += " Bounced on " + moment_1.default(this.BouncedDate).format(this.DATE_FORMAT) + " at " + moment_1.default(this.BouncedDate).format(this.TIME_FORMAT) + ".";
                        }
                        if (this.DeliveredDate) {
                            text += " Delivered on " + moment_1.default(this.DeliveredDate).format(this.DATE_FORMAT) + " at " + moment_1.default(this.DeliveredDate).format(this.TIME_FORMAT) + ".";
                        }
                        if (this.OpenedDate) {
                            text += " Opened on " + moment_1.default(this.OpenedDate).format(this.DATE_FORMAT) + " at " + moment_1.default(this.OpenedDate).format(this.TIME_FORMAT) + ".";
                        }
                        return text;
                    },
                    enumerable: true,
                    configurable: true
                });
                return EmailDelivery;
            }());
            exports_1("EmailDelivery", EmailDelivery);
        }
    }
});
