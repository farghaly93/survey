import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const url = 'http://localhost:3000/admin/';

@Injectable({providedIn: 'root'})
export class AdminServices {
    constructor(private http: HttpClient) {}
    addcat(body) {
        return this.http.post<{added: boolean}>(url + 'addCat', body);
    }
    getCategories() {
        return this.http.get<{cats: object[]}>(url + 'getCats');
    }
    removeCat(id) {
        return this.http.get<{cats: object[], done: boolean}>(url + 'removeCat/' + id);
    }
    removeStore(id, cat) {
        return this.http.get<{stores: object[], done: boolean}>(url + 'removeStore/' + id + '/' + cat);
    }
    getCategory(id) {
        return this.http.get<{qs, name: string}>(url + 'getCat/' + id);
    }
    addQuestion(body) {
        return this.http.post<{added: boolean}>(url + 'addQuestion', body);
    }
    getStores(cat) {
        return this.http.get<{stores: object[]}>(url + 'getStores/' + cat);
    }
    addStore(body) {
        const postData = new FormData();
        let  formData;
        if (typeof body.image === 'string') {
            formData = body;
        } else {
        formData = postData;
        formData.append('category', body.category);
        formData.append('name', body.name);
        formData.append('desc', body.desc);
        formData.append('image', body.image);
        if (body.mode) {formData.append('mode', body.mode); }
        }
        return this.http.post<{mess: string}>(url + 'addStore', formData);
    }
    addAd(body) {
        const postData = new FormData();
        let  formData;
        if (typeof body.image === 'string') {
            formData = body;
        } else {
        formData = postData;
        formData.append('name', body.name);
        formData.append('desc', body.desc);
        formData.append('image', body.image);
        if (body.mode) {formData.append('mode', body.mode); }
        }
        return this.http.post<{mess: string}>(url + 'addAd', formData);
    }
    addSections(body) {
        return this.http.post<{done: boolean}>(url + 'addSections', body);
    }
    getSections(categ) {
        return this.http.get<{sections: object}>(url + 'getSections/' + categ);
    }
    getChoices(categ) {
        return this.http.get<{allchoices: []}>(url + 'getChoices/' + categ);
    }
    getQuestions(categ) {
        return this.http.get<{questions: [], specs: []}>(url + 'getQuestions/' + categ);
    }
    getStore(name, cat) {
        return this.http.get<{store: {name: string, image: string, desc: string}}>(url + 'getStore/' + name + '/' + cat);
    }
    getAd(name) {
        return this.http.get<{store: {name: string, image: string, desc: string}}>(url + 'getAd/' + name);
    }
    getSectionChoices(section, cat) {
        return this.http.get<{choices}>(url + 'getsectionchoices/' + section + '/' + cat);
    }
    addspecs(body) {
        console.log(body);
        return this.http.post<{done: boolean}>(url + 'addspecs', body);
    }
    addbranch(body) {
        return this.http.post<{branch, done: boolean}>(url + 'addbranch', body);
    }
    getbranch(id) {
        return this.http.get<{branch}>(url + 'getbranch/' + id);
    }
    getbranchs(obj, skip, limit) {
        const body = {obj, skip, limit};
        return this.http.post<{items, count}>(url + 'getbranchs', body);
    }
    deletebranch(store) {
        return this.http.post<{_id}>(url + 'deletebranch', store);
    }
    deletead(ad) {
        return this.http.post<{_id}>(url + 'deletead', {_id: ad});
    }
    getads() {
        return this.http.get<{ads}>(url + 'getads');
    }
    isAdmin(pass) {
        return this.http.get<{isAdmin: boolean}>(url + 'isAdmin/' + pass);
    }
}
