import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../admin/adminServices.servise';

@Component({
  selector: 'app-category',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class UserscategoriesComponent implements OnInit {

  constructor(private adminServices: AdminServices) { }
  logos = ['cars.jpg', 'mobiles.jpg', 'restaurants.jpg', 'category2.png'];
  cats;
  ngOnInit() {
    this.adminServices.getCategories().subscribe(res => {
      this.cats = res.cats;
      console.log(this.cats);
    });
  }
}
