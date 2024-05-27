import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatNumber',
})
export class FormatNumberPipe implements PipeTransform {
    defaultOptions = {
        symbol: '₹',
        position: 'FIRST',
        decimalPoint: 2,
    };
    transform(value: number, options?: any): string {
        options = {
            ...this.defaultOptions,
            ...options,
        };

        if (!value) return '';
        if (options.position === 'LAST') {
            return `${this.removeZeroAfterDecimal(value.toFixed(options.decimalPoint))}${options.symbol}`;
        }

        if (options.symbol === '₹') {
            const currencyValue = Math.round(value);
            if (currencyValue.toString().length >= 6) {
                let formattedCurrency = this.getFormatedCurrency(
                    currencyValue,
                    options.decimalPoint
                );
                return `${options.symbol}${formattedCurrency}`;
            }
            return `${options.symbol}${this.formatToIndianNumberingSystem(value, options.decimalPoint)}`;
        }

        return `${options.symbol}${this.removeZeroAfterDecimal(value.toFixed(options.decimalPoint))}`;
    }

    getFormatedCurrency(value: number, decimalPoint?: number): string {
        let len = value.toString().length;
        if (len >= 6 && len < 8) {
            return (
                this.removeZeroAfterDecimal(
                    (value / 100000).toFixed(decimalPoint)
                ) + ' Lac'
            );
        } else {
            return (
                this.removeZeroAfterDecimal(
                    (value / 10000000).toFixed(decimalPoint)
                ) + ' Cr'
            );
        }
    }

    formatToIndianNumberingSystem(number: number, decimalPoint: number = 2) {
        let numberString = this.removeZeroAfterDecimal(
            number.toFixed(decimalPoint).toString()
        );
        let [integerPart, decimalPart] = numberString.split('.');

        // Process the integer part
        let lastThree = integerPart.slice(-3);
        let otherNumbers = integerPart.slice(0, -3);

        if (otherNumbers !== '') {
            lastThree = ',' + lastThree;
        }

        let formattedNumber =
            otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

        // If there's a decimal part, add it back
        if (decimalPart) {
            formattedNumber += '.' + decimalPart;
        }
        return formattedNumber;
    }

    removeZeroAfterDecimal(value: any) {
        // Convert the value to a number if it's a string
        let numberValue = parseFloat(value);

        // Return the number as a string without unnecessary decimal places
        return numberValue.toString();
    }
}
