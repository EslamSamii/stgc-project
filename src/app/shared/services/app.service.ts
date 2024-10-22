import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public cursorChange$: Subject<'video' | 'circle'> = new Subject<'video' | 'circle'>();
  public onScrollChange$: Subject<void> = new Subject<void>();

  constructor(private _HttpClient: HttpClient) { }

  public contactUs(data:{name: string, address: string, message: string}): Observable<any>{
    const payload = {
      fields: {...data}
    }
    return this._HttpClient.post(`${environment.air_table_url}${environment.air_table_contact_us_table_id}`,payload, {
      headers: {
        Authorization: `Bearer ${environment.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

  public downloadPublicationData(data:{name: string, email: string, organization: string, position: string}): Observable<any>{
    const payload = {
      fields: {...data}
    }
    return this._HttpClient.post(`${environment.air_table_url}${environment.air_table_publication_table_id}`,payload, {
      headers: {
        Authorization: `Bearer ${environment.token}`,
        'Content-Type': 'application/json'
      }
    })
  }

}
