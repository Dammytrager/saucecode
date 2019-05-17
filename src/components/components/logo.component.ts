import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sa-logo',
  templateUrl: '../../system/templates/components/logo.html'
})
export class LogoComponent implements OnInit {
  @Input() data;
  _dataDefault = {
    align: 'center',
    color: 'white'
  };
  classes;

  ngOnInit(): void {
    this.data = {...this._dataDefault, ...this.data};
    this.classes = {
      'text-center': this.data.align === 'center',
      'text-left': this.data.align === 'left',
      'text-right': this.data.align === 'right',
      'text-white': this.data.color === 'white',
      'text-green': this.data.color === 'green'
    };
  }
}
