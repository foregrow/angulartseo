import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { KorisnikService } from './services/korisnik.service';
import { Event,Router,NavigationStart,NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndicator = true;
  constructor(public korisnikService: KorisnikService,
    public router: Router){
      this.router.events.subscribe((routerEvent: Event) => {

        if(routerEvent instanceof NavigationStart){
          this.showLoadingIndicator = true;
        }
        if(routerEvent instanceof NavigationEnd){
          this.showLoadingIndicator = false;
        }
      });
    }
}
