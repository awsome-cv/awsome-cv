import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { log } from "util";
import { EditorConfig } from "./editor/editor-config";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "awsome-cv";
  conf = new EditorConfig();
  markdown = "测试语句";

  // 同步属性内容
  syncModel(str): void {
    this.markdown = str;
  }
}
