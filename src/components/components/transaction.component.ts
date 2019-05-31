import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {HttpService} from '../../system/services/http.service';
import {select} from '@angular-redux/store';
import {OTPService} from '../../system/services/OTP.service';
import {Loader} from '../../system/interfaces/loader';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'sa-transaction',
  templateUrl: '../../system/templates/components/transaction.html'
})
export class TransactionComponent implements OnInit, OnDestroy {
  @Input('transaction') data;
  @select('user') user$: Observable<any>;
  $user$: Subscription;
  user;
  otpForm: FormGroup;
  $queryParam$: Subscription;
  verified: string;
  otpUrl = 'https://saucecode.herokuapp.com/auth/send_otp';
  resend = false;
  showLoader = false;
  loaderData: Loader = {
    color: 'white',
    type: 2
  };

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private http: HttpService,
              private _otp: OTPService,
              private toast: ToastrService) {
    // this.$queryParam$ = this.route.queryParams.subscribe((data) => {
    //   this.verified =  data.verified;
    // });
    this.$user$ = this.user$.subscribe((data) => {
      this.user =  data;
    });
  }

  ngOnInit() {
    this.resend = false;
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    });
  }

  get otp() {
    return this.otpForm.get('otp');
  }

  sendOtp() {
    this.resend = true;
    this.http.setHeaders({token: this.user.token});
    this.http.post(this.otpUrl, {}).finally(() => {
      this.resend = false;
    });
  }

  verifyOtp() {
    this.showLoader = true;
    this._otp.verifyOtp(this.otp.value).then((data: any) => {
      if (data.message === 'Invalid token') {
        this.verified = 'false';
      }
      else if (data.message === 'verified') {
        this.verified = 'true';
      }
      }).catch((err) => {
        this.toast.error('Unable to Verify. Try again');
    }).finally(() => {
      this.showLoader = false;
    });
  }

  ngOnDestroy(): void {
    // this.$queryParam$.unsubscribe();
    this.$user$.unsubscribe();
  }
}
