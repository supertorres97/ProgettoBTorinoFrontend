import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrdineService } from '../services/ordine.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private orderService: OrdineService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const idUtente = this.authService.getIdUtente();
    const idOrdine = Number(route.paramMap.get('id'));

    if (!idUtente) {
      this.showMessage("Devi essere loggato per accedere ai dettagli dell'ordine.");
      this.router.navigate(['/home']);
      return false;
    }

    try {
      const isOrderOwner = await this.orderService.verificaOrdine(idOrdine, idUtente).toPromise();

      if (!isOrderOwner) {
        this.showMessage("Non sei autorizzato a vedere questa pagina.");
        this.router.navigate(['/home']);
        return false;
      }

      return true;

    } catch (error) {
      console.error("Errore nella verifica dell'ordine:", error);
      this.showMessage("Si è verificato un errore. Riprova più tardi.");
      this.router.navigate(['/home']);
      return false;
    }
  }

  private showMessage(message: string): void {
    this._snackBar.open(message, 'Chiudi', {
      duration: 3000,
      verticalPosition: 'bottom', // Mantiene la posizione in basso
      horizontalPosition: 'end', // Sposta a destra
    });
  }
}
