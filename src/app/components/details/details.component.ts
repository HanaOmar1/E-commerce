import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  private readonly _ActivatedRoute=inject(ActivatedRoute);
private readonly _ProductsService=inject(ProductsService);
private readonly _CartService=inject(CartService);
private readonly _ToastrService=inject(ToastrService);
// specificProduct!:Iproduct; //sah bas msh ahsan haga
specificProduct:Iproduct|null =null;
customOptionsSpecific: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  // autoplay:true,
  // autoplayTimeout:3000,
  // autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['',''],
  items:1,
  nav: true
}
ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(param)=>{ //parameter shayel all parameter el fl URL
    console.log(param.get('id'))
    let productId=param.get('id');
    //call the api from service
    this._ProductsService.getSpecificProduct(productId).subscribe({
      next:(res)=>{ //data el 3ayez el 3ayezha
        console.log(res.data);
        this.specificProduct=res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })

  },
  error:(err)=>{
    console.log(err)
  }
})
}
addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success(res.message,'Fresh Cart');
      this._CartService.cartNumber.next(res.numOfCartItems);
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
