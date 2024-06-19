/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TrafficSources } from '../../models/traffic-sources';

export interface TrafficSources$Params {
}

export function trafficSources(http: HttpClient, rootUrl: string, params?: TrafficSources$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TrafficSources>>> {
  const rb = new RequestBuilder(rootUrl, trafficSources.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TrafficSources>>;
    })
  );
}

trafficSources.PATH = '/analytics/trafficSources';
