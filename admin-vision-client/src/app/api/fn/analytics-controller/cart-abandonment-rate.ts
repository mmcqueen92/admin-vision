/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface CartAbandonmentRate$Params {
}

export function cartAbandonmentRate(http: HttpClient, rootUrl: string, params?: CartAbandonmentRate$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'abandonmentRate'?: number;
}>> {
  const rb = new RequestBuilder(rootUrl, cartAbandonmentRate.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'abandonmentRate'?: number;
      }>;
    })
  );
}

cartAbandonmentRate.PATH = '/analytics/cartAbandonmentRate';
