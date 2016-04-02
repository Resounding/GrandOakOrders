System.register([], function(exports_1) {
    var Email;
    return {
        setters:[],
        execute: function() {
            Email = (function () {
                function Email(order, httpClient) {
                    this.order = order;
                    this.httpClient = httpClient;
                    //http://stackoverflow.com/a/5366862
                    var invoiceId = ("0000" + this.order.Id).substring(this.order.Id.toString().length);
                    this.email = (this.order.Inquiry.Email || '').split(';');
                    this.subject = "Grand Oak Culinary Market: invoice #" + invoiceId;
                    this.body = "Thank you for doing business with Grand Oak Culinary Market.\n\nAttached is your invoice.\n\nRegards,\nJan-Willem Stulp";
                }
                Object.defineProperty(Email.prototype, "reportUrl", {
                    get: function () {
                        return "/Reports/Invoices/" + this.order.Id + "?format=pdf";
                    },
                    enumerable: true,
                    configurable: true
                });
                Email.prototype.send = function (email, bcc) {
                    this.email = email;
                    this.bcc = bcc;
                    var headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    return this.httpClient.fetch("/api/orders/" + this.order.Id + "/emailInvoice", { method: 'post', body: JSON.stringify(this.toJSON()), headers: headers });
                };
                Email.prototype.toJSON = function () {
                    return {
                        OrderId: this.order.Id,
                        Address: this.email,
                        Bcc: this.bcc,
                        Subject: this.subject,
                        Body: this.body
                    };
                };
                return Email;
            })();
            exports_1("Email", Email);
        }
    }
});
