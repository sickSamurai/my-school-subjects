export class SchoolSubject {
  id?: string
  name: string
  grade: number | null
  credits: number

  constructor(name: string, credits: number) {
    this.name = name
    this.credits = credits
    this.grade = null
  }
}
