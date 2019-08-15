import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, Subscription } from 'rxjs';
const url = 'http://localhost:3000/client/';

@Injectable({providedIn: 'root'})
export class ClientServices {
    constructor(private http: HttpClient) {}

    languageSub =  new Subject<{lang: string}>();

    addSurvey(body) {
        return this.http.post<{done: string}>(url + 'addsurvey', body);
    }
    setCharts(sections, cat, store, noq) {

        const body = {category: cat, store};
        let i = 1;
        sections.map((sec) => { if (sec !== '' && sec !== null) {body['section' + i] = sec; i++; }});
        console.log('jojojo', body);
        return this.http.post<{percents: any, sum: number}>(url + 'getCharts', body);
    }
    setStars(sections, cat, store) {

        const body = {category: cat, store};
        let i = 1;
        sections.map((sec) => {if (sec !== '') {body['section' + i] = sec; i++; }});
        return this.http.post<{total: number, stars: object[] }>(url + 'getStars', body);
    }
    getRating(obj) {
        return this.http.post<{total: number, stars: object[] }>(url + 'getStars', obj);
    }
    getSection(cat, store, parent, secnum) {
        return this.http.get<{sectionlist}>(url + 'getSection/' + cat + '/' + store + '/' + parent + '/' + secnum);
    }
    publishcomm(cat, store, sections, comm) {
        const obj = {category: cat, store, comment: comm};
        let i = 1;
        for (const sec of sections) {
            if (sec) {
                obj['section' + i] = sec;
            }
            i++;
        }
        console.log(obj);
        return this.http.post<{comments, mess}>(url + 'addcomm', obj);
    }
    getcomms(cat, store, sections) {
        const obj = {category: cat, store};
        let i = 1;
        for (const sec of sections) {
            if (sec !== '') {
                obj['section' + i] = sec;
            }
            i++;
        }
        return this.http.post<{comments}>(url + 'getcomms', obj);
    }
    getlineData(sections, cat, store) {

        const body = {category: cat, store};
        let i = 1;
        sections.map((sec) => {if (sec !== '') {body['section' + i] = sec; i++; }});
        return this.http.post<{data}>(url + 'getlinedata', body);
    }
    searchstores(query) {
        return this.http.get<{stores}>(url + 'searchstores/' + query);
    }
    topStores(sections, cat, store) {
        const body = {category: cat};
        if(store !== 'null') {body['store'] = store}
        let i = 1;
        sections.map((sec) => {if (sec !== '') {body['section' + i] = sec; i++; }});
        return this.http.post<{topmain: [], topbranchs: []}>(url + 'topstores', body);
    }
    topStoresIn(sections, cat, store) {
        //console.log(sections);
        const body = {category: cat};
        if(store !== 'null') {body['store'] = store}
        let i = 1;
        sections.map((sec) => {if (sec !== '') {body['section' + i] = sec; i++; }});
        return this.http.post<{top}>(url + 'topstoresIn', body);
    }
    updateLocation(body) {
        return this.http.post<{done}>(url + 'updatemap', body);
    }
    getLocation(cat, store, sections) {
        const body = {category: cat, store};
        let i = 1;
        sections.map((sec) => {body['section' + i] = sec; i++; });
        return this.http.post<{phone, address, review, specs: [], zoom: number, coords: {lat: number, lng: number}}>(url + 'getmap', body);
    }
    getsectionItems(obj) {
        return this.http.post<{items}>(url + 'getsectionitems', obj);
    }
    unwindspecs(cat, spec) {
        return this.http.get<{values: []}>(url + 'unwindspecs/' + cat + '/' + spec);
    }
    filterize(obj, skip, pagelimit) {
        const body = {obj, skip, limit: pagelimit };
        return this.http.post<{items: [], count: number}>(url + 'filter', body);
    }
    getIpAddress() {
        return this.http.get<{ip}>(url + 'getip');
    }
    mostvisited(cat) {
        return this.http.get<{most}>(url + 'mostvisited/'+cat);
    }
    translate(val, lng) {
        return this.http.get<{word}>(url + 'translate/'+val+'/'+lng);
    }
    setlang(lng) {
        this.languageSub.next({lang: lng});
    }
    getlangSub() {
        return this.languageSub.asObservable();
    }
}
