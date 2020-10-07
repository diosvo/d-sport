import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  @ViewChild('image', { static: true }) image: ElementRef<HTMLDivElement>;
  @ViewChild('imageSecond', { static: true }) imageSecond: ElementRef<HTMLDivElement>;
  
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.initialAnimations()
  }

  initialAnimations() {
    gsap.to(this.image.nativeElement, {
      scrollTrigger: {
        trigger: this.image.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 3,
      scale: 1.05,
    });

    gsap.to(this.imageSecond.nativeElement, {
      scrollTrigger: {
        trigger: this.imageSecond.nativeElement,
        scrub: true,
        start: 'top center',
      } as gsap.plugins.ScrollTriggerInstanceVars,
      delay: 0.5,
      y: -30,
      duration: 1,
    })
  }
}
