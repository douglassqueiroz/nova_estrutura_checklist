import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriarFormularioService {
  private apiUrlGetFormulariosCriados = '/api/formularios';
  private apiUrlPostFormulariosCriados = '/api/create_formularios'
  private apiUrlDeleteFormulariosCriados = '/api/delete'
  constructor(private http: HttpClient) { }
  obterFormulariosCriados(): Observable<any> {
    return this.http.get(this.apiUrlGetFormulariosCriados);
  }
  enviarFormulariosCriados(formulariosCriados: any): Observable<any> {
    console.log('Chamando Post no criar-formulario.service.ts para', this.apiUrlPostFormulariosCriados, 'com dados:', formulariosCriados);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlPostFormulariosCriados,formulariosCriados, {headers});
  } 
  deletarFormulario(formularioId: string): Observable<any> {
    console.log('Chamando Delete para',`${this.apiUrlDeleteFormulariosCriados}/${formularioId}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.delete(`${this.apiUrlDeleteFormulariosCriados}/${formularioId}`, {headers});
  }
}
