import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private router:Router, private productService:ProductService) {
    
  }
  Categories(Id:number){
    this.productService.setCategoryFromHome(Id);
    this.router.navigate(['/products']);
  }
}
