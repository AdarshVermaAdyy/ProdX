import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocUploadDialogComponent } from './doc-upload-dialog.component';

describe('DocUploadDialogComponent', () => {
  let component: DocUploadDialogComponent;
  let fixture: ComponentFixture<DocUploadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocUploadDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
