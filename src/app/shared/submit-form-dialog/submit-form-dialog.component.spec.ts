import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFormDialogComponent } from './submit-form-dialog.component';

describe('SubmitFormDialogComponent', () => {
  let component: SubmitFormDialogComponent;
  let fixture: ComponentFixture<SubmitFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
