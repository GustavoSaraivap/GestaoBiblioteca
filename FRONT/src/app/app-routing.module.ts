import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './components/views/usuario/cadastrar/cadastrar.component';
import { ListarComponent } from './components/views/usuario/listar/listar.component';
import { CadastrarFuncionarioComponent } from './components/views/funcionario/cadastrar-funcionario/cadastrar-funcionario.component';
import { ListarFuncionarioComponent } from './components/views/funcionario/listar-funcionario/listar-funcionario.component';
import { LoginComponent } from './components/views/login/login.component';
import { CadastrarComponentLivro } from './components/views/livro/cadastrar/cadastrar.component';
import { ListarComponentLivro } from './components/views/livro/listar/listar.component';
import { EmprestarComponent } from './components/views/emprestimo/emprestar/emprestar.component';
import { ListarComponentEmprestimo } from './components/views/emprestimo/listar/listar.component';
import { DevolverComponent } from './components/views/emprestimo/devolver/devolver.component';



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
    path: 'funcionario/cadastrar',
    component: CadastrarFuncionarioComponent
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
    path: 'funcionario/listar',
    component: ListarFuncionarioComponent
  },
  {
    path: 'emprestimo/realizarEmprestimo',
    component: EmprestarComponent
  },
  {
    path: 'emprestimo/listar',
    component: ListarComponentEmprestimo
  },
  {
    path: 'devolucao',
    component: DevolverComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }