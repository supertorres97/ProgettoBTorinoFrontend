import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-prima-sezione',
  standalone: false,
  
  templateUrl: './prima-sezione.component.html',
  styleUrl: './prima-sezione.component.css'
})
export class PrimaSezioneComponent {

  constructor(private router: Router, private route: ActivatedRoute) {}

}
