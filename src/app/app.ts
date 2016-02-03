import {Component} from 'angular2/core';
import {Salary} from './salary/scripts/salary';

@Component({
  selector    : 'app',
  template    : '<salary></salary>',
  directives  : [Salary]
})

export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Net Salary 2016';
  url = 'https://twitter.com/frontend_3';
  constructor() {

  }
}
