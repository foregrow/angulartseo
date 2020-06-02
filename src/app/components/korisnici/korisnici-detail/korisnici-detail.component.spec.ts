import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciDetailComponent } from './korisnici-detail.component';

describe('KorisniciDetailComponent', () => {
  let component: KorisniciDetailComponent;
  let fixture: ComponentFixture<KorisniciDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisniciDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
