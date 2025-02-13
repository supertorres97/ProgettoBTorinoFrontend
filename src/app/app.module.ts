import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

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
import { ProdottiComponent } from './Components/prodotti/prodotti.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

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
    ProdottiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    provideHttpClient(withFetch()), // ✅ Replaces HttpClientModule
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
