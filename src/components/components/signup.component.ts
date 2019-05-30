import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {classes} from '../../system/utilities/functions';
import {patternMatch} from '../../system/utilities/validators';
import {REGEX} from '../../system/utilities/constants';
import {Loader} from '../../system/interfaces/loader';
import {HttpService} from '../../system/services/http.service';
import {Router} from '@angular/router';
import {Toast, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'sa-signup',
  templateUrl: '../../system/templates/components/signup.html'
})
export class SignupComponent {
  signupForm = this.fb.group({
    email: ['', [Validators.required, patternMatch(REGEX.EMAIL)]],
    phone_no: ['', [Validators.required, patternMatch(REGEX.PHONE)]],
    fullname: ['', Validators.required],
    password: ['', [Validators.minLength(6), Validators.required]],
  });
  classes = classes;
  showLoader = false;
  loaderData: Loader = {
    color: 'white',
    type: 2
  };

  constructor(private fb: FormBuilder,
              private http: HttpService,
              private router: Router,
              private toast: ToastrService) {}

  get email() {
    return this.signupForm.get('email');
  }
  get phone_no() {
    return this.signupForm.get('phone_no');
  }
  get fullname() {
    return this.signupForm.get('fullname');
  }
  get password() {
    return this.signupForm.get('password');
  }

  signup() {
    if (this.signupForm.valid) {
      this.showLoader = true;
      const signupData = {
        first_name: this.fullname.value.split(' ')[1] || '',
        surname: this.fullname.value.split(' ')[0],
        email: this.email.value,
        phone_number: this.phone_no.value,
        password: this.password.value
      };
      console.log(signupData);
      this.http.post('https://saucecode.herokuapp.com/auth/signup', signupData).then((data: any) => {
        if (data.message === 'new user registered') {
          this.router.navigate(['/auth', 'activate-account'], {
            queryParams: {
              email: signupData.email
            }
          });
        }
        else if (data.message === 'user already exists with the email provided') {
          this.toast.error(data.message);
          console.log(data.message);
        }
      }).catch(err => {
        this.toast.error('sign up failed');
      }).finally(() => {
        this.showLoader = false;
      });
    }
  }
}
