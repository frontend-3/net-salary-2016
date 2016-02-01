import {Component, Input} from 'angular2/core';
import {TaxComponent} from './tax.component';
import {Scale} from '../../scale/scripts/scale';

@Component({
  selector: 'tax-detail-component',
  template: require('../views/tax-detail.html')
})

export class TaxDetail {
  public scale: Scale;
  public tax: TaxComponent;
  public prevTaxDetail: TaxDetail;
  public amountAfected: number;
  public acumulateAmount: number;
  @Input('tax-detail') taxDetail: TaxDetail;

  public calculateAmountAfected() {
    let restAmountAfected = this.tax.incomeByYear;
    let acumulateAmountAfected = 0;
    let amount = 0;
    let  maxAmountAfected = (this.scale.topScale - this.scale.bottomScale) * this.tax.UIT;

    if (this.prevTaxDetail) {
      restAmountAfected = this.tax.incomeByYear - this.prevTaxDetail.acumulateAmount;
      amount = restAmountAfected;
    }

    if (restAmountAfected === 0) {
      amount = 0;
    }

    if (restAmountAfected > maxAmountAfected) {
      amount = maxAmountAfected;
    }
    this.amountAfected = amount;
  }

  public calculateAcumulateAmount() {
    let acumulateAmount = this.amountAfected;

    if (this.prevTaxDetail) {
      acumulateAmount = this.prevTaxDetail.acumulateAmount + this.amountAfected;
    }

    this.acumulateAmount = acumulateAmount;
  }

  public get totalTax(): number {
    return this.amountAfected * this.scale.percent;
  }

}
