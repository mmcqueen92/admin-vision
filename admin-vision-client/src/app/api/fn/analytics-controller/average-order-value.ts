/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AverageOrderValue$Params {
}

export function averageOrderValue(http: HttpClient, rootUrl: string, params?: AverageOrderValue$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'averageOrderValue'?: number;
}>> {
  const rb = new RequestBuilder(rootUrl, averageOrderValue.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'averageOrderValue'?: number;
      }>;
    })
  );
}

averageOrderValue.PATH = '/analytics/averageOrderValue';
