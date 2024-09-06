import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsingTemplateComponent } from './create-using-template.component';

describe('CreateUsingTemplateComponent', () => {
  let component: CreateUsingTemplateComponent;
  let fixture: ComponentFixture<CreateUsingTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsingTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUsingTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
