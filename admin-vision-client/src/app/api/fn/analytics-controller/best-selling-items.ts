/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface BestSellingItems$Params {
}

export function bestSellingItems(http: HttpClient, rootUrl: string, params?: BestSellingItems$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'itemId'?: number;
'itemName'?: string;
'totalQuantitySold'?: number;
}>>> {
  const rb = new RequestBuilder(rootUrl, bestSellingItems.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      'itemId'?: number;
      'itemName'?: string;
      'totalQuantitySold'?: number;
      }>>;
    })
  );
}

bestSellingItems.PATH = '/analytics/bestSellingItems';
