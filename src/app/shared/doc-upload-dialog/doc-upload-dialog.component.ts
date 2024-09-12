import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-doc-upload-dialog',
  standalone: true,
  imports: [MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
  CommonModule],
  templateUrl: './doc-upload-dialog.component.html',
  styleUrl: './doc-upload-dialog.component.scss'
})
export class DocUploadDialogComponent {

  title = "Upload Documents"
  categoryNameText = new FormControl('', [Validators.required]);
  display: FormControl = new FormControl("", Validators.required);
  categorySelect= new FormControl('', [Validators.required]);
  file_list: Array<string> = [];
  file_store: FileList;

  categoryList =["Compliance","Draft Product Specifications","Internal Product Approval Documents"]

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<DocUploadDialogComponent>){}

  handleFileInputChange(l: FileList,event): void {
    console.log(event,l)
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }
}
