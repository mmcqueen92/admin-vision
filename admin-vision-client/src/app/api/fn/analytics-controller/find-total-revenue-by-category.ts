/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindTotalRevenueByCategory$Params {
}

export function findTotalRevenueByCategory(http: HttpClient, rootUrl: string, params?: FindTotalRevenueByCategory$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Category of the item
 */
'category': string;

/**
 * Total revenue generated by the category
 */
'totalRevenue': number;
}>>> {
  const rb = new RequestBuilder(rootUrl, findTotalRevenueByCategory.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      
      /**
       * Category of the item
       */
      'category': string;
      
      /**
       * Total revenue generated by the category
       */
      'totalRevenue': number;
      }>>;
    })
  );
}

findTotalRevenueByCategory.PATH = '/analytics/totalRevenueByCategory';
