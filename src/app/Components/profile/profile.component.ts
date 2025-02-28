import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CredenzialiService } from '../../services/credenziali.service';
import { ConfirmDeleteComponent } from '../../Dialog/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})
export class UserProfileComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  editMode: boolean = false;
  passwordEditMode: boolean = false;

  id: number = 0;
  utente: any;
  msg: string = "";
  passwordMismatch: boolean = false;
  currentPasswordMismatch: boolean = false;

  profileForm: FormGroup = new FormGroup({
    nome: new FormControl(),
    cognome: new FormControl(),
    email: new FormControl(),
    cFiscale: new FormControl(),
    via: new FormControl(),
    cap: new FormControl(),
    citta: new FormControl()
  });

  passwordForm: FormGroup = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmNewPassword: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private credService: CredenzialiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get("id");
      if (idParam !== null) {
        this.id = +idParam;
      }
      this.userService.getUtente(this.id)
        .subscribe((resp: any) => {
          this.utente = resp.dati;
          this.profileForm = this.fb.group({
            nome: [this.utente.nome, Validators.required],
            cognome: [this.utente.cognome, Validators.required],
            email: [this.utente.email, [Validators.required, Validators.email]],
            cFiscale: [this.utente.cFiscale],
            via: [this.utente.via, Validators.required],
            cap: [this.utente.cap, Validators.required],
            citta: [this.utente.citta, Validators.required]
          });
        });
    });
  }

  onSubmit() {
    console.log(this.profileForm.controls['cognome'].touched);
    console.log(this.profileForm.controls['nome'].touched);
    const updateBody: any = { id: this.id };

    if (this.profileForm.get('nome')?.touched) {
      updateBody.nome = this.profileForm.value.nome;
    }
    if (this.profileForm.get('cognome')?.touched) {
      updateBody.cognome = this.profileForm.value.cognome;
    }
    if (this.profileForm.get('email')?.touched) {
      updateBody.email = this.profileForm.value.email;
    }
    if (this.profileForm.get('cFiscale')?.touched) {
      updateBody.cFiscale = this.profileForm.value.cFiscale;
    }
    if (this.profileForm.get('via')?.touched) {
      updateBody.via = this.profileForm.value.via;
    }
    if (this.profileForm.get('cap')?.touched) {
      updateBody.cap = this.profileForm.value.cap;
    }
    if (this.profileForm.get('citta')?.touched) {
      updateBody.citta = this.profileForm.value.citta;
    }

    console.log(updateBody);

    this.userService.updateUserProfile(updateBody)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.rc) {
          this.router.navigate(["/profile/" + this.id])
            .then(() => {
              window.location.reload();
            });
        } else {
          this.msg = resp.msg;
        }
      });
  }

  onCancel() {
    this.router.navigate(["/profile/" + this.id])
      .then(() => {
        window.location.reload();
      });
  }

  onPasswordChange() {
    console.log("sono in onPasswordChange");
    this.credService.getCredenzialiByUtente(this.id)
      .subscribe({
        next: (credenziali: any) => {
          // Se trovi le credenziali, usa il loro ID per aggiornare la password
          console.log(credenziali);
          console.log(credenziali.dati);
          if (this.passwordForm.value.currentPassword !== credenziali.dati.password) {
            console.log("controllo password vecchia con db");
            console.log("old password " + this.passwordForm.value.currentPassword);
            console.log("old password in DB " + credenziali.dati.password);
            this.currentPasswordMismatch = true;
            return;
          }
          if (this.passwordForm.value.newPassword !== this.passwordForm.value.confirmNewPassword) {
            console.log("controllo password vecchia con db");
            this.passwordMismatch = true;
            return;
          }

          if (!credenziali.dati || !credenziali.dati.id) {
            console.error("Errore: credenziali.id è nullo!", credenziali);
            return;
          }
          console.log("prima di crede")
          const crede = {
            id: credenziali.dati.id,
            idUtente: this.id,
            password: this.passwordForm.value.newPassword
          };

          console.log("sto per passare le credenziali al metodo")
          // Invia la richiesta per aggiornare la password
          this.credService.changePassword(crede)
            .subscribe((resp: any) => {
              if (resp.rc) {
                this.msg = "Password aggiornata con successo!";
                this.passwordEditMode = false;
              } else {
                this.msg = resp.msg;
              }
            });
        },
        error: (error: any) => {
          console.error('Errore nel recupero delle credenziali', error);
        }
      });
  }

  onDeactivateCred() {
    const enterAnimationDuration: string = '200ms';
    const exitAnimationDuration: string = '150ms';

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.deactivateCred();
          window.location.reload();
        }
      });
  }

  deactivateCred() {
    this.credService.getCredenzialiByUtente(this.id)
      .subscribe((credenziali: any) => {
        console.log("credenziali: " + credenziali);
        console.log("credenziali: " + credenziali.dati);
        console.log("credenziali: " + credenziali.dati.id);
        if (!credenziali.dati || !credenziali.dati.id) {
          console.error("Errore: credenziali.id è nullo!", credenziali);
          return;
        }
        const credReq = {
          id: credenziali.dati.id
        }
        this.credService.deleteCredenziali(credReq)
          .subscribe((resp: any) => {
            if (resp.rc) {
              console.log("Credenziali eliminate logicamente!");
              this.auth.logout();
            }
          })
      });

  }
}
