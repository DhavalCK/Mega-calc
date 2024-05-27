import { Component, ElementRef, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { ReturnTypeEnum } from 'src/app/shared/enums/feature-fields.enum';

@Component({
    selector: 'app-return-percent',
    templateUrl: './return-percent.component.html',
    styleUrls: ['./return-percent.component.scss'],
})
export class ReturnPercentComponent {
    @ViewChild('percentageValueEl') percentageValueEl: any;
    @ViewChild('totalValueEl') totalValueEl: any;
    @ViewChild('interestValueEl') interestValueEl: any;

    loading: boolean = false;

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
    returnType: ReturnTypeEnum = ReturnTypeEnum.PERCENTAGE;
    currentValue: number = 100;
    targetValue: number = 110;
    percentage: number = 0;

    // Show card based on flag
    percentageCalculated: boolean = false;
    targetValueCalculated: boolean = false;

    // Value data
    percentageValue: number = 0;
    interestValue: number = 0;
    totalValue: number = 0;

    selectedReturnType: ReturnTypeEnum = ReturnTypeEnum.PERCENTAGE;
    preCurrentValue: number = 100;

    constructor(private elRef: ElementRef) {}

    ngOnInit() {}

    calculate() {
        this.loading = true;
        if (ReturnTypeEnum.PERCENTAGE === this.returnType) {
            const valueDiff = this.targetValue - this.currentValue;
            this.percentageValue = (valueDiff / this.currentValue) * 100;
            this.percentageCalculated = true;
            setTimeout(() => {
                this.displayValue(
                    this.percentageValueEl.nativeElement,
                    this.percentageValue
                );
            }, 0);
        } else if (ReturnTypeEnum.TARGET_VALUE === this.returnType) {
            const interest = (this.percentage / 100) * this.currentValue;
            this.totalValue = interest + this.currentValue;
            this.interestValue = interest;
            this.targetValueCalculated = true;
            setTimeout(() => {
                this.displayValue(
                    this.interestValueEl.nativeElement,
                    this.interestValue
                );
                this.displayValue(
                    this.totalValueEl.nativeElement,
                    this.totalValue
                );
            }, 0);
        }
    }

    returnTypeChange(event: any): void {
        if (this.selectedReturnType !== this.returnType) {
            this.percentageCalculated = false;
            this.targetValueCalculated = false;
            this.selectedReturnType = event.value;

            const oldCurrentValue = this.currentValue;
            this.currentValue = this.preCurrentValue;
            this.preCurrentValue = oldCurrentValue;
        }
    }

    displayValue(element: any, finalValue: number) {
        const incrementValue: number = this.roundToTwoDigits(finalValue / 50);
        let displayValue: number = 0;
        let isPositive: boolean = finalValue >= 0;
        element.textContent = 0;
        let id = setInterval(() => {
            if (
                (isPositive && displayValue < finalValue) ||
                (!isPositive && displayValue > finalValue)
            ) {
                displayValue = this.roundToTwoDigits(
                    displayValue + incrementValue
                );
                element.textContent = displayValue;
            } else {
                this.loading = false;
                clearInterval(id);
            }
        }, 10);
    }

    roundToTwoDigits(numericValue: number) {
        return Number(numericValue.toFixed(2));
    }
}
