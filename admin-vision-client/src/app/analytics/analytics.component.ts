import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {
  PageEvent,
  MatPaginatorModule,
  MatPaginator,
} from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AnalyticsControllerService } from '../api/services';
import { TransactionControllerService } from '../api/services';
import { Chart, registerables, ChartOptions } from 'chart.js';
import { ItemControllerService } from '../api/services';
import { After } from 'v8';
@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  constructor(
    private analyticsService: AnalyticsControllerService,
    private transactionService: TransactionControllerService,
    private itemService: ItemControllerService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    Chart.register(...registerables);
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  monthlySalesRevenueChart: any = null;

  averageOrderByMonthChart: any = null;

  conversionRatesChart: any = null;

  totalTransactions: number | null = null;
  transactionsPast30Days: number | null = null;

  customerRetentionChart: any = null;

  customerLocationsChart: any = null;

  customerGendersChart: any = null;

  newUsersPerMonthChart: any = null;

  monthlyRevenueByItemChart: any = null;

  monthlyPerformanceByCategoryChart: any = null;

  totalRevenueByCategoryChart: any = null;

  itemsTableDataSource: any = new MatTableDataSource<any>([]);
  itemsTableColumns: string[] = [
    'id',
    'name',
    'totalRevenue',
    'totalUnitsSold',
    'price',
  ];

  tableLimitOptions: number[] = [5, 10, 20, 50];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createMonthlySalesRevenueChart();
      this.createAverageOrderChart();
      this.createConversionRateChart();
      this.fetchTotalTransactions();
      this.fetchTransactionsPast30Days();
    }
  }

  ngAfterViewInit(): void {
    this.itemsTableDataSource.paginator = this.paginator;
    this.itemsTableDataSource.sort = this.sort;
  }

  createMonthlySalesRevenueChart(): void {
    try {
      this.analyticsService.monthlySalesRevenue().subscribe({
        next: (data: any) => {
          const salesMonths = data.map((item: any) => item.month);
          const totalSales = data.map((item: any) => item.totalSales);

          const canvas = this.document.getElementById(
            'monthly-sales-revenue-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.monthlySalesRevenueChart) {
            this.monthlySalesRevenueChart.destroy();
          }

          const chartData = {
            labels: salesMonths,
            datasets: [
              {
                label: 'Monthly Sales Revenue',
                data: totalSales,
                backgroundColor: this.generateRandomColor(), // Example color
                borderColor: this.generateRandomColor(), // Example border color
                borderWidth: 1,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {},
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          };

          if (ctx) {
            this.monthlySalesRevenueChart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options,
            });
          }
        },
      });
    } catch (e) {
      console.error('Error creating chart: ', e);
    }
  }

  createAverageOrderChart() {
    try {
      this.analyticsService.averageOrderValueByMonth().subscribe({
        next: (data: any) => {
          const averageOrderMonths = data.map((item: any) => item.month);
          const averageOrderValues = data.map(
            (item: any) => item.averageOrderValue
          );

          const canvas = this.document.getElementById(
            'average-order-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.averageOrderByMonthChart) {
            this.averageOrderByMonthChart.destroy();
          }

          const chartData = {
            labels: averageOrderMonths,
            datasets: [
              {
                label: 'Monthly Average Order Value',
                data: averageOrderValues,
                backgroundColor: this.generateRandomColor(), // Example color
                borderColor: this.generateRandomColor(), // Example border color
                borderWidth: 1,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {},
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          };

          if (ctx) {
            this.averageOrderByMonthChart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options,
            });
          }
        },
        error: (error: any) => {
          console.error(
            'Error fetching average order values by month: ',
            error
          );
        },
      });
    } catch (e) {
      console.error('Error creating average order chart: ', e);
    }
  }

  createConversionRateChart() {
    try {
      this.analyticsService.findMonthlyConversionRates().subscribe({
        next: (data: any) => {
          const conversionRatesMonths = data.map((item: any) => item.month);
          const conversionRatesValues = data.map(
            (item: any) => item.conversionRate
          );

          const canvas = this.document.getElementById(
            'conversion-rates-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.conversionRatesChart) {
            this.conversionRatesChart.destroy();
          }

          const chartData = {
            labels: conversionRatesMonths,
            datasets: [
              {
                label: 'Monthly Conversion Rates',
                data: conversionRatesValues,
                backgroundColor: this.generateRandomColor(), // Example color
                borderColor: this.generateRandomColor(), // Example border color
                borderWidth: 1,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {},
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          };

          if (ctx) {
            this.conversionRatesChart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options,
            });
          }
        },
        error: (e: any) => {
          console.error('Error fetching monthly conversion rates: ', e);
        },
      });
    } catch (e) {
      console.error('Error creating monthly conversion rate chart: ', e);
    }
  }

  private fetchTotalTransactions() {
    this.transactionService.count().subscribe({
      next: (serverData: any) => {
        this.totalTransactions = serverData.count;
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
        this.transactionsPast30Days = serverData.count;
      },
      error: (error: any) => {
        console.error('Error fetching transactions past 30 days: ', error);
      },
    });
  }

  createMonthlyCustomerRetentionChart() {
    this.analyticsService.customerRetentionMonthly().subscribe({
      next: (data: any) => {
        const customerRetentionMonths = data.map((item: any) => item.month);
        const customerRetentionValues = data.map(
          (item: any) => item.retentionRate
        );

        const canvas = this.document.getElementById(
          'customer-retention-chart'
        ) as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');

        if (this.customerRetentionChart) {
          this.customerRetentionChart.destroy();
        }

        const chartData = {
          labels: customerRetentionMonths,
          datasets: [
            {
              label: 'Customer Retention by Month',
              data: customerRetentionValues,
              backgroundColor: this.generateRandomColor(), // Example color
              borderColor: this.generateRandomColor(), // Example border color
              borderWidth: 1,
            },
          ],
        };

        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {},
          layout: {
            padding: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            },
          },
        };

        if (ctx) {
          this.customerRetentionChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options,
          });
        }
      },
    });
  }

  createCustomerDemographicsCharts() {
    try {
      this.analyticsService.customerDemographics().subscribe({
        next: (data: any) => {
          this.createCustomerLocationsChart(data.locationDistribution);
          this.createCustomerGendersChart(data.genderDistribution);
        },
      });
    } catch (e) {
      console.error('Error fetching customer demographics: ', e);
    }
  }

  createCustomerLocationsChart(data: any) {
    const canvas = this.document.getElementById(
      'customer-locations-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (this.customerLocationsChart) {
      this.customerLocationsChart.destroy();
    }

    const labels = data.map((item: any) => item.province);

    const values = data.map((item: any) => item.count);


    const backgroundColors = values.map(() => this.generateRandomColor());
    const borderColors = backgroundColors.map(
      (color: string) => this.darkenColor(color, 20) // Darken by 20%
    );

    const borderWidths = new Array(values.length).fill(1);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Customer Locations',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: borderWidths,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          onHover: (event: any, legendItem: any) => {
            const index = legendItem.index;
            const chart = this.customerLocationsChart;
            chart.data.datasets[0].borderWidth =
              chart.data.datasets[0].borderWidth.map((bw: any, i: number) =>
                i === index ? 5 : 1
              );
            chart.update();
          },
          onLeave: (event: any, legendItem: any) => {
            const index = legendItem.index;
            const chart = this.customerLocationsChart;
            chart.data.datasets[0].borderWidth =
              chart.data.datasets[0].borderWidth.map(() => 1);
            chart.update();
          },
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
    };

    if (ctx) {
      this.customerLocationsChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options,
      });
    }
  }

  createCustomerGendersChart(data: any) {
    const canvas = this.document.getElementById(
      'customer-genders-chart'
    ) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (this.customerGendersChart) {
      this.customerGendersChart.destroy();
    }

    const labels = data.map((item: any) => item.gender);

    const values = data.map((item: any) => item.count);

    const backgroundColors = values.map(() => this.generateRandomColor());
    const borderColors = backgroundColors.map(
      (color: string) => this.darkenColor(color, 20) // Darken by 20%
    );

    const borderWidths = new Array(values.length).fill(1);

    const chartData = {
      labels,
      datasets: [
        {
          label: 'Customer Genders',
          data: values,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: borderWidths,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          onHover: (event: any, legendItem: any) => {
            const index = legendItem.index;
            const chart = this.customerGendersChart;
            chart.data.datasets[0].borderWidth =
              chart.data.datasets[0].borderWidth.map((bw: any, i: number) =>
                i === index ? 5 : 1
              );
            chart.update();
          },
          onLeave: (event: any, legendItem: any) => {
            const index = legendItem.index;
            const chart = this.customerGendersChart;
            chart.data.datasets[0].borderWidth =
              chart.data.datasets[0].borderWidth.map(() => 1);
            chart.update();
          },
        },
      },
      layout: {
        padding: {
          left: 10,
          right: 10,
          top: 10,
          bottom: 10,
        },
      },
    };

    if (ctx) {
      this.customerGendersChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options,
      });
    }
  }

  createNewUsersPerMonth() {
    try {
      this.analyticsService.newUsersByMonth().subscribe({
        next: (data: any) => {
          const newUsersCounts = data.map((item: any) => item.newUserCount);
          const newUsersMonths = data.map((item: any) => item.month);

          const canvas = this.document.getElementById(
            'new-users-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.newUsersPerMonthChart) {
            this.newUsersPerMonthChart.destroy();
          }

          const chartData = {
            labels: newUsersMonths,
            datasets: [
              {
                label: 'New Users by Month',
                data: newUsersCounts,
                backgroundColor: this.generateRandomColor(), // Example color
                borderColor: this.generateRandomColor(), // Example border color
                borderWidth: 1,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {},
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          };

          if (ctx) {
            this.newUsersPerMonthChart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options,
            });
          }
        },
        error: (e: any) => {
          console.error('Error fetching new users per month: ', e);
        },
      });
    } catch (e) {
      console.error('Error fetching new users by month: ', e);
    }
  }

  createMonthlyRevenueByItemChart() {
    try {
      this.analyticsService.findMonthlyRevenueByItem().subscribe({
        next: (data: any) => {
          const { labels, datasets } = data;

          const canvas = this.document.getElementById(
            'monthly-revenue-by-item-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.monthlyRevenueByItemChart) {
            this.monthlyRevenueByItemChart.destroy();
          }

          const chartData = {
            labels: labels,
            datasets: datasets.map((dataset: any) => {
              const color = this.generateRandomColor();
              return {
                ...dataset,
                backgroundColor: color, // Example color
                borderColor: color, // Example border color
                fill: false,
                tension: 0.1, // smoothness of the lines
              };
            }),
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                onHover: this.onChartLegendHover,
                onLeave: this.onChartLegendLeave,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Revenue',
                },
              },
            },
          };

          if (ctx) {
            this.monthlyRevenueByItemChart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options: options,
            });
          }
        },
        error: (e: any) => {
          console.error('Error fetching monthly performance by item: ', e);
        },
      });
    } catch (e) {
      console.error('Error creating monthly revenue by item chart: ', e);
    }
  }

  createMonthlyRevenueByCategoryChart() {
    try {
      this.analyticsService.findMonthlyPerformanceByCategory().subscribe({
        next: (data: any) => {
          const { labels, datasets } = data;

          const canvas = this.document.getElementById(
            'product-performance-by-category-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.monthlyPerformanceByCategoryChart) {
            this.monthlyPerformanceByCategoryChart.destroy();
          }

          const chartData = {
            labels: labels,
            datasets: datasets.map((dataset: any) => {
              const color = this.generateRandomColor();
              return {
                ...dataset,
                backgroundColor: color, // Example color
                borderColor: color, // Example border color
                fill: false,
                tension: 0.1, // smoothness of the lines
              };
            }),
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                onHover: this.onChartLegendHover,
                onLeave: this.onChartLegendLeave,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Month',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Revenue',
                },
              },
            },
          };

          if (ctx) {
            this.monthlyPerformanceByCategoryChart = new Chart(ctx, {
              type: 'line',
              data: chartData,
              options: options,
            });
          }
        },
        error: (e: any) => {
          console.error('Error fetching monthly performance by category: ', e);
        },
      });
    } catch (e) {
      console.error('Error creating monthly revenue by category chart: ', e);
    }
  }

  createTotalRevenueByCategoryChart() {
    try {
      this.analyticsService.findTotalRevenueByCategory().subscribe({
        next: (data: any) => {
          const categories = data.map((item: any) => item.category);
          const totalRevenues = data.map((item: any) => item.totalRevenue);

          const canvas = this.document.getElementById(
            'total-revenue-by-category-chart'
          ) as HTMLCanvasElement;
          const ctx = canvas?.getContext('2d');

          if (this.totalRevenueByCategoryChart) {
            this.totalRevenueByCategoryChart.destroy();
          }

          const backgroundColors = categories.map(() =>
            this.generateRandomColor()
          );
          const borderColors = backgroundColors.map(
            (color: string) => this.darkenColor(color, 20) // Darken by 20%
          );
          const borderWidths = new Array(categories.length).fill(1);

          const chartData = {
            labels: categories,
            datasets: [
              {
                label: 'Total Revenue by Category',
                data: totalRevenues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: borderWidths,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem: any) {
                    const value = tooltipItem.raw;
                    const total = totalRevenues.reduce(
                      (a: number, b: number) => a + b,
                      0
                    );
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${value} (${percentage}%)`;
                  },
                },
              },
              legend: {
                onHover: (event: any, legendItem: any) => {
                  const index = legendItem.index;
                  const chart = this.totalRevenueByCategoryChart;
                  chart.setDatasetVisibility(index, true);
                  chart.data.datasets[0].borderWidth =
                    chart.data.datasets[0].borderWidth.map((bw: any, i: number) =>
                      i === index ? 5 : 1
                    );
                  chart.update();
                },
                onLeave: (event: any, legendItem: any) => {
                  const index = legendItem.index;
                  const chart = this.totalRevenueByCategoryChart;
                  chart.setDatasetVisibility(index, true);
                  chart.data.datasets[0].borderWidth =
                    chart.data.datasets[0].borderWidth.map(() => 1);
                  chart.update();
                },
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
              },
            },
          };

          if (ctx) {
            this.totalRevenueByCategoryChart = new Chart(ctx, {
              type: 'doughnut',
              data: chartData,
              options: options,
            });
          }
        },
        error: (e: any) => {
          console.error('Error fetching total revenue by category: ', e);
        },
      });
    } catch (e) {
      console.error('Error creating total revenue by category chart: ', e);
    }
  }

  fetchItemTransactionData() {
    try {
      this.analyticsService.findAllItemsTransactionData().subscribe({
        next: (data: any) => {
          this.itemsTableDataSource = new MatTableDataSource<any>(data);
          this.itemsTableDataSource.paginator = this.paginator;
          this.itemsTableDataSource.sort = this.sort;
        },
        error: (e: any) => {
          console.error('Error transaction item data: ', e);
        },
      });
    } catch (e) {
      console.error('Error fetching top 5 items by revenue: ', e);
    }
  }

  onTabChange(e: any) {
    if (e.index === 0) {
      this.createMonthlySalesRevenueChart();
      this.createAverageOrderChart();
      this.createConversionRateChart();
      this.fetchTotalTransactions();
      this.fetchTransactionsPast30Days();
    } else if (e.index === 1) {
      this.createMonthlyCustomerRetentionChart();
      this.createCustomerDemographicsCharts();
      this.createNewUsersPerMonth();
    } else if (e.index === 2) {
      this.createMonthlyRevenueByItemChart();
      this.createMonthlyRevenueByCategoryChart();
      this.createTotalRevenueByCategoryChart();
      this.fetchItemTransactionData();
    }
  }

  generateRandomColor(): string {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;

    // Check if the generated color is too light (close to white)
    // Adjust this threshold as per your preference
    const brightnessThreshold = 500; // (255 * 3) / 2

    const rgb = randomColor
      .substring(4, randomColor.length - 1)
      .replace(/ /g, '')
      .split(',');

    const brightness =
      parseInt(rgb[0], 10) + parseInt(rgb[1], 10) + parseInt(rgb[2], 10);

    if (brightness > brightnessThreshold) {
      // If color is too light, generate a new one recursively
      return this.generateRandomColor();
    }

    return randomColor;
  }

  darkenColor(color: string, percent: number): string {
    const rgb = color
      .substring(4, color.length - 1)
      .replace(/ /g, '')
      .split(',');

    const r = Math.floor(parseInt(rgb[0], 10) * (1 - percent / 100));
    const g = Math.floor(parseInt(rgb[1], 10) * (1 - percent / 100));
    const b = Math.floor(parseInt(rgb[2], 10) * (1 - percent / 100));

    return `rgb(${r}, ${g}, ${b})`;
  }

  onChartLegendHover(e: any, legendItem: any, legend: any) {
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    ci.data.datasets.forEach((dataset: any, i: any) => {
      if (i === index) {
        dataset.borderWidth = 5; // Highlight the hovered dataset
      } else {
        dataset.borderWidth = 1; // Reset others
      }
    });
    ci.update();
  }

  onChartLegendLeave(e: any, legendItem: any, legend: any) {
    const ci = legend.chart;
    ci.data.datasets.forEach((dataset: any) => {
      dataset.borderWidth = 1; // Reset all datasets
    });
    ci.update();
  }

  doughnutLegendHover(event: any, legendItem: any, legend: any): void {
    const index = legendItem.index;
    const ci = legend.chart;
    const meta = ci.getDatasetMeta(0).data[index];

    if (meta) {
      meta.borderWidth = 3; // Highlight the segment
      ci.update();
    }
  }

  doughnutLegendLeave(event: any, legendItem: any, legend: any): void {
    const index = legendItem.index;
    const ci = legend.chart;
    const meta = ci.getDatasetMeta(0).data[index];

    if (meta) {
      meta.borderWidth = 1; // Reset the segment
      ci.update();
    }
  }
}
