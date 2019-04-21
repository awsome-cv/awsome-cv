import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { EditorComponent } from "../editor/editor.component";
import { Note } from "../Notes/INote.interface";
declare let $: any;
declare let editormd: any;
@Component({
  selector: "app-note-list",
  templateUrl: "./note-list.component.html",
  styleUrls: ["./note-list.component.css"]
})
export class NoteListComponent implements OnInit {
  panelOpenState = false;
  isLogin = this.httpService.isLoggedIn();
  constructor(private httpService: HttpService) {}
  notes: Note[];
  editor: any;
  ngOnInit() {
    this.editor = editormd("xxd", {
      width: "100%",
      height: "90vh",
      path: "assets/editor.md/lib/",
      codeFold: true,
      searchReplace: true,
      toolbar: true,
      emoji: true,
      taskList: true,
      tex: true,
      readOnly: false,
      tocm: true,
      watch: true,
      previewCodeHighlight: true,
      saveHTMLToTextarea: true,
      markdown: "",
      flowChart: true,
      syncScrolling: true,
      sequenceDiagram: true,
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
      imageUploadURL: "",
      onload: function() {
        //this.watch();
        //this.setMarkdown("###test onloaded");
        //testEditor.setMarkdown("###Test onloaded");
      }
    });
    if (this.httpService.isLoggedIn()) {
      this.httpService.getAllNotes().subscribe(res => {
        res.map(i => {
          i.edit_date = i.edit_date.split("T")[0];
        });
        this.notes = res;
      });
    }
  }
  beginEdit(note: Note) {
    let res = $(
      "#xxd > textarea.ng-untouched.ng-pristine.ng-valid.editormd-markdown-textarea"
    ).val();
    console.log(res);
  }
}
