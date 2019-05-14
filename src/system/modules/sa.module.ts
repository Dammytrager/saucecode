import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SaRoutingModule } from './sa-routing.module';
import { SaComponent } from '../../components/sa.component';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../state/interfaces';
import {reducerApp} from '../state/store';
import {INITIAL_STATE} from '../state/store';
import {DevToolsExtension} from '@angular-redux/store';
import {StoreEnhancer} from 'redux';
import {environment} from '../../environments/environment';
import {AuthComponent} from '../../components/pages/auth.component';
import {SigninComponent} from '../../components/components/signin.component';
import {SignupComponent} from '../../components/components/signup.component';
import {PageNotFoundComponent} from '../../components/components/page-not-found.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SaComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SaRoutingModule,
    NgReduxModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [SaComponent]
})
export class SaModule {
  constructor(private ngredux: NgRedux<IAppState>,
              private reduxDevTools: DevToolsExtension) {
    const enhancers: StoreEnhancer<IAppState>[] = (this.reduxDevTools.isEnabled() && !environment.production)
      ? [this.reduxDevTools.enhancer()] : [];

    ngredux.configureStore(reducerApp, INITIAL_STATE, [], enhancers);
  }
}
