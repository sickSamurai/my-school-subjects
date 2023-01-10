import { Component } from '@angular/core'

import { SchoolSubjectsService } from '../../services/subjects.service'

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  dataExists = true
  constructor(private subjectsService: SchoolSubjectsService) {
    this.subjectsService.getSubjects().subscribe(subjects => (this.dataExists = subjects.length > 0))
  }
}
