import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from '../../components/pages/auth.component';
import {PageNotFoundComponent} from '../../components/components/page-not-found.component';

const routes: Routes = [
  {path: 'auth/:type', component: AuthComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SaRoutingModule { }
