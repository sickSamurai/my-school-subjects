import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Router } from '@angular/router'
import { SchoolSubjectsService } from 'src/app/services/subjects.service'

import { SchoolSubject } from '../../models/SchoolSubject'
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component'

@Component({
  selector: 'subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements AfterViewInit {
  displayedColumns = ['name', 'grade', 'credits', 'actions']
  subjectsDataSource: MatTableDataSource<SchoolSubject>

  @ViewChild(MatPaginator) paginator?: MatPaginator
  @ViewChild(MatSort) sorter?: MatSort

  filter(event: Event) {
    const searchString = (event.target as HTMLInputElement).value.trim().toLowerCase()
    this.subjectsDataSource.filter = searchString
  }

  startToEdit(subjectToEdit: SchoolSubject) {
    this.router.navigate(['form'], {
      queryParams: { ...subjectToEdit }
    })
  }

  confirmDelete(id: string) {
    this.alertDialog
      .open(ConfirmDeleteDialogComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) this.delete(id)
      })
  }

  delete(id: string) {
    if (id == undefined) throw new Error('id is undefined')
    this.schoolSubjectsService.delete(id)
  }

  get coursedCredits() {
    const schoolSubjects = this.subjectsDataSource.data
    const coursedSubjects = schoolSubjects.filter(schoolSubject => schoolSubject.grade != null)
    if (coursedSubjects.length == 0) return 0
    return coursedSubjects
      .map(schoolSubject => schoolSubject.credits)
      .reduce((previous, current) => previous + current)
  }

  get average() {
    if (this.coursedCredits == 0) return 0
    const schoolSubjects = this.subjectsDataSource.data
    const coursedSubjects = schoolSubjects.filter(schoolSubject => schoolSubject.grade != null)
    const average =
      coursedSubjects
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map(schoolSubject => schoolSubject.grade! * schoolSubject.credits)
        .reduce((previous, current) => previous + current) / this.coursedCredits
    return average
  }

  ngAfterViewInit() {
    if (this.paginator != undefined) this.subjectsDataSource.paginator = this.paginator
    if (this.sorter != undefined) this.subjectsDataSource.sort = this.sorter
  }

  constructor(
    private schoolSubjectsService: SchoolSubjectsService,
    private router: Router,
    public alertDialog: MatDialog
  ) {
    this.subjectsDataSource = new MatTableDataSource()
    this.schoolSubjectsService.getSubjects().subscribe(subjects => {
      this.subjectsDataSource.data = subjects
    })
  }
}
