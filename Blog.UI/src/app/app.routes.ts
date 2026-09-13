import { Routes } from '@angular/router';
import { AddCategory } from './features/category/add-category/add-category';
import { CategoryList } from './features/category/category-list/category-list';

export const routes: Routes = [
  {
    path: 'admin/categories',
    component: CategoryList
  },
  {
    path: 'admin/categories/add',
    component: AddCategory
  }
];
