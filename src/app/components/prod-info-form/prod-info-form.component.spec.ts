import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdInfoFormComponent } from './prod-info-form.component';

describe('ProdInfoFormComponent', () => {
  let component: ProdInfoFormComponent;
  let fixture: ComponentFixture<ProdInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdInfoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
