import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IspitUpisComponent } from './ispit-upis.component';

describe('IspitUpisComponent', () => {
  let component: IspitUpisComponent;
  let fixture: ComponentFixture<IspitUpisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IspitUpisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IspitUpisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
