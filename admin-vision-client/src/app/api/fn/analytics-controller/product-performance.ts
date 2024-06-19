/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Item } from '../../models/item';

export interface ProductPerformance$Params {
}

export function productPerformance(http: HttpClient, rootUrl: string, params?: ProductPerformance$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'salesTrends'?: Array<{
'month'?: string;
'salesCount'?: number;
}>;
'topSellingProducts'?: Array<Item>;
}>> {
  const rb = new RequestBuilder(rootUrl, productPerformance.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'salesTrends'?: Array<{
      'month'?: string;
      'salesCount'?: number;
      }>;
      'topSellingProducts'?: Array<Item>;
      }>;
    })
  );
}

productPerformance.PATH = '/analytics/productPerformance';
