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
import { StoricoOrdiniComponent } from './Components/storico-ordini/storico-ordini.component';
import { DettaglioOrdineComponent } from './Components/storico-ordini/dettaglio-ordine/dettaglio-ordine.component';
import { CreazioneComponent } from './Components/admin/creazione/creazione.component';
import { GestioneTipoProdottoComponent } from './Components/gestione-tipo-prodotto/gestione-tipo-prodotto.component';
import { GestioneOrdiniComponent } from './Components/admin/gestione-ordini/gestione-ordini.component';
import { DettagliOrdineComponent } from './Components/admin/dettagli-ordine/dettagli-ordine.component';
import { GestioneFeedbackComponent } from './Components/admin/gestione-feedback/gestione-feedback.component';
import { GestioneUtentiComponent } from './Components/admin/gestione-utenti/gestione-utenti.component';
import { DettagliUserComponent } from './Components/admin/dettagli-user/dettagli-user.component';
import { ProdottiPerTipoComponent } from './Components/prodotti-per-tipo/prodotti-per-tipo.component';
import { GestioneProdottiComponent } from './Components/admin/gestione-prodotti/gestione-prodotti.component';
import { AuthGuard } from './auth/auth.guard';
import { OrderGuard } from './auth/order.guard';

const routes: Routes = [
  /*----------------------------- Routes dell'utente base ------------------------------------------------*/
  { path: '', pathMatch: 'full', redirectTo: '/home'},         // Reindirizza alla Home
  { path: 'home', component: HomeComponent},                   // Home Page
  { path: 'sign-in', component: SignInComponent},              // Registrazione
  { path: 'login', component: LoginComponent},
  { path: 'profile/:id', component: UserProfileComponent, canActivate:[AuthGuard]},       // Profilo utente
  { path: 'carrello', component: CarrelloComponent},           // Carrello
  { path: 'ordini/:id', component: StoricoOrdiniComponent, canActivate: [AuthGuard]},             //storico ordini dell'utente  
  { path: 'dettagli-ordine/:id', component: DettaglioOrdineComponent, canActivate: [OrderGuard]},     //dettalio dell'ordine
  { path: 'prodotti', component: ProdottiComponent},            //prodotti
  { path: 'prodotto/:id', component: PgProdottoComponent},          // Prodotto singolo
  { path: 'tipo-prodotto', component: GestioneTipoProdottoComponent},        
  { path: 'prodottiPerTipo/:id', component: ProdottiPerTipoComponent},          //prodotti per tipo

  /*-------------------------- Opzioni Admin ----------------------*/
  { path: 'admin/creazione-prodotto', component: CreazioneProdottoComponent, canActivate: [AuthGuard]},   //creazione prodotto
  { path: 'admin/gestione-tipo-prodotto', component: GestioneTipoProdottoComponent, canActivate:[AuthGuard]},        
  { path: 'admin/gestione-ordini', component: GestioneOrdiniComponent, canActivate:[AuthGuard]},
  { path: 'admin/gestione-utenti', component: GestioneUtentiComponent, canActivate:[AuthGuard]},
  { path: 'admin/dettagli-utente/:id', component: DettagliUserComponent, canActivate:[AuthGuard]},
  { path: 'admin/dettagli-ordine/:id', component: DettagliOrdineComponent, canActivate:[AuthGuard]},  
  { path: 'admin/gestioneProdotti', component: GestioneProdottiComponent, canActivate:[AuthGuard]},           //admin gesione prodotti  
  { path: 'admin/creazione-admin', component: CreazioneComponent, canActivate:[AuthGuard]},
  { path: 'admin/gestione-feedback', component:GestioneFeedbackComponent, canActivate:[AuthGuard]},                    
  
  /*-------------------------- Pagine di errore ----------------------------------------------*/
  { path: '**', redirectTo: '/home?error=true' },                // Redirige tutte le rotte sconosciute a /home con parametro error

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }