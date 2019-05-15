import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sa-loader',
  templateUrl: '../../system/templates/components/loader.html'
})
export class LoaderComponent implements OnInit {
  @Input() data;
  _dataDefaults = {
    type: 1,
    color: 'green',
    size: '1x'
  };

  constructor() { }

  ngOnInit() {
    this.data = {...this._dataDefaults, ...this.data};
  }
}
