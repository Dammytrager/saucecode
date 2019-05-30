import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'sa-auth',
  templateUrl: '../../system/templates/pages/auth.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  $route$: Subscription;
  $queryParam$: Subscription;
  email;
  authType;
  token;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    this.$route$ = this.route.paramMap.subscribe((data: any) => {
      this.authType = data.params.type;
    });
    this.$queryParam$ = this.route.queryParams.subscribe((data) => {
      this.email = data.email;
      this.token = data.token;
    });
  }

  ngOnDestroy() {
    this.$route$.unsubscribe();
  }

}
