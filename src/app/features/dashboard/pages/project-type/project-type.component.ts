import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectTypeService } from '../../../../core/services/projects/project-type.service';

@Component({
  selector: 'app-project-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-type.component.html',
  styleUrl: './project-type.component.css'
})
export class ProjectTypeComponent {
  types: any[] = [];
  openEditForm: boolean = false
  typesForm: FormGroup = new FormGroup({
    enName: new FormControl('', Validators.required),
    arName: new FormControl('', Validators.required),
  });

  editForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    enName: new FormControl('', Validators.required),
    arName: new FormControl('', Validators.required),
  });

  constructor(
    private _typeService: ProjectTypeService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.gettypes();
  }
  // ========= add ================
  addType() {
    if (this.typesForm.valid) {
      this.types.push(this.typesForm.value)
      console.log(this.typesForm.value);
      this._typeService.addProjecttype(this.typesForm.value).subscribe({
        next: (res) => {
          this.toast.success('تمت الاضافة بنجاح');
          this.typesForm.reset();
        },
        error: (err) => {
          if (err.status == 401) {
            this.toast.error('انتهت الجلسة سجل الدخول مرة أخري');
          } else {
            this.toast.error('حدث خطأ ما');
          }
        },
        complete: () => {
          location.reload()
        }
      });
    } else {
      this.toast.error('بعض الحقول فارغة');
    }
  }

  // ========= get ================

  gettypes() {
    this._typeService.getALltype().subscribe((res) => {
      this.types = res;
    });
  }

  // ========= edit ================

  editType(id: number, item: any) {
    this.openEditForm = true

    this.editForm.patchValue({
      id: item.id,
      enName: item.enName,
      arName: item.arName,
    })

  }

  sendEditRequest() {

    if (this.editForm.valid) {
      this._typeService.edittype(this.editForm.value).subscribe({
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
  deleteType(index: number, id: number) {
    this._typeService.deleteType(id).subscribe({
      next: (res) => {
        this.types.splice(index, 1);
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
