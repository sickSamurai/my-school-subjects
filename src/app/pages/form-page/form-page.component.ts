import { transition, trigger, useAnimation } from '@angular/animations'
import { Component } from '@angular/core'
import { slideInLeft } from 'ng-animate'

@Component({
  selector: 'form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
  animations: [trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))])]
})
export class FormPageComponent {}
