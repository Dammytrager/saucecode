import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../system/state/interfaces';
import {CHANGE_ROUTE} from 'src/system/state/actions';

@Component({
  selector: 'sa-root',
  templateUrl: '../system/templates/sa-container.html'
})
export class SaComponent implements OnInit{
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
      }
    });
  }
}
