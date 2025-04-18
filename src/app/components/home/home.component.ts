import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,CurrencyPipe,TermtextPipe,SearchPipe,FormsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit, OnDestroy{
private readonly _ProductsService=inject(ProductsService);
private readonly _CategoriesService=inject(CategoriesService);
private readonly _CartService=inject(CartService);
private readonly _ToastrService=inject(ToastrService);
private readonly _NgxSpinnerService= inject(NgxSpinnerService)
private readonly _TranslateService=inject(TranslateService);
productList:Iproduct[]=[];
text:string="";
categoriesList: ICategory[] = [];
getAllProductsSub!:Subscription;
getAllCategoriesSub!:Subscription;
customOptionsCat: OwlOptions = {
  loop: true,
  rtl:true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  autoplay:true,
  autoplayTimeout:3000,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['',''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
customOptionsMain: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: true,
  rtl:true,
  // autoplay:true,
  // autoplayTimeout:3000,
  // autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['',''],
  items:1,
  nav: false
}
a: ((a: Iproduct,b: Iproduct) => number)|undefined;
ngOnInit(): void {
  //show loading screen
  // this._NgxSpinnerService.show();
  this.getAllCategoriesSub=this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categoriesList=res.data;
      //hide loading screen
      // this._NgxSpinnerService.hide();
    },
  })
  this.getAllProductsSub=this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productList=res.data;
    },

  })


}
ngOnDestroy(): void {
  //unsubscribe observable
this.getAllProductsSub?.unsubscribe();
this.getAllCategoriesSub?.unsubscribe();
}
addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success(res.message,'Fresh Cart');
      this._CartService.cartNumber.next(res.numOfCartItems);
    },

  })
}
}
