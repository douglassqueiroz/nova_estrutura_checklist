import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CriarFormularioService } from '../../criar-formulario.service';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ItensService } from '../../itens.service';

@Component({
  selector: 'app-criar-formulario',
  templateUrl: './criar-formulario.component.html',
  styleUrls: ['./criar-formulario.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, CommonModule, MatCardModule, MatCardHeader],
})
export class CriarFormularioComponent implements OnInit {
  formulariosCriados: { id: number | null; nome: string }[] = [];
  carregando: boolean = false;
  erro: string | null = null;
  sucessoCriacao: boolean = false; // Controla a exibição da mensagem de sucesso
  novoFormulario: { id: number | null; nome: string; itens:string[] } = { id: null, nome: '', itens: [] }; // Para o formulário atual
  modalAberto: boolean = false;
  itens: any[] = [];
  descricao = '';  // A descrição será enviada para o backend
  itemEmEdicao: any | null = null; // Armazena o item que está sendo editado
  constructor(
    private criarFormularioService: CriarFormularioService,
    private cdRef: ChangeDetectorRef,
    private ItensService: ItensService
  ) {}

  ngOnInit(): void {
    this.carregarFormularios();
    this.carregarItens();  // Certifique-se de chamar este método para carregar itens

  }
  carregarItens() {
    this.ItensService.obterItens().subscribe(
      (data: any[]) => {
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
  ngOnInit1() {
    this.ItensService.obterItens().subscribe(
      (data: any[]) => {
        console.log('Dados recebidos da API:', data);  // Verifique os dados brutos da API

        this.itens = data.map(item => ({
          id: item.id || item.itemId || null,  // Ajuste o mapeamento conforme necessário
          descricao: item.item || item.itemDescricao || 'Descrição não encontrada'
        }));
        console.log('Itens recebidos:', data);  // Verifique no console se os itens estão corretos
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
  abrirModal(): void {
    this.modalAberto = true;
      // Garantir que o formulário tenha um ID temporário
  if (!this.novoFormulario.id) {
    this.novoFormulario.id = Date.now(); // ID temporário único
  }
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.novoFormulario = { id: null, nome: '', itens: []}; // Limpa os dados do formulário
  }
  carregarFormularios(): void {
    this.carregando = true;
    this.erro = null;

    this.criarFormularioService.obterFormulariosCriados().subscribe(
      (data: any[]) => {
        this.carregando = false;
        console.log('Formulários recebidos:', data); // Verificar os dados recebidos
        this.formulariosCriados = data.map((formularioCriado) => ({
          id: formularioCriado.id,
          nome: formularioCriado.nome,
        }));
        this.cdRef.detectChanges();
      },
      (error: any) => {
        this.carregando = false;
        this.erro = 'Erro ao carregar os formulários. Por favor, tente novamente.';
        console.error('Erro ao carregar formulários:', error);
      }
    );
  }

  recarregar(): void {
    this.carregarFormularios();
  }

  criarFormulario(): void {
    if (!this.novoFormulario.nome.trim()) {
      this.erro = 'O nome do formulário não pode estar vazio.';
      return;
    }

    console.log('Enviando descrição para o backend:', this.novoFormulario);

    this.criarFormularioService.enviarFormulariosCriados(this.novoFormulario).subscribe(
      (response: any) => {
        console.log('Novo formulário criado com sucesso:', response);

        // Adiciona o novo formulário à lista
        this.formulariosCriados.push({
          id: response.id,
          nome: response.nome,
        });

        // Reseta os valores para o próximo formulário
        this.novoFormulario = { id: null, nome: '', itens: []};
        this.sucessoCriacao = true;

        // Remove a mensagem de sucesso após alguns segundos
        setTimeout(() => {
          this.sucessoCriacao = false;
        }, 3000);
      },
      (error: any) => {
        this.erro = 'Erro ao criar o formulário. Por favor, tente novamente.';
        console.error('Erro ao criar formulário:', error);
      }
    ); 
  }
  criarItem() {
    if (!this.descricao.trim()) {
      console.error('A descrição do item não pode estar vazia.');
      return;
    }
  
    console.log('Enviando descrição  de item para o backend:', this.descricao);
    // Não limpe ainda a variável 'descricao'
    console.log('ID do formulário antes de enviar:', this.novoFormulario?.id);
    if (!this.novoFormulario?.id) {
      console.error('Erro: ID do formulário não está definido.');
      return;
    }
    const body = {
      item: this.descricao,
      formulario: this.novoFormulario.nome  // Envia 'descricao' como 'item', já que o backend espera o campo 'item'
    };
    console.log("teste do douglas no criar-formulario.component",body)
    this.ItensService.enviarItem(body, this.novoFormulario.nome).subscribe(
      (response: any) => {
        console.log('Item criado com sucesso no criar-formulario.component:', response);
        const novoItem = { item: response.id, descricao: response.descricao, formulario: response.formulario };  // Supondo que o 'response' tenha a estrutura correta
        this.itens.push(novoItem);
  
        // Agora limpa o campo 'descricao' após a requisição ser bem-sucedida
        this.descricao = '';  // Limpa a variável de descrição após o envio
        this.sucessoCriacao = true;  // Ativa a exibição da mensagem de sucesso
  
        setTimeout(() => {
          this.sucessoCriacao = false;  // Desativa após 3 segundos
        }, 3000);
      },
      (error: any) => {
        console.error('Erro ao criar item:', error);
      }
    );
  }
  salvarFormulario(): void {
    if (!this.novoFormulario.nome.trim()) {
      this.novoFormulario.id = Date.now(); // Gera o ID temporário
      this.erro = 'O nome do formulário não pode estar vazio.';
      return; // Não envia o formulário se o nome estiver vazio
    }
  
    console.log('Novo formulário enviado:', this.novoFormulario);
    this.criarFormularioService.enviarFormulariosCriados(this.novoFormulario).subscribe(
      (response) => {
        console.log('Formulário salvo:', response);
        this.formulariosCriados.push(response);
        this.fecharModal();
      },
      (error) => {
        console.error('Erro ao salvar formulário:', error);
      }
    );
  }
  deletarFormulariosCriados(formularioId: string): void {
    console.log('ID do formulário a ser deletado:', formularioId);  // Verifique se o ID está correto.
    const formularioIdNumber = Number(formularioId);

    this.criarFormularioService.deletarFormulario(formularioId).subscribe(
    (response) => {
      console.log('Formulario deletado:', response);
      // Excluindo todos os itens vinculados ao formulário
      this.ItensService.deletarItensPorFormulario(formularioIdNumber).subscribe(
        () => {
          console.log('Itens deletados com sucesso');
          // Atualize a lista de itens se necessário
          this.itens = this.itens.filter(item => item.formularioId !== formularioIdNumber);
        },
        (error) => {
          console.error('Erro ao deletar itens do formulário', error);
        }
      );
      this.formulariosCriados = this.formulariosCriados.filter(formulario => formulario.id !== formularioIdNumber);
    
  },
  (error) => {
    console.error('Erro ao deletar formulario', error);
  }
);
}
}