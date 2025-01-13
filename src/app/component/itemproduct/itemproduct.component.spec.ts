import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemproductComponent } from './itemproduct.component';

describe('ItemproductComponent', () => {
  let component: ItemproductComponent;
  let fixture: ComponentFixture<ItemproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemproductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
