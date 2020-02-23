import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiGatewayApplicationSharedModule } from 'app/shared/shared.module';

import { GatewayComponent } from './gateway.component';

import { gatewayRoute } from './gateway.route';

@NgModule({
  imports: [ApiGatewayApplicationSharedModule, RouterModule.forChild([gatewayRoute])],
  declarations: [GatewayComponent]
})
export class GatewayModule {}
