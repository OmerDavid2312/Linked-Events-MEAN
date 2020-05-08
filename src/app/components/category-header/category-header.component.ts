import { Router } from '@angular/router';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.css']
})
export class CategoryHeaderComponent implements OnInit {
  stylePill:any[] = ['badge-primary','badge-success','badge-danger','badge-yellow','badge-info','badge-teal','badge-purple'];
  categories:any[]; 


  constructor(private categoriesSrv:CategoriesService,private router:Router) {
    this.categoriesSrv.getCategories().subscribe(cate=>{
      this.categories=cate;
    })
   }

  ngOnInit() {
  }

  filter(categoryID){
    this.router.navigateByUrl(`/events/category/${categoryID}`);
  }

}
