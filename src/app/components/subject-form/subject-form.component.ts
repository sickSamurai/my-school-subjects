import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { SchoolSubject } from '../../models/SchoolSubject'
import { SchoolSubjectsService } from '../../services/subjects.service'

type FormControls = {
  name: FormControl<string>
  grade: FormControl<number | null>
  credits: FormControl<number | null>
  wasCoursed: FormControl<boolean>
}

@Component({
  selector: 'subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {
  subjectData: SchoolSubject
  formGroup: FormGroup<FormControls>
  mode: 'editionMode' | 'creationMode'
  titles = {
    'editionMode': 'Editar Materia',
    'creationMode': 'Registrar Materia'
  }

  customGradeValidator(formControl: AbstractControl) {
    const wasCoursed: boolean = formControl.parent?.get('wasCoursed')?.value
    return wasCoursed ? Validators.required(formControl) : null
  }

  get gradeError() {
    const errors = this.formGroup.controls.grade.errors
    let message = ''
    if (errors) {
      if (errors['required'] != undefined) message = 'Campo Requerido'
      else if (errors['min'] != undefined) message = 'El valor mínimo es 0'
      else if (errors['max'] != undefined) message = 'El valor máximo es 0'
    }
    return message
  }

  chargeEditData() {
    this.activatedRouted.queryParams.subscribe(value => {
      if (value['id'] == undefined || value['name'] == undefined || value['credits'] == undefined) return
      this.mode = 'editionMode'
      this.subjectData.id = value['id']
      this.formGroup.setValue({
        name: value['name'],
        credits: +value['credits'],
        grade: +value['grade'],
        wasCoursed: true
      })
    })
  }

  saveData() {
    const { name, credits, grade } = this.formGroup.value
    if (!name || !credits) throw new Error('Invalid Form')
    if (grade == undefined) this.subjectData = { ...this.subjectData, name, credits, grade: null }
    else this.subjectData = { ...this.subjectData, name, credits, grade }
    if (this.mode == 'creationMode') this.subjectsService.add(this.subjectData)
    else this.subjectsService.edit(this.subjectData)
  }

  ngOnInit(): void {
    this.chargeEditData()
    this.formGroup.controls.wasCoursed.valueChanges.subscribe(value => {
      const gradeControl = this.formGroup.controls.grade
      gradeControl.updateValueAndValidity()
      if (value) gradeControl.enable()
      else {
        gradeControl.disable()
        gradeControl.setValue(null)
      }
    })
  }

  constructor(private activatedRouted: ActivatedRoute, private subjectsService: SchoolSubjectsService) {
    this.subjectData = new SchoolSubject('', 0)
    this.mode = 'creationMode'
    this.formGroup = new FormGroup(<FormControls>{
      name: new FormControl('', [Validators.required]),
      grade: new FormControl<number | null>(null, [
        Validators.min(0),
        Validators.max(5),
        this.customGradeValidator
      ]),
      credits: new FormControl<number | null>(null, [Validators.required]),
      wasCoursed: new FormControl(true, [Validators.required])
    })
  }
}
