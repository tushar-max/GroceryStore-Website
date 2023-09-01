import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { PlacedOrders } from 'src/app/Models/order.model';
import { AccountServiceService } from 'src/app/Service/account-service.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.css']
})
export class PlacedOrdersComponent implements OnInit{
  orderedItems:PlacedOrders[]=[];
  constructor(private productService:ProductService,private accountService:AccountServiceService){}
  ngOnInit(): void {
    var email = this.accountService.getUserEmail();
    console.log("Email is: "+email);
    if(!email){
      email="tushar@testing.com";
    }
    this.productService.getPlacedOrdersFromDb(email).subscribe({
      next:(response)=>{
        this.orderedItems=response;
        console.log(response);
      },
      error:(response)=>{
        console.log("Some error occured.")
        console.log(response);
      }
    });
  }

}
