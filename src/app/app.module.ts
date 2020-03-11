import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WordCategoryComponent } from './word-category/word-category.component';
import { VocabularComponent } from './vocabular/vocabular.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@angular/common';
import { LoadingIndicatorComponent } from './_helpers/loading-indicator/loading-indicator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './_helpers/material/material.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingInterceptorService } from './_helpers/loading-indicator/loading-interceptor.service';
import { LoadingIndicatorService } from './_helpers/loading-indicator/loading-indicator.service';
import { RegisteredGuard } from './auth/registered.guard';


// TODO: Loading component interacting with Router and HTTP requests (custom)

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
