import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerSubject = new BehaviorSubject<boolean>(false);
  spinnerState$ = this.spinnerSubject.asObservable();

  private spinnerStartTime: number = 0;
  private minDisplayTime = 500; // minimo mezzo secondo

  // Stato per il caricamento iniziale
  private initialized = false;

  /**
   * Mostra lo spinner.
   */
  show() {
    this.spinnerStartTime = Date.now();
    this.spinnerSubject.next(true);
  }

  /**
   * Nasconde lo spinner, rispettando il tempo minimo.
   */
  hide() {
    const elapsed = Date.now() - this.spinnerStartTime;
    if (elapsed < this.minDisplayTime) {
      setTimeout(() => this.spinnerSubject.next(false), this.minDisplayTime - elapsed);
    } else {
      this.spinnerSubject.next(false);
    }
  }

  /**
   * Logica di inizializzazione app (fetch configurazioni o altro).
   * Lo spinner viene mostrato finché l'inizializzazione non è completata.
   */
  initializeApp(): Promise<void> {
    this.show();

    return new Promise((resolve) => {
      // Simuliamo una fetch o un inizializzatore.
      setTimeout(() => {
        this.initialized = true;
        this.hide();
        resolve();
      }, 1200);  // Simula un caricamento iniziale di 1.2 secondi
    });
  }

  /**
   * Per sapere se l'app è già stata inizializzata.
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Mostra lo spinner fino a quando una condizione non diventa vera.
   */
  forceShowUntil(condition: () => boolean) {
    this.show();

    const check = () => {
      if (condition()) {
        this.hide();
      } else {
        requestAnimationFrame(check);
      }
    };

    requestAnimationFrame(check);
  }
}
