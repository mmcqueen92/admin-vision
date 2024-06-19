/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindMonthlyConversionRates$Params {
}

export function findMonthlyConversionRates(http: HttpClient, rootUrl: string, params?: FindMonthlyConversionRates$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{

/**
 * Month in the format YYYY-MM
 */
'month': string;

/**
 * Conversion rate for the month
 */
'conversionRate': number;
}>>> {
  const rb = new RequestBuilder(rootUrl, findMonthlyConversionRates.PATH, 'get');
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
       * Conversion rate for the month
       */
      'conversionRate': number;
      }>>;
    })
  );
}

findMonthlyConversionRates.PATH = '/analytics/monthlyConversionRates';
