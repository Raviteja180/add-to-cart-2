import { Component, Input, OnInit } from '@angular/core';
import { SampleService } from '../sample.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  items:any;
  @Input() inputChild:any;
  constructor(private p : SampleService){
  }
  ngOnInit(){
    this.items = this.p.getItems();
    // this.items = this.inputChild;
    // console.log(this.items);
  }
  ngOnChanges(){
    this.items = this.inputChild;
    // console.log(this.items);
  }
  addToCart(item:any){  
    this.p.allCartItems(item);
    // this.items = this.inputChild;

  
  }
  addCartBtn(item:any){
    this.p.addCartBtn(item);
    // console.log('',this.inputChild);
  }
}
