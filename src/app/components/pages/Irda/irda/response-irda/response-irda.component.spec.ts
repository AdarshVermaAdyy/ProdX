import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseIrdaComponent } from './response-irda.component';

describe('ResponseIrdaComponent', () => {
  let component: ResponseIrdaComponent;
  let fixture: ComponentFixture<ResponseIrdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseIrdaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseIrdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
