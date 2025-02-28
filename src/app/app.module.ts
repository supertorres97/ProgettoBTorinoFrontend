import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Importa Angular Material Modules
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CarrelloComponent } from './Components/carrello/carrello.component';
import { LoginComponent } from './Components/login/login.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PrimaSezioneComponent } from './Components/home/prima-sezione/prima-sezione.component';
import { CardsSezioneComponent } from './Components/home/cards-sezione/cards-sezione.component';
import { ParallaxSezioneComponent } from './Components/home/parallax-sezione/parallax-sezione.component';
import { UserProfileComponent } from './Components/profile/profile.component';
import { ProdottiComponent } from './Components/prodotti/prodotti.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoricoOrdiniComponent } from './Components/storico-ordini/storico-ordini.component';
import { DettaglioOrdineComponent } from './Components/storico-ordini/dettaglio-ordine/dettaglio-ordine.component';
import { GestioneOrdiniComponent } from './Components/admin/gestione-ordini/gestione-ordini.component';
import { CreazioneComponent } from './Components/admin/creazione/creazione.component'; 
import { GestioneTipoProdottoComponent } from './Components/admin/gestione-tipo-prodotto/gestione-tipo-prodotto.component'; 
import { DettagliOrdineComponent } from './Components/admin/dettagli-ordine/dettagli-ordine.component'; 
import { PgProdottoComponent } from './Components/pgProdotto/pgProdotto.component';
import { SezProdottoComponent } from './Components/pgProdotto/sez-prodotto/sez-prodotto.component';
import { SezFeedbackComponent } from './Components/pgProdotto/sez-feedback/sez-feedback.component';
import { GestioneFeedbackComponent } from './Components/admin/gestione-feedback/gestione-feedback.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './Dialog/confirm-delete/confirm-delete.component';
import { GestioneUtentiComponent } from './Components/admin/gestione-utenti/gestione-utenti.component';
import { DettagliUserComponent } from './Components/admin/dettagli-user/dettagli-user.component';
import { MatTableModule } from '@angular/material/table';
import { ParallaxTwoSezioneComponent } from './Components/home/parallax-two-sezione/parallax-two-sezione.component';
import { ProdottiPerTipoComponent } from './Components/prodotti-per-tipo/prodotti-per-tipo.component';
import { GestioneProdottiComponent } from './Components/admin/gestione-prodotti/gestione-prodotti.component';
import { CreateProdottoComponent } from './Dialog/create-prodotto/create-prodotto.component';
import { UpdateProdottoComponent } from './Dialog/update-prodotto/update-prodotto.component';
import { SpinnerComponent } from './Dialog/spinner/spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarrelloComponent,
    LoginComponent,
    FooterComponent,
    PrimaSezioneComponent,
    CardsSezioneComponent,
    ParallaxSezioneComponent,
    UserProfileComponent,
    ProdottiComponent,
    SignInComponent, 
    StoricoOrdiniComponent,
    DettaglioOrdineComponent,
    GestioneOrdiniComponent,
    CreazioneComponent,
    GestioneTipoProdottoComponent,
    DettagliOrdineComponent,
    PgProdottoComponent,
    SezProdottoComponent,
    SezFeedbackComponent,
    GestioneFeedbackComponent,
    ConfirmDeleteComponent,
    GestioneUtentiComponent,
    DettagliUserComponent,
    ParallaxTwoSezioneComponent,
    ProdottiPerTipoComponent,
    GestioneProdottiComponent,
    CreateProdottoComponent,
    UpdateProdottoComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), // ✅ Replaces HttpClientModule
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }