import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'sa-transaction',
  templateUrl: '../../system/templates/components/transaction.html'
})
export class TransactionComponent implements OnInit, OnDestroy {
  @Input('transaction') data;
  otpForm: FormGroup;
  $queryParam$: Subscription;
  verified;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
    this.$queryParam$ = this.route.queryParams.subscribe((data) => {
      this.verified =  data.verified;
    });
  }

  get otp() {
    return this.otpForm.get('otp');
  }

  ngOnDestroy(): void {
    this.$queryParam$.unsubscribe();
  }
}
