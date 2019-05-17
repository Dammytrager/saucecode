import {AbstractControl} from '@angular/forms';

export  function classes(control: AbstractControl) {
  return {
    'text-green': control.valid,
    'text-red': control.invalid && control.dirty
  };
}
