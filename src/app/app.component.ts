import { Component, HostListener } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { debounceTime, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { slideInOutAnimation } from './shared/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInOutAnimation]
})
export class AppComponent {
  title = 'stgc';

  public cursorPositionX: number = 0;
  public cursorPositionY: number = 0;

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
    const x = this.cursorPositionX + scrollX;
    const y = this.cursorPositionY + scrollY;
    const target = document.elementFromPoint(this.cursorPositionX, this.cursorPositionY)
    if(target?.classList.contains('video-player'))
      this._AppService.cursorChange$.next('video')
    else
      this._AppService.cursorChange$.next('circle')
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
