import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/shared/mat/mat.module';
import { NavComponent } from './components/shared/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { DesiViewComponent } from './components/designation/desi-view/desi-view.component';
import { DesiCreateComponent } from './components/designation/desi-create/desi-create.component';
import { DesiEditComponent } from './components/designation/desi-edit/desi-edit.component';
import { MemberViewComponent } from './components/member/member-view/member-view.component';
import { MemberCreateComponent } from './components/member/member-create/member-create.component';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { DataService } from './services/data.service';
import { NotifyService } from './services/notify.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DatePipe } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        DesiViewComponent,
        DesiCreateComponent,
        DesiEditComponent,
        MemberViewComponent,
        MemberCreateComponent,
        MemberEditComponent,
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [DataService, NotifyService, DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
