import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ProjectStatusService } from '../../../../core/services/projects/project-status.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects-status',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './projects-status.component.html',
  styleUrl: './projects-status.component.css',
})
export class ProjectsStatusComponent implements OnInit {
  status: any[] = [];
  openEditForm: boolean = false
  statusForm: FormGroup = new FormGroup({
    enName: new FormControl('', Validators.required),
    arName: new FormControl('', Validators.required),
  });

  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    enName: new FormControl('', Validators.required),
    arName: new FormControl('', Validators.required),
  });

  constructor(
    private _statusService: ProjectStatusService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getstatus();
  }
  // ========= add ================
  addStatus() {
    if (this.statusForm.valid) {
      this._statusService.addProjectStatus(this.statusForm.value).subscribe({
        next: (res) => {
          this.status.push(this.statusForm.value)
          this.toast.success('تمت الاضافة بنجاح');
          this.statusForm.reset();
        },
        error: (err) => {
          if (err.status == 401) {
            this.toast.error('انتهت الجلسة سجل الدخول مرة أخري');
          } else {
            this.toast.error('حدث خطأ ما');
          }
        },
        complete: () => {

        }
      });
    } else {
      this.toast.error('بعض الحقول فارغة');
    }
  }

  // ========= get ================

  getstatus() {
    this._statusService.getALlStatus().subscribe((res) => {
      this.status = res;
    });
  }

  // ========= edit ================

  editProject(id: number, item: any) {
    this.openEditForm = true

    this.editForm.patchValue({
      id: item.id,
      enName: item.enName,
      arName: item.arName,
    })

  }

  sendEditRequest() {

    if (this.editForm.valid) {
      this._statusService.editStatus(this.editForm.value).subscribe({
        next: (res) => {

          this.toast.success("تم تعديل الحالة")
        },
        error: (err) => {
          if (err.status == 401) {
            this.toast.error('انتهت الجلسة سجل الدخول مرة أخري');
          } else {
            this.toast.error('حدث خطأ ما');
          }
        },
        complete: () => {
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
    } else {
      this.toast.error('بعض الحقول فارغة')
    }

  }
  // ========= delete ================
  deleteProject(index: number, id: number) {
    this._statusService.deleteStatus(id).subscribe({
      next: (res) => {
        this.status.splice(index, 1);
        this.toast.success("تم حذف الحالة بنجاح")
      },
      error: (err) => {
        if (err.status == 401) {
          this.toast.error('انتهت الجلسة سجل الدخول مرة أخري');
        } else {
          this.toast.error('حدث خطأ ما');
        }
      },
    });
  }

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
}
