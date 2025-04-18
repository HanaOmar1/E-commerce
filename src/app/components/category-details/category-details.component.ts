import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CurrencyPipe, TermtextPipe, RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  category: any = null;
  categoryId: string | null = '';
  products: any[] = []; // All products
  filteredProducts: any[] = []; // Products of this category

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
        if (this.categoryId) {
          this.getAllProducts();
          this.getCategoryDetails();
        }
      },
    });
  }

  getCategoryDetails(): void {
    if (!this.categoryId) return;

    this._CategoriesService.getSpecificCategory(this.categoryId).subscribe({
      next: (res) => {
        this.category = res.data;
        console.log(res.data);
        this.filterProducts(); // Filter after fetching category
      },
      error: (err) => console.error(err),
    });
  }

  getAllProducts(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.filterProducts(); // Filter after fetching products
      },
      error: (err) => console.error(err),
    });
  }

  filterProducts(): void {
    if (!this.category || !this.products.length) return;
    this.filteredProducts = this.products.filter(
      (product) => product.category._id === this.categoryId // Compare with category ID
    );
    console.log(this.filteredProducts);
    
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
