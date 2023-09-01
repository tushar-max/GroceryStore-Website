import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/Models/cart.model';
import { ProdCheck } from 'src/app/Models/checkout.model';
import { PlacedOrders } from 'src/app/Models/order.model';
import { Products } from 'src/app/Models/product.model';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:any;
  counter:number=0;
  endFetching:boolean=false;
  constructor(private router:Router,private productService:ProductService,private accountService:AccountServiceService){

  }
  placedOrders:PlacedOrders={
    name: '',
    email: '',
    image: '',
    dateTime: '',
    count: 0,
    id: 0
  }
  ngOnInit(): void {
      if(!this.endFetching){
        this.productService.getCartItems().subscribe({
          next:(products)=>{
            this.cartItems=products;
            // console.log(this.cartItems);
          },
          error: (response)=>{
            console.log("Some error occured.");
            console.log(response);
          }
        });
      }
      else{
        this.cartItems=null;
      }
    
    console.log("Cart");
    console.log(this.cartItems);
  }
  plus(item:any){
    item.count++;
  }
  minus(item:any){
    if(item.count>0){
      item.count--;
    }
    else{
      alert("The product count cannot be less than zero.")
    }
  }
  placeOrder(cart:any){
    this.productService.setOrderedProducts(cart);
    this.productService.deleteOrderedProductList().subscribe({
      next:(result)=>{
        console.log("success");
      },
      error:(response)=>{
        console.log(response);
      }
    });
    console.log("Ordered Items");
    console.log(this.cartItems);
    for (let index = 0; index < this.cartItems.length; index++) {
      var element = this.cartItems[index];
      this.placedOrders.name=element.productName;
      var email=localStorage.getItem('email');
      if (email==null) {
        email="p";
      }
      this.placedOrders.email=email.toString();
      this.placedOrders.image=element.image;
      this.placedOrders.count=element.count;
      this.productService.setPlacedOrdersToDb(this.placedOrders).subscribe({
        next:(result)=>{
          console.log(index);
        },
        error:(response)=>{
          console.log(response);
        }
      });
    }
    alert("Order Placed Successfully");
    this.router.navigate(['']);
  }
}
