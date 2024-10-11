import { Component, Inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormDataService } from '../../service/form-data.service';
import moment from 'moment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-doc-upload-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
  templateUrl: './doc-upload-dialog.component.html',
  styleUrl: './doc-upload-dialog.component.scss',
})
export class DocUploadDialogComponent {
  title = 'Upload Documents';
  categoryNameText = new FormControl('', [Validators.required]);
  display: FormControl = new FormControl('', Validators.required);
  categorySelect = new FormControl('', [Validators.required]);
  file_list: Array<string> = [];
  file_store: FileList;
  selectedTab = 'Create New Document Category';
  moveToUpload = false;
  docList = [];
  displayedColumns = ['category', 'documentName', 'action'];
  selectedCategory: any;

  categoryList = [
    'Compliance',
    'Draft Product Specifications',
    'Internal Product Approval Documents',
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DocUploadDialogComponent>,
    private formDataService: FormDataService,
    private snackbar: MatSnackBar
  ) {}

  handleFileInputChange(l, event): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue('');
    }
  }
  uploadDoc(files) {
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const globalIndex = this.formDataService
          .getDocList()
          .findIndex(
            (x) =>
              x.category == this.selectedCategory &&
              x.documentName == files[i].name
          );

        const localIndex = this.docList.findIndex(
          (x) =>
            x.category == this.selectedCategory &&
            x.documentName == files[i].name
        );
        if (globalIndex == -1 && localIndex == -1) {
          this.docList.push({
            category: this.selectedCategory,
            documentName: files[i].name,
            uploadDate: moment(new Date()).format('MMMM D, YYYY'),
            size: (files[i].size / 1048576).toFixed(2).toString(),
            fileType: files[i].name.split('.')[1].toUpperCase(),
            fileDetails: URL.createObjectURL(files[i]),
          });
        } else {
          this.openSnackBar();
        }
      }
      this.table.renderRows();
      this.display.patchValue('');
    }
  }

  deleteFile(data) {
    console.log(data);
    const index = this.docList.findIndex(
      (x) => x.documentName == data.documentName && x.category == data.category
    );
    if (index != -1) {
      this.docList.splice(index, 1);
    }
    this.table.renderRows();
  }

  selectedTabValue(event) {
    this.categorySelect.reset();
    this.categoryNameText.reset();
    this.selectedTab = event.tab.textLabel;
  }

  choseCategory(type: string) {
    if (type == 'create') {
      if (this.categoryNameText.invalid) {
        this.categoryNameText.markAsTouched();
        this.moveToUpload = false;
      } else {
        this.selectedCategory = this.categoryNameText.value;
        this.moveToUpload = true;
      }
    } else if (type == 'select') {
      if (this.categorySelect.invalid) {
        this.categorySelect.markAsTouched();
        this.moveToUpload = false;
      } else {
        this.selectedCategory = this.categorySelect.value;
        this.moveToUpload = true;
      }
    }
  }

  changeCategory() {
    this.display.patchValue('');
    this.selectedTab = 'Create New Document Category';
    this.moveToUpload = false;
  }

  closeAndUpload() {
    if (this.docList.length < 1) {
      return;
    }
    this.formDataService.addDocument(this.docList);
  }

  openSnackBar() {
    this.snackbar.open('File with same name already uploaded', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
    });
  }

  previewFile(file) {
    // const url = URL.createObjectURL(file?.fileDetails);
    window.open(file?.fileDetails);
  }
}
