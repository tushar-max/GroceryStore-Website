import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../Services/product.service';
import { Route, Router } from '@angular/router';
import { AccountServiceService } from '../Service/account-service.service';
import {FormGroup, FormBuilder, FormControl, FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Products } from '../Models/product.model';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements OnInit {
  public products: ProductList[] = [];
  categoryId: number = 4;
  categoryFromHome:number=4;
  pages: number = 0;
  currentPage: number = 0;
  pageIterator: Array<number> = new Array<number>();
  formValue:FormGroup;
  updateDataRequest:Products={
    id: '',
    productName: '',
    description: '',
    price: 0,
    image: '',
    Category: 0,
    discount: 0
  }
  constructor(private productService: ProductService, private router: Router,private accountService:AccountServiceService) {
    this.formValue=new FormGroup({
      id:new FormControl('Hi'),
      name:new FormControl('Hi'),
      description:new FormControl('Hi'),
      price:new FormControl(0),
      image:new FormControl('Hi'),
    });
  }
  onSubmit(){
    console.log(this.formValue.valid);
    if(this.formValue.valid){
      console.log(this.formValue.valid);
    }
  }
  ngOnInit(): void {
    this.categoryFromHome=this.productService.getCategoryFromHome();
    this.productService.getAllProducts(this.categoryFromHome).subscribe(
      {
        next: (products) => {
          this.products = products;
          this.pages = Math.ceil(products.length / 5);
          console.log(this.pages);
          this.pageIterator = new Array<number>(this.pages);
        },
        error: (response) => {
          console.log(response);
        }
      });
  }
  FilteredProduct(Id: number) {
    this.categoryId = Id;
    this.productService.getAllProducts(this.categoryId).subscribe(
      {
        next: (products) => {
          this.products = products;
          this.pages = Math.ceil(products.length / 5);
          console.log(this.pages);
          this.pageIterator = new Array<number>(this.pages);
        },
        error: (response) => {
          console.log(response);
        }
      });
  }
  productDetail(id: string) {
    console.log(id);
    this.productService.setId(id);
    this.router.navigate(['product-detail']);
  }
  counter(i: number) {
    return new Array(i);
  }
  setCurrentPage(page: number) {
    this.currentPage = page;
    console.log("Current page is: " + this.currentPage);
  }
  next() {
    this.currentPage++;
  }
  prev() {
    this.currentPage--;
  }
  isAdmin(){
    if(this.accountService.isAdmin()?.toString()=="true"){
      return true;
    }
    else{
      return false;
    }
  }
  deleteRecord(id:string){
    this.productService.deleteProduct(id).subscribe({
      next:(response)=>{
        console.log("Successfully deleted data");
        this.ngOnInit();
      },
      error:(response)=>{
        console.log(response);
      }
    });
  }
  onEditData(data:ProductList){
    this.formValue=new FormGroup({
      id:new FormControl(data.id),
      name:new FormControl(data.productName),
      description:new FormControl(data.description),
      price:new FormControl(data.price),
      image:new FormControl(data.image),
    });
  }
  updateProduct(){
    console.log(this.formValue.value);
    this.updateDataRequest.id=this.formValue.value.id;
    this.updateDataRequest.productName=this.formValue.value.name;
    this.updateDataRequest.description=this.formValue.value.description;
    this.updateDataRequest.price=this.formValue.value.price;
    this.updateDataRequest.image=this.formValue.value.image;
    //updating
    this.productService.updateProduct(this.updateDataRequest).subscribe({
      next:(response)=>{
        alert("Data Updated Successfully");
        // console.log("Updation Successful");
        this.ngOnInit();
      },
      error:(response)=>{
        console.log(response);
        this.ngOnInit();
      }
    });
  }
}

interface ProductList {
  id: string;
  productName: string;
  description: string;
  price: number;
  image: string
}
