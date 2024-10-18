import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public isMenuOpened: boolean = false;
  public offsetX: number = 0;
  public offsetY: number = 0;
  private _destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggleMenu(): void{
    this.isMenuOpened = !this.isMenuOpened;
    document.body.style.overflow= this.isMenuOpened ? 'hidden' : 'auto';
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
