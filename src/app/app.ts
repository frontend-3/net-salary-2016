import {Component} from 'angular2/core';
import {SalaryComponent} from './salary/scripts/salary.component';

@Component({
  selector    : 'app',
  template    : '<salary></salary>',
  directives  : [SalaryComponent]
})

export class App {

}
