import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {patternMatch} from '../../system/utilities/validators';
import {REGEX} from '../../system/utilities/constants';
import {classes} from '../../system/utilities/functions';

@Component({
  selector: 'sa-signin',
  templateUrl: '../../system/templates/components/signin.html'
})
export class SigninComponent {
  signinForm = this.fb.group({
    email: ['', [Validators.required, patternMatch(REGEX.EMAIL)]],
    password: ['', Validators.required]
  });
  classes = classes;
  constructor(private fb: FormBuilder) {}

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }
}
