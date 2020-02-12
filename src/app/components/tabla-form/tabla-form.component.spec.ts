import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFormComponent } from './tabla-form.component';

describe('TablaFormComponent', () => {
  let component: TablaFormComponent;
  let fixture: ComponentFixture<TablaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
