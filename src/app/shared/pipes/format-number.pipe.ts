import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, symbol: string = '₹', position?: 'LAST'): string {
    if(!value) return ''; 
    if(position === 'LAST') {
      return `${value.toFixed(2)}${symbol}`;
    }

    if(symbol === '₹') {
      const currencyValue  = Math.round(value);
      if(currencyValue.toString().length >= 6) {
        let formattedCurrency = this.getFormatedCurrency(currencyValue); 
        return `${symbol}${formattedCurrency}`;
      }

      return `${symbol}${this.formatToIndianNumberingSystem(value)}`; 
    }
    return `${symbol}${value.toFixed(2)}`;
  }

  getFormatedCurrency(value: number): string {
    let len = value.toString().length
      if(len >= 6 && len < 8) {
        return (value / 100000).toFixed(2) + ' Lakh';
      } else {
        return (value / 10000000).toFixed(2) + ' Crore';
      }
  }

  formatToIndianNumberingSystem(number: number) {
    let numberString = number.toFixed(2).toString();
    let [integerPart, decimalPart] = numberString.split('.');

    // Process the integer part
    let lastThree = integerPart.slice(-3);
    let otherNumbers = integerPart.slice(0, -3);

    if (otherNumbers !== '') {
        lastThree = ',' + lastThree;
    }

    let formattedNumber = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

    // If there's a decimal part, add it back
    if (decimalPart) {
        formattedNumber += '.' + decimalPart;
    }
    return formattedNumber;
  }
}
