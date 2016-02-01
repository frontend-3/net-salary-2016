import {Component} from 'angular2/core';
import {TaxComponent} from './tax/scripts/tax.component';
import {TaxDetailService} from './tax/scripts/tax.detail.service';
import {ScaleService} from './scale/scripts/scale.service';

@Component({
  selector: 'app',
  directives: [TaxComponent],
  template: '<tax-component></tax-component>',
  providers: [TaxDetailService]
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Net Salary 2016';
  url = 'https://twitter.com/frontend_3';
  constructor() {

  }
}
