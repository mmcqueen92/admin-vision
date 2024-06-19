/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { averageOrderValue } from '../fn/analytics-controller/average-order-value';
import { AverageOrderValue$Params } from '../fn/analytics-controller/average-order-value';
import { averageOrderValueByMonth } from '../fn/analytics-controller/average-order-value-by-month';
import { AverageOrderValueByMonth$Params } from '../fn/analytics-controller/average-order-value-by-month';
import { bestSellingItems } from '../fn/analytics-controller/best-selling-items';
import { BestSellingItems$Params } from '../fn/analytics-controller/best-selling-items';
import { cartAbandonmentRate } from '../fn/analytics-controller/cart-abandonment-rate';
import { CartAbandonmentRate$Params } from '../fn/analytics-controller/cart-abandonment-rate';
import { conversionRates } from '../fn/analytics-controller/conversion-rates';
import { ConversionRates$Params } from '../fn/analytics-controller/conversion-rates';
import { customerDemographics } from '../fn/analytics-controller/customer-demographics';
import { CustomerDemographics$Params } from '../fn/analytics-controller/customer-demographics';
import { customerRetention } from '../fn/analytics-controller/customer-retention';
import { CustomerRetention$Params } from '../fn/analytics-controller/customer-retention';
import { customerRetentionMonthly } from '../fn/analytics-controller/customer-retention-monthly';
import { CustomerRetentionMonthly$Params } from '../fn/analytics-controller/customer-retention-monthly';
import { findAllItemsTransactionData } from '../fn/analytics-controller/find-all-items-transaction-data';
import { FindAllItemsTransactionData$Params } from '../fn/analytics-controller/find-all-items-transaction-data';
import { findMonthlyConversionRates } from '../fn/analytics-controller/find-monthly-conversion-rates';
import { FindMonthlyConversionRates$Params } from '../fn/analytics-controller/find-monthly-conversion-rates';
import { findMonthlyPerformanceByCategory } from '../fn/analytics-controller/find-monthly-performance-by-category';
import { FindMonthlyPerformanceByCategory$Params } from '../fn/analytics-controller/find-monthly-performance-by-category';
import { findMonthlyRevenueByItem } from '../fn/analytics-controller/find-monthly-revenue-by-item';
import { FindMonthlyRevenueByItem$Params } from '../fn/analytics-controller/find-monthly-revenue-by-item';
import { findTotalRevenueByCategory } from '../fn/analytics-controller/find-total-revenue-by-category';
import { FindTotalRevenueByCategory$Params } from '../fn/analytics-controller/find-total-revenue-by-category';
import { findTransactionItemData } from '../fn/analytics-controller/find-transaction-item-data';
import { FindTransactionItemData$Params } from '../fn/analytics-controller/find-transaction-item-data';
import { Item } from '../models/item';
import { monthlySalesRevenue } from '../fn/analytics-controller/monthly-sales-revenue';
import { MonthlySalesRevenue$Params } from '../fn/analytics-controller/monthly-sales-revenue';
import { newUsersByMonth } from '../fn/analytics-controller/new-users-by-month';
import { NewUsersByMonth$Params } from '../fn/analytics-controller/new-users-by-month';
import { productPerformance } from '../fn/analytics-controller/product-performance';
import { ProductPerformance$Params } from '../fn/analytics-controller/product-performance';
import { trafficSources } from '../fn/analytics-controller/traffic-sources';
import { TrafficSources } from '../models/traffic-sources';
import { TrafficSources$Params } from '../fn/analytics-controller/traffic-sources';

@Injectable({ providedIn: 'root' })
export class AnalyticsControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `analyticsControllerAverageOrderValue()` */
  static readonly AnalyticsControllerAverageOrderValuePath = '/analytics/averageOrderValue';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `averageOrderValue()` instead.
   *
   * This method doesn't expect any request body.
   */
  averageOrderValue$Response(params?: AverageOrderValue$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'averageOrderValue'?: number;
}>> {
    return averageOrderValue(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `averageOrderValue$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  averageOrderValue(params?: AverageOrderValue$Params, context?: HttpContext): Observable<{
'averageOrderValue'?: number;
}> {
    return this.averageOrderValue$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'averageOrderValue'?: number;
}>): {
'averageOrderValue'?: number;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerAverageOrderValueByMonth()` */
  static readonly AnalyticsControllerAverageOrderValueByMonthPath = '/analytics/averageOrderValueByMonth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `averageOrderValueByMonth()` instead.
   *
   * This method doesn't expect any request body.
   */
  averageOrderValueByMonth$Response(params?: AverageOrderValueByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Average order value for the month
 */
'averageOrderValue': number;
}>>> {
    return averageOrderValueByMonth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `averageOrderValueByMonth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  averageOrderValueByMonth(params?: AverageOrderValueByMonth$Params, context?: HttpContext): Observable<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Average order value for the month
 */
'averageOrderValue': number;
}>> {
    return this.averageOrderValueByMonth$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Average order value for the month
 */
'averageOrderValue': number;
}>>): Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Average order value for the month
 */
'averageOrderValue': number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerBestSellingItems()` */
  static readonly AnalyticsControllerBestSellingItemsPath = '/analytics/bestSellingItems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bestSellingItems()` instead.
   *
   * This method doesn't expect any request body.
   */
  bestSellingItems$Response(params?: BestSellingItems$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'itemId'?: number;
'itemName'?: string;
'totalQuantitySold'?: number;
}>>> {
    return bestSellingItems(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bestSellingItems$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  bestSellingItems(params?: BestSellingItems$Params, context?: HttpContext): Observable<Array<{
'itemId'?: number;
'itemName'?: string;
'totalQuantitySold'?: number;
}>> {
    return this.bestSellingItems$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
'itemId'?: number;
'itemName'?: string;
'totalQuantitySold'?: number;
}>>): Array<{
'itemId'?: number;
'itemName'?: string;
'totalQuantitySold'?: number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerCartAbandonmentRate()` */
  static readonly AnalyticsControllerCartAbandonmentRatePath = '/analytics/cartAbandonmentRate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `cartAbandonmentRate()` instead.
   *
   * This method doesn't expect any request body.
   */
  cartAbandonmentRate$Response(params?: CartAbandonmentRate$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'abandonmentRate'?: number;
}>> {
    return cartAbandonmentRate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `cartAbandonmentRate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  cartAbandonmentRate(params?: CartAbandonmentRate$Params, context?: HttpContext): Observable<{
'abandonmentRate'?: number;
}> {
    return this.cartAbandonmentRate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'abandonmentRate'?: number;
}>): {
'abandonmentRate'?: number;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerConversionRates()` */
  static readonly AnalyticsControllerConversionRatesPath = '/analytics/conversionRates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `conversionRates()` instead.
   *
   * This method doesn't expect any request body.
   */
  conversionRates$Response(params?: ConversionRates$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return conversionRates(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `conversionRates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  conversionRates(params?: ConversionRates$Params, context?: HttpContext): Observable<number> {
    return this.conversionRates$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `analyticsControllerCustomerDemographics()` */
  static readonly AnalyticsControllerCustomerDemographicsPath = '/analytics/customerDemographics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerDemographics()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerDemographics$Response(params?: CustomerDemographics$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'genderDistribution'?: Array<{
'gender'?: string;
'count'?: number;
}>;
'ageDistribution'?: Array<{
'age_group'?: string;
'count'?: number;
}>;
'locationDistribution'?: Array<{
'location'?: string;
'count'?: number;
}>;
}>> {
    return customerDemographics(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerDemographics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerDemographics(params?: CustomerDemographics$Params, context?: HttpContext): Observable<{
'genderDistribution'?: Array<{
'gender'?: string;
'count'?: number;
}>;
'ageDistribution'?: Array<{
'age_group'?: string;
'count'?: number;
}>;
'locationDistribution'?: Array<{
'location'?: string;
'count'?: number;
}>;
}> {
    return this.customerDemographics$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'genderDistribution'?: Array<{
'gender'?: string;
'count'?: number;
}>;
'ageDistribution'?: Array<{
'age_group'?: string;
'count'?: number;
}>;
'locationDistribution'?: Array<{
'location'?: string;
'count'?: number;
}>;
}>): {
'genderDistribution'?: Array<{
'gender'?: string;
'count'?: number;
}>;
'ageDistribution'?: Array<{
'age_group'?: string;
'count'?: number;
}>;
'locationDistribution'?: Array<{
'location'?: string;
'count'?: number;
}>;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerCustomerRetention()` */
  static readonly AnalyticsControllerCustomerRetentionPath = '/analytics/customerRetention';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerRetention()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerRetention$Response(params?: CustomerRetention$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'retentionRate'?: number;
}>> {
    return customerRetention(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerRetention$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerRetention(params?: CustomerRetention$Params, context?: HttpContext): Observable<{
'retentionRate'?: number;
}> {
    return this.customerRetention$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'retentionRate'?: number;
}>): {
'retentionRate'?: number;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerCustomerRetentionMonthly()` */
  static readonly AnalyticsControllerCustomerRetentionMonthlyPath = '/analytics/customerRetentionMonthly';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `customerRetentionMonthly()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerRetentionMonthly$Response(params?: CustomerRetentionMonthly$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'month'?: string;
'retentionRate'?: number;
}>>> {
    return customerRetentionMonthly(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `customerRetentionMonthly$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  customerRetentionMonthly(params?: CustomerRetentionMonthly$Params, context?: HttpContext): Observable<Array<{
'month'?: string;
'retentionRate'?: number;
}>> {
    return this.customerRetentionMonthly$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
'month'?: string;
'retentionRate'?: number;
}>>): Array<{
'month'?: string;
'retentionRate'?: number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerFindAllItemsTransactionData()` */
  static readonly AnalyticsControllerFindAllItemsTransactionDataPath = '/analytics/findAllItemsTransactionData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllItemsTransactionData()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllItemsTransactionData$Response(params?: FindAllItemsTransactionData$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return findAllItemsTransactionData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllItemsTransactionData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllItemsTransactionData(params?: FindAllItemsTransactionData$Params, context?: HttpContext): Observable<any> {
    return this.findAllItemsTransactionData$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

  /** Path part for operation `analyticsControllerFindMonthlyConversionRates()` */
  static readonly AnalyticsControllerFindMonthlyConversionRatesPath = '/analytics/monthlyConversionRates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMonthlyConversionRates()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMonthlyConversionRates$Response(params?: FindMonthlyConversionRates$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Conversion rate for the month
 */
'conversionRate': number;
}>>> {
    return findMonthlyConversionRates(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMonthlyConversionRates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMonthlyConversionRates(params?: FindMonthlyConversionRates$Params, context?: HttpContext): Observable<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Conversion rate for the month
 */
'conversionRate': number;
}>> {
    return this.findMonthlyConversionRates$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Conversion rate for the month
 */
'conversionRate': number;
}>>): Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Conversion rate for the month
 */
'conversionRate': number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerFindMonthlyPerformanceByCategory()` */
  static readonly AnalyticsControllerFindMonthlyPerformanceByCategoryPath = '/analytics/monthlyPerformanceByCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMonthlyPerformanceByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMonthlyPerformanceByCategory$Response(params?: FindMonthlyPerformanceByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<{

/**
 * Array of months
 */
'labels': Array<string>;

/**
 * Array of datasets with revenue data for each category
 */
'datasets': Array<{

/**
 * Category of the item
 */
'label': string;
'data': Array<number>;
}>;
}>> {
    return findMonthlyPerformanceByCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMonthlyPerformanceByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMonthlyPerformanceByCategory(params?: FindMonthlyPerformanceByCategory$Params, context?: HttpContext): Observable<{

/**
 * Array of months
 */
'labels': Array<string>;

/**
 * Array of datasets with revenue data for each category
 */
'datasets': Array<{

/**
 * Category of the item
 */
'label': string;
'data': Array<number>;
}>;
}> {
    return this.findMonthlyPerformanceByCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Array of months
 */
'labels': Array<string>;

/**
 * Array of datasets with revenue data for each category
 */
'datasets': Array<{

/**
 * Category of the item
 */
'label': string;
'data': Array<number>;
}>;
}>): {

/**
 * Array of months
 */
'labels': Array<string>;

/**
 * Array of datasets with revenue data for each category
 */
'datasets': Array<{

/**
 * Category of the item
 */
'label': string;
'data': Array<number>;
}>;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerFindMonthlyRevenueByItem()` */
  static readonly AnalyticsControllerFindMonthlyRevenueByItemPath = '/analytics/monthlyRevenueByItem';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findMonthlyRevenueByItem()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMonthlyRevenueByItem$Response(params?: FindMonthlyRevenueByItem$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'labels'?: Array<string>;
'datasets'?: Array<{
'label'?: string;
'data'?: Array<number>;
}>;
}>> {
    return findMonthlyRevenueByItem(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findMonthlyRevenueByItem$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findMonthlyRevenueByItem(params?: FindMonthlyRevenueByItem$Params, context?: HttpContext): Observable<{
'labels'?: Array<string>;
'datasets'?: Array<{
'label'?: string;
'data'?: Array<number>;
}>;
}> {
    return this.findMonthlyRevenueByItem$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'labels'?: Array<string>;
'datasets'?: Array<{
'label'?: string;
'data'?: Array<number>;
}>;
}>): {
'labels'?: Array<string>;
'datasets'?: Array<{
'label'?: string;
'data'?: Array<number>;
}>;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerMonthlySalesRevenue()` */
  static readonly AnalyticsControllerMonthlySalesRevenuePath = '/analytics/monthlySalesRevenue';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `monthlySalesRevenue()` instead.
   *
   * This method doesn't expect any request body.
   */
  monthlySalesRevenue$Response(params?: MonthlySalesRevenue$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'month'?: string;
'totalSales'?: number;
}>>> {
    return monthlySalesRevenue(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `monthlySalesRevenue$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  monthlySalesRevenue(params?: MonthlySalesRevenue$Params, context?: HttpContext): Observable<Array<{
'month'?: string;
'totalSales'?: number;
}>> {
    return this.monthlySalesRevenue$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
'month'?: string;
'totalSales'?: number;
}>>): Array<{
'month'?: string;
'totalSales'?: number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerNewUsersByMonth()` */
  static readonly AnalyticsControllerNewUsersByMonthPath = '/analytics/newUsersByMonth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newUsersByMonth()` instead.
   *
   * This method doesn't expect any request body.
   */
  newUsersByMonth$Response(params?: NewUsersByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Number of new users created for the month
 */
'newUserCount': number;
}>>> {
    return newUsersByMonth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `newUsersByMonth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  newUsersByMonth(params?: NewUsersByMonth$Params, context?: HttpContext): Observable<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Number of new users created for the month
 */
'newUserCount': number;
}>> {
    return this.newUsersByMonth$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Number of new users created for the month
 */
'newUserCount': number;
}>>): Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Number of new users created for the month
 */
'newUserCount': number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerProductPerformance()` */
  static readonly AnalyticsControllerProductPerformancePath = '/analytics/productPerformance';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `productPerformance()` instead.
   *
   * This method doesn't expect any request body.
   */
  productPerformance$Response(params?: ProductPerformance$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'salesTrends'?: Array<{
'month'?: string;
'salesCount'?: number;
}>;
'topSellingProducts'?: Array<Item>;
}>> {
    return productPerformance(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `productPerformance$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  productPerformance(params?: ProductPerformance$Params, context?: HttpContext): Observable<{
'salesTrends'?: Array<{
'month'?: string;
'salesCount'?: number;
}>;
'topSellingProducts'?: Array<Item>;
}> {
    return this.productPerformance$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'salesTrends'?: Array<{
'month'?: string;
'salesCount'?: number;
}>;
'topSellingProducts'?: Array<Item>;
}>): {
'salesTrends'?: Array<{
'month'?: string;
'salesCount'?: number;
}>;
'topSellingProducts'?: Array<Item>;
} => r.body)
    );
  }

  /** Path part for operation `analyticsControllerFindTotalRevenueByCategory()` */
  static readonly AnalyticsControllerFindTotalRevenueByCategoryPath = '/analytics/totalRevenueByCategory';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTotalRevenueByCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTotalRevenueByCategory$Response(params?: FindTotalRevenueByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Category of the item
 */
'category': string;

/**
 * Total revenue generated by the category
 */
'totalRevenue': number;
}>>> {
    return findTotalRevenueByCategory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findTotalRevenueByCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTotalRevenueByCategory(params?: FindTotalRevenueByCategory$Params, context?: HttpContext): Observable<Array<{

/**
 * Category of the item
 */
'category': string;

/**
 * Total revenue generated by the category
 */
'totalRevenue': number;
}>> {
    return this.findTotalRevenueByCategory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{

/**
 * Category of the item
 */
'category': string;

/**
 * Total revenue generated by the category
 */
'totalRevenue': number;
}>>): Array<{

/**
 * Category of the item
 */
'category': string;

/**
 * Total revenue generated by the category
 */
'totalRevenue': number;
}> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerTrafficSources()` */
  static readonly AnalyticsControllerTrafficSourcesPath = '/analytics/trafficSources';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `trafficSources()` instead.
   *
   * This method doesn't expect any request body.
   */
  trafficSources$Response(params?: TrafficSources$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrafficSources>>> {
    return trafficSources(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `trafficSources$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  trafficSources(params?: TrafficSources$Params, context?: HttpContext): Observable<Array<TrafficSources>> {
    return this.trafficSources$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TrafficSources>>): Array<TrafficSources> => r.body)
    );
  }

  /** Path part for operation `analyticsControllerFindTransactionItemData()` */
  static readonly AnalyticsControllerFindTransactionItemDataPath = '/analytics/transactionItemData';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTransactionItemData()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTransactionItemData$Response(params?: FindTransactionItemData$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'id': number;
'name': string;
'totalRevenue': number;
'totalUnitsSold': number;
}>>> {
    return findTransactionItemData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findTransactionItemData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTransactionItemData(params?: FindTransactionItemData$Params, context?: HttpContext): Observable<Array<{
'id': number;
'name': string;
'totalRevenue': number;
'totalUnitsSold': number;
}>> {
    return this.findTransactionItemData$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<{
'id': number;
'name': string;
'totalRevenue': number;
'totalUnitsSold': number;
}>>): Array<{
'id': number;
'name': string;
'totalRevenue': number;
'totalUnitsSold': number;
}> => r.body)
    );
  }

}
