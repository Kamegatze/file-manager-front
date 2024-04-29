import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponentFileSystemComponent } from './delete-component-file-system.component';

describe('DeleteComponentFileSystemComponent', () => {
  let component: DeleteComponentFileSystemComponent;
  let fixture: ComponentFixture<DeleteComponentFileSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteComponentFileSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteComponentFileSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
