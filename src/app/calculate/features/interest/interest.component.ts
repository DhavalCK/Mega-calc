import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TabViewChangeEvent } from 'primeng/tabview/tabview.interface';
import { Subscription, timer } from 'rxjs';
import { ConvertTimePeriod } from 'src/app/shared/data/time-period-convert';
import {
    InterestTypeEnum,
    TimePeriondEnum,
} from 'src/app/shared/enums/feature-fields.enum';

enum activeTabIndexEnum {
    CHART = 0,
    TABLE = 1,
}
@Component({
    selector: 'app-interest',
    templateUrl: './interest.component.html',
    styleUrls: ['./interest.component.scss'],
})
export class InterestComponent implements OnInit, OnDestroy {
    @ViewChild('resultCard') resultCard!: ElementRef;
    percentageFormat = {
        symbol: '%',
        position: 'LAST',
    };

    // fields ngModal
    interestType: InterestTypeEnum = InterestTypeEnum.COMPOUNDING;
    activeTabIndex = activeTabIndexEnum.CHART;

    initialValue: number = 10000;
    interestRate: number = 10;
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
            value: InterestTypeEnum.SIMPLE,
        },
        {
            name: 'Compounding Interest',
            value: InterestTypeEnum.COMPOUNDING,
        },
    ];

    timePeriodOptions: any = [
        {
            name: 'Day',
            interestName: 'Daily',
            value: TimePeriondEnum.DAY,
        },
        {
            name: 'Week',
            interestName: 'Weekly',
            value: TimePeriondEnum.WEEK,
        },
        {
            name: 'Month',
            interestName: 'Monthly',
            value: TimePeriondEnum.MONTH,
        },
        {
            name: 'Quarter',
            interestName: 'Quartly',
            value: TimePeriondEnum.QUARTER,
        },
        {
            name: 'Year',
            interestName: 'Yearly',
            value: TimePeriondEnum.YEAR,
        },
    ];
    timeFieldName: string = 'Years';
    timeFieldOptions: any = [];
    interestRateTimeFieldOptions: any = [];
    calculateBtnClick: boolean = false;
    isLoading: boolean = false;
    isTableLoading: boolean = false;
    timerSubscription!: Subscription;

    // Visual data
    public pieChart!: Chart | any;

    // Table
    tableData: any = [];
    initTableData: any = [];
    breakdownOptions: any = [];
    breakdown: TimePeriondEnum = TimePeriondEnum.YEAR;

    ngOnInit() {
        this.timePeriodOptions.map((el: any) => {
            if (
                [TimePeriondEnum.YEAR, TimePeriondEnum.MONTH].includes(el.value)
            ) {
                this.timeFieldOptions.push(el);
            }
        });
        this.interestRateTimeFieldOptions = [...this.timePeriodOptions];
        this.setBreakdownOptions();
        this.calculate();
    }

    // Field value change Functions
    interestTypeChange() {
        this.calculateBtnClick = false;
    }

    timePeriodChange(event: any) {
        if (event.value === TimePeriondEnum.MONTH) {
            const removeTimePeriods = [
                TimePeriondEnum.QUARTER,
                TimePeriondEnum.YEAR,
            ];
            if (removeTimePeriods.includes(this.interestRateTimePeriod)) {
                this.interestRateTimePeriod = TimePeriondEnum.MONTH;
            }
            this.interestRateTimeFieldOptions = this.timePeriodOptions.filter(
                (el: any) => {
                    return !removeTimePeriods.includes(el.value);
                }
            );
            this.timeFieldName = 'Months';
        } else {
            this.timeFieldName = 'Years';
            this.interestRateTimeFieldOptions = [...this.timePeriodOptions];
        }

        this.setBreakdownOptions();
        this.recalculate();
    }

    interestRateTimePeriodChange() {
        this.setBreakdownOptions();
        this.recalculate();
    }

    // Table - breakdown field set options 
    setBreakdownOptions() {
        this.breakdownOptions = [];
        const option1 = this.timePeriodOptions.find(
            (el: any) => this.interestRateTimePeriod === el.value
        );
        const option2 = this.timePeriodOptions.find(
            (el: any) => this.timePeriod === el.value
        );
        if(option1.value === option2.value) {
            this.breakdownOptions.push(option1);
        } else {
            this.breakdownOptions.push(option1, option2);
        }

        const selectedBreakdown = this.breakdownOptions.find((el: any) => el.value === this.breakdown);
        if(!selectedBreakdown) {
            const len = this.breakdownOptions.length;
            this.breakdown = len > 0 ? this.breakdownOptions[len - 1].value : null
        }
        return;

        // to display all options between selected interestRateTimePeriod and timePeriod
        // Need to work on that 
        const index_1 = this.timePeriodOptions.findIndex(
            (el: any) => this.interestRateTimePeriod === el.value
        );
        const index_2 = this.timePeriodOptions.findIndex(
            (el: any) => this.timePeriod === el.value
        );
        this.breakdownOptions = this.timePeriodOptions.filter(
            (_: any, index: number) => {
                return index >= index_1 && index <= index_2;
            }
        );
    }

    calculateCompoundInterest(P: number, r: number, n: number, t: number) {
        // Convert annual rate to a decimal
        r = r / 100;
        const I = Math.pow(1 + r / n, n * t);
        // Calculate compound interest
        const A = P * I;
        return A;
    }

    calculateNthTime(): number {
        let nthValue: number = 1;
        if (this.timePeriod !== this.interestRateTimePeriod) {
            nthValue =
                ConvertTimePeriod[this.timePeriod][this.interestRateTimePeriod];
        }
        return nthValue;
    }

    calculate() {
        this.calculateBtnClick = true;
        this.isLoading = true;
        if (this.pieChart) {
            this.pieChart.destroy();
        }
        timer(500).subscribe(() => {
            this.calculateInterest();
        });
    }

    recalculate() {
        if (this.calculateBtnClick && !this.isLoading) {
            this.calculate();
        }
    }

    calculateInterest() {
        if (this.interestType == InterestTypeEnum.SIMPLE) {
            const n: number = this.calculateNthTime(); // Number of times interest applied per year (monthly)
            const interestValue =
                (this.initialValue * this.interestRate * this.time) / 100;
            this.initSimpleInterestTableData();
            this.interestValue = interestValue * n;
            this.futureValue = this.initialValue + this.interestValue;
            this.totalInterestRate =
                (this.interestValue * 100) / this.initialValue;
        } else if (this.interestType == InterestTypeEnum.COMPOUNDING) {
            const P: number = this.initialValue; // Principal amount ($1000)
            const r: number = this.interestRate; // Annual interest rate (5%)
            const n: number = this.calculateNthTime(); // Number of times interest applied per year (monthly)
            const t: number = this.time; // Number of years
            let calcValue: number = P;
            Array.from({ length: n }).forEach((_, i) => {
                calcValue = this.calculateCompoundInterest(calcValue, r, 1, t);
            });
            this.futureValue = calcValue;
            this.interestValue = this.futureValue - this.initialValue;
            this.totalInterestRate =
                (this.interestValue * 100) / this.initialValue;
            this.initCompoundInterestTableData(n);
        }

        this.isLoading = false;
        this.isTableLoading = false;
        if (this.activeTabIndex === activeTabIndexEnum.CHART) {
            const timerSubscription = timer(0).subscribe(() => {
                this.initChart();
                timerSubscription.unsubscribe();
            });
        } else {
            this.destoryPieChart();
        }
    }

    onTabChange(event: TabViewChangeEvent) {
        if (event.index === activeTabIndexEnum.CHART) {
            const timerSubscription = timer(0).subscribe(() => {
                this.initChart();
                timerSubscription.unsubscribe();
            });
        } else {
            this.destoryPieChart();
        }
    }

    // Init table related functinos
    breakdownChange() {
        const n: number = this.calculateNthTime(); // Number of times interest applied per year (monthly)
        const loaderDuration = 500; // Duration in milliseconds

        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }

        this.isTableLoading = true;
        this.timerSubscription = timer(loaderDuration).subscribe(() => {
            if (this.interestType === InterestTypeEnum.SIMPLE) {
                this.initSimpleInterestTableData();
            } else {
                this.initCompoundInterestTableData(n);
            }
            this.isTableLoading = false;
        });
    }

    // Table Functions
    initSimpleInterestTableData() {
        this.initTableData = [];
        this.initTableData.push({
            time: 0,
            interest: null,
            accuredInterest: null,
            amount: this.initialValue,
        });

        let nthValue: number = this.calculateNthTime(); // Number of times interest applied per year (monthly)
        let convertTimeN: number = 1;

        // Calculate convert nth time for breakdown value
        if(this.timePeriod !== this.breakdown && this.interestRateTimePeriod !== this.breakdown) {
            const convertTime = ConvertTimePeriod[this.interestRateTimePeriod][this.breakdown];
            convertTimeN = Math.round(convertTime * nthValue);
        }
        const R: number = this.interestRate;
        const singleInterestValue = (this.initialValue * R) / 100;
        let accInterest: number = 0;
        // Set default loop time and interest value for breakdown is time period
        let loopTimes: number = 1;
        let interestValue: number = singleInterestValue;

        if(this.breakdown === this.timePeriod) {
            loopTimes = this.time;
            interestValue = singleInterestValue * nthValue;
        } else if (this.breakdown === this.interestRateTimePeriod) {
            loopTimes = this.time * nthValue;
            interestValue = singleInterestValue;
        } else {
            loopTimes = this.time * convertTimeN;
            interestValue = singleInterestValue * (nthValue / convertTimeN);
        }

        Array.from({ length: loopTimes }).forEach((_, loopIndex: number) => {
            const index: number = loopIndex + 1;
            accInterest += interestValue;

            this.initTableData.push({
                time: index,
                interest: interestValue,
                accuredInterest: accInterest,
                amount: this.initialValue + accInterest,
            });
        });
        this.tableData = this.initTableData.slice(0, 100);
    }

    initCompoundInterestTableData(nthValue: number) {
        this.initTableData = [];
        this.initTableData.push({
            time: 0,
            interest: null,
            accuredInterest: null,
            amount: this.initialValue,
        });

        const R: number = this.interestRate;
        let accInterest: number = 0;
        // Set default loop time and interest value for breakdown is time period
        let loopTimes: number = this.time;
        let interestValue: number = 0;
        loopTimes = this.time * nthValue;
        let compundValue: number = this.initialValue;
        // To keep init compound amount after push data in table  
        let initCompundAmount: number = this.initialValue;

        Array.from({ length: loopTimes }).forEach((_, loopIndex: number) => {
            const index: number = loopIndex + 1;

            interestValue = (compundValue * R) / 100;
            compundValue += interestValue;
            accInterest += interestValue;

            if (this.breakdown === this.timePeriod && index % nthValue === 0) {
                const compoundInterestWithAmmount = this.calculateCompoundInterest(initCompundAmount, R, 1, nthValue);
                const compoundInterest = compoundInterestWithAmmount - initCompundAmount;
                this.initTableData.push({
                    time: index / nthValue,
                    interest: compoundInterest,
                    accuredInterest: accInterest,
                    amount: this.initialValue + accInterest,
                });
                initCompundAmount = this.initialValue + accInterest;
            } else if (this.breakdown === this.interestRateTimePeriod) {
                this.initTableData.push({
                    time: index,
                    interest: interestValue,
                    accuredInterest: accInterest,
                    amount: this.initialValue + accInterest,
                });
            } else if(this.breakdown !== this.timePeriod && this.breakdown !== this.interestRateTimePeriod) {
                const convertTime = ConvertTimePeriod[this.interestRateTimePeriod][this.breakdown];
                const convertTimeN = Math.round(convertTime * nthValue) ;

                if(index % (nthValue / convertTimeN) === 0) {
                    const compoundInterestWithAmmount = this.calculateCompoundInterest(initCompundAmount, R, 1, nthValue / convertTimeN);
                    const compoundInterest = compoundInterestWithAmmount - initCompundAmount;
                    this.initTableData.push({
                        time: index * convertTimeN / nthValue,
                        interest: compoundInterest,
                        accuredInterest: accInterest,
                        amount: this.initialValue + accInterest,
                    });
                    initCompundAmount = this.initialValue + accInterest;
                }
            }
        });
        this.tableData = this.initTableData.slice(0, 100);
    }

    tableScrollEndReach(event: any) {
        const dataLen = this.tableData.length;
        this.tableData = [...this.tableData, ...this.initTableData.slice(dataLen , dataLen + 100)];
    }

    getChartAspectRatio() {
        // default value for width 1500 or more
        let chartAspectRatio: number = 4;
        const innerWidth: number = window.innerWidth;

        if (innerWidth < 400) {
            chartAspectRatio = 1.2;
        } else if (innerWidth < 600) {
            chartAspectRatio = 1.6;
        } else if (innerWidth < 900) {
            chartAspectRatio = 2;
        } else if (innerWidth < 1500) {
            chartAspectRatio = 3;
        }

        return chartAspectRatio;
    }

    // Init chart
    initChart() {
        this.destoryPieChart();

        const chartAspectRatio: number = this.getChartAspectRatio();
        this.pieChart = new Chart('pie_Chart', {
            type: 'pie', //this denotes tha type of chart
            data: {
                // values on X-Axis
                labels: ['Initial Value', 'Interst Value'],
                datasets: [
                    {
                        label: 'Interest Dataset',
                        data: [this.initialValue, this.interestValue],
                        backgroundColor: ['#5AB2FF', '#5DEBD7'],
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                aspectRatio: chartAspectRatio,
            },
        });
    }

    ngOnDestroy(): void {
        this.timerSubscription?.unsubscribe();
        this.destoryPieChart();
    }

    destoryPieChart(): void {
        if (this.pieChart) {
            this.pieChart.destroy();
        }
    }
}
