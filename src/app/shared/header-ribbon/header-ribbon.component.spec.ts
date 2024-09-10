import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRibbonComponent } from './header-ribbon.component';

describe('HeaderRibbonComponent', () => {
  let component: HeaderRibbonComponent;
  let fixture: ComponentFixture<HeaderRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRibbonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
