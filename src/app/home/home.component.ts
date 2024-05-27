import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConfig } from '../shared/enums/route-config.enum';
import { FeatureList } from '../shared/data/feature-list';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    title: string = 'Mega Calculator';

    featureList: any;
    bgColors = ['#FFFFFF', '#6DD5FA', '#2980B9'];

    constructor(
        private router: Router,
        private elRef: ElementRef,
        private renderer: Renderer2
    ) {
        this.featureList = FeatureList;
    }

    ngAfterViewInit() {
        this.setBgColors();
    }

    navigateTo(data: any) {
        this.router.navigate([data.route]);
    }

    setBgColors(): void {
        const cardList = Array.from(
            this.elRef?.nativeElement?.querySelectorAll('p-card.p-element')
        );
        const len = cardList.length;
        if (!cardList) return;
        cardList.map((pCardTagEl: any, index: number) => {
            // const ID: number = Number(pCardTagEl.id);
            let direction: string = index % 2 === 0 ? 'to left' : 'to right';
            if (index <= 1) {
                direction += ' top';
            } else if (len < index + 2) {
                direction += ' bottom';
            }
            const bgColor: string = `linear-gradient(${direction}, ${this.bgColors[0]}, ${this.bgColors[1]}, ${this.bgColors[2]})`;
            this.renderer.setStyle(
                pCardTagEl.firstChild,
                'background',
                bgColor
            );
        });
    }
}
