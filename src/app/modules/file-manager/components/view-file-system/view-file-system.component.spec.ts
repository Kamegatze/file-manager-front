import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFileSystemComponent } from './view-file-system.component';

describe('ViewFileSystemComponent', () => {
  let component: ViewFileSystemComponent;
  let fixture: ComponentFixture<ViewFileSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewFileSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFileSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
