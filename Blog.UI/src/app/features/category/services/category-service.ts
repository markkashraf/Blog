import { inject, Signal, Service, signal, afterNextRender } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { AddCategoryRequest , Category, UpdateCategoryRequest} from '../models/category.model';
import { Observable } from 'rxjs';


@Service()
export class CategoryService {
    private http = inject(HttpClient);
    private apiBaseUrl = 'http://localhost:5555';
    


    addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
    updateCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');



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

    getAllCategories() 
    {
    return this.http.get<Category[]>(`${this.apiBaseUrl}/api/categories`);
    }

    getCategoryById(id: Signal<string | undefined>) {
        return httpResource<Category>(() => {
            const categoryId = id();

            return categoryId
                ? `${this.apiBaseUrl}/api/categories/${categoryId}`
                : undefined;
        });
    }

    updateCategoryById(category: UpdateCategoryRequest){

        this.updateCategoryStatus.set('loading');
        this.http.put<Category>(`${this.apiBaseUrl}/api/categories/add`,category).subscribe(
            {
            next:  () => this.updateCategoryStatus.set('success'),
            error: () => this.updateCategoryStatus.set('error')
            }
    );

    }


}
