import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectTypeService } from '../../../../core/services/projects/project-type.service';
import { ProjectStatusService } from '../../../../core/services/projects/project-status.service';
import { ProjectService } from '../../../../core/services/projects/project.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../../core/interfaces/project';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-projects',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-projects.component.html',
  styleUrl: './manage-projects.component.css',
})
export class ManageProjectsComponent implements OnInit {
  types: any[] = [];
  status: any[] = [];
  projects: Project[] = [];
  errorMessage: string = '';
  close: boolean = false

  isEditMode: boolean = false;

  selectedProjectId: number | null = null;
  selectedProject: Project | null = null;

  videoFile: File | null = null;

  imageFiles: File[] = []

  interfaceImageFile: File | null = null;
  proposalFile: File | null = null;

  // ============= form ================
  addForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    arTitle: new FormControl('', Validators.required),
    arDescription: new FormControl('', Validators.required),
    enTitle: new FormControl('', Validators.required),
    enDescription: new FormControl('', Validators.required),
    arlocationName: new FormControl(null, Validators.required),
    enlocationName: new FormControl(null, Validators.required),
    locationUrl: new FormControl('', Validators.required),
    latitude: new FormControl(0),
    longitude: new FormControl(0),
    videoFile: new FormControl(null),
    videoPath: new FormControl(null),
    projectImages: new FormControl([]),
    projectStatusId: new FormControl(null, Validators.required),
    projectTypeId: new FormControl(null, Validators.required),
    interfaceImageFile: new FormControl(null),
    proposalFile: new FormControl(null),
    deleteInterfaceImage: new FormControl(false),
    deleteProposalFile: new FormControl(false),
    imagesToDelete: new FormControl([]),
  });

  constructor(
    private _types: ProjectTypeService,
    private _status: ProjectStatusService,
    private _projects: ProjectService,
    private toast: ToastrService
  ) { }

  



  ngOnInit(): void {
    this.getTypes();
    this.getStatus();
    this.getProjects();
  }

  getStatus() {
    this._status.getALlStatus().subscribe((res) => {
      this.status = res;
    });
  }

  getTypes() {
    this._types.getALltype().subscribe((res) => {
      this.types = res;
    });
  }



  // ============================================================== start CRUD ============================================
  closeForm() {
    this.isEditMode = false
    this.addForm.reset()
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    this.videoFile = file || null;
  }

  onImagesSelected(event: any) {
    const files = event.target.files as FileList;
    this.imageFiles = [];

    for (let i = 0; i < files.length; i++) {
      this.imageFiles.push(files[i]);
    }
  }

  onInterfaceImageSelected(event: any) {
    const file = event.target.files[0];
    this.interfaceImageFile = file || null;
  }

  onProposalFileSelected(event: any) {
    const file = event.target.files[0];
    this.proposalFile = file || null;
  }

  checkForProjects(): boolean {

    for (let index = 0; index < this.projects.length; index++) {

      if (this.addForm.value.arTitle == this.projects[index].arTitle) {

        return false
      }

    }
    return true
  }

  // ====================== get ==================

  getProjects() {
    this._projects.getAllProjects().subscribe((res) => {
      this.projects = res;
      console.log(res);
    });
  }

  // ===================== add ===================

  addProject() {
    const formData = new FormData();

    formData.append('ArTitle', this.addForm.value.arTitle);
    formData.append('ArDescription', this.addForm.value.arDescription);
    formData.append('EnTitle', this.addForm.value.enTitle);
    formData.append('EnDescription', this.addForm.value.enDescription);
    formData.append('arlocationName', this.addForm.value.arlocationName);
    formData.append('enlocationName', this.addForm.value.enlocationName);
    formData.append('LocationUrl', this.addForm.value.locationUrl);
    formData.append('Latitude', this.addForm.value.latitude);
    formData.append('Longitude', this.addForm.value.longitude);
    formData.append('ProjectStatusId', this.addForm.value.projectStatusId);
    formData.append('ProjectTypeId', this.addForm.value.projectTypeId);


    if (this.interfaceImageFile) {
      formData.append('interfaceImageFile', this.interfaceImageFile);
    }

    if (this.proposalFile) {
      formData.append('proposalFile', this.proposalFile);
    }
    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }

    // صور متعددة
    if (this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }

    if (this.addForm.valid) {
      if (this.checkForProjects()) {

        this._projects.addProject(formData).subscribe({
          next: (res) => {
            this.addForm.reset()
            this.toast.success("تم اضافة المشروع بنجاح")
          },
          error: (err) => {
            if (err.status == 401) {
              this.toast.error("انتهت الجلسة سجل الدخول مرة أخري")
            } else {
              this.toast.error("حدث خطأ ما")

            }
          },
          complete: () => {
            window.location.reload()
          }
        });
      } else {
        this.toast.error("المشروع موجود بالفعل")
      }
    } else {
      this.toast.error("بعض الحقول فارغة")
    }
  }


  // ===================== edit ===================
  editProject(idx: number, project: Project) {
    this.addForm.patchValue({
      id: project.id,
      arTitle: project.arTitle,
      arDescription: project.arDescription,
      enTitle: project.enTitle,
      enDescription: project.enDescription,
      arlocationName: project.arLocationName,
      enlocationName: project.enLocationName,
      locationUrl: project.locationUrl,
      latitude: project.latitude,
      longitude: project.longitude,

    });

    this.isEditMode = true
    this.selectedProjectId = project.id;
    this.selectedProject = project

    this.videoFile = null;
    this.interfaceImageFile = null;
    this.proposalFile = null;
    this.imageFiles = [];

  }







  // ====================== delete ===================
  deleteProject(idx: number, id: number) {
    this._projects.deleteProject(id).subscribe({
      next: (res) => {
        this.projects.splice(idx, 1);
        this.toast.success('تم حذف المشروع بنجاح ');
      },
      error: (err) => {
        if (err.status == 401) {
          this.toast.error("انتهت الجلسة سجل الدخول مرة أخري")
        } else {
          this.toast.error("حدث خطأ ما")

        }
      },
    });
  }


  onSubmit() {

    if (this.isEditMode) {
      // this.sendEditRequest();
    } else {
      this.addProject();
    }
  }
  // =============================================== end CRUD =================================
  // ================ english only ================

  allowEnglishOnly(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  // ================ arabic only ================

  allowArabicOnly(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^ء-ي\s\u0621-\u064A]/g, '');
  }

  // =================== vedio only ==================

  validateVideo(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const isVideo = file.type.startsWith('video/');
      const isTooLarge = file.size > 10 * 1024 * 1024;

      if (!isVideo) {
        this.errorMessage = 'الملف يجب أن يكون فيديو فقط';
        input.value = '';
      } else if (isTooLarge) {
        this.errorMessage = 'الملف أكبر من 10 ميغابايت';
        input.value = '';
      } else {
        this.errorMessage = '';
      }
    }
  }


}
