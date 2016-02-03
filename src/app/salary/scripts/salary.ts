import {Component} from 'angular2/core';

@Component({
  selector: 'salary',
  template: require('../views/salary-form.html'),
  styles  : [require('../styles/salary-form.css')]
})

export class Salary {
  public grossSalary: number = 0;

}
