/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { sendNewsletter } from '../fn/newsletter-controller/send-newsletter';
import { SendNewsletter$Params } from '../fn/newsletter-controller/send-newsletter';

@Injectable({ providedIn: 'root' })
export class NewsletterControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `newsletterControllerSendNewsletter()` */
  static readonly NewsletterControllerSendNewsletterPath = '/send-newsletter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendNewsletter()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendNewsletter$Response(params?: SendNewsletter$Params, context?: HttpContext): Observable<StrictHttpResponse<any>> {
    return sendNewsletter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `sendNewsletter$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  sendNewsletter(params?: SendNewsletter$Params, context?: HttpContext): Observable<any> {
    return this.sendNewsletter$Response(params, context).pipe(
      map((r: StrictHttpResponse<any>): any => r.body)
    );
  }

}
