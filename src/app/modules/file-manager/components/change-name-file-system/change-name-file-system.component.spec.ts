import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNameFileSystemComponent } from './change-name-file-system.component';

describe('ChangeNameFileSystemComponent', () => {
  let component: ChangeNameFileSystemComponent;
  let fixture: ComponentFixture<ChangeNameFileSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeNameFileSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeNameFileSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
