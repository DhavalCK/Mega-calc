import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { ReturnTypeEnum } from 'src/app/shared/enums/feature-fields.enum';

@Component({
  selector: 'app-return-percent',
  templateUrl: './return-percent.component.html',
  styleUrls: ['./return-percent.component.scss']
})
export class ReturnPercentComponent {

  ReturnTypeEnum = ReturnTypeEnum;
  returnOptions = [
    {
      name: 'Percentage(%)',
      value: ReturnTypeEnum.PERCENTAGE,
    },
    {
      name: 'Target value',
      value: ReturnTypeEnum.TARGET_VALUE,
    },
  ];

  // Fields ngModel
  returnType: ReturnTypeEnum =  ReturnTypeEnum.PERCENTAGE;
  currentValue: number = 100;
  targetValue: number= 110;
  percentage: number= 0;
  
  // Show card based on flag
  percentageCalculated: boolean = false;
  targetValueCalculated: boolean = false;
  
  // Value data
  percentageValue: number = 0;
  interestValue: number = 0;
  totalValue: number = 0;

  selectedReturnType: ReturnTypeEnum = ReturnTypeEnum.PERCENTAGE;
  preCurrentValue: number = 100;

  ngOnInit() {
  }

  calculate() {
    if(ReturnTypeEnum.PERCENTAGE === this.returnType) {
      const valueDiff = this.targetValue - this.currentValue;
      this.percentageValue = ( valueDiff / this.currentValue ) * 100;
      this.percentageCalculated = true;
    } else if(ReturnTypeEnum.TARGET_VALUE === this.returnType) {
      const interest = (this.percentage / 100 ) * this.currentValue; 
      this.totalValue = interest  + this.currentValue; 
      this.interestValue = interest;
      this.targetValueCalculated = true;
    }
  }

  returnTypeChange(event: any): void {
    if(this.selectedReturnType !== this.returnType) {
      this.percentageCalculated = false;
      this.targetValueCalculated = false;
      this.selectedReturnType = event.value;

      const oldCurrentValue = this.currentValue;
      this.currentValue = this.preCurrentValue;
      this.preCurrentValue = oldCurrentValue;
    }
  }
}
