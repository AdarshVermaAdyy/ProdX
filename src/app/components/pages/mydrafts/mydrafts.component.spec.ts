import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydraftsComponent } from './mydrafts.component';

describe('MydraftsComponent', () => {
  let component: MydraftsComponent;
  let fixture: ComponentFixture<MydraftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MydraftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MydraftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
