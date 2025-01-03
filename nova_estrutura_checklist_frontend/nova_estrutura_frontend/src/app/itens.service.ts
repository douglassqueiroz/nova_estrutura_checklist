import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItensService {
  private apiUrlPostItens = '/api/create_itens';
  private apiUrlGetItens = '/api/itens';    // URL do backend para obter itens
  private apiUrlDeleteItens = '/api/itens/delete'; // URL do backend para deletar itens
  private apiUrlUpdateItens = '/api/itens/update'; // URL do backend para atualizar itens

  constructor(private http: HttpClient) {}

  // Método para enviar um novo item ao backend
  enviarItem(item: any): Observable<any> {
    console.log('Chamando POST para:', this.apiUrlPostItens, 'com dados:', item);  // Adiciona esse log
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlPostItens, item, { headers });
  }

  // Método para obter a lista de itens do backend
  obterItens(): Observable<any> {
    return this.http.get(this.apiUrlGetItens);
  }
  // Método para deletar um item pelo ID
// Método para deletar um item pelo ID
deletarItem(itemId: string): Observable<any> {
  console.log('Chamando DELETE para:', this.apiUrlDeleteItens, 'com dados:', itemId)
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  return this.http.delete(`${this.apiUrlDeleteItens}/${itemId}`, { headers });
}
atualizarItem(item: any): Observable<any> {
  console.log('Atualizando item com id:', item.id);  // Log para verificar o id

  return this.http.put(`${this.apiUrlUpdateItens}/itens/${item.id}`, item);
}
}
