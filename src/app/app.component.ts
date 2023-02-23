import { Component } from '@angular/core';
import { SampleService } from './sample.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  below100 = '<=100';
  completeItemsAfterAllFilters:any = this.p.getItems();
  option:any;
  title = 'menu-app';
  filters = [];
  isMehfil:boolean = false;
  isParadise:boolean = false;
  searchItem :any;
  totalItems:any;
  afterFilterItems:Object[]= this.p.getItems();
  res1Value:any;
  mehfilItems:any;
  paradiseItems:any;
  isChecked:any;
  sortByPriceItems:any[] = [];
  megadata:any;
  isBtnClicked:string = "no";
  
  // totalItems1:any;
  restaurants= {
    Mehfil : false,
    Paradise : false
  }
  constructor(private p : SampleService){
  }
  ngOnInit(){
    this.totalItems = this.p.getItems();
  }
  chosenOption(e:any){
    this.option = e.target.value;
    // console.log(e.target.value);
  }
  searchItems(event:any){
    // console.log(event);
    console.log(event);
    this.totalItems = this.p.getItems();
    // console.log(this.option)
    this.totalItems = this.totalItems.filter((item:any)=>{
      switch(this.option){
        case 'food':    if(item.name.startsWith(event))return item;break;
        case 'restaurant':console.log("entered swithc case");if(item.restaurant.startsWith(event)|| item.restaurant.startsWith(event.slice(0,1).toUpperCase()+event.slice(1).toLowerCase()))return item;break;
        case 'location':if(item.location.startsWith(event))return item;break;
        default : if(item.name.startsWith(event))return item;break;
      }
      
    });
    // console.log(this.totalItems);

  }
  checkBox(e:any){
    console.log("event value is ",e);
    let t:string = e.name;
    type ObjKey = keyof typeof this.restaurants;
    this.restaurants[t as ObjKey] = e.checked;
    let final = Object.entries(this.restaurants);
    console.log(final);
   
    let tmp:any = this.p.items;
    this.afterFilterItems = [];
    
    for(let i=0;i<final.length;i++){
      if(final[i][1] == true){
        // console.log(final[i][0]);
        for(let j=0;j<tmp.length;j++){
          // console.log(this.totalItems[j].restaurant,final[i][0])
          if(tmp[j].restaurant == final[i][0]){
            console.log(tmp[j].name,final[i][0]);
            this.afterFilterItems.push(tmp[j]);
          }
        }
        
      }
    }
    
      this.totalItems = this.filterData(this.afterFilterItems,this.sortByPriceItems);

  
   
    
    
    
    // if(this.sortByPriceItems.length ==0)
    // this.totalItems = tmp;
    // else{
    //   this.totalItems = [];
    //   tmp.forEach((item1:any)=>{
    //     this.sortByPriceItems.forEach((item2:any)=>{
    //       if(item1.name == item2.name){
    //         this.totalItems.push(item1);
    //       }
    //     })
    //   })
    // }
    
    // console.log(this.afterFilterItems);
    
  }
  radioBox(e:any){
    console.log(e.checked,e.value);
   
    switch(e.value){
      case '100': 
                    this.sortByPriceItems = this.p.items.filter((item:any)=>{
                      if(parseInt(item.cost) <= 100)return item;                
                    });
                    break;
        case '200':
                    this.sortByPriceItems = this.p.items.filter((item:any)=>{
                      if(parseInt(item.cost) >100 && item.cost <=200 )return item;
                
                    });
                    break;  
      case '300':     
                    this.sortByPriceItems = this.p.items.filter((item:any)=>{
                      if(parseInt(item.cost) >200 )return item;
                
                    });
                    break; 
      default: console.log("abdfkhlkjld");
    }
    
    // this.p.filterData(this.sortByPriceItems);
    this.totalItems = this.filterData(this.afterFilterItems,this.sortByPriceItems);
  }
  clearFilters(res1:any,res2:any,price1:any,price2:any,price3:any){
    res1.checked = false;
    res2.checked = false;
    price1.checked = false;
    price2.checked = false;
    price3.checked = false;
    this.afterFilterItems=[];
    this.sortByPriceItems=[];
    type ObjKey = keyof typeof this.restaurants;
    for(let  k in this.restaurants){
      // let t:string = k;
      this.restaurants[k as ObjKey] = false;
    }


    this.totalItems = this.filterData([],[]);
    
    

  }
  filterData(data1:any,data2:any){
    console.log('checkbox',data1,'radio',data2);
    if( data1.length == 0 && data2.length == 0 ){
      this.completeItemsAfterAllFilters = this.p.getItems();
    }
    else if(data1.length ==0){
      this.completeItemsAfterAllFilters=[];
      // this.completeItemsAfterAllFilters.push(data2);

      data2.forEach((item:any,i:any,a:any)=>{
        console.log()
        this.completeItemsAfterAllFilters.push(item);
      })
    }
    else if(data2.length ==0){
      console.log("asdbhagjkfndl")
      this.completeItemsAfterAllFilters=[];
      data1.forEach((item:any,i:any,a:any)=>{
        console.log(item);
        this.completeItemsAfterAllFilters.push(item);
      })
      // this.completeItemsAfterAllFilters.push(data1);
    }
    else{
      this.completeItemsAfterAllFilters=[];
      for(let i =0;i<data1.length;i++){
        for(let j =0;j<data2.length;j++){
          console.log(data1[i].name,data2[j].name)
          if(data1[i].name == data2[j].name){
            this.completeItemsAfterAllFilters.push(data1[i]);
            break;
          }
        }
      }
      console.log(this.completeItemsAfterAllFilters);
    }
    return this.completeItemsAfterAllFilters;

  }
}
