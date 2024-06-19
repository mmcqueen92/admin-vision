import { Component, Input, OnInit, Inject } from '@angular/core';
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

import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';

import { UpdateById$Params } from '../api/fn/item-controller/update-by-id';
import { ItemPartial } from '../api/models';
@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
})
export class EditItemComponent implements OnInit {
  @Input() item: any;
  constructor(
    private itemService: ItemControllerService,
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editItemForm: FormGroup = new FormGroup({
    name_input: new FormControl(''),
    description_input: new FormControl(''),
    category_input: new FormControl(''),
    price_input: new FormControl(),
    quantity_input: new FormControl(),
  });

  ngOnInit() {
    this.editItemForm = new FormGroup({
      name_input: new FormControl(this.data.name),
      description_input: new FormControl(this.data.description),
      category_input: new FormControl(this.data.category),
      price_input: new FormControl(this.data.price),
      quantity_input: new FormControl(this.data.quantity),
    });
  }

  onSubmit() {
    this.itemService
      .updateById({ id: this.data.id, body: this.getFormData() })
      .subscribe({
        next: (response: any) => {
          console.log('EDIT SUCCESSFUL RESPONSE: ', response);
          this.dialogRef.close('success');
        },
        error: (e: any) => {
          console.error('ERROR CREATING ITEM: ', e);
        },
      });
  }

  getFormData() {
    const name = this.editItemForm.get('name_input')?.value;
    const description = this.editItemForm.get('description_input')?.value;
    const category = this.editItemForm.get('category_input')?.value;
    const price = this.editItemForm.get('price_input')?.value;
    const quantity = this.editItemForm.get('quantity_input')?.value;
    const updatedItem = {
      name,
      description,
      category,
      price,
      quantity,
    };
    return updatedItem;
  }
}
