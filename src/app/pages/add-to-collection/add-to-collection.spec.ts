import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCollection } from './add-to-collection';

describe('AddToCollection', () => {
  let component: AddToCollection;
  let fixture: ComponentFixture<AddToCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCollection],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToCollection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
