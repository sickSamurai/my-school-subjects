import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {}
