/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface NewUsersByMonth$Params {
}

export function newUsersByMonth(http: HttpClient, rootUrl: string, params?: NewUsersByMonth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Number of new users created for the month
 */
'newUserCount': number;
}>>> {
  const rb = new RequestBuilder(rootUrl, newUsersByMonth.PATH, 'get');
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
       * Number of new users created for the month
       */
      'newUserCount': number;
      }>>;
    })
  );
}

newUsersByMonth.PATH = '/analytics/newUsersByMonth';
