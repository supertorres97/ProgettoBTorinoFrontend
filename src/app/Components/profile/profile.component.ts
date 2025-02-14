import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false,
})

export class UserProfileComponent implements OnInit {
  isLoading: boolean = false;
  errorMessage: string = '';
  editMode: boolean = false; // Modalità di modifica
  
  id: number = 0;
  utente: any;
  msg:string ="";

  profileForm: FormGroup = new FormGroup({
    nome: new FormControl(),
    cognome: new FormControl(),
    email: new FormControl(),
    cFiscale: new FormControl(),
    via: new FormControl(),
    CAP: new FormControl(),
    citta: new FormControl()
  });
  constructor(    private route: ActivatedRoute,
    private userService: UserService,
    private routing:Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const idParam = params.get("id");
      if (idParam !== null) {
        this.id = +idParam; // equivalent di ParseInt
      }
      this.userService.getUtente(this.id)
        .subscribe((resp: any) => {
          this.utente = resp.dati;
          console.log(this.utente);
          this.profileForm = new FormGroup({
            nome: new FormControl(this.utente.nome, Validators.required),
            cognome: new FormControl(this.utente.cognome, Validators.required),
            email: new FormControl(this.utente.email, [Validators.email]),
            cFiscale: new FormControl(this.utente.cFiscale),
            via:new FormControl(this.utente.via, Validators.required),
            cap:new FormControl(this.utente.cap, Validators.required),
            citta:new FormControl(this.utente.citta, Validators.required)
    })})
        })
  }

  onSubmit() {
    console.log(this.profileForm.controls['cognome'].touched);
    console.log(this.profileForm.controls['nome'].touched);
    const updateBody:any = {id: this.id}

    if (this.profileForm.get('nome')?.touched){
      updateBody.nome = this.profileForm.value.nome;
    }
    if (this.profileForm.get('cognome')?.touched){
      updateBody.cognome = this.profileForm.value.cognome;
    }
    if (this.profileForm.get('email')?.touched){
      updateBody.email = this.profileForm.value.email;
    }
    if (this.profileForm.get('cFiscale')?.touched){
      updateBody.cFiscale = this.profileForm.value.cFiscale;
    }
    if (this.profileForm.get('via')?.touched){
      updateBody.via = this.profileForm.value.via;
    }
    if (this.profileForm.get('cap')?.touched){
      updateBody.cap = this.profileForm.value.cap;
    }
    if (this.profileForm.get('citta')?.touched){
      updateBody.citta = this.profileForm.value.citta;
    }

    console.log(updateBody);

    this.userService.updateUserProfile(updateBody)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.rc){
          this.routing.navigate(["/profile/"+ this.id])
          .then(() => {
            window.location.reload();
          })
        } else {
          this.msg = resp.msg;
        }

      })

  }
  onCancel(){
    this.routing.navigate(["/profile/"+ this.id])
    .then(() => {
      window.location.reload();
    })
  }
  
}