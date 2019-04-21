import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";

@Component({
  selector: "app-popup",
  templateUrl: `popup.component.html`
})
export class PopupComponent {
  constructor(public location: Location) {}
  name = this.location.path().split("/")[1];
}
