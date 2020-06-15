import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UceniciAddComponent } from './ucenici-add.component';

describe('UceniciAddComponent', () => {
  let component: UceniciAddComponent;
  let fixture: ComponentFixture<UceniciAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UceniciAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UceniciAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
