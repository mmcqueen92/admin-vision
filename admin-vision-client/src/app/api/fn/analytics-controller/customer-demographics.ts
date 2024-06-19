/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface CustomerDemographics$Params {
}

export function customerDemographics(http: HttpClient, rootUrl: string, params?: CustomerDemographics$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'genderDistribution'?: Array<{
'gender'?: string;
'count'?: number;
}>;
'ageDistribution'?: Array<{
'age_group'?: string;
'count'?: number;
}>;
'locationDistribution'?: Array<{
'location'?: string;
'count'?: number;
}>;
}>> {
  const rb = new RequestBuilder(rootUrl, customerDemographics.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'genderDistribution'?: Array<{
      'gender'?: string;
      'count'?: number;
      }>;
      'ageDistribution'?: Array<{
      'age_group'?: string;
      'count'?: number;
      }>;
      'locationDistribution'?: Array<{
      'location'?: string;
      'count'?: number;
      }>;
      }>;
    })
  );
}

customerDemographics.PATH = '/analytics/customerDemographics';
