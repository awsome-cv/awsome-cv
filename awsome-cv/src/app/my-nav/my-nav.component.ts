import { Location } from "@angular/common";
import { MediaMatcher } from "@angular/cdk/layout";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit
} from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import { Note } from "../Notes/INote.interface";
import { PopupComponent } from "../popup/popup.component";
import { MatDialog, MatSnackBar } from "@angular/material";
//let share =require('social-share.js')
/** @title Responsive sidenav */
declare let $: any;
declare let editormd: any;
@Component({
  selector: "app-my-nav",
  templateUrl: "my-nav.component.html",
  styleUrls: ["my-nav.component.css", "flex.css"]
})
export class MyNavComponent implements OnDestroy, OnInit, AfterViewInit {
  panelOpenState = false;
  public currentNote: Note;
  public isLogin = this.httpService.isLoggedIn();
  public localStorage = localStorage;
  public notes: Note[];
  public editor: any;
  public JSON: JSON;
  action: any = {
    vision: false,
    router: "",
    name: "",
    icon: ""
  };
  public title: string = "";
  public pageTitle: string = "";

  public name: string;
  snav: any;
  markdown: string = "";
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public httpService: HttpService,
    public router: Router,
    public location: Location,
    public popup: PopupComponent,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  craetNew() {
    this.editor = editormd("xxd", {
      width: "100%",
      height: "100vh",
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
  }
  ngAfterViewInit() {
    // let _this = this;
    this.editor = editormd("xxd", {
      width: "100%",
      height: "88vh",
      path: "assets/editor.md/lib/",
      htmlDecode : true,
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
      tocContainer : "#custom-toc-container",
      tocDropdown   : false,
      onchange: function() {
        //this.watch();
        //this.setMarkdown("###test onloaded");
        //testEditor.setMarkdown("###Test onloaded");
      }
    });
    let _this = this;
    let count:number=0;
    this.editor.on("change", function() {
  
      (count++)
      _this.currentNote.contains = this.getMarkdown();
      _this.currentNote.edit_date = new Date().toLocaleString();
      if(count%50==0){
        _this.save(_this.currentNote)
      }
    });
  }
  ngOnInit(): void {
    console.log(this.location.path());
    $("#btn").click();
    if (this.httpService.isLoggedIn()) {
      this.isLogIn = true;
      this.httpService.getAllNotes().subscribe(res => {
        res.map(i => {
          i.edit_date = i.edit_date.split("T")[0];
        });
        this.notes = res;
      });
    }

    if (this.httpService.isLoggedIn()) {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    }
  }
  getnotes() {
    console.log(localStorage.getItem("name"));

    //this.isLogIn = true;
    this.name = localStorage.getItem("name");
    console.log(this.name);
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
    if(this.currentNote!==undefined){
      if(this.currentNote!==note){
         this.save(this.currentNote)
      }
       
    }
    this.currentNote = note;
    this.editor.setMarkdown(this.currentNote.contains);
  }
  setNewTitle(title: string) {
    this.title = title;
  }
  add() {
    let newNote: Note = new Note();
    newNote.title = this.title == "" ? "InitTitle" : this.title;
    newNote.edit_date = new Date().toLocaleString();
    newNote.owner_id = localStorage.getItem("_id");
    this.httpService.creatNote(newNote).subscribe(res => {
      if (res.status == 200) {
        newNote._id = res.note_id;
      }
    });
    this.notes.push(newNote);
    this.currentNote = newNote;
  }
  public save(note: Note) {
    this.httpService.putNote(this.currentNote).subscribe(res => {
      if (res.status == 200) {
        this.snackBar.open("保存Save", "成功", {
          duration: 2000
        });
      }
    });
  }
  share(note: Note) {
    let url =
      "https://md-server.wangdongdong.xyz/notes/" +
      `${note.owner_id}/${note._id}`;
    window.open(url, "_blank");
    console.log("tag", url);
  }
  delete(note: Note, i: number) {
    this.httpService.deletNote(this.currentNote).subscribe(res => {
      if (res.ok == "1") {
        this.snackBar.open("删除", "成功", {
          duration: 2000
        });

        this.notes.splice(i, 1);
        console.log(i);
      }
    });
  }
  SignIn() {
    this.router.navigate(["/login"]);
    const dialogRef = this.dialog.open(PopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (this.httpService.isLoggedIn()) {
        this.httpService.getAllNotes().subscribe(res => {
          res.map(i => {
            i.edit_date = i.edit_date.split("T")[0];
          });
          this.notes = res;
        });
      }
    });
  }
  logOut() {
    this.httpService.logout();
    if (this.httpService.isLoggedOut()) {
      this.isLogIn = false;
      this.name = "";
      this.notes = [];
    }
  }
  mobileQuery: MediaQueryList;
  isLogIn: boolean = false;
  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h =>
    h.test(window.location.host)
  );
}
