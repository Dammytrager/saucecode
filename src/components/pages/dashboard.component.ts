import {Component, OnDestroy, OnInit} from '@angular/core';
import {transactionlist, transactions} from '../../system/utilities/transactions';
import {ActivatedRoute, Router} from '@angular/router';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'sa-dashboard',
  templateUrl: '../../system/templates/pages/dashboard.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  @select('sidebar') sidebar$: Observable<string>;
  $sidebar$: Subscription;
  sidebar;
  faSignOutAlt = faSignOutAlt;
  transactions = transactions;
  transactionList = transactionlist;
  transaction;

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.$sidebar$ = this.sidebar$.subscribe((data) => {
      this.sidebar = data;
    });
    this.checkTransaction();
  }

  navigate(route?, main?) {
    main = main ? main : '/dashboard';
    this.router.navigate([main, route]);
  }

  checkTransaction() {
    this.route.paramMap.subscribe((data: any) => {
      this.transaction = data.params.type;
    });
  }

  ngOnDestroy() {
    this.$sidebar$.unsubscribe();
  }
}
