import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {classes} from '../../system/utilities/functions';
import {patternMatch} from '../../system/utilities/validators';
import {REGEX} from '../../system/utilities/constants';

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
  constructor(private fb: FormBuilder) {}

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
}
