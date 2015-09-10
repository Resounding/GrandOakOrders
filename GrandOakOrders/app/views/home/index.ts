import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {InquiryPojo} from '../../models/inquiry';
import {OrderPojo} from '../../models/order';

interface HomeData {
    Inquiries: Array<InquiryPojo>;
    Orders: Array<OrderPojo>;
}

@inject(HttpClient)
export default class Home {

    content: HomeData;

    constructor(private httpClient: HttpClient) {
        this.httpClient.get('/API/Home')
            .then((response: HttpResponseMessage) => {
                this.content = response.content
            })
            .catch((err) => {
                console.log(err);
                debugger;
            });
    }
}