import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule,  MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
// quill editor
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
//import Block from 'quill/blots/block';

// Block.tagName = "DIV";
// Quill.register(Block, true);

@Component({
  selector: 'app-blog-editor',
  standalone: true,
  imports: [QuillEditorComponent,CommonModule, FormsModule, ReactiveFormsModule, MatChipsModule, MatFormFieldModule, MatInputModule] ,
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
      <div class="mb-3 col-10">  
        <mat-form-field class="full-width" appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput>
        </mat-form-field>
      </div>

      <div class="mb-2 col-10">
        <mat-form-field class="full-width" appearance="outline">
          <mat-label>Tags</mat-label>
          <mat-chip-grid #chipList>
            <mat-chip-row *ngFor="let tag of tags" (removed)="remove(tag)">
              {{tag}}
              <button matChipRemove>
                <i class="bi bi-x-circle-fill"></i>
              </button>
            </mat-chip-row>
            <input [matChipInputFor]="chipList"
              [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
              [matChipInputAddOnBlur]="addOnBlur"
              (matChipInputTokenEnd)="add($event)">
          </mat-chip-grid>
        </mat-form-field>
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
        <button type="submit" class="btn btn-primary me-3">Submit</button>
        <button type="submit" class="btn btn-light">Cancel</button>
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

  // mat chip list configs
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	addOnBlur = true;
	tags: string[] = [];

  // ctor
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) { }

  toogleHtmlEditr(): void {
    this.htmlEditorEnabled = !this.htmlEditorEnabled;
  }

  
  	// add a tag into tag list
	add(event: MatChipInputEvent): void {
		const value = (event.value || '').trim();

		// Add our fruit
		if (value) {
			this.tags.push(value);
		}

		// Clear the input value
		event.chipInput!.clear();
	}

	// remove a tag from the tag list
	remove(tag: string): void {
		const index = this.tags.indexOf(tag);

		if (index >= 0) {
			this.tags.splice(index, 1);
		}
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
