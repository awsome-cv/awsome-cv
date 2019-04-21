import {
  AfterViewInit,
  Attribute,
  Directive,
  EventEmitter,
  Input,
  Output
} from "@angular/core";
import { EditorConfig } from "./editor-config";

declare var editormd: any;
declare var $: any;
declare var testEditor: any;
@Directive({
  selector: "[appEditorMd]"
})
export class EditorMdDirective implements AfterViewInit {
  @Input() editormdConfig: EditorConfig; // 配置选项
  @Output() onEditorChange: EventEmitter<string> = new EventEmitter<string>(); // 发射器
  @Output() onEditorLoad: EventEmitter<string> = new EventEmitter<string>(); // 发射器
  editor: any; // editormd编辑器

  constructor(@Attribute("id") private id: string) {}

  ngAfterViewInit(): void {}
}
