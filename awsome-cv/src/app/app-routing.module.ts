import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyNavComponent } from "./my-nav/my-nav.component";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { EditorComponent } from "./editor/editor.component";
const routes: Routes = [
  { path: "", component: EditorComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "editor", component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
