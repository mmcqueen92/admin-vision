/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindAllItemsTransactionData$Params {
  monthsBack?: number;
}

export function findAllItemsTransactionData(http: HttpClient, rootUrl: string, params?: FindAllItemsTransactionData$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
  const rb = new RequestBuilder(rootUrl, findAllItemsTransactionData.PATH, 'get');
  if (params) {
    rb.query('monthsBack', params.monthsBack, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<any>;
    })
  );
}

findAllItemsTransactionData.PATH = '/analytics/findAllItemsTransactionData';
