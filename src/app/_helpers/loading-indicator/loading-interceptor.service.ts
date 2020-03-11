import { Injectable } from '@angular/core';
import { LoadingIndicatorService } from './loading-indicator.service';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor {

  constructor(private loadingService: LoadingIndicatorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loadingService.show();

    return next.handle(req)
      .pipe(
        finalize(() => this.loadingService.hide())
      );

  }

}
