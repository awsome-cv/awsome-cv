import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { User } from "./users/IUser";
import { HttpClient } from "@angular/common/http";
import { HttpService } from "../http.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { MyNavComponent } from "../my-nav/my-nav.component";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  constructor(
    private location: Location,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private maNav: MyNavComponent
  ) {}
  user: User = new User();
  ngOnInit() {
    this.maNav.title = "->Sign In";
  }
  changeValue(str: string, value: any) {
    this.user.changeProperty({ name: str, value: value });
  }

  goBack(): void {
    this.location.back();
  }
  login() {
    if (
      !(
        this.passwordFormControl.hasError("minLength") ||
        this.nameFormControl.hasError("required") ||
        this.passwordFormControl.hasError("required")
      )
    ) {
      console.log(
        this.httpService.login(this.user).subscribe(res => {
          if (res.status == 200) {
            this.snackBar.open(this.user.name, "登陆成功", {
              duration: 2000
            });
            this.maNav.isLogIn = true;
            localStorage.setItem("name", this.user.name);
            this.maNav.getnotes();
            this.maNav.name = this.user.name;
            this.location.back();
            this.httpService.getAllNotes().subscribe(res => {
              res.map(i => {
                i.edit_date = i.edit_date.split("T")[0];
              });
              localStorage.setItem("notes", JSON.stringify(res));
            });
          } else {
            this.snackBar.open(res.value.error, "Error", {
              duration: 2000
            });
          }
          console.log(res);
        })
      );
    }
  }
  /***Form Control */
  nameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  /** */
}
