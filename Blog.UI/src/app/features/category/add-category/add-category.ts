import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AddCategoryRequest } from '../models/category.model';
import { CategoryService } from '../services/category-service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-add-category',
  styleUrl: './add-category.css',
  templateUrl: './add-category.html',
})

export class AddCategory {
  categoryService = inject(CategoryService);
   
  addCategoryFormGroup = new FormGroup({ 
    categoryName: new FormControl('', {nonNullable: true}),
    urlHandler: new FormControl('', {nonNullable: true}),
  });


    constructor() {

      effect(
        ()=>
        {
          if(this.categoryService.addCategoryStatus()==='success')
          {
            console.log('successss');
            //redirct to category list

          }


          if(this.categoryService.addCategoryStatus()==='error')
          {
          console.log('failed')
          }



        }

      )




    }




  onSubmit() {
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDTO : AddCategoryRequest = {
      name: addCategoryFormValue.categoryName,
      urlHandler: addCategoryFormValue.urlHandler
    };

    this.categoryService.addCategory(addCategoryRequestDTO);



  }


}
