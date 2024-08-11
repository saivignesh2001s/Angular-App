import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpEditAddComponentComponent } from './emp-edit-add-component.component';

describe('EmpEditAddComponentComponent', () => {
  let component: EmpEditAddComponentComponent;
  let fixture: ComponentFixture<EmpEditAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpEditAddComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpEditAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
