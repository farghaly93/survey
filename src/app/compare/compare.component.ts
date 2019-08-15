import { Component, OnInit } from '@angular/core';
import { SwiperComponent } from 'angular2-useful-swiper';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  images = [1, 2, 3,4,5,6,7,8,9].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    //config.interval = 1500;
    //config.wrap = true;
   // config.keyboard = true;
    //config.pauseOnHover = true;
   // config.wrap = true;
  }
  ngOnInit()  {
  }

   
}