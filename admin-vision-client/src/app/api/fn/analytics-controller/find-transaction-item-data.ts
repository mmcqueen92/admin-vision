/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface FindTransactionItemData$Params {
  limit?: number;
  skip?: number;
  sort?: string;
  monthsBack?: number;
}

export function findTransactionItemData(http: HttpClient, rootUrl: string, params?: FindTransactionItemData$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<{
'id': number;
'name': string;
'totalRevenue': number;
'totalUnitsSold': number;
}>>> {
  const rb = new RequestBuilder(rootUrl, findTransactionItemData.PATH, 'get');
  if (params) {
    rb.query('limit', params.limit, {});
    rb.query('skip', params.skip, {});
    rb.query('sort', params.sort, {});
    rb.query('monthsBack', params.monthsBack, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<{
      'id': number;
      'name': string;
      'totalRevenue': number;
      'totalUnitsSold': number;
      }>>;
    })
  );
}

findTransactionItemData.PATH = '/analytics/transactionItemData';
