import {AbstractControl} from '@angular/forms';

export  function classes(control: AbstractControl) {
  return {
    'text-green': control.valid || control.untouched,
    'text-red': control.invalid && control.touched
  };
}
