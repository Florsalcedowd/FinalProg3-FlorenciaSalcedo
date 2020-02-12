import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReactivaComponent } from './tabla-reactiva.component';

describe('TablaReactivaComponent', () => {
  let component: TablaReactivaComponent;
  let fixture: ComponentFixture<TablaReactivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaReactivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReactivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
