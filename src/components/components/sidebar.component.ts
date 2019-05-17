import {Component, OnInit} from '@angular/core';
import {
  faAngleDoubleRight, faAngleDoubleLeft, faHome} from '@fortawesome/free-solid-svg-icons';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../system/state/interfaces';
import {CHANGE_SIDEBAR} from '../../system/state/actions';
import {ActivatedRoute, Router} from '@angular/router';
import {transactions} from '../../system/utilities/transactions';

@Component({
  selector: 'sa-sidebar',
  templateUrl: '../../system/templates/components/sidebar.html'
})
export class SidebarComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faHome = faHome;
  transactions = transactions;
  expanded = false;
  sideBarClasses = {
    'expanded': this.expanded,
    'collapsed': !this.expanded
  };
  type;

  constructor(private ngRedux: NgRedux<IAppState>,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((data: any) => {
      this.type = data.params.type;
    });
  }

  toggle() {
    this.expanded = !this.expanded;
    this.sideBarClasses = {
      'expanded': this.expanded,
      'collapsed': !this.expanded
    };
    this.ngRedux.dispatch({type: CHANGE_SIDEBAR, sidebar: this.expanded ? 'expanded' : 'collapsed'});
  }

  navigate(type) {
    this.router.navigate(['/dashboard', type]);
  }
}
