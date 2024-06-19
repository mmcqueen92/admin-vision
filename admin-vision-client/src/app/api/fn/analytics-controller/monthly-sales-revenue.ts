/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface MonthlySalesRevenue$Params {
}

export function monthlySalesRevenue(http: HttpClient, rootUrl: string, params?: MonthlySalesRevenue$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'month'?: string;
'totalSales'?: number;
}>>> {
  const rb = new RequestBuilder(rootUrl, monthlySalesRevenue.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      'month'?: string;
      'totalSales'?: number;
      }>>;
    })
  );
}

monthlySalesRevenue.PATH = '/analytics/monthlySalesRevenue';
