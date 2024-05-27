import { Component, OnDestroy } from '@angular/core';
import { Subscription, interval, timer } from 'rxjs';

@Component({
    selector: 'app-age',
    templateUrl: './age.component.html',
    styleUrls: ['./age.component.scss'],
})
export class AgeComponent implements OnDestroy {
    dob: Date = new Date('1/1/2000');
    today: Date = new Date();
    age: number = 0;
    months: number = 0;
    days: number = 0;
    hours: number = 0;
    minutes: number = 0;
    seconds: number = 0;
    ageMonths: number = 0;

    submitClick: boolean = false;
    isLoading: boolean = false;
    timerSubscription!: Subscription;
    intervalSubscription!: Subscription;

    startInterval() {
        if (!this.submitClick) {
            this.intervalSubscription = interval(0).subscribe(() => {
                this.calculateAge();
            });
        }
        this.submitClick = true;
    }

    calculateAge() {
        const today = new Date();
        const birthday = new Date(
            this.dob.getFullYear(),
            this.dob.getMonth(),
            this.dob.getDate()
        );

        this.age = today.getFullYear() - birthday.getFullYear(); // Assuming birth year is 1990
        this.ageMonths = today.getMonth() - birthday.getMonth(); // Assuming birth year is 1990
        if (this.ageMonths < 0) {
            // If birthday coming in upcoming remaining year
            this.age -= 1;
        }

        birthday.setFullYear(today.getFullYear());

        let timeUntilBirthday: number = birthday.getTime() - today.getTime();
        if (timeUntilBirthday < 0) {
            // if birthday time is less that current year
            birthday.setFullYear(today.getFullYear() + 1);
        }
        timeUntilBirthday = birthday.getTime() - today.getTime();

        this.months = Math.floor(
            timeUntilBirthday / (1000 * 60 * 60 * 24 * 30)
        );
        this.days = Math.floor(
            (timeUntilBirthday % (1000 * 60 * 60 * 24 * 30)) /
                (1000 * 60 * 60 * 24)
        );
        this.hours = Math.floor(
            (timeUntilBirthday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.minutes = Math.floor(
            (timeUntilBirthday % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.seconds = Math.floor((timeUntilBirthday % (1000 * 60)) / 1000);
    }

    onSubmit() {
        this.submitClick = false;
        this.isLoading = true;
        this.intervalSubscription?.unsubscribe();
        this.timerSubscription?.unsubscribe();

        this.timerSubscription = timer(500).subscribe(() => {
            this.startInterval();
            this.calculateAge();
            this.isLoading = false;
            this.submitClick = true;
        });
    }

    ngOnDestroy() {
        this.timerSubscription?.unsubscribe();
        this.intervalSubscription?.unsubscribe();
    }
}
