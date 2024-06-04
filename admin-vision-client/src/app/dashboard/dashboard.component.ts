import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { UserControllerService } from '../api/services';
import { ItemControllerService } from '../api/services';
import { TransactionControllerService } from '../api/services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    private userService: UserControllerService,
    private itemService: ItemControllerService,
    private transactionService: TransactionControllerService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      this.getFilterValuesFromLocalStorage();
    }
  }
  displayData: any = {};

  filterForm: FormGroup = new FormGroup({
    transaction_id_input: new FormControl(''),
    user_id_input: new FormControl(''),
    created_at_input: new FormControl(''),
    // items_input: new FormControl(''),
    total_price_min_input: new FormControl(''),
    total_price_max_input: new FormControl(''),
    created_at_start_input: new FormControl(''),
    created_at_end_input: new FormControl(''),
  });

  transactionsTableDataSource = new MatTableDataSource<any>([]);
  cachedTableData: any[] = [];
  displayedColumns: string[] = [
    'id',
    'userId',
    'createdAt',
    'transactionItems',
    'totalPrice',
  ];

  pageLimitOptions: number[] = [5, 10, 20, 50];
  totalResults: number = 0;
  currentPageLimit: number = 5;
  currentPage: number = 1;

  localStorageVariables: any = {};

  ngOnInit(): void {
    this.applyFilterValuesFromLocalStorage();
    this.initializeData();
  }

  private initializeData() {
    this.fetchTotalUsers();
    this.fetchNewUsersPast30Days();
    this.fetchTotalTransactions();
    this.fetchTransactionsPast30Days();
    this.fetchLowStockItems();
    this.fetchOutOfStockItems();
    this.fetchTransactions();
    this.countTransactionsWithFilter();
    // this.fetchItems();
  }

  private fetchTotalUsers() {
    this.userService.count().subscribe({
      next: (serverData: any) => {
        this.displayData.totalUsers = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching total users:', error);
      },
    });
  }

  private fetchNewUsersPast30Days() {
    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Format the date in ISO string format (assuming this is the format expected by your server)
    const thirtyDaysAgoISOString = thirtyDaysAgo.toISOString();

    // Construct the filter object
    const filter = {
      where: JSON.stringify({
        createdAt: { gte: thirtyDaysAgoISOString }, // Filter for users created after the calculated date
      }),
    };

    // Call the count function in your userService with the filter
    this.userService.count(filter).subscribe({
      next: (serverData: any) => {
        this.displayData.usersPast30Days = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching new users past 30 days: ', error);
      },
    });
  }

  private fetchTotalTransactions() {
    this.transactionService.count().subscribe({
      next: (serverData: any) => {
        this.displayData.totalTransactions = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching total transactions: ', error);
      },
    });
  }

  private fetchTransactionsPast30Days() {
    // Calculate the date 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Format the date in ISO string format (assuming this is the format expected by your server)
    const thirtyDaysAgoISOString = thirtyDaysAgo.toISOString();

    // Construct the filter object
    const filter = {
      where: JSON.stringify({
        createdAt: { gte: thirtyDaysAgoISOString }, // Filter for users created after the calculated date
      }),
    };

    this.transactionService.count(filter).subscribe({
      next: (serverData: any) => {
        this.displayData.transactionsPast30Days = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching transactions past 30 days: ', error);
      },
    });
  }

  private fetchLowStockItems() {
    const filter = {
      where: JSON.stringify({
        and: [{ quantity: { gt: 0 } }, { quantity: { lte: 10 } }],
      }),
    };
    this.itemService.count(filter).subscribe({
      next: (serverData: any) => {
        this.displayData.lowStockItems = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching low stock items: ', error);
      },
    });
  }

  private fetchOutOfStockItems() {
    const filter = {
      where: JSON.stringify({
        quantity: { eq: 0 },
      }),
    };
    this.itemService.count(filter).subscribe({
      next: (serverData: any) => {
        this.displayData.outOfStockItems = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching out of stock items: ', error);
      },
    });
  }

  private fetchTransactions() {
    const unstringifiedFilter = {
      limit: this.currentPageLimit,
      offset: ((this.currentPage - 1) * this.currentPageLimit).toString(),
      order: 'createdAt DESC',
      include: [
        {
          relation: 'transactionItems',
          scope: {
            include: [
              {
                relation: 'item',
              },
            ],
          },
        },
      ],
      where: this.createWhereFilter(),
    };

    const filter = JSON.stringify(unstringifiedFilter);

    this.transactionService.find({ filter }).subscribe({
      next: (serverData: any) => {
        this.cachedTableData.push(...serverData);
        this.transactionsTableDataSource = new MatTableDataSource<any>(
          serverData
        );
        this.countTransactionsWithFilter();
      },
      error: (error: any) => {
        console.error('Error fetching transactions: ', error);
      },
    });
  }

  private countTransactionsWithFilter() {
    const where = JSON.stringify(this.createWhereFilter());

    this.transactionService.count({ where }).subscribe({
      next: (serverData: any) => {
        this.totalResults = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching transactions: ', error);
      },
    });
  }

  private updateDataSource(): void {
    if (this.checkCachedData()) {
      const startIndex = (this.currentPage - 1) * this.currentPageLimit;
      const endIndex = startIndex + this.currentPageLimit;

      const cachedDataSlice = this.cachedTableData.slice(startIndex, endIndex);

      this.transactionsTableDataSource = new MatTableDataSource<any>(cachedDataSlice);
    } else {
      this.fetchTransactions();
    }
  }

  private checkCachedData(): boolean {
    const requiredData = this.currentPage * this.currentPageLimit;
    if (this.cachedTableData.length >= requiredData) {
      return true;
    }
    return false;
  }

  clearFilters() {
    this.filterForm.reset();
  }

  onFilterSubmit() {
    this.saveFilterValuesToLocalStorage();
    this.cachedTableData = [];
    this.currentPage = 1;
    this.fetchTransactions();
  }

  handlePageEvent(e: PageEvent) {
    console.log("PAGE EVENT: ", e)
    if (e.pageSize !== this.currentPageLimit) {
      console.log("PAGE SIZE CHANGED")
      this.currentPageLimit = e.pageSize;
      this.currentPage = 1;
      this.fetchTransactions();
    }

    this.currentPage = e.pageIndex + 1;
    this.updateDataSource();
    return;
  }

  createFilter() {
    const itemFilter = this.filterForm.get('items_input')?.value;
    return {
      limit: this.currentPageLimit,
      offset: ((this.currentPage - 1) * this.currentPageLimit).toString(),
      order: 'createdAt DESC',
      include: [
        {
          relation: 'transactionItems',
          scope: {
            include: [
              {
                relation: 'item',
              },
            ],
            // Add the where condition for item name here if itemFilter exists
            where: itemFilter
              ? { 'item.name': { ilike: `%${itemFilter}%` } }
              : undefined,
          },
        },
      ],
      where: this.createWhereFilter(),
    };
  }

  createWhereFilter() {
    const where: any = {};

    if (this.filterForm.get('transaction_id_input')?.value) {
      where.id = {
        eq: this.filterForm.get('transaction_id_input')?.value,
      };
    }

    if (this.filterForm.get('user_id_input')?.value) {
      where.userId = {
        eq: this.filterForm.get('user_id_input')?.value,
      };
    }

    // Total Price Filter
    const totalPriceMin = this.filterForm.get('total_price_min_input')?.value;
    const totalPriceMax = this.filterForm.get('total_price_max_input')?.value;

    if (totalPriceMin || totalPriceMax) {
      const totalPriceFilter: any = {};
      if (totalPriceMin && totalPriceMax) {
        totalPriceFilter.between = [totalPriceMin, totalPriceMax];
      } else {
        if (totalPriceMin) totalPriceFilter.gte = totalPriceMin;
        if (totalPriceMax) totalPriceFilter.lte = totalPriceMax;
      }
      where.totalPrice = totalPriceFilter;
    }

    // Created At Filter
    const createdAtStart = this.filterForm.get('created_at_start_input')?.value;
    const createdAtEnd = this.filterForm.get('created_at_end_input')?.value;

    if (createdAtStart || createdAtEnd) {
      const createdAtFilter: any = {};
      if (createdAtStart && createdAtEnd) {
        createdAtFilter.between = [createdAtStart, createdAtEnd];
      } else {
        if (createdAtStart) createdAtFilter.gte = createdAtStart;
        if (createdAtEnd) createdAtFilter.lte = createdAtEnd;
      }
      where.createdAt = createdAtFilter;
    }

    // const itemName = this.filterForm.get('items_input')?.value;
    // if (itemName) {
    //   where.transactionItems = {
    //     inq: {
    //       item: {
    //         name: {
    //           like: `%${itemName}%`,
    //         },
    //       },
    //     },
    //   };
    // }

    return where;
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

  // Load filter fields from local storage and save as class variable
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

  // Apply filter fields loaded with getFilterValuesFromLocalStorage
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

// filterForm: FormGroup = new FormGroup({
//   transaction_id_input: new FormControl(''),
//   user_id_input: new FormControl(''),
//   created_at_input: new FormControl(''),
//   items_input: new FormControl(''),
//   total_price_min_input: new FormControl(''),
//   total_price_max_input: new FormControl(''),
//   created_at_start_input: new FormControl(''),
//   created_at_end_input: new FormControl(''),
// });
