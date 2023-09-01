import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/Models/product.model';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-add-grocery',
  templateUrl: './add-grocery.component.html',
  styleUrls: ['./add-grocery.component.css']
})
export class AddGroceryComponent implements OnInit {
  constructor(private productService: ProductService,private router:Router) {
    
  }
  ngOnInit(): void {
  }
  addProductRequest:Products={
    id: '',
    productName: '',
    description: '',
    price: 0,
    image: '',
    Category:0,
    discount:0 
  }
  addProduct(){
    console.log(this.addProductRequest);
    this.productService.addProduct(this.addProductRequest).subscribe({
      next:(product)=>{
        console.log("hi");
        this.router.navigate(['/products'])
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
