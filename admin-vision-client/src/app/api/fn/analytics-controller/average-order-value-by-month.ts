/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface AverageOrderValueByMonth$Params {
}

export function averageOrderValueByMonth(http: HttpClient, rootUrl: string, params?: AverageOrderValueByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Average order value for the month
 */
'averageOrderValue': number;
}>>> {
  const rb = new RequestBuilder(rootUrl, averageOrderValueByMonth.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      
      /**
       * Month in the format YYYY-MM
       */
      'month': string;
      
      /**
       * Average order value for the month
       */
      'averageOrderValue': number;
      }>>;
    })
  );
}

averageOrderValueByMonth.PATH = '/analytics/averageOrderValueByMonth';
