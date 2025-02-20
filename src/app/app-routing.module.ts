import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CarrelloComponent } from './Components/carrello/carrello.component';
import { LoginComponent } from './Components/login/login.component';
import { UserProfileComponent } from './Components/profile/profile.component';
import { ProdottiComponent } from './Components/prodotti/prodotti.component';
import { PgProdottoComponent } from './Components/pgProdotto/pgProdotto.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },         // Reindirizza alla Home
  { path: 'home', component: HomeComponent },                   // Home Page
  { path: 'carrello', component: CarrelloComponent },           // Carrello
  { path: 'login', component: LoginComponent },
  {path: 'profile', component: UserProfileComponent},                 // Login
  { path: 'login', component: LoginComponent },                 // Login
  { path: 'prodotti', component: ProdottiComponent},            //prodotti
  { path: 'sign-in', component: SignInComponent },              // Registrazione
  {path: 'profile/:id', component: UserProfileComponent},                 // Login
  { path: 'prodotto', component: PgProdottoComponent},          // Prodotto singolo
  { path: '**', redirectTo: '/home?error=true' }                // Redirige tutte le rotte sconosciute a /home con parametro error
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }