import { Component, inject, OnInit } from '@angular/core';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from "../../core/pipes/search.pipe";
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TermtextPipe, SearchPipe,CurrencyPipe,RouterLink,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
private readonly _ProductsService=inject(ProductsService);
private readonly _CartService=inject(CartService);
private readonly _ToastrService=inject(ToastrService);
getAllProductsSub!:Subscription;
text:string="";
productList:Iproduct[]=[];
ngOnInit(): void {
  this.getAllProductsSub=this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productList=res.data;
    },
    error:(err)=>{
      console.log(err);
    },
  })
}
addToCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res)
      this._ToastrService.success(res.message,'Fresh Cart');
    },
    error:(err)=>{
      console.log(err)
    }
  })
}
}
