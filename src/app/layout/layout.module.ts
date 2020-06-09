import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
      BreadcrumbComponent,
      FooterComponent,
      HeaderComponent,
      SidebarComponent,
      LoadingComponent,
   ], exports: [
      BreadcrumbComponent,
      FooterComponent,
      HeaderComponent,
      SidebarComponent,
      LoadingComponent,
  ], imports: [
    RouterModule,
    CommonModule,
    PipesModule
],

})
export class LayoutModule { }
