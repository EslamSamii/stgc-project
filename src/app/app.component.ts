import { Component, HostListener } from '@angular/core';
import { AppService } from './shared/sevices/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'stgc';

  public cursorPositionX!: number;
  public cursorPositionY!: number;

  constructor( private _AppService: AppService) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorPositionX = event.clientX;
    this.cursorPositionY = event.clientY;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this._AppService.onScrollChange$.next();
  }
}
