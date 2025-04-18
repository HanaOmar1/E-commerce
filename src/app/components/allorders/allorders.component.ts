import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);
  userId!: string | null;
  userOrders: any = [];

  ngOnInit(): void {
    const decToken: any = jwtDecode(localStorage.getItem('userToken')!);
    this.userId = decToken?.id;

    // Now pass the userId to getUserOrder method
    this._OrdersService.getUserOrder(this.userId).subscribe({
      next: (res) => {
        this.userOrders = res;
        console.log('Orders loaded');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
