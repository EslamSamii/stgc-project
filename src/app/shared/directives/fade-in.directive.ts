import { Directive, ElementRef, Input } from '@angular/core';
import { AppService } from '../services/app.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[fadeIn]',
  standalone: true
})
export class FadeInDirective {

  @Input('customClass') customClass?: string;
  @Input('customOnly') customOnly?: boolean = false;
  @Input('noScroll') noScroll?: boolean = false;
  @Input('scrollToEnd') scrollToEnd?: boolean = true;
  private _destroy$: Subject<void> = new Subject<void>()
  constructor(private _elementRef: ElementRef, private _appService: AppService) { }

  ngOnInit(): void {
    if(!this.customOnly) this._elementRef.nativeElement.classList.add('opacity-0');
    if(this._elementRef.nativeElement.getBoundingClientRect().top - (innerHeight/(this.scrollToEnd ? 2 : 1 )) < 0){
      if(!this.customOnly) this._elementRef.nativeElement.classList.add('fade-in-up-animation')
      if(this.customClass) this._elementRef.nativeElement.classList.add(this.customClass)
      }
    if(!this.noScroll)
      this._appService.onScrollChange$.pipe(takeUntil(this._destroy$)).subscribe({
        next:  ()=>{
          if(this._elementRef.nativeElement.getBoundingClientRect().top - innerHeight < 0){
            if(!this.customOnly) this._elementRef.nativeElement.classList.add('fade-in-up-animation')
            if(this.customClass) this._elementRef.nativeElement.classList.add(this.customClass)
          }
        }
      })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }


}
