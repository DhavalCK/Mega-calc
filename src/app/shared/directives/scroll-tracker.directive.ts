import { Directive, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective implements OnInit {

  elementId: string = '';
  @Output() scrollEnded = new EventEmitter<any>; 
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  element!: HTMLElement;
  ngOnInit() {
    // Set element id
    this.elementId = this.elRef?.nativeElement?.id;
    this.element = this.elRef?.nativeElement as HTMLElement;
    this.checkElementIsInViewport();
    
    // window scroll
    this.renderer.listen('window', 'scroll', () => {
      this.checkElementIsInViewport();
    });

    this.renderer?.listen(this.element, 'scroll', () => {
      // const rect = this.elRef.nativeElement.getBoundingClientRect();
      // console.log('rect',rect);
      const scrollHeight: number = this.element.scrollHeight;
      const clientHeight: number = this.element.clientHeight;
      const scrollTop: number = this.element.scrollTop;

      let errorTrack: number = 1;
      const isBottomReach = scrollHeight - clientHeight <= scrollTop + errorTrack;
      if(isBottomReach) {
        this.scrollEnded.emit(true);
        // Perform some task
      }
    });
  }

  private checkElementIsInViewport() {
    const rect = this.elRef.nativeElement.getBoundingClientRect();
    const top = rect.top;
    const bottom = rect.bottom;
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

    if (top <= windowHeight && bottom >= 0) {
      // The div is in the viewport
      console.log(`${this.elementId} is in the viewport`);
    } else {
      // The div is not in the viewport
      console.log(`${this.elementId} is not in the viewport`);
    }
  }
}
