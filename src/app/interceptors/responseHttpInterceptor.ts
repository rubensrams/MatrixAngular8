import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { catchError  } from 'rxjs/operators';
import { OauthService } from '../services/oauth.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Toast } from '../config/config';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class ResponseHttpInterceptor implements HttpInterceptor {

    constructor(public oaut: OauthService, private router: Router) {

    }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      console.log('ResponseHttpInterceptor--> respuesta');
      return next.handle(req).pipe(
          catchError(err => {
            if (err.status === 401 || err.status === 403 ) {
              this.oaut.logout();
              this.router.navigate(['/login']);
              Toast.fire({
                icon: 'success',
                title: 'Su sesión ha expirado. Por favor haga login nuevamente'
              });
            }
            return throwError(err);
          })
        );
  }
}