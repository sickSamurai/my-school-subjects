import { NgModule } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { getFirestore, provideFirestore } from '@angular/fire/firestore'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { NavbarComponent } from './components/navbar/navbar.component'
import { SubjectFormComponent } from './components/subject-form/subject-form.component'
import { SubjectListComponent } from './components/subject-list/subject-list.component'
import { AngularMaterialModule } from './modules/angular-material.module'
import { RoutingModule } from './modules/routing.module'
import { FormPageComponent } from './pages/form-page/form-page.component'
import { MainPageComponent } from './pages/main-page/main-page.component'
import { ToastComponent } from './shared/toast/toast.component';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { NoDataCardComponent } from './components/no-data-card/no-data-card.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SubjectFormComponent,
    SubjectListComponent,
    ToastComponent,
    MainPageComponent,
    FormPageComponent,
    ConfirmDeleteDialogComponent,
    NoDataCardComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
