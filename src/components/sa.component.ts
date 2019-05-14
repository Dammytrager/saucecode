import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../system/state/interfaces';
import {CHANGE_ROUTE} from 'src/system/state/actions';

@Component({
  selector: 'sa-root',
  templateUrl: '../system/templates/sa-container.html'
})
export class SaComponent implements OnInit {
  constructor(
    private _router: Router,
    private _ngRedux: NgRedux<IAppState>,
  ) {}

  ngOnInit(): void {
    this.setRoute();
  }

  setRoute() {
    this._router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        this._ngRedux.dispatch({
          type: CHANGE_ROUTE,
          route: data.urlAfterRedirects
        });
        this.autoNavigate(data.urlAfterRedirects);
      }
    });
  }

  autoNavigate(route) {
    if (route === '/') {
      this._router.navigate(['/auth', 'signin']);
    }
  }
}
