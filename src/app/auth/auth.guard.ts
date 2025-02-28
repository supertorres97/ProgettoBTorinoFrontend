import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const idUtenteStorage = this.authService.getIdUtente();
    const isAdmin = this.authService.isRoleAdmin();
    const url = state.url;
    const isAuthenticated = this.authService.isAuthentificated();

    if (url.startsWith('/profile/')) {
      const idFromUrl = Number(route.paramMap.get('id'));
      console.log('isAutenticated:', idFromUrl);
      
      if (!isAuthenticated) {
        this.showMessage("Devi loggarti prima di poter accedere al tuo profilo.");
        this.router.navigate(['/home']);
        return false;
      }

      if (idUtenteStorage !== idFromUrl) {
        this.showMessage("Non sei autorizzato a vedere la pagina di un altro account.");
        this.router.navigate(['/home']);
        return false;
      }
    }

    if (url.startsWith('/admin/') && !isAdmin) {
      this.showMessage("Accesso negato: non sei un amministratore.");
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

  private showMessage(message: string): void {
    this._snackBar.open(message, 'Chiudi', {
      duration: 3000,
      verticalPosition: 'bottom', // Mantiene la posizione in basso
      horizontalPosition: 'end', // Sposta a destra
    });
  }

}
