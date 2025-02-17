import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './formulario-modal.component.html',
  styleUrl: './formulario-modal.component.css'
})
export class FormularioModalComponent {
  @Input() modalAberto: boolean = true;
  @Input() titulo: string = 'Editar Formulário';
  @Input() formulario: any = {}; // Objeto do formulário recebido
  @Output() fechar = new EventEmitter<void>();
  @Output() salvar = new EventEmitter<any>();
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
}
