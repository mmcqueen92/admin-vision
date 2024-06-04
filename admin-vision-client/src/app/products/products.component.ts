import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { AddNewItemComponent } from '../add-new-item/add-new-item.component';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { ItemControllerService } from '../api/services';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    private itemService: ItemControllerService,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      this.getFilterValuesFromLocalStorage();
    }
  }

  filterForm: FormGroup = new FormGroup({
    id_input: new FormControl(''),
    name_input: new FormControl(''),
    description_input: new FormControl(''),
    category_input: new FormControl(''),
    quantity_min_input: new FormControl(''),
    quantity_max_input: new FormControl(''),
    created_at_start_input: new FormControl(''),
    created_at_end_input: new FormControl(''),
    updated_at_start_input: new FormControl(''),
    updated_at_end_input: new FormControl(''),
  });

  itemsTableDataSource = new MatTableDataSource<any>([]);
  cachedTableData: any[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'quantity',
    'createdAt',
    'updatedAt',
    'actions',
  ];
  currentPageLimit: number = 2;
  currentPage: number = 1;
  pageLimitOptions: number[] = [2, 5, 10, 15, 20];
  totalResults: number = 15;

  localStorageVariables: any = {};

  ngOnInit() {
    this.applyFilterValuesFromLocalStorage();
    this.fetchItems();
  }

  private fetchItems() {
    const filter = JSON.stringify({
      limit: this.currentPageLimit,
      offset: ((this.currentPage - 1) * this.currentPageLimit).toString(),
      order: 'createdAt DESC',
      where: this.createWhereFilter(),
    });

    this.itemService.find({ filter }).subscribe({
      next: (serverData: any) => {
        this.cachedTableData.push(...serverData);
        this.itemsTableDataSource = new MatTableDataSource<any>(serverData);
        this.countItems();
      },
    });
  }

  private countItems() {
    const where = JSON.stringify(this.createWhereFilter());

    this.itemService.count({ where }).subscribe({
      next: (serverData: any) => {
        this.totalResults = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching transactions: ', error);
      },
    });
  }

  private createWhereFilter() {
    const where: any = {};

    if (this.filterForm.get('id_input')?.value) {
      where.id = {
        eq: this.filterForm.get('id_input')?.value,
      };
    }

    if (this.filterForm.get('name_input')?.value) {
      where.name = {
        like: `%${this.filterForm.get('name_input')?.value}%`,
      };
    }

    if (this.filterForm.get('description_input')?.value) {
      where.description = {
        like: `%${this.filterForm.get('description_input')?.value}%`,
      };
    }

    if (this.filterForm.get('category_input')?.value) {
      where.category = {
        like: `%${this.filterForm.get('category_input')?.value}%`,
      };
    }

    const quantityMin = this.filterForm.get('quantity_min_input')?.value;
    const quantityMax = this.filterForm.get('quantity_max_input')?.value;

    if (
      quantityMin !== '' &&
      quantityMin !== null &&
      quantityMin !== undefined &&
      quantityMax !== '' &&
      quantityMax !== null &&
      quantityMax !== undefined
    ) {
      where.quantity = {
        between: [quantityMin, quantityMax],
      };
    } else if (
      quantityMin !== null &&
      quantityMin !== undefined &&
      quantityMin !== ''
    ) {
      where.quantity = {
        gte: quantityMin,
      };
    } else if (
      quantityMax !== null &&
      quantityMax !== undefined &&
      quantityMax !== ''
    ) {
      where.quantity = {
        lte: quantityMax,
      };
    }

    const createdAtStart = this.filterForm.get('created_at_start_input')?.value;
    const createdAtEnd = this.filterForm.get('created_at_end_input')?.value;

    if (
      createdAtStart !== '' &&
      createdAtStart !== null &&
      createdAtStart !== undefined &&
      createdAtEnd !== '' &&
      createdAtEnd !== null &&
      createdAtEnd !== undefined
    ) {
      const startDate = new Date(createdAtStart);
      const endDate = new Date(createdAtEnd);

      // Set time to end of the day for end date
      endDate.setHours(23, 59, 59, 999);

      where.createdAt = {
        between: [startDate.toISOString(), endDate.toISOString()],
      };
    } else if (
      createdAtStart !== '' &&
      createdAtStart !== null &&
      createdAtStart !== undefined
    ) {
      const startDate = new Date(createdAtStart);
      where.createdAt = {
        gte: startDate.toISOString(),
      };
    } else if (
      createdAtEnd !== '' &&
      createdAtEnd !== null &&
      createdAtEnd !== undefined
    ) {
      const endDate = new Date(createdAtEnd);

      // Set time to end of the day for end date
      endDate.setHours(23, 59, 59, 999);

      where.createdAt = {
        lte: endDate.toISOString(),
      };
    }

    return where;
  }

  onFilterSubmit() {
    this.saveFilterValuesToLocalStorage();
    this.cachedTableData = [];
    this.currentPage = 1;
    this.fetchItems();
    this.countItems();
  }

  clearFilters() {
    this.filterForm.reset();
    this.fetchItems();
  }

  handlePageEvent(e: PageEvent) {
    if (e.pageSize !== this.currentPageLimit) {
      this.currentPageLimit = e.pageSize;
      this.currentPage = 1;
      this.fetchItems();
    }

    this.currentPage = e.pageIndex + 1;
    this.updateDataSource();
    return;
  }

  private updateDataSource(): void {
    if (this.checkCachedData()) {
      const startIndex = (this.currentPage - 1) * this.currentPageLimit;
      const endIndex = startIndex + this.currentPageLimit;

      const cachedDataSlice = this.cachedTableData.slice(startIndex, endIndex);

      this.itemsTableDataSource = new MatTableDataSource<any>(cachedDataSlice);
    } else {
      this.fetchItems();
    }
  }

  private checkCachedData(): boolean {
    const requiredData = this.currentPage * this.currentPageLimit;
    if (this.cachedTableData.length >= requiredData) {
      return true;
    }
    return false;
  }

  openAddNewProduct(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog.open(AddNewItemComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openEditProduct(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.dialog.open(EditItemComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  deleteItem(id: number) {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );

    if (isConfirmed) {
      this.itemService.deleteById({ id }).subscribe({
        next: (response) => {
          console.log('DELETED? ', response);
        },
        error: (error) => {
          console.error('ERROR: ', error);
        },
      });
    }

    if (!isConfirmed) {
      return;
    }
  }

  private saveFilterValuesToLocalStorage(): void {
    Object.keys(this.filterForm.controls).forEach((controlName) => {
      const formControl = this.filterForm.get(controlName);

      if (formControl) {
        let valueToSave = formControl.value;

        // Handle date ranges
        if (typeof valueToSave === 'object') {
          if (valueToSave) {
            localStorage.setItem(controlName, valueToSave.toISOString());
          } else {
            localStorage.setItem(controlName, '');
          }
        } else {
          localStorage.setItem(controlName, valueToSave);
        }
      }
    });
  }

  private getFilterValuesFromLocalStorage(): void {
    Object.keys(this.filterForm.controls).forEach((controlName) => {
      const formControl = this.filterForm.get(controlName);

      if (formControl) {
        const savedValue = localStorage.getItem(controlName);

        if (
          savedValue !== null &&
          savedValue !== undefined &&
          savedValue !== ''
        ) {
          this.localStorageVariables[controlName] = savedValue;
        }
      }
    });
  }

  private applyFilterValuesFromLocalStorage(): void {
    Object.keys(this.filterForm.controls).forEach((controlName) => {
      const formControl = this.filterForm.get(controlName);

      if (formControl) {
        const savedValue = this.localStorageVariables[controlName];
        if (savedValue !== null && savedValue !== undefined) {
          formControl.setValue(savedValue);
        }
      }
    });
  }
}
