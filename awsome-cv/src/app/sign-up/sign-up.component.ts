import { Component } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { User } from "../login/users/IUser";
import { HttpService } from "../http.service";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { MyNavComponent } from "../my-nav/my-nav.component";

let user = new User("", "", "");
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent {
  hide: boolean = true;
  check: boolean = true;
  constructor(
    private location: Location,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private router: Router,
    private maNav: MyNavComponent
  ) {}

  ngOnInit() {
    console.log(user);
  }
  changeValue(str: string, value: any) {
    user.changeProperty({ name: str, value: value });
  }
  checkPassword(str: string) {
    console.log(user.password !== "" && str !== "" && user.password !== str);
    if (user.password !== "" && str !== "" && user.password !== str) {
      this.check = false;
    } else {
      this.check = true;
    }
  }
  goBack(): void {
    this.router.navigate(["/login"]);
  }
  signup() {
    if (
      !(
        this.passwordFormControl.hasError("minLength") ||
        this.nameFormControl.hasError("required") ||
        (this.passwordFormControl.hasError("required") ||
          this.passwordFormControl2.hasError("habit")) ||
        (this.emailFormControl.hasError("email") &&
          !this.emailFormControl.hasError("required")) ||
        this.emailFormControl.hasError("required")
      )
    ) {
      this.httpService.signUp(user).subscribe(res => {
        if (res.status == 200) {
          this.snackBar.open(user.name, "注册成功", {
            duration: 2000
          });
          this.router.navigate(["/login"]);
        } else {
          this.snackBar.open(res.value.error, "Error", {
            duration: 2000
          });
        }
      });
    }
  }
  /***Form Control */
  nameFormControl = new FormControl("", [Validators.required]);
  passwordFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);
  passwordFormControl2 = new FormControl("", [this.isTrue]);
  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);
  isTrue(g: FormControl) {
    let password = g.value;
    console.log(user.password);
    return password === user.password ? null : { habit: true };
  }
}
