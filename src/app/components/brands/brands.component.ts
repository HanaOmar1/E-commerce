import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { Ibrand } from '../../core/interfaces/ibrand';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink, LoadingComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly BrandsService = inject(BrandsService);
  getAllBrandsSub!: Subscription;
  brandsList: Ibrand[] = [];
  isLoading=false;

  ngOnInit(): void {
    this.BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList = res.data;
        this.isLoading=false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;
      },
    });
  }
}
