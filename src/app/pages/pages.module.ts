import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PAGES_ROUTES } from './pages.routes';
import { LayoutModule } from '../layout/layout.module';
import { PagesComponent } from './pages/pages.component';



@NgModule({
  declarations: [DashboardComponent, PagesComponent],
  exports: [

],
  imports: [
    CommonModule,
    LayoutModule,
    PAGES_ROUTES
  ]
})
export class PagesModule { }
