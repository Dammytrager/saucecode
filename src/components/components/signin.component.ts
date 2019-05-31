import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {patternMatch} from '../../system/utilities/validators';
import {REGEX} from '../../system/utilities/constants';
import {classes} from '../../system/utilities/functions';
import {Loader} from '../../system/interfaces/loader';
import {HttpService} from '../../system/services/http.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../system/state/interfaces';
import {CHANGE_SIGNED_IN, CHANGE_USER} from '../../system/state/actions';

@Component({
  selector: 'sa-signin',
  templateUrl: '../../system/templates/components/signin.html'
})
export class SigninComponent {
  loaderData: Loader = {
    color: 'white',
    type: 2
  };
  showLoader = false;
  signinForm = this.fb.group({
    email: ['', [Validators.required, patternMatch(REGEX.EMAIL)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  classes = classes;
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private toast: ToastrService,
              private router: Router,
              private ngRedux: NgRedux<IAppState>) {}

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  signin() {
    if (this.signinForm.valid) {
      this.showLoader = true;
      const signinData = this.signinForm.value;
      this.http.post('https://saucecode.herokuapp.com/auth/login', signinData).then((data: any) => {
        if (data.message === 'user signed in') {
          this.ngRedux.dispatch({type: CHANGE_USER, user: data.data});
          this.ngRedux.dispatch({type: CHANGE_SIGNED_IN, signedIn: true});
          this.router.navigate(['/dashboard', 'home']);
        }
        else if (data.message === 'please click link sent to your mail to confirm your account') {
          this.router.navigate(['/auth', 'activate-account'], {
            queryParams: {
              email: signinData.email
            }
          });
        }
        else if (data.message === `User with this email ${this.email.value} doesn\'t exist`) {
          this.toast.error(data.message, 'Invalid Login');
        }
        else if (data.message === `password is incorrect`) {
          this.toast.error(data.message, 'Invalid Login');
        }
      }).catch(err => {
        this.toast.error('sign in failed');
      }).finally(() => {
        this.showLoader = false;
      });
    }
  }
}
