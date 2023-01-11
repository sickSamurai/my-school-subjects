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

const dataConverter: FirestoreDataConverter<SchoolSubject> = {
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
  private collection: CollectionReference<SchoolSubject>

  getSubjects = () => collectionData(this.collection)

  async add(newSubject: SchoolSubject) {
    addDoc(this.collection, newSubject)
    await this.router.navigateByUrl('/')
    this.router.navigateByUrl('/')
  }

  async edit(subjectToEdit: SchoolSubject) {
    if (subjectToEdit.id == undefined) throw new Error('id is undefined')
    try {
      const docRef = doc(this.collection, subjectToEdit.id)
      await updateDoc(docRef, subjectToEdit)
      this.router.navigateByUrl('/')
    } catch (err) {
      console.log(err)
    }
  }

  async delete(id: string) {
    try {
      const docRef = doc(this.collection, id)
      await deleteDoc(docRef)
    } catch (err) {
      console.log(err)
    }
  }

  constructor(private firestore: Firestore, private router: Router) {
    this.collection = collection(this.firestore, 'SchoolSubjects').withConverter(dataConverter)
  }
}
