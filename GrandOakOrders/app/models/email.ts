﻿import {HttpClient, HttpResponseMessage} from 'aurelia-fetch-client';
import {OrderPojo} from './order';

export class Email {
    email: string[];
    bcc: string[];
    subject: string;
    body: string;

    constructor(public order: OrderPojo, private httpClient: HttpClient) {
        //http://stackoverflow.com/a/5366862
        const invoiceId = (`0000${this.order.Id}`).substring(this.order.Id.toString().length);
        this.email = (this.order.Inquiry.Email || '').split(';');
        this.subject = `Grand Oak Culinary Market: invoice #${invoiceId}`;
        this.body = `Thank you for doing business with Grand Oak Culinary Market.

Attached is your invoice.

Regards,
Jan-Willem Stulp`;
    }

    get reportUrl() {
        return `/Reports/Invoices/${this.order.Id}?format=pdf`;
    }
    
    get quoteReportUrl() {
        return `/Reports/Quotes/${this.order.Id}?format=pdf`;
    }

    send(email: string[], bcc: string[]): Promise<any> {
        this.email = email;
        this.bcc = bcc;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpClient.fetch(`/api/orders/${this.order.Id}/emailInvoice`, { method: 'post', body: JSON.stringify(this.toJSON()), headers });
    }

    sendQuote(email: string[], bcc: string[]): Promise<any> {
        this.email = email;
        this.bcc = bcc;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.httpClient.fetch(`/api/orders/${this.order.Id}/emailQuote`, { method: 'post', body: JSON.stringify(this.toJSON()), headers });
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