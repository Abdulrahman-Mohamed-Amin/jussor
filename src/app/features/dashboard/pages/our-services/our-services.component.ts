import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OurservicesService } from '../../../../core/services/our-services/ourservices.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { News } from '../../../../core/interfaces/news';
import { Service } from '../../../../core/interfaces/service';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent implements OnInit {
  services: any[] = []
  isEditMode: boolean = false;

  selectedProjectId: number | null = null;

  videoFile: File | null = null;

  imageFiles: File[] = [];
  errorMessage: string = ''

  selectedServiceId: number | null = null;
  selectedService: Service | null = null;

  imgToDelete: string = ""
  selectedImgeToDelete: boolean = false
  // ============= form ================
  addForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', Validators.required),
    arDescription: new FormControl('', Validators.required),
    enTitle: new FormControl('', Validators.required),
    enDescription: new FormControl('', Validators.required),
    VideoPath: new FormControl(null),
    ImageFiles: new FormControl([], Validators.required),
    ImagesToDelete: new FormControl(null),
  })

  constructor(private _services: OurservicesService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getServices()
  }

  toggleImageRequired() {
    const control = this.addForm.get('ImageFiles');

    if (this.isEditMode) {
      control?.clearValidators(); // ✅ في التعديل الصور مش إجبارية
    } else {
      control?.setValidators([Validators.required]); // ✅ في الإضافة الصور إجبارية
    }

    control?.updateValueAndValidity();
  }

  // ===================================================== start CRUD =========================================

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

  closeForm() {
    this.isEditMode = false
    this.addForm.reset()
  }


  getServices() {
    this._services.getAllServices().subscribe(res => {
      this.services = res
      console.log(res);

    })
  }

  // ================= add ===================

  addService() {
    const formData = new FormData()

    formData.append('arTitle', this.addForm.value.arTitle)
    formData.append('arDescription', this.addForm.value.arDescription)
    formData.append('enTitle', this.addForm.value.enTitle)
    formData.append('enDescription', this.addForm.value.enDescription)

    if (this.videoFile instanceof File) {
      formData.append('videoFile', this.videoFile);
    }

    // ✅✅ الصور الجديدة → تتبعت فقط لو فيه صور فعلية
    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }

    if (this.addForm.valid) {
      this._services.addService(formData).subscribe({
        next: (res) => {
          this.toast.success("تمت اضافة الخدمة بنجاح")
        },
        error: (err) => {

          if (err.status === 401) {
            this.toast.error('انتهت الجلسة سجل الدخول مرة أخرى');
          } else {
            this.toast.error('حدث خطأ أثناء التحديث');
          }
        },
        complete: () => {
          window.location.reload()
        }
      })
    } else {
      this.toast.error('بعض الحقول فارغة')
    }

  }
  // =============================================================== edit ========================================================

  editService(service: any) {
    this.isEditMode = true;
    this.selectedProjectId = service.id;
    this.toggleImageRequired()
    this.addForm.patchValue({
      arTitle: service.arTitle,
      arDescription: service.arDescription,
      enTitle: service.enTitle,
      enDescription: service.enDescription,
    });

    this.selectedServiceId = service.id
    this.selectedService = service
    this.videoFile = null;
    this.imageFiles = [];

  }

  updateService() {
    if (!this.selectedServiceId) {
      this.toast.error('لم يتم تحديد الخبر');
      return;
    }

    const formData = new FormData();

    // البيانات النصية
    formData.append('id', this.selectedServiceId.toString());
    formData.append('arTitle', this.addForm.value.arTitle);
    formData.append('arDescription', this.addForm.value.arDescription);
    formData.append('enTitle', this.addForm.value.enTitle);
    formData.append('enDescription', this.addForm.value.enDescription);

    if (this.videoFile instanceof File) {
      formData.append('videoFile', this.videoFile);
    }

    // ✅✅ الصور الجديدة → تتبعت فقط لو فيه صور فعلية
    if (this.imageFiles && this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }

    // ✅ الصور المراد حذفها (array of string)

    formData.append('ImagesToDelete', this.imgToDelete);


    const control = this.addForm.get('ImageFiles');

    if (this.imgToDelete !== '') {
      control?.setValidators([Validators.required]); // ✅ في الإضافة الصور إجبارية
    }

    control?.updateValueAndValidity();


    // console.log(imagesToDelete);

    if (this.addForm.valid) {
      // ✅ إرسال الداتا
      this._services.editService(this.selectedServiceId, formData).subscribe({
        next: (res) => {
          this.toast.success('تم تحديث الخبر بنجاح ✅');
        },
        error: (err) => {
          if (err.status === 401) {
            this.toast.error('انتهت الجلسة سجل الدخول مرة أخرى');
          } else {
            this.toast.error('حدث خطأ أثناء التحديث');
          }
        },
        complete: () => {
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      });
    } else {
      this.toast.error('بعض الحقول فارغة')
    }
  }



  show(path: string) {

    if (this.imgToDelete == '') {
      this.imgToDelete = path
    } else {
      this.imgToDelete = ''
    }
    console.log(this.imgToDelete);

    this.selectedImgeToDelete = !this.selectedImgeToDelete
  }
  // =============================delete======================
  deleteService(idx: number, id: number) {
    this._services.deleteService(id).subscribe({
      next: (res) => {
        this.toast.success("تم حذف الخدمة بنجاح")
        this.services.splice(idx, 1)
      },
      error: (err) => {

        if (err.status == 401) {

          this.toast.error('انتهت الجلسة سجل الدخول مرة أخري')
        } else {
          this.toast.error('حدث خطأأشناء الحذف')
        }
      },
      complete: () => {
        setTimeout(() => {
          location.reload()
        }, 500);
      }
    })
  }


  // ================================= submit ======================

  onSubmit() {

    if (this.isEditMode) {
      this.updateService();
    } else {
      this.addService();
    }
  }

  // ===================================================== end CRUD =========================================

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
      const isTooLarge = file.size > 10 * 1024 * 1024; // 10 ميغابايت

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
