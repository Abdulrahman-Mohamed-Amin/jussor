import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsDetilsComponent } from './projects-detils.component';

describe('ProjectsDetilsComponent', () => {
  let component: ProjectsDetilsComponent;
  let fixture: ComponentFixture<ProjectsDetilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsDetilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsDetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
