import {AbstractControl} from '@angular/forms';

export  function classes(control: AbstractControl) {
  return {
    'text-green': control.valid,
    'text-red': control.invalid && (control.dirty || control.touched)
  };
}
// http://arduino.esp8266.com/stable/package_esp8266com_index.json;
