import { Component} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-parallax-sezione',
  standalone: false,
  
  templateUrl: './parallax-sezione.component.html',
  styleUrl: './parallax-sezione.component.css'
})
export class ParallaxSezioneComponent{

  constructor(private router: Router, private route: ActivatedRoute) {}

}
