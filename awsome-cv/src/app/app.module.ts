import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ChangeDetectorRef } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MyNavComponent } from "./my-nav/my-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { SignUpComponent } from "./sign-up/sign-up.component";

import {
  MatNativeDateModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatCardModule,
  MatGridListModule,
  MatSelectModule,
  MatRadioModule,
  MatSnackBar,
  MatSnackBarModule,
  MatMenuModule,
  MatExpansionModule,
  MatDividerModule,
  MatButtonToggleModule,
  MatDialogModule,
  MatTooltipModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { HttpService } from "./http.service";
import { EditorMdDirective } from "./editor/editor-md.directive";
import { EditorComponent } from "./editor/editor.component";
import { NoteListComponent } from "./note-list/note-list.component";
import { PopupComponent } from "./popup/popup.component";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyNavComponent,
    SignUpComponent,
    EditorMdDirective,
    EditorComponent,
    NoteListComponent,
    PopupComponent
  ],
  imports: [
    MatButtonToggleModule,
    MatExpansionModule,
    MatNativeDateModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
    MatTooltipModule
  ],
  entryComponents: [PopupComponent],
  providers: [
    HttpService,
    AuthService,
    AuthGuard,
    MatSnackBar,
    EditorComponent,
    EditorMdDirective,
    PopupComponent,
    MatDialogModule,
    MyNavComponent,
    ChangeDetectorRef
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
