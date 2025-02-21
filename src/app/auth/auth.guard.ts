import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const idUtenteStorage = this.authService.getIdUtente();
    const isAdmin = this.authService.isRoleAdmin();
    const url = state.url;

    if (url.startsWith('/profile/')) {
      const idFromUrl = Number(route.paramMap.get('id'));

      if (idUtenteStorage !== idFromUrl) {
        alert("Non sei autorizzato a vedere la pagina di un altro account.");
        this.router.navigate(['/home']);
        return false;
      }
    }

    if (url.startsWith('/admin/') && !isAdmin) {
      alert("Accesso negato: non sei un amministratore.");
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
