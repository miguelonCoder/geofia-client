import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export type IAResponse = {
  data: unknown,
  textIndication: string,
  error: null | string
}

@Injectable({
  providedIn: 'root'
})
export class IaServerService {
    private apiUrl = 'http://localhost:3000/query'; // ajusta si tu backend está en otro host/puerto

  constructor(private http: HttpClient) {}

  runQuery(q: string): Observable<IAResponse> {
    return this.http.post<{result: IAResponse}>(this.apiUrl, { q }).pipe(
      map(res => {
        if(res.result && !res.result.error){
          return res.result
        }else if(res.result.error){
          throw new Error(res.result.error)
        }
        else throw new Error('error desconocido')
      })
    )
  }
}
