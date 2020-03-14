import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WordCategoryComponent } from './word-category/word-category.component';
import { VocabularComponent } from './vocabular/vocabular.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RegisteredGuard } from './auth/registered.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/users'
  },
  {
    path: 'signIn',
    component: SignInComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [RegisteredGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [RegisteredGuard]
  },
  {
    path: 'category',
    component: WordCategoryComponent
  },
  {
    path: 'category/:id',
    component: VocabularComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
