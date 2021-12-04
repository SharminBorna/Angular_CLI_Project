import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DesiViewComponent } from './components/designation/desi-view/desi-view.component';
import { MemberViewComponent } from './components/member/member-view/member-view.component';
import { DesiCreateComponent } from './components/designation/desi-create/desi-create.component';
import { DesiEditComponent } from './components/designation/desi-edit/desi-edit.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'designation', component: DesiViewComponent },
    { path: 'add-desi', component: DesiCreateComponent },
    { path: 'edit-desi/:id', component: DesiEditComponent },
    { path: 'member', component: MemberViewComponent },
    { path: 'add-member', component: MemberCreateComponent },
    { path: 'edit-member/:id', component: MemberEditComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
