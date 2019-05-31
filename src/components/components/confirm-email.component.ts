import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../system/services/http.service';
import {Subscription} from 'rxjs';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../system/state/interfaces';
import {CHANGE_SIGNED_IN, CHANGE_USER} from '../../system/state/actions';
import {Loader} from '../../system/interfaces/loader';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'sa-confirm-email',
  templateUrl: '../../system/templates/components/confirm-email.html'
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  $queryParam$: Subscription;
  token: string;
  activateUrl = 'https://saucecode.herokuapp.com/auth/confirm_email?token=';
  activated = false;
  showLoader = true;
  login = false;
  loaderData: Loader = {
    type: 3,
    color: 'white',
    size: '2x'
  };

  constructor(private router: Router,
              private http: HttpService,
              private route: ActivatedRoute,
              private ngRedux: NgRedux<IAppState>,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.$queryParam$ = this.route.queryParams.subscribe((data) => {
      this.token = data.token;
    });
    this.http.get(this.activateUrl + this.token).then((data: any) => {
      if (data.message === 'You have confirmed your account. Thanks!') {
        this.activated = true;
        this.ngRedux.dispatch({type: CHANGE_USER, user: data.data});
      }
      else if (data.message === 'Account already confirmed. Please login') {
        this.login = true;
      }
    }).catch((err) => {
      this.toast.error('Invalid key');
    }).finally(() => {
      this.showLoader = false;
    });
  }

  navigate(route, param?) {
    this.ngRedux.dispatch({type: CHANGE_SIGNED_IN, signedIn: true});
    this.router.navigate([route, param]);
  }

  ngOnDestroy(): void {
    this.$queryParam$.unsubscribe();
  }
}
