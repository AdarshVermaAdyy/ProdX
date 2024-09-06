import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderInformationComponent } from './rider-information.component';

describe('RiderInformationComponent', () => {
  let component: RiderInformationComponent;
  let fixture: ComponentFixture<RiderInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiderInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiderInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
