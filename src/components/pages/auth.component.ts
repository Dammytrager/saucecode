import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'sa-auth',
  templateUrl: '../../system/templates/pages/auth.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  $route$: Subscription;
  authType;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    this.$route$ = this.route.paramMap.subscribe((data: any) => {
      this.authType = data.params.type;
    });
  }

  ngOnDestroy() {
    this.$route$.unsubscribe();
  }

}
