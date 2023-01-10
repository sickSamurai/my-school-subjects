import { TestBed } from '@angular/core/testing'

import { SchoolSubjectsService } from './subjects.service'

describe('SubjectsServiceService', () => {
  let service: SchoolSubjectsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SchoolSubjectsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
