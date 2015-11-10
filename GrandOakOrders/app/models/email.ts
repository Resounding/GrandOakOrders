import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {OrderPojo} from './order';

export class Email {
    email: string;
    subject: string;
    body: string;

    constructor(public order:OrderPojo, private httpClient: HttpClient) {
        this.email = this.order.Inquiry.Email;
        this.subject = 'Grand Oak Culinary Market invoice';
        this.body = `Thank you for doing business with Grand Oak Culinary Markets.

Attached is your invoice.

Regards,
Jan-Willem Stulp`;
    }

    get reportUrl() {
        return `/Reports/Invoices/${this.order.Id}?format=pdf`;
    }

    send(): Promise<any> {
        return this.httpClient.post(`/api/orders/${this.order.Id}/emailInvoice`, this.toJSON()));
    }

    toJSON() {
        return {
            OrderId: this.order.Id,
            Address: this.email,
            Subject: this.subject,
            Body: this.body
        };
    }
}