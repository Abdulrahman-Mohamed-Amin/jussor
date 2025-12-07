import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OurservicesService } from '../../../../core/services/our-services/ourservices.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
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
  // ============= form ================
  addForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', Validators.required),
    arDescription: new FormControl('', Validators.required),
    enTitle: new FormControl('', Validators.required),
    enDescription: new FormControl('', Validators.required),
    VideoPath: new FormControl(null),
    ImageFiles: new FormControl([]),
  })

  constructor(private _services: OurservicesService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getServices()
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

  closeForm(){
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

    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }

    // صور متعددة
    if (this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }

    if(this.addForm.valid){
          this._services.addService(formData).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);

      },
      complete: () => {
        window.location.reload()
      }
    })
    }else{
      this.toast.error('بعض الحقول فارغة')
    }

  }
  // ============================= edit ======================

  editService(service: any) {
    this.isEditMode = true;
    this.selectedProjectId = service.id;

    this.addForm.patchValue({
      arTitle: service.arTitle,
      arDescription: service.arDescription,
      enTitle: service.enTitle,
      enDescription: service.enDescription,
    });

    this.videoFile = null;
    this.imageFiles = [];

  }

  updateServic() {
    const formData = new FormData()
    formData.append('arTitle', this.addForm.value.arTitle);
    formData.append('arDescription', this.addForm.value.arDescription);
    formData.append('enTitle', this.addForm.value.enTitle);
    formData.append('enDescription', this.addForm.value.enDescription);

    if (this.videoFile) {
      formData.append('videoPath', this.videoFile);
    }

    // صور متعددة
    if (this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    }


    this._services.editService(this.selectedProjectId!, formData).subscribe({
      next: (res) => {
        this.addForm.reset()
        this.isEditMode = false;
        this.selectedProjectId = null;
        this.toast.success("تم تعديل الخدمة بنجاح")
      },
      error: (err) => {
        console.log(err);
      },
      complete:() =>{
        window.location.reload()
      }
    })


  }
  // =============================delete======================
  deleteService(idx: number, id: number) {
    this._services.deleteService(id).subscribe({
      next: (res) => {
        this.toast.success("تم حذف الخدمة بنجاح")
        this.services.splice(idx, 1)
      },
      error: (err) => {
        
        if(err.status == 401){

          this.toast.error('انتهت الجلسة سجل الدخول مرة أخري')
        }else{
          this.toast.error('حدث خطأأشناء الحذف')
        }
      },
      complete: () => {
      }
    })
  }


  // ================================= submit ======================

  onSubmit() {
 
    if (this.isEditMode) {
      this.updateServic();
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
