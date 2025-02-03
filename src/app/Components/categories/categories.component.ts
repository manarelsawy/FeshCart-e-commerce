import { Component } from '@angular/core';
import { ProductsService } from '../../Core/services/products.service';
import { ICategory } from '../../Core/interfaces/icategory';
import { CategoriesService } from '../../Core/services/categories.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  constructor(private _CategoriesService : CategoriesService) {}

  categoriesData: ICategory[] = [];

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: ({ data }) => {
        this.categoriesData = data;
      },
    });
  }


}
