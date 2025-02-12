import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
//import Block from 'quill/blots/block';

// Block.tagName = "DIV";
// Quill.register(Block, true);

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [QuillEditorComponent, FormsModule, ReactiveFormsModule],
  template: `
    <h4 class="mb-3">Blog Editor</h4>
    <!--
    <p>focused: {{ focused }}, blurred: {{ blurred }}</p>
    <quill-editor [styles]="{height: '200px'}" 
        (onFocus)="focus($event)" 
        (onNativeFocus)="nativeFocus($event)" 
        (onEditorChanged)="changedEditor($event)" 
        (onBlur)="blur($event)" 
        (onNativeBlur)="nativeBlur($event)" 
        (onEditorCreated)="created($event)">
    </quill-editor>
    -->

    <form [formGroup]="form">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input class="form-control">
      </div>
      @if (htmlEditorEnabled) {
        <div class="mb-1">
          <button type="button" class="btn btn-light" (click)="toogleHtmlEditr()"><i class="bi bi-code"></i> Code</button> 
        </div>
        
        <quill-editor [styles]="{height: '580px'}"  format="html" formControlName="html"></quill-editor>
      }
      @else {
        <div class="mb-1">
          <button type="button" class="btn btn-light" (click)="toogleHtmlEditr()"><i class="bi bi-code-slash"></i> Editor</button> 
        </div>
        <textarea class="form-control editor" formControlName="html"></textarea>
      }      

      <div class="col-12 mt-3">
        <button type="submit" class="btn btn-primary btn-lg me-3">Submit</button>
        <button type="submit" class="btn btn-light btn-lg">Cancel</button>
      </div>

     
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
