/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindMonthlyRevenueByItem$Params {
}

export function findMonthlyRevenueByItem(http: HttpClient, rootUrl: string, params?: FindMonthlyRevenueByItem$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'labels'?: Array<string>;
'datasets'?: Array<{
'label'?: string;
'data'?: Array<number>;
}>;
}>> {
  const rb = new RequestBuilder(rootUrl, findMonthlyRevenueByItem.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'labels'?: Array<string>;
      'datasets'?: Array<{
      'label'?: string;
      'data'?: Array<number>;
      }>;
      }>;
    })
  );
}

findMonthlyRevenueByItem.PATH = '/analytics/monthlyRevenueByItem';
