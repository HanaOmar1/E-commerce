import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';



@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
private readonly _ActivatedRoute=inject(ActivatedRoute);
private readonly _OrdersService=inject(OrdersService)
cartId!:string|null
ordersForm:FormGroup=new FormGroup({
  details:new FormControl(null,Validators.required),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,Validators.required)

})
ngOnInit(): void {
this._ActivatedRoute.paramMap.subscribe({
  next:(params)=>{
    this.cartId=params.get('id')
    console.log(this.cartId)
  }
})
}
ordersSubmit():void{
  console.log(this.ordersForm.value)
  this._OrdersService.checkOut(this.cartId,this.ordersForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      if(res.status=='success')
      {
        // res.session.url;//url el stripe
        window.open(res.session.url,'_self')
      }
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

}
