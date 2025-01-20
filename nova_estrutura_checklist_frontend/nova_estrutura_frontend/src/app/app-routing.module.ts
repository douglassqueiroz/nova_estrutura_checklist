import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItensComponent } from './components/itens/itens.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  {path:'itens', component: ItensComponent},
  {path:'formulario', component: FormularioComponent},
  {path:'usuario', component: UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
