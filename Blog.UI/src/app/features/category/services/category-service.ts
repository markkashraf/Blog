import { inject, Service, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddCategoryRequest } from '../models/category.model';


@Service()
export class CategoryService {
    private http = inject(HttpClient);
    private apiBaseUrl = 'http://localhost:5555';


    addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');


    addCategory(category: AddCategoryRequest) {
        this.addCategoryStatus.set('loading');
        return this.http.post<void>(`${this.apiBaseUrl}/api/categories`, category).subscribe({
            next: () => {
                this.addCategoryStatus.set('success');
            },
            error: (error) => {
                console.error('Failed to add category', error.error ?? error);
                this.addCategoryStatus.set('error');
            }
        });
    }


}
