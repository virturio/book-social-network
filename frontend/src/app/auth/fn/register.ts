/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../shared/strict-http-response';
import { RequestBuilder } from '../../shared/request-builder';

import { UserRegisterRequest } from '../types/user-register-request';

export interface Register$Params {
  body: UserRegisterRequest;
}

export function register(
  http: HttpClient,
  rootUrl: string,
  params: Register$Params,
  context?: HttpContext
): Observable<StrictHttpResponse<{}>> {
  const rb = new RequestBuilder(rootUrl, register.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http
    .request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    )
    .pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{}>;
      })
    );
}

register.PATH = '/auth/register';
