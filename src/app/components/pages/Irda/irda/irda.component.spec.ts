import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrdaComponent } from './irda.component';

describe('IrdaComponent', () => {
  let component: IrdaComponent;
  let fixture: ComponentFixture<IrdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrdaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IrdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
