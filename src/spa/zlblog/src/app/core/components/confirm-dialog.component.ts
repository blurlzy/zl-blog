import { Component, inject } from '@angular/core';
// angular material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-confirm-dialog',
  imports: [ MatDialogModule, MatButtonModule ],
  template: `
      <h2  mat-dialog-title class="text-danger"><i class="bi bi-exclamation-triangle"></i></h2>
      <div mat-dialog-content>
            <span> {{ data.message }}</span>
      </div>
      <div mat-dialog-actions>
        <button type="button" class="btn btn-light me-2" [mat-dialog-close]="false" cdkFocusInitial >Close</button>
        <button type="button" class="btn btn-primary me-3" (click)="confirm()">Confirm</button>          
      </div>
  `,
  styles: ``
})
export class ConfirmDialogComponent {
  // message = input.required<string>();
  //@Input({ required: true }) message: string = '';
  // inject the dialog reference
  private readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);

  confirm(): void {
	  // emit true value to the caller
	  this.dialogRef.close(true);
  }
}
