import { Component, DoCheck, OnInit } from '@angular/core';
import { SampleService } from '../sample.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements DoCheck {
  cartItems:any[] =[];
  str :any;
  totalItemsCost =0;
  isCartEmpty:boolean = true;
  treat:any;
  constructor(private p :SampleService) { }

  // ngOnInit(): void {
  //   this.cartItems = this.p.cartItems;
  //   console.log("cart",this.cartItems);
  // }
  ngDoCheck(){
    this.totalItemsCost = 0;
    localStorage.setItem('cartTotalItems',JSON.stringify(this.p.cartItems));
    this.cartItems = this.p.cartItems;
    // let t:string = (localStorage.getItem('cartTotalItems'));
    // let t2:string;
    // t2 = t?.slice(1,t.length-1);
    // console.log(JSON.parse(t2));
    // if(this.cartItems.length)this.isCartEmpty = false;
    // else this.isCartEmpty = true;
    if(this.cartItems.length){
      this.isCartEmpty = false;
      this.treat = 'x1'
    }
    else {
      this.isCartEmpty = true;
    }
    this.cartItems.forEach((item:any)=>{
        item.thisItemTotalCost = item.quantity * item.cost;
        this.totalItemsCost += item.thisItemTotalCost;
    })
    // console.log("cart",this.cartItems);
  }
  addSingleItem(item:any){
    this.p.addSingleItem(item);
  }
  removeSingleItem(item:any){
    this.p.removeSingleItem(item);
  }
  // str = `cost : ${item.quantity} * ${item.cost} = ${item.quantity * item.cost}`
  // cost : `${item.quantity} * ${item.cost} = ${item.quantity * item.cost}`


}
