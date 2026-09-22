import { Component, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';
import { UpdateCategoryRequest } from '../models/category.model';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-category',
  styleUrl: './edit-category.css',
  templateUrl: './edit-category.html',
})
export class EditCategory {
  private categoryService = inject(CategoryService);
  id = input<string>();
  private categoryResource = this.categoryService.getCategoryById(this.id);

  editCategoryFormGroup = new FormGroup({
    categoryName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/)],
    }),
    urlHandle: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/)],
    }),
  });
  constructor(private router: Router) {}

  private effectRef = effect(() => {
    const category = this.categoryResource.value();

    if (!category) {
      return;
    }

    this.editCategoryFormGroup.patchValue({
      categoryName: category.name,
      urlHandle: category.urlHandle,
    });
  });

  onSubmit() {

    const formValues = this.editCategoryFormGroup.getRawValue();
    let updateCatRequest : UpdateCategoryRequest = {Id: this.id() ?? "", name : formValues.categoryName, urlHandle: formValues.urlHandle};
    this.categoryService.addCategoryStatus.set('idle');
    this.categoryService.updateCategoryById(updateCatRequest);

    if(this.categoryService.addCategoryStatus() == 'error')
    {
      console.error("could not update category");
    }

    else if(this.categoryService.addCategoryStatus() == 'success')
    {
      console.log("updated successfully!");
      
    }
    
    this.router.navigate(['/admin/categories']);

  }
}
