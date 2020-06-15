import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UceniciDetailComponent } from './ucenici-detail.component';

describe('UceniciDetailComponent', () => {
  let component: UceniciDetailComponent;
  let fixture: ComponentFixture<UceniciDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UceniciDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UceniciDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
