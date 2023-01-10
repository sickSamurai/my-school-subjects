import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { FormPageComponent } from '../pages/form-page/form-page.component'
import { MainPageComponent } from '../pages/main-page/main-page.component'

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'form', component: FormPageComponent },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
