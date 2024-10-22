import { Component, HostListener } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { slideInOutAnimation } from './shared/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutAnimation]
})
export class AppComponent {
  title = 'stgc';

  public cursorPositionX!: number;
  public cursorPositionY!: number;

  constructor( private _AppService: AppService, private router: Router) {}

  public cursor: 'video' | 'circle' = 'circle';
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursorPositionX = event.clientX;
    this.cursorPositionY = event.clientY;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this._AppService.onScrollChange$.next();
  }

  private _destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this._AppService.cursorChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next:(res)=>{
        this.cursor = res
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
