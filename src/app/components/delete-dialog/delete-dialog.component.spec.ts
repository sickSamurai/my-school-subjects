import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DeleteDialogComponent } from './delete-dialog.component'

describe('ConfirmDeleteDialogComponent', () => {
  let component: DeleteDialogComponent
  let fixture: ComponentFixture<DeleteDialogComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteDialogComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(DeleteDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
