import { Injectable } from '@angular/core'
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  FirestoreDataConverter,
} from '@angular/fire/firestore'
import { Router } from '@angular/router'
import { addDoc, updateDoc } from '@firebase/firestore'

import { SchoolSubject } from '../models/SchoolSubject'

const schoolSubjectConverter: FirestoreDataConverter<SchoolSubject> = {
  toFirestore(schoolSubject) {
    return { ...schoolSubject }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return <SchoolSubject>{
      id: snapshot.id,
      name: data['name'],
      grade: data['grade'],
      credits: data['credits']
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SchoolSubjectsService {
  private subjectsCollection: CollectionReference<SchoolSubject>

  getSubjects = () => collectionData(this.subjectsCollection)

  add(newSubject: SchoolSubject) {
    addDoc(this.subjectsCollection, newSubject)
    this.router.navigateByUrl('/')
  }

  edit(subjectToEdit: SchoolSubject) {
    if (subjectToEdit.id == undefined) throw new Error('id is undefined')
    try {
      const docRef = doc(this.subjectsCollection, subjectToEdit.id)
      updateDoc(docRef, subjectToEdit)
      this.router.navigateByUrl('/')
    } catch (err) {
      console.log(err)
    }
  }

  delete(id: string) {
    try {
      const docRef = doc(this.subjectsCollection, id)
      deleteDoc(docRef)
    } catch (err) {
      console.log(err)
    }
  }

  constructor(private firestore: Firestore, private router: Router) {
    this.subjectsCollection = collection(this.firestore, 'SchoolSubjects').withConverter(
      schoolSubjectConverter
    )
  }
}
