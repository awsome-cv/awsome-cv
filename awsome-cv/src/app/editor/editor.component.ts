import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { EditorConfig } from "./editor-config";
@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"]
})
export class EditorComponent implements OnInit {
  markdown = "";
  ngOnInit(): void {
    let notes = localStorage.getItem("markdown");
    if (notes !== "") {
      this.markdown = notes;
    }
  }
  constructor() {}
}
