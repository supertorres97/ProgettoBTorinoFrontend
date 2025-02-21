import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CarrelloComponent } from './Components/carrello/carrello.component';
import { LoginComponent } from './Components/login/login.component';
import { UserProfileComponent } from './Components/profile/profile.component';
import { ProdottiComponent } from './Components/prodotti/prodotti.component';
import { PgProdottoComponent } from './Components/pgProdotto/pgProdotto.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CreazioneProdottoComponent } from './Components/creazione-prodotto/creazione-prodotto.component';
import { guardGuard } from './auth/guard.guard';
import { StoricoOrdiniComponent } from './Components/storico-ordini/storico-ordini.component';
import { DettaglioOrdineComponent } from './Components/storico-ordini/dettaglio-ordine/dettaglio-ordine.component';
import { GestioneTipoProdottoComponent } from './Components/admin/gestione-tipo-prodotto/gestione-tipo-prodotto.component';
import { GestioneOrdiniComponent } from './Components/admin/gestione-ordini/gestione-ordini.component';
import { DettagliOrdineComponent } from './Components/admin/dettagli-ordine/dettagli-ordine.component';
import { GestioneUtentiComponent } from './Components/admin/gestione-utenti/gestione-utenti.component';
import { DettagliUserComponent } from './Components/admin/dettagli-user/dettagli-user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },         // Reindirizza alla Home
  { path: 'home', component: HomeComponent },                   // Home Page
  { path: 'carrello', component: CarrelloComponent },           // Carrello
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: UserProfileComponent, canActivate:[guardGuard] },       // Profilo utente
  { path: 'prodotti', component: ProdottiComponent},            //prodotti
  { path: 'sign-in', component: SignInComponent },              // Registrazione
  { path: 'createProduct', component: CreazioneProdottoComponent },   //creazione prodotto
  { path: 'ordini/:id', component: StoricoOrdiniComponent },          //storico ordini dell'utente  
  { path: 'admin/tipo-prodotto', component: GestioneTipoProdottoComponent },        
  { path: 'dettagli-ordine/:id', component: DettaglioOrdineComponent },     //dettalio dell'ordine
  { path: 'admin/gestione-ordini', component: GestioneOrdiniComponent },
  { path: 'admin/gestione-utenti', component: GestioneUtentiComponent },
  { path: 'admin/dettagli-utente/:id', component: DettagliUserComponent },
  { path: 'admin/dettagli-ordine/:id', component: DettagliOrdineComponent },             
  {path: 'profile/:id', component: UserProfileComponent},                 // Login
  { path: 'prodotto/:id', component: PgProdottoComponent},          // Prodotto singolo
  { path: '**', redirectTo: '/home?error=true' }                // Redirige tutte le rotte sconosciute a /home con parametro error
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }