import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { AppComponent } from './app.component';
import { CadastrarComponent } from './components/views/usuario/cadastrar/cadastrar.component';
import { ListarComponent } from './components/views/usuario/listar/listar.component';
import { ContentComponent } from './components/template/content/content.component';
import { HeaderComponent } from './components/template/header/header.component';
import { LoginComponent } from './components/views/login/login.component';
import { CadastrarComponentLivro } from './components/views/livro/cadastrar/cadastrar.component';
import { ListarComponentLivro } from './components/views/livro/listar/listar.component';
import { EmprestarComponent } from './components/views/emprestimo/emprestar/emprestar.component';
import { ListarComponentEmprestimo } from './components/views/emprestimo/listar/listar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CadastrarComponent,
    ListarComponent,
    ContentComponent,
    LoginComponent,
    CadastrarComponentLivro,
    ListarComponentLivro,
    EmprestarComponent,
    ListarComponentEmprestimo
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCheckboxModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
