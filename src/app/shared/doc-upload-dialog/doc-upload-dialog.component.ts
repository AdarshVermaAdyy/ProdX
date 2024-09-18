import { Component, Inject, ViewChild } from '@angular/core';
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
import { MatTable, MatTableModule } from '@angular/material/table';

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
  CommonModule,
MatTableModule],
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
  selectedTab ="Create New Document Category";
 moveToUpload = false;
 docList = [];
 displayedColumns = ['category',"documentName","action"];
 selectedCategory : any;

  categoryList =["Compliance","Draft Product Specifications","Internal Product Approval Documents"]

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<DocUploadDialogComponent>){}

  handleFileInputChange(l,event): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
    
  
  }
  uploadDoc(files){
    if(files.length){
      for(let i=0;i<files.length;i++){
        this.docList.push({category:this.selectedCategory,documentName:files[i].name})
      }
      this.table.renderRows();
      this.display.patchValue("");
    }
    
  }

  deleteFile(data){
    console.log(data);
    const index = this.docList.findIndex(x=>x.documentName == data.documentName && x.category == data.category)
    if(index!=-1){
      this.docList.splice(index,1)
    }
    this.table.renderRows()
  }

  selectedTabValue(event){
    console.log(event)
    this.categorySelect.reset();
    this.categoryNameText.reset();
    this.selectedTab = event.tab.textLabel;
  }

  choseCategory(type : string){
    if(type=='create'){
      if(this.categoryNameText.invalid){
        this.categoryNameText.markAsTouched();
        this.moveToUpload = false;
      }else{
        this.selectedCategory = this.categoryNameText.value;
        this.moveToUpload = true;
      }
    }else if(type=='select'){
      if(this.categorySelect.invalid){
        this.categorySelect.markAsTouched();
        this.moveToUpload = false;
      }else{
        this.selectedCategory = this.categorySelect.value;
        this.moveToUpload = true;
      }
    }
  }
}
