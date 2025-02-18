import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CarrelloComponent } from './Components/carrello/carrello.component';
import { LoginComponent } from './Components/login/login.component';
import { UserProfileComponent } from './Components/profile/profile.component';
import { ProdottiComponent } from './Components/prodotti/prodotti.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CreazioneProdottoComponent } from './Components/creazione-prodotto/creazione-prodotto.component';
import { guardGuard } from './auth/guard.guard';
import { StoricoOrdiniComponent } from './Components/storico-ordini/storico-ordini.component';
import { DettaglioOrdineComponent } from './Components/storico-ordini/dettaglio-ordine/dettaglio-ordine.component';
import { GestioneOrdiniComponent } from './Components/admin/gestione-ordini/gestione-ordini.component';
import { DettagliOrdineComponent } from './Components/admin/dettagli-ordine/dettagli-ordine.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },         // Reindirizza alla Home
  { path: 'home', component: HomeComponent },                   // Home Page
  { path: 'carrello', component: CarrelloComponent },           // Carrello
  { path: 'login', component: LoginComponent },
  {path: 'profile/:id', component: UserProfileComponent, canActivate:[guardGuard]},       // Profilo utente
  { path: 'prodotti', component: ProdottiComponent},            //prodotti
  { path: 'sign-in', component: SignInComponent },              // Registrazione
  {path: 'createProduct', component: CreazioneProdottoComponent},   //creazione prodotto
  { path: 'ordini/:id', component: StoricoOrdiniComponent },          //storico ordini dell'utente
  { path: 'dettagli-ordine/:id', component: DettaglioOrdineComponent },     //dettalio dell'ordine
  { path: 'admin/gestione-ordini', component: GestioneOrdiniComponent },
  { path: 'admin/dettagli-ordine/:id', component: DettagliOrdineComponent },             
  { path: '**', redirectTo: '/home?error=true' }                // Redirige tutte le rotte sconosciute a /home con parametro error
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }