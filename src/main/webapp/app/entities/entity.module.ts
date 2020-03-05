import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'quote',
        loadChildren: () => import('./Quotes/quote/quote.module').then(m => m.ApiGatewayApplicationQuoteModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ApiGatewayApplicationEntityModule {}
