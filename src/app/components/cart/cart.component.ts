import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  deleteCartItem(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove this item from the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0aad0a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.deleteProductFromCart(id).subscribe({
          next: (res) => {
            console.log(res);
            this.cartDetails = res.data;
            this._CartService.cartNumber.next(res.numOfCartItems);
            this._ToastrService.success('Item removed from cart', 'Deleted');
          },
          error: (err) => {
            console.error(err);
            this._ToastrService.error('Failed to delete item', 'Error');
          },
        });
      }
    });
  }

  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateProductQuantity(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartDetails = res.data;
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.deleteCartItem(id);
    }
  }

  clearCart(): void {
    Swal.fire({
      title: 'Clear Cart?',
      text: 'Are you sure you want to remove all items from your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0aad0a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.clearCart().subscribe({
          next: (res) => {
            console.log(res);
            if (res.message == 'success') {
              this.cartDetails = {} as ICart;
              this._CartService.cartNumber.next(0);
              this._ToastrService.success(
                'Cart cleared successfully',
                'Deleted'
              );
            }
          },
          error: (err) => {
            console.error(err);
            this._ToastrService.error('Failed to clear cart', 'Error');
          },
        });
      }
    });
  }
}
