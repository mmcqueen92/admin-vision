/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindMonthlyPerformanceByCategory$Params {
}

export function findMonthlyPerformanceByCategory(http: HttpClient, rootUrl: string, params?: FindMonthlyPerformanceByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<{

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
  const rb = new RequestBuilder(rootUrl, findMonthlyPerformanceByCategory.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      
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
      }>;
    })
  );
}

findMonthlyPerformanceByCategory.PATH = '/analytics/monthlyPerformanceByCategory';
