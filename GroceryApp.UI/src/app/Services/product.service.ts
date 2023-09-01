import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Products } from '../Models/product.model';
import { ProdCheck } from '../Models/checkout.model';
import { CartItems } from '../Models/cart.model';
import { PlacedOrders } from '../Models/order.model';
import { Review } from '../Models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  categoryId:number=4;
  productDetailId: string = '';
  productCheckout:ProdCheck={
    id:'',
    count: 0
  };
  cartProducts:ProdCheck[]=[];
  orderedProducts:any=null;
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getProductDetails(): Observable<Products> {
    return this.http.get<Products>(this.baseApiUrl + '/api/ProductDetail?productId=' + this.productDetailId);
  }
  getProductDetail(Id:any): Observable<Products> {
    return this.http.get<Products>(this.baseApiUrl + '/api/ProductDetail?productId=' + Id);
  }
  getAllProducts(id: number): Observable<Products[]> {
    if (id == 4) {
      return this.http.get<Products[]>(this.baseApiUrl + '/api/Product');
    }
    else {
      return this.http.get<Products[]>(this.baseApiUrl + '/api/ProductFiltering?categoryId=' + id);
    }
  }
  addProduct(addProductRequest: Products): Observable<Products> {
    addProductRequest.id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    return this.http.post<Products>(this.baseApiUrl + '/api/Product', addProductRequest);
  }
  setId(Id: string) {
    this.productDetailId = Id;
  }
  getId() {
    return this.productDetailId;
  }
  // Checkout
  
  addProductCheckout(details:ProdCheck):Observable<ProdCheck>{
    return this.http.post<ProdCheck>(this.baseApiUrl+'/api/Cart',details);
  }
  getCartItems():Observable<CartItems>{
    return this.http.get<CartItems>(this.baseApiUrl+'/api/Cart');
  }
  setOrderedProducts(order:any){
    this.orderedProducts=order;
  }
  deleteOrderedProductList(){
    return this.http.post<any>(this.baseApiUrl+'/api/ProductFiltering',this.orderedProducts);
  }
  setCategoryFromHome(category:number){
    this.categoryId=category;
  }
  getCategoryFromHome(){
    return this.categoryId;
  }
  setPlacedOrdersToDb(products:any):Observable<PlacedOrders>{
    return this.http.post<PlacedOrders>(this.baseApiUrl+'/api/PlacedOrder',products);
  }
  getPlacedOrdersFromDb(email:string):Observable<any>{
    return this.http.get<any>(this.baseApiUrl+'/api/PlacedOrder?email='+email);
  }
  sendProductReview(review:Review):Observable<any>{
    return this.http.post<any>(this.baseApiUrl+'/api/Review',review);
  }
  getProductReviews(id:string):Observable<Review[]>{
    return this.http.get<Review[]>(this.baseApiUrl+'/api/Review?Id='+id);
  }
  deleteProduct(id:string):Observable<Products>{
    return this.http.get<Products>(this.baseApiUrl+'/api/ProductAdminOps?id='+id);
  }
  updateProduct(product:Products):Observable<Products>{
    return this.http.post<Products>(this.baseApiUrl+'/api/ProductAdminOps',product);
  }
}
