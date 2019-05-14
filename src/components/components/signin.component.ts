import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'sa-signin',
  templateUrl: '../../system/templates/components/signin.html'
})
export class SigninComponent {
  signinForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder) {}
}
