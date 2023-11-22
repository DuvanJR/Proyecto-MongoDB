import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyToolbarComponent } from 'src/app/pages/home/toolbar/my-toolbar.component';
import { SharedModule } from './shared/shared.module';
import { ContenedorComponentComponent } from './ContenedorComponent/ContenedorComponent.component';
import { HomeComponent } from './pages/home/home.component';
import { SeeDetailsComponent } from './pages/see-details/see-details.component';
import { FilterComponent } from './shared/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    MyToolbarComponent,
    ContenedorComponentComponent,
    HomeComponent,
    SeeDetailsComponent,
    FilterComponent,

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
