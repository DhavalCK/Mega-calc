import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { timer } from 'rxjs';
import { ConvertTimePeriod } from 'src/app/shared/data/time-period-convert';
import { InterestTypeEnum, TimePeriondEnum } from 'src/app/shared/enums/feature-fields.enum';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent {

  @ViewChild('resultCard') resultCard!: ElementRef;

  // fields ngModal 
  interestType: InterestTypeEnum = InterestTypeEnum.COMPOUNDING;
  initialValue: number = 10000;
  interestRate: number = 7;
  interestRateTimePeriod: TimePeriondEnum = TimePeriondEnum.MONTH;
  time: number = 1;
  timePeriod: TimePeriondEnum = TimePeriondEnum.YEAR;

  // Data variables
  futureValue: number = 0;
  interestValue: number = 0;
  totalInterestRate: number = 0;

  loading: boolean = false;

  // drop down options
  interestTypeOptions: any = [
    {
      name: 'Simple Interest',
      value: InterestTypeEnum.SIMPLE
    },
    {
      name: 'Compounding Interest',
      value: InterestTypeEnum.COMPOUNDING
    }
  ]

  timePeriodOptions: any = [
    {
      name: 'Day',
      interestName: 'Daily', 
      value: TimePeriondEnum.DAY
    },
    {
      name: 'Week',
      interestName: 'Weekly',
      value: TimePeriondEnum.WEEK
    },
    {
      name: 'Month',
      interestName: 'Monthly',
      value: TimePeriondEnum.MONTH
    },
    {
      name: 'Quarter',
      interestName: 'Quartly',
      value: TimePeriondEnum.QUARTER
    },
    {
      name: 'Year',
      interestName: 'Yearly',
      value: TimePeriondEnum.YEAR
    },
  ];
  timeFieldName: string = 'Years';
  timeFieldOptions: any = [];
  interestRateTimeFieldOptions: any = [];
  calculateBtnClick: boolean = false;
  isLoading: boolean = false;
  
  // Visual data
  public pieChart!: Chart | any;

  ngOnInit() {
    this.timePeriodOptions.map((el: any) => {
      if([TimePeriondEnum.YEAR, TimePeriondEnum.MONTH].includes(el.value)) {
        this.timeFieldOptions.push(el);
      }
    });
    this.interestRateTimeFieldOptions = [...this.timePeriodOptions];
  }

  interestTypeChange() {
    this.calculateBtnClick = false;
  }
  
  timePeriodChange(event: any, ) {
    if(event.value === TimePeriondEnum.MONTH) {
      const removeTimePeriods = [TimePeriondEnum.QUARTER, TimePeriondEnum.YEAR];
      if(removeTimePeriods.includes(this.interestRateTimePeriod)) {
        this.interestRateTimePeriod = TimePeriondEnum.MONTH;
      }
      this.interestRateTimeFieldOptions = this.timePeriodOptions.filter((el: any) => {
        return !removeTimePeriods.includes(el.value);
      });
      this.timeFieldName = 'Months';
    } else {
      this.timeFieldName = 'Years';
      this.interestRateTimeFieldOptions = [...this.timePeriodOptions];
    }
    this.recalculate();
  }

  calculateCompoundInterest(P: number, r: number, n: number, t: number) {
    // Convert annual rate to a decimal
    r = r / 100;
  
    const I = Math.pow((1 + (r / n)), n * t);
    // Calculate compound interest
    const A = P * I;
  
    return A;
  }

  calculateNthTime(): number {
    let nthValue: number = 1;
    if(this.timePeriod !== this.interestRateTimePeriod) {
      nthValue = ConvertTimePeriod[this.timePeriod][this.interestRateTimePeriod];
    }
    return nthValue;
  }

  calculate() {
    this.calculateBtnClick = true;
    this.isLoading = true;
    if(this.pieChart){
      this.pieChart.destroy();
    }
    timer(1000).subscribe(() => {
      this.calculateInterest();
    });
  } 
  
  recalculate() {
    if(this.calculateBtnClick && !this.isLoading) {
      this.calculate();
    }
  }

  calculateInterest() {
    // console.log('calculateInterest -',this.interestType, InterestTypeEnum.SIMPLE);
    // console.log('this.interestType',this.interestType);
    // console.log('this.initialValue',this.initialValue);
    // console.log('this.interestRate',this.interestRate);
    // console.log('this.interestRateTimePeriod',this.interestRateTimePeriod);
    // console.log('this.time',this.time);
    // console.log('this.timePeriod',this.timePeriod);

    if(this.interestType == InterestTypeEnum.SIMPLE) {
      const n: number = this.calculateNthTime(); // Number of times interest applied per year (monthly)
      const interestValue = (this.initialValue * this.interestRate * this.time  / 100);
      this.interestValue = interestValue * n;
      this.futureValue = this.initialValue + this.interestValue;
      this.totalInterestRate = this.interestValue * 100 / this.initialValue;

    } else if(this.interestType == InterestTypeEnum.COMPOUNDING){
      const P: number = this.initialValue;  // Principal amount ($1000)
      const r: number = this.interestRate;     // Annual interest rate (5%)
      const n: number = this.calculateNthTime(); // Number of times interest applied per year (monthly)
      const t: number = this.time;    // Number of years
      let calcValue: number = P;
      Array.from({ length: n }).forEach((_, i) => {
        calcValue = this.calculateCompoundInterest(calcValue, r, 1, t);
      });
      this.futureValue = calcValue;
      this.interestValue = this.futureValue - this.initialValue;
      this.totalInterestRate = this.interestValue * 100 / this.initialValue;
    }
    this.isLoading = false;
    this.initChart();

  }

  // Init chart
  initChart(){
    this.pieChart = new Chart("pie_Chart", {
        type: 'pie', //this denotes tha type of chart
        data: {// values on X-Axis
          labels: ['Initial Value','Interst Value', ],
          datasets: [{
            label: 'Interest Dataset',
            data: [
              this.initialValue, 
              this.interestValue
            ],
            backgroundColor: [
              '#A3D8FF',
              '#94FFD8',
            ],
            hoverOffset: 4
            }],
        },
        options: {
          aspectRatio: 1.2
        }
    });
  }

}
