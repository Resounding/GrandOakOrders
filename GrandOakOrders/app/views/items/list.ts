import {inject} from 'aurelia-framework';
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import {Router} from 'aurelia-router';
import {ItemTemplate} from '../../models/itemTemplate';
import _ from 'underscore';

@inject(HttpClient, Router, Element)
export class ItemList {
    
    _items: Array<ItemTemplate> = [];

    constructor(private httpClient: HttpClient, private router: Router, private element: HTMLElement) { }

    activate() {
        this.httpClient.get('/api/items')
            .then((response: HttpResponseMessage) => {
                response.content.forEach(i => this._items.push(new ItemTemplate(i)));
            });
    }
}