import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OTPService {
  @select('user') user$: Observable<any>;
  $user$: Subscription;
  user;
  otpUrl = 'https://saucecode.herokuapp.com/auth/send_otp';
  verifyOtpUrl = 'https://saucecode.herokuapp.com/auth/verify_otp?otp=';


  constructor(private http: HttpService) {
    this.$user$ = this.user$.subscribe((data) => {
      this.user = data;
    });
  }

  sendOtp(first?: boolean) {
    this.http.setHeaders({token: this.user.token});
    this.http.post(this.otpUrl, {}).finally(() => {
    });
  }

  verifyOtp(otp) {
    this.http.setHeaders({token: this.user.token});
    return this.http.get(this.verifyOtpUrl + otp);
  }
}


