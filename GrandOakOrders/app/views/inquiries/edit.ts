import {inject} from 'aurelia-framework';
import {AuthService} from 'paulvanbladel/aurelia-auth';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import moment from 'moment';
import _ from 'underscore';
import {InquiryViewModel, InquiryPojo} from '../../models/inquiry';

@inject(AuthService, HttpClient, Router, Element)
export class EditInquiry {
    _model:InquiryViewModel;
    _submitted = false;

    constructor(private auth: AuthService, private httpClient: HttpClient, private router:Router, private element: HTMLElement) {
        
    }

    activate(params) {
        this.httpClient.get(`/api/inquiries/${params.id}`)
            .then((res:HttpResponseMessage) => {
                var inquiry:InquiryPojo = res.content;
                this._model = new InquiryViewModel(inquiry);
            });
        
        window.setTimeout(_.bind(() => {
            var $eventDate = $('#date', this.element),
                $timepicker = $('.timepicker', this.element),
                $select = $('select', this.element);

            $eventDate.pickadate({
                format: 'dddd mmmm d, yyyy'
            })
            .on('change', (e) => {
                this._model.EventDate = e.target.value;
            });
            $eventDate.pickadate('picker')
                .set('select', this._model.EventDate);

            $timepicker
                .pickatime({
                    format: 'h:i A',
                    formatLabel: 'h:i A'
                })
                .on('change', (e) => {
                    this._model.EventTime = e.target.value;
                })

            $timepicker.pickatime('picker')
                .set('select', this._model.EventTime);

            $select.material_select();
		}, this), 500);
    }

    save(e) {
        this._submitted = true;

        if (!this._model.isValid()) {
            e.preventDefault();
        } else {
            var inquiry = this._model.toJSON();
            this.httpClient.put(`/api/inquiries/${inquiry.Id}`, inquiry)
                .then((response) => {
                    console.log(response);
                    if (inquiry.OutcomeId == "ORDER") {
                        this.router.navigateToRoute(`orders/new?inquiryId=${inquiry.id}`);
                    } else {
                        this.router.navigateToRoute('inquiries');
                    }
                })
        }
    }
}