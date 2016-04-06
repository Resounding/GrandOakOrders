import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {AuthService} from 'aurelia-auth';
import {InquiryPojo} from '../../models/inquiry';
import {OrderPojo} from '../../models/order';

interface HomeData {
    Inquiries: Array<InquiryPojo>;
    Orders: Array<OrderPojo>;
}

@inject(HttpClient, AuthService)
export default class Home {

    content: HomeData;

    constructor(private httpClient: HttpClient, private auth: AuthService, private router:Router) {
        this.load();
    }

    load() {
        this.httpClient.fetch('/API/Home')
            .then((response: HttpResponseMessage) => {
                response.json().then((content) => {
                    this.content = content;
                });
            })
            .catch((err:HttpResponseMessage) => {
                if(err.status === 401) {
                    this.auth.authenticate('google', false, null)
                        .then(() => this.load())
                        .catch(() => this.router.navigateToRoute('login'));
                } else {
                    console.log(err);
                }
            });
    }
}