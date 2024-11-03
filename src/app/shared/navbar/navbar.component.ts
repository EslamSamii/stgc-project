import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../services/app.service';

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
  private _destroy$: Subject<void> = new Subject<void>();
  private lastScroll: number = 0;
  public  scrollTopDir: boolean = false;
  public  color: 'white' | 'black' ='white';
  public  customClass?: string;
  public  prevColor: 'white' | 'black' ='white';
  constructor(private _AppService: AppService){}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this._AppService.onScrollChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next: ()=>{
        this.scrollTopDir = this.lastScroll < scrollY;
        this.lastScroll = Math.max(scrollY, 0);
      }
    })
    this._AppService.onNavColorChange$.pipe(takeUntil(this._destroy$)).subscribe({
      next: (res)=>{
        this.color = res.color;
        this.customClass = res.class || '';
      }
    })
  }

  public toggleMenu(navigate: boolean = false): void{
    if(this.isAnimating) return;
    this.isAnimating = true;
    this.toggleClicked = !this.toggleClicked
    if(this.isMenuOpened)
      this.hideFlag = true;
    if(!this.hideFlag){
      this.isMenuOpened = true;
      document.body.style.overflow= 'hidden';
      this.prevColor = this.color;
    }
    if(!this.hideFlag)
      setTimeout(() => {
        this.color = 'white'
      });
    else if(!navigate)
      setTimeout(() => {
        this.color = this.prevColor
      }, 300);
    setTimeout(() => {
      if(this.hideFlag){
        this.isMenuOpened = false;
        this.hideFlag = false
        document.body.style.overflow= 'auto';
      }
      this.isAnimating = false
    }, 700);
  }
}
