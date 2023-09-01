import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdCheck } from 'src/app/Models/checkout.model';
import { Products } from 'src/app/Models/product.model';
import { Review } from 'src/app/Models/review.model';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private productService:ProductService, private router:Router,private accountService:AccountServiceService){}
  productId:string='';
  counter:number=0;
  actualPrice:number=0;
  productDetails:ProductDetailObj = {
    id:'',
    productName:'',
    description:'',
    price:0,
    image:'',
    discount:0
  };
  checkoutProductQty:ProdCheck={
    id: '',
    count: 0
  }
  review:Review={
    product: '',
    name: '',
    description: '',
    id: 0,
    productName: ''
  }
  reviewsList:Review[]=[];
  ngOnInit(): void {
    this.productId=this.productService.getId();
    // this.productDetails=this.productService.getProductDetails(this.productId);
    this.productService.getProductDetails().subscribe(
      {
        next: (productDetail) => {
          this.actualPrice=productDetail.price*(100-productDetail.discount);
          this.actualPrice=this.actualPrice/100;
          this.productDetails.id=productDetail.id;
          this.productDetails=productDetail;
          this.getAllReviews();
        },
        error: (response) => {
          console.log(response);
        }
      });
      this.getAllReviews();
  }
  plus(){
    this.counter++;
  }
  minus(){
    if(this.counter>0){
      this.counter--;
    }
    else{
      alert("The product count cannot be less than zero.")
    }
  }

  isLoggedIn(){
    return this.accountService.isLoggedIn();
  }

  checkout(){
    if (this.isLoggedIn() && this.counter>0) {
      this.checkoutProductQty.count=this.counter;
    this.checkoutProductQty.id=this.productId;
    //push to cart db
    this.productService.addProductCheckout(this.checkoutProductQty).subscribe({
      next:(product)=>{
        console.log("Product added to cart");
      },
      error:(response)=>{
        console.log(response);
      }
    });
    // console.log(this.checkoutProductQty);
    this.router.navigate(['/products']);
    }
    else{
      if(this.counter<=0){
        alert("Quantity should be atleast one");
      }
      else{
        alert("PLease login first to add items to your cart.");
      }
    }
  }

  submitReview(){
    if (this.review.description=='') {
      alert("Review Should not be empty!");
    }
    else if(!this.accountService.isLoggedIn()){
      alert("Please login to review the product");
    }
    else{
      this.review.product = this.productDetails.id;
      this.review.productName = this.productDetails.productName;
      var name = this.accountService.getUserName();
      if(!name){
        name="Anonymous";
      }
      this.review.name = name;
      this.productService.sendProductReview(this.review).subscribe({
        next:(response)=>{
          console.log(response);
          this.getAllReviews();
        },
        error:(response)=>{
          console.log(response);
        }
      });
    }
  }
  getAllReviews(){
    this.productService.getProductReviews(this.productDetails.id).subscribe({
      next:(response)=>{
        this.reviewsList=response;
        console.log("Reviews are");
        console.log(response);
      },
      error:(response)=>{
        console.log(response);
      }
    });
  }
}
interface ProductDetailObj {
  id: string;
  productName: string;
  description: string;
  price: number;
  image:string;
  discount:number;
}

// function addProductCheckout(checkoutProductQty: ProdCheck) {
  
// }
