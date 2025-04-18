import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-brands-details',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, TermtextPipe, LoadingComponent],
  templateUrl: './brands-details.component.html',
  styleUrl: './brands-details.component.scss',
})
export class BrandsDetailsComponent implements OnInit {
  private readonly _BrandsService = inject(BrandsService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  brand: any = null;
  brandId: string | null = '';
  products: any[] = [];
  filteredProducts: any[] = [];
isLoading: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
        if (this.brandId) {
          this.getBrandDetails();
          this.getAllProducts();

        }
      },
    });
  }

  getBrandDetails(): void {
    if (!this.brandId) return;

    this._BrandsService.getSpecificBrand(this.brandId).subscribe({
      next: (res) => {
        this.brand = res.data;
        // this.filterProducts();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getAllProducts(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.filterProducts();
      },
      error: (err) => console.error(err),
    });
  }

  filterProducts(): void {
    if (!this.brand || !this.products.length) return;
    this.filteredProducts = this.products.filter(
      (product) => product.brand._id === this.brandId
    );
  }

  addToCart(id: string): void {
    this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Fresh Cart');
        this._CartService.cartNumber.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
