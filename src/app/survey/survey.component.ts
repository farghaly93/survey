import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminServices } from '../admin/adminServices.servise';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { ClientServices } from '../clientServices.servise';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/Observable/combineLatest';
import {Chart} from 'chart.js';
import * as $ from "jquery";
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  constructor(public modalService: BsModalService, private clientServices: ClientServices, private adminservices: AdminServices, private router: ActivatedRoute) { }
  qs = [];
  mess: string;
  chs = [];
  done: string;
  sections = ['s'];
  sectionsvalues = [];
  loading = false;
  cat: string;
  oneCat;
  store: string;
  image: string;
  id;
  charts = [];
  total = 0;
  stars = [];
  sum = 0;
  sectionsLists = [];
  comments = [];
  LineChart: any = [];
  linechartdata = [];
  top = [];
  lat =27;
  lng = 31;
  mapupdated: string;
  zoom = 15;
  mode: string;
  back: string;
  map = false;
  specs = [];
  specsvalues = [];
  ip: string;
  phone: number;
  address: string;
  review: string;
  status: string;
  commentmess: string;
  sectionliststore: string;
  button = true;
  modalRef;
  modalmess: string;
  survey = false;
  surveyloading = false;

  ngOnInit() {
   
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
        this.cat = paramMap.get('cat');
        this.store = paramMap.get('id');
        this.mode = paramMap.get('mode');
        if (paramMap.has('sec1')) {this.sectionsvalues[0] = paramMap.get('sec1');
      }
        if (paramMap.has('sec2')) {this.sectionsvalues[1] = paramMap.get('sec2');
      }
        if (paramMap.has('sec3')) {this.sectionsvalues[2] = paramMap.get('sec3');
      }
        if (paramMap.has('sec4')) {this.sectionsvalues[3] = paramMap.get('sec4');
      }
        if (paramMap.has('sec5')) {this.sectionsvalues[4] = paramMap.get('sec5');
      }
        if (this.mode === 'specific') {
         // this.zoom = 18;
        }
        
        this.oneCat = this.cat.slice(0, -1);
        this.id = paramMap.get('id');
        this.loading = true;
        Observable.combineLatest([
          this.adminservices.getSections(this.cat),
          this.adminservices.getQuestions(this.cat),
          this.adminservices.getChoices(this.cat),
          this.adminservices.getStore(this.id, this.cat),
          this.clientServices.getLocation(this.cat, this.id, this.sectionsvalues),
          this.clientServices.getIpAddress(),
        ]).subscribe(combined => {
          if(this.mode === 'specified') {
            this.lat = combined[4].coords.lat;
            this.lng = combined[4].coords.lng;
          }
            
          console.log(this.lat , this.lng)
          const secs = [];
          let back = '../';
          for (let i = 1; i < 6; i++) {
            if (combined[0].sections['section' + i]) {
              secs[i - 1] = combined[0].sections['section' + i];
              back += '../';
            }
          }
          if(this.mode === 'filter') {
            back = '../';
          }
          this.sections = secs;
          this.back = back;
          this.qs = combined[1].questions;
          this.specs = combined[1].specs?combined[1].specs: [];
          this.chs = combined[2].allchoices;
          this.image = combined[3].store ? combined[3].store.image : '';
          console.log('status',this.mode);
          switch (this.mode) {
            case 'filter': this.sectionliststore = this.store; break;
            case 'new': this.sectionliststore = null; break;
          }
          this.clientServices.getSection(this.cat, this.sectionliststore, 'no', 0).subscribe(res => {
            this.sectionsLists[0] = res.sectionlist;
          });
          this.specsvalues = combined[4].specs?combined[4].specs:[];
          this.phone = combined[4].phone;
          this.address = combined[4]['address'];
          this.review = combined[4]['review'];
          this.status = combined[4]['status'];
          this.ip = combined[5].ip;
          this.setCharts();
          this.setStars();
          this.clientServices.getcomms(this.cat, this.store, this.sectionsvalues).subscribe(res => {
            this.comments = res.comments;
          });
          this.clientServices.getlineData(this.sectionsvalues, this.cat, this.store).subscribe(res => {
            this.linechartdata = res.data;
            this.setLineChart();
          });
          this.topStores();
          this.loading = false;

          if(this.sectionsvalues.length === this.sections.length) {
            this.survey = true;
          }
        });

    });
  }

  setLineChart() {
    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'Aug', 'sep', 'oct', 'nov', 'dec'],
        datasets: [{
          label: 'rate of the restaurant per month',
          data: this.linechartdata,
          fill: false,
          lineTension: .2,
          borderColor: 'green',
          borderWidth: 2,
        }]
      },
      options: {
        title: {
          text: 'rate line chart in ' + new Date().getFullYear(),
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  setCharts() {
      this.charts = [];
      this.clientServices.setCharts(this.sectionsvalues, this.cat, this.store, this.qs.length).subscribe(res => {
        this.charts = res.percents;
        this.sum = res.sum;
        console.log('charts',this.charts);
      });
  }
  setStars() {
    this.charts = [];
    this.clientServices.setStars(this.sectionsvalues, this.cat, this.store).subscribe(res => {
      this.stars = res.stars;
      this.total = res.total;
    });
}

  getSectionList(s) {
    const secVal = this.sectionsvalues[s];
    this.clientServices.getSection(this.cat, this.sectionliststore, secVal, s).subscribe(res => {
         this.sectionsLists[s + 1] = res.sectionlist;
      });
}
  submitsurvey(f) {
    if (f.valid) {
      this.button = false;
      const form = f.value;
      form['category'] = this.cat;
      form['store'] = this.store;
      form['date'] = new Date().getMonth();
      form['ip'] = this.ip;
      if(this.mode !== 'specified') {
        form['lat'] = this.lat;
        form['lng'] = this.lng;
      }
      let s = 1;
      let sp = 1;
      for (const sec of this.sectionsvalues) {
        if (sec) {
          form['section' + (s)] = sec;
        }
        s++;
      }
      for (const fo in form) {
        if (typeof form[fo] === 'string') {
          form[fo] = form[fo].toLowerCase();
        }
      }
        this.surveyloading = true;
        this.clientServices.addSurvey(form).subscribe(res => {
          this,this.surveyloading = false;
          if (res.done) {
            this.done = res.done;
            //this.survey = false; 
            this.reset();
            this.setStars();             
            setTimeout(()=>{
              this.done = null;
            },2000)
          }
        });
    } else {
      this.done = 'complete your survey';
    }
  }
  updateChart(secs, s) {
    // this.sectionsLists[s+1] = []
    let i = 1;
    for (const sec of this.sections) {
      if (secs.name === 'section' + i) {
        this.sectionsvalues[i - 1] = secs.control.value;
      }
      i++;
    }
    console.log('values', this.sectionsvalues);
    this.getSectionList(s);
    this.reset();
    if(this.sectionsvalues.length === this.sections.length) {
      this.survey = true;
    }
  }
  reset() {
    this.charts = [];
    this.setCharts();
    this.setStars();
    this.getcomms();
    this.topStores();
    this.getMap();
    this.clientServices.getlineData(this.sectionsvalues, this.cat, this.store).subscribe(res => {
      this.linechartdata = res.data;
      this.setLineChart();
    });
  }
  bar(ch, i) {
    if (this.charts && this.charts.length > 0) {
    let percent;
    this.charts[i].map(bar => {
      if (bar._id === ch) {
        percent = parseFloat(bar.percent).toFixed(1);
        }
      });
    return percent;
    } else {
      return 0;
    }
  }
  addcomment(c) {
    console.log(this.sectionsvalues, this.sections.length)
    if (c.valid && this.sectionsvalues.length ===this.sections.length) {
      
      console.log(c.value.comment);
      this.clientServices.publishcomm(this.cat, this.store, this.sectionsvalues, c.value.comment).subscribe(res => {
        this.comments = res.comments;
        this.commentmess = res.mess;
        c.reset();
      });
    }
  }
  getcomms() {
    this.clientServices.getcomms(this.cat, this.store, this.sectionsvalues).subscribe(res => {
      this.comments = res.comments;
    });
  }
  starsList(r) {
   // if(this.stars.length>0) {
     // let rate;
      // this.stars.map(star=>{
        // if(star._id===r) {
          // rate = star.count;
          return 4;
          // }
        // })
        // return rate;
     // }
  }
  topStores() {
    this.clientServices.topStores(this.sectionsvalues, this.cat, this.store).subscribe(res => {
      this.top = res.topbranchs;
       console.log(this.top);
    });
  }
  getLocation(event) {
    if(this.mode !== 'specified') {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    }
  }
  getMap() {
    // if(this.sectionsvalues.length === this.sections.length) {
      this.clientServices.getLocation(this.cat, this.store, this.sectionsvalues).subscribe(res => {
        if (res.coords) {
           this.lat = res.coords.lat;
           this.lng = res.coords.lng;
           //this.zoom = res.zoom;
           this.map = true;
        }
      });
   // }
  }
  resetfilter() {
    this.sectionsLists = [];
    this.clientServices.getSection(this.cat, this.sectionliststore, 'no', 0).subscribe(res => {
      this.sectionsLists[0] = res.sectionlist;
      this.reset();
    });
    
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ backdrop: 'static', keyboard: false });
  }
  scrollto(part) {
    window.scrollTo(0, 2000);
   // console.log(part);
 // let el = document.getElementById(part);
  //el.scrollIntoView();
  }
}
