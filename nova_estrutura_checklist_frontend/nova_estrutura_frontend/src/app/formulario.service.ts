import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private apiUrlGetSetores = '/api/setores';
  constructor(private http: HttpClient) { }
  obterSetores(): Observable<any> {
    return this.http.get(this.apiUrlGetSetores);
  }
}
