import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeroviComponent } from './smerovi.component';

describe('SmeroviComponent', () => {
  let component: SmeroviComponent;
  let fixture: ComponentFixture<SmeroviComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmeroviComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmeroviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
