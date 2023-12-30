import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms"; // <-- NgModel lives here
import {UpperCasePipe} from "@angular/common";
import {Hero} from "../hero";

@Component({
  selector: 'app-hero-detail',
  standalone: true,
    imports: [
        FormsModule,
        UpperCasePipe
    ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  // Add the input hero property
  @Input() hero?: Hero;
}
