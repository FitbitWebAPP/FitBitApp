import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fitbit';
  /**
   *
   */
  constructor(private maticonregistry:MatIconRegistry, private domsanitizer:DomSanitizer) {
    this.maticonregistry.addSvgIcon("icons8-facebook", this.domsanitizer.bypassSecurityTrustResourceUrl("../../assets/icons8-facebook.svg"))
    this.maticonregistry.addSvgIcon("icons8-google", this.domsanitizer.bypassSecurityTrustResourceUrl("../../assets/icons8-google.svg"))

  }
}
