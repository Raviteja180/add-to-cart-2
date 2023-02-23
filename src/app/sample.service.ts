import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import items from '../items';
@Injectable({
  providedIn: 'root'
})
export class SampleService {
  // cartItems :Object[] | undefined;
  cartItems: any[] = [];
  items = items;
  i=0;

  constructor() { }
  getItems(){
    return items;
  }
  allCartItems(item:any){
    console.log(item);
    
    if(item['quantity'] >= 1){
      this.cartItems.forEach((eachItem)=>{
        if(eachItem.name == item.name && eachItem.restaurant == item.restaurant){
          item.quantity++;
        }
      })
    }
    else{
      item.quantity++;
      this.cartItems.push(item);
    }
    // if(this.cartItems.includes(item.name))
    
    console.log(this.cartItems);
  }
  addSingleItem(item:any){
    this.allCartItems(item);
  }
  removeSingleItem(item:any){
    this.cartItems.forEach((eachItem,i)=>{
      if(eachItem.name == item.name && eachItem.restaurant == item.restaurant){
        if(item.quantity ==1){
          item.quantity--;
          this.cartItems.splice(i,1);
        }
        
        else
       item.quantity--;
      }
    })
  }
  addCartBtn(item:any){
    if(item['quantity'] >= 1){
      alert('It is already added in the cart');

    }
    else if(item['quantity'] == 0){
      item.quantity++;
      this.cartItems.push(item);

    }
  }
  
}
