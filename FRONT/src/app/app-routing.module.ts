import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './components/views/usuario/cadastrar/cadastrar.component';
import { ListarComponent } from './components/views/usuario/listar/listar.component';
import { LoginComponent } from './components/views/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: ListarComponent
  },
  {
    path: 'usuario/cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }