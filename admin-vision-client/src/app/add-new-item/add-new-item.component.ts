import { Component } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ItemControllerService } from '../api/services';
import { Create$Params } from '../api/fn/item-controller/create';
import { NewItem } from '../api/models';

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './add-new-item.component.html',
  styleUrl: './add-new-item.component.scss',
})
export class AddNewItemComponent {
  constructor(
    private itemService: ItemControllerService,
    public dialogRef: MatDialogRef<AddNewItemComponent>
  ) {}
  createNewItemForm: FormGroup = new FormGroup({
    name_input: new FormControl(''),
    description_input: new FormControl(''),
    category_input: new FormControl(''),
    price_input: new FormControl(),
    quantity_input: new FormControl(),
  });

  onSubmit() {
    const isComplete = this.checkForm();
    if (isComplete) {
      const params: Create$Params = { body: this.createNewItem() };
      this.itemService.create(params).subscribe({
        next: (response: any) => {
          console.log('CREATED RESPONSE: ', response);
          this.dialogRef.close('success');
        },
        error: (e: any) => {
          console.error('ERROR CREATING ITEM: ', e);
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close('cancel');
  }

  checkForm() {
    const name = this.createNewItemForm.get('name_input')?.value;
    const category = this.createNewItemForm.get('category_input')?.value;
    const price = this.createNewItemForm.get('price_input')?.value;
    const quantity = this.createNewItemForm.get('quantity_input')?.value;

    if (name && category && price && quantity) {
      return true;
    } else {
      return false;
    }
  }

  createNewItem() {
    const name = this.createNewItemForm.get('name_input')?.value;
    const description = this.createNewItemForm.get('description_input')?.value;
    const category = this.createNewItemForm.get('category_input')?.value;
    const price = this.createNewItemForm.get('price_input')?.value;
    const quantity = this.createNewItemForm.get('quantity_input')?.value;

    const newItem: NewItem = {
      name,
      category,
      price,
      quantity,
    };

    if (description) {
      newItem.description = description;
    }

    return newItem;
  }
}
