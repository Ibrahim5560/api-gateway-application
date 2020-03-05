import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IQuote, Quote } from 'app/shared/model/Quotes/quote.model';
import { QuoteService } from './quote.service';
import { QuoteComponent } from './quote.component';
import { QuoteDetailComponent } from './quote-detail.component';
import { QuoteUpdateComponent } from './quote-update.component';

@Injectable({ providedIn: 'root' })
export class QuoteResolve implements Resolve<IQuote> {
  constructor(private service: QuoteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuote> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((quote: HttpResponse<Quote>) => {
          if (quote.body) {
            return of(quote.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Quote());
  }
}

export const quoteRoute: Routes = [
  {
    path: '',
    component: QuoteComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Quotes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: QuoteDetailComponent,
    resolve: {
      quote: QuoteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Quotes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: QuoteUpdateComponent,
    resolve: {
      quote: QuoteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Quotes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: QuoteUpdateComponent,
    resolve: {
      quote: QuoteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Quotes'
    },
    canActivate: [UserRouteAccessService]
  }
];
