/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface CustomerRetentionMonthly$Params {
}

export function customerRetentionMonthly(http: HttpClient, rootUrl: string, params?: CustomerRetentionMonthly$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'month'?: string;
'retentionRate'?: number;
}>>> {
  const rb = new RequestBuilder(rootUrl, customerRetentionMonthly.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      'month'?: string;
      'retentionRate'?: number;
      }>>;
    })
  );
}

customerRetentionMonthly.PATH = '/analytics/customerRetentionMonthly';
