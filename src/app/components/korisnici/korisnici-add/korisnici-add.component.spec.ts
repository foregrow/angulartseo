import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciAddComponent } from './korisnici-add.component';

describe('KorisniciAddComponent', () => {
  let component: KorisniciAddComponent;
  let fixture: ComponentFixture<KorisniciAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KorisniciAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
