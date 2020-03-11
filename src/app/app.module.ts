import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './_helpers/material/material.module';

import { RegisteredGuard } from './auth/registered.guard';
import { AuthModule } from './auth/auth.module';

import { LoadingInterceptorService } from './_helpers/loading-indicator/loading-interceptor.service';
import { LoadingIndicatorComponent } from './_helpers/loading-indicator/loading-indicator.component';

import { AppComponent } from './app.component';
import { WordCategoryComponent } from './word-category/word-category.component';
import { VocabularComponent } from './vocabular/vocabular.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    WordCategoryComponent,
    VocabularComponent,
    ToolbarComponent,
    DashboardComponent,
    LoadingIndicatorComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AuthModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    RegisteredGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
