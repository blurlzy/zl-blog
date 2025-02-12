import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import Block from 'quill/blots/block';

Block.tagName = "DIV";
Quill.register(Block, true);

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule, ReactiveFormsModule],
  template: `
    <h3 id="focusBlur">Default editor with height of 200px</h3>
    <p>focused: {{ focused }}, blurred: {{ blurred }}</p>
    <quill-editor [styles]="{height: '200px'}" 
        (onFocus)="focus($event)" 
        (onNativeFocus)="nativeFocus($event)" 
        (onEditorChanged)="changedEditor($event)" 
        (onBlur)="blur($event)" 
        (onNativeBlur)="nativeBlur($event)" 
        (onEditorCreated)="created($event)">
    </quill-editor>
    
    <form [formGroup]="form">
      @if (htmlEditorEnabled) {
        <div class="mb-1">
          <button type="button" class="btn btn-light" (click)="toogleHtmlEditr()"><i class="bi bi-code"></i> Code</button> 
        </div>
        
        <quill-editor [styles]="{height: '520px'}"  format="html" formControlName="html"></quill-editor>
      }
      @else {
        <div class="mb-1">
          <button type="button" class="btn btn-light" (click)="toogleHtmlEditr()"><i class="bi bi-code-slash"></i> Editor</button> 
        </div>
        <textarea class="form-control editor" formControlName="html"></textarea>
      }
      
    </form>
  `,
  styles: `
    .editor {
      height: 520px;
    }
  `
})
export class BlogEditorComponent {
  blurred = false;
  focused = false;
  htmlEditorEnabled = true;

  form: FormGroup = this.fb.group({
    html: new FormControl('<h2> This is my first blog </h2><img src="https://stlaoshanghaiprod.blob.core.windows.net/photos/444d9356-9153-47f9-9623-07e048023da8.jpg">'),
  });

  // ctor
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) { }

  toogleHtmlEditr(): void {
    this.htmlEditorEnabled = !this.htmlEditorEnabled;
  }

  created(event: Quill | any) {
    // tslint:disable-next-line:no-console
    console.log('editor-created', event)
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection | any) {
    // tslint:disable-next-line:no-console
    console.log('editor-change', event)
  }

  focus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('focus', $event)
    this.focused = true
    this.blurred = false
  }

  nativeFocus($event: any) {
    // tslint:disable-next-line:no-console
    console.log('native-focus', $event)
  }

  blur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('blur', $event)
    this.focused = false
    this.blurred = true
  }

  nativeBlur($event: any) {
    // tslint:disable-next-line:no-console
    console.log('native-blur', $event)
  }
}
