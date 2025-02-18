import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ItensService } from '../../itens.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formulario-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './formulario-modal.component.html',
  styleUrl: './formulario-modal.component.css'
})
export class FormularioModalComponent {
  itens: any[] = [];
  dadosOriginais: any[] = [];

  @Input() modalAberto: boolean = true;
  @Input() titulo: string = 'Editar Formulário TESTE';
  @Input() formulario: any = {}; // Objeto do formulário recebido
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();
constructor(
  private ItensService: ItensService,
  private cdRef: ChangeDetectorRef

){}
abrirModalFormulario(){
  this.modalAberto = true;
}
fecharModalFormulario() {
  this.modalAberto = false;
  this.fechar.emit(); // Emite evento para fechar o modal
}
salvarFormularioModal() {
  this.salvar.emit(this.formulario); // Emite evento com os dados editados
  this.fecharModalFormulario(); // Fecha o modal após salvar
}
ngOnInit() {
  this.ItensService.obterItens().subscribe(
    (data: any[]) => {
      console.log("teste 0951",data);
      this.itens = data.map(item => ({
        id: item.id || item.itemId || null,  // Ajuste o mapeamento conforme necessário
        descricao: item.item || item.itemDescricao || 'Descrição não encontradaaaaaa',
        formulario: item.formulario || 'Formulario do item não encontrado'
      }));
      this.itens.forEach(item => {
        console.log('Item descricao:', item.descricao);

      });
      this.cdRef.detectChanges();  // Força a atualização da UI

    },
    (error: any) => {
      console.error('Erro ao obter itens:', error);
    }
  );
}
carregarItens() {
  this.ItensService.obterItens().subscribe(
    (data: any[]) => {
      this.dadosOriginais = data;  // Armazena o "data" completo
      this.itens = data.map(item => ({
        id: item.id || item.itemId || null,
        descricao: item.item || item.itemDescricao || 'Descrição não encontrada'
      }));
      console.log('Itens recebidos no criar-formulario.component.ts:', data);
      this.cdRef.detectChanges();
    },
    (error: any) => {
      console.error('Erro ao obter itens no criar-formulario.component.ts:', error);
    }
  );
}
}