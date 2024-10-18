import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreLoaderComponent } from './pages/pre-loader/pre-loader.component';
import { HomeModule } from './pages/home/home.module';
import { NavbarModule } from './shared/navbar/navbar.module';

@NgModule({
  declarations: [
    AppComponent,
    PreLoaderComponent,
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
