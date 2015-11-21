import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {OrderPojo} from './order';

export class Email {
    email: string[];
    bcc: string[];
    subject: string;
    body: string;

    constructor(public order: OrderPojo, private httpClient: HttpClient) {
        //http://stackoverflow.com/a/5366862
        const invoiceId = ('0000' + this.order.Id).substring(this.order.Id.toString().length);
        this.email = (this.order.Inquiry.Email || '').split(';');
        this.subject = `Grand Oak Culinary Markets: invoice #${invoiceId}`;
        this.body = `Thank you for doing business with Grand Oak Culinary Markets.

Attached is your invoice.

Regards,
Jan-Willem Stulp`;
    }

    get reportUrl() {
        return `/Reports/Invoices/${this.order.Id}?format=pdf`;
    }

    send(email: string[], bcc: string[]): Promise<any> {
        this.email = email;
        this.bcc = bcc;
        return this.httpClient.post(`/api/orders/${this.order.Id}/emailInvoice`, this.toJSON());
    }

    toJSON() {
        return {
            OrderId: this.order.Id,
            Address: this.email,
            Bcc: this.bcc,
            Subject: this.subject,
            Body: this.body
        };
    }
}