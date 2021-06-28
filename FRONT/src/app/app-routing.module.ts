import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './components/views/usuario/cadastrar/cadastrar.component';
import { ListarComponent } from './components/views/usuario/listar/listar.component';
import { LoginComponent } from './components/views/login/login.component';
import { CadastrarComponentLivro } from './components/views/livro/cadastrar/cadastrar.component';
import { ListarComponentLivro } from './components/views/livro/listar/listar.component';
import { EmprestarComponent } from './components/views/emprestimo/emprestar/emprestar.component';
import { ListarComponentEmprestimo } from './components/views/emprestimo/listar/listar.component';



const routes: Routes = [
  {
    path: '',
    component: ListarComponentLivro
  },
  {
    path: 'usuario/cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'livro/cadastrar',
    component: CadastrarComponentLivro
  },
  {
    path: 'usuario/listar',
    component: ListarComponent
  },
  {
    path: 'emprestimo/realizarEmprestimo',
    component: EmprestarComponent
  },
  {
    path: 'emprestimo/listar',
    component: ListarComponentEmprestimo
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }