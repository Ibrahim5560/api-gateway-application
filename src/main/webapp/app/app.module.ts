import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ApiGatewayApplicationSharedModule } from 'app/shared/shared.module';
import { ApiGatewayApplicationCoreModule } from 'app/core/core.module';
import { ApiGatewayApplicationAppRoutingModule } from './app-routing.module';
import { ApiGatewayApplicationHomeModule } from './home/home.module';
import { ApiGatewayApplicationEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ApiGatewayApplicationSharedModule,
    ApiGatewayApplicationCoreModule,
    ApiGatewayApplicationHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ApiGatewayApplicationEntityModule,
    ApiGatewayApplicationAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class ApiGatewayApplicationAppModule {}
