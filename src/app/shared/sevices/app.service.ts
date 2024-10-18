import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public onScrollChange$: Subject<void> = new Subject<void>();

constructor() { }

}
