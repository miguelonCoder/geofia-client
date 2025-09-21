import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

const BASE_SIZE = 48

const BASE_SIZE_LABEL = 12

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css'
})
export class Spinner implements AfterViewInit {

  

  size = input(BASE_SIZE)

  el = viewChild<ElementRef>('element')

  ngAfterViewInit(): void {
    const percent = this.size() / BASE_SIZE
    const labelSize = Math.trunc(BASE_SIZE_LABEL * percent)


    if (this.el()?.nativeElement) {
      
      this.el()!.nativeElement.style.height = `${this.size()}px`;
      this.el()!.nativeElement.style.width = `${this.size()}px`;
      this.el()!.nativeElement.style.setProperty('--after-width', `${labelSize}px`);
      this.el()!.nativeElement.style.setProperty('--after-height', `${labelSize}px`);
    }
  }
}
