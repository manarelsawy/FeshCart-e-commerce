
import { Component } from '@angular/core';
import { IBrands } from '../../Core/interfaces/ibrands';
import { BrandsService } from '../../Core/services/brands.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgFor],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  constructor(private _BrandsService: BrandsService) {}

  brandsData: IBrands[] = [];

  ngOnInit(): void {
    this._BrandsService.getBrands().subscribe({
      next: ({data}) => {
        this.brandsData = data;
      },
    });
  }

}
