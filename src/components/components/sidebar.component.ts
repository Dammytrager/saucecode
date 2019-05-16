import {Component, OnInit} from '@angular/core';
import {
  faBroadcastTower,
  faDesktop,
  faMicrochip,
  faDatabase,
  faAngleDoubleRight,
  faAngleDoubleLeft, faHome
} from '@fortawesome/free-solid-svg-icons';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../system/state/interfaces';
import {CHANGE_SIDEBAR} from '../../system/state/actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'sa-sidebar',
  templateUrl: '../../system/templates/components/sidebar.html'
})
export class SidebarComponent implements OnInit{
  faBroadcastTower = faBroadcastTower;
  faDesktop = faDesktop;
  faMicrochip = faMicrochip;
  faDatabase = faDatabase;
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faHome = faHome;
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
      console.log(data.params.type);
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
