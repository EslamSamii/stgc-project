import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isMenuOpened: boolean = false;
  public hideFlag: boolean = false;
  public toggleClicked: boolean = false;
  public isAnimating: boolean = false;
  public offsetX: number = 0;
  public offsetY: number = 0;
  private _destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggleMenu(event?: Event): void{
    if((event?.target as HTMLElement)?.classList.contains('link-active') || this.isAnimating) return;
    this.isAnimating = true;
    this.toggleClicked = !this.toggleClicked
    if(this.isMenuOpened)
      this.hideFlag = true;
    if(this.hideFlag)
      setTimeout(() => {
        this.isMenuOpened = false;
        this.hideFlag = false
        document.body.style.overflow= 'auto';
      }, 1000);
    else{
      this.isMenuOpened = true;
      document.body.style.overflow= 'hidden';
    }
    setTimeout(() => {
      this.isAnimating = false
    }, 1000);
  }

  public onMouseMove(event: MouseEvent): void{
    this.offsetX = event.offsetX - 10;
    this.offsetY = event.offsetY - 10;
  }

  public onMouseLeave(): void{
    this.offsetX = 0;
    this.offsetY = 0;
  }

}
