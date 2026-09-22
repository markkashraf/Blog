import { Component, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category-service';
import { Category } from '../models/category.model';

@Component({
  imports: [RouterLink],
  selector: 'app-category-list',
  styleUrl: './category-list.css',
  templateUrl: './category-list.html',
})
export class CategoryList {




  categoryService = inject(CategoryService);
  catList: WritableSignal<Category[]> = signal<Category[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');


  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({
    next: (categories) => {
    this.catList.set(categories);
    this.isLoading.set(false);
  },
  error: (error) => {
    console.error('Failed to load categories', error.error ?? error);
    this.errorMessage.set('Unable to load categories. Please try again.');
    this.isLoading.set(false);
  }
    });


}}
