import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItensComponent } from './components/itens/itens.component';

const routes: Routes = [
  {path:'itens', component: ItensComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
