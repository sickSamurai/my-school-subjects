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
    if (errors) {
      if (errors['required'] != undefined) return 'Campo Requerido'
      else if (errors['min'] != undefined) return 'El valor mínimo es 0'
      else if (errors['max'] != undefined) return 'El valor máximo es 0'
      else return 'Error Desconocido'
    } else return ''
  }

  setMode() {
    this.activatedRouted.queryParams.subscribe(value => {
      if (value['id'] == undefined || value['name'] == undefined || value['credits'] == undefined) {
        this.mode = 'creationMode'
        this.formGroup.reset({ wasCoursed: true })
      } else {
        this.mode = 'editionMode'
        this.subjectData.id = value['id']
        this.formGroup.setValue({
          name: value['name'],
          credits: +value['credits'],
          grade: +value['grade'],
          wasCoursed: true
        })
      }
    })
  }

  async saveData() {
    const { name, credits, grade } = this.formGroup.value
    if (!name || !credits) throw new Error('Invalid Form')
    if (grade == undefined) this.subjectData = { ...this.subjectData, name, credits, grade: null }
    else this.subjectData = { ...this.subjectData, name, credits, grade }
    if (this.mode == 'creationMode') await this.subjectsService.add(this.subjectData)
    else await this.subjectsService.edit(this.subjectData)
  }

  ngOnInit(): void {
    this.setMode()
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
    this.mode = 'creationMode'
    this.subjectData = new SchoolSubject('', 0)
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
