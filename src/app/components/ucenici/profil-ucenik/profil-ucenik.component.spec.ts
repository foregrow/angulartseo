import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUcenikComponent } from './profil-ucenik.component';

describe('ProfilUcenikComponent', () => {
  let component: ProfilUcenikComponent;
  let fixture: ComponentFixture<ProfilUcenikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilUcenikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilUcenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
