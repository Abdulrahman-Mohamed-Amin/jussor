import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewsService } from '../../../../core/services/news/news.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Project } from '../../../../core/interfaces/project';
import { News } from '../../../../core/interfaces/news';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  errorMessage: string = ''
  news: any[] = []

  isEditMode: boolean = false;

  selectedNewsId: number | null = null;
  selectedNews: News | null = null;

  videoFile: File | null = null;

  imageFiles: File[] = []

  imgToDelete: string = ""
  selectedImgeToDelete: boolean = false

  // ============= form ================
  addForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', Validators.required),
    arDescription: new FormControl('', Validators.required),
    enTitle: new FormControl('', Validators.required),
    enDescription: new FormControl('', Validators.required),
    videoPath: new FormControl(null),
    imagePaths: new FormControl([]),
    ImagesToDelete: new FormControl(null)
  })


  constructor(private _newsService: NewsService, private toast: ToastrService) { }


  ngOnInit(): void {
    this.getNews()
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


  getNews() {

    this._newsService.getAllNews().subscribe(res => {
      this.news = res
      console.log(res);

    })
  }

  // ================= add ===================

  addNew() {
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

    if (this.addForm.valid) {
      this._newsService.addNew(formData).subscribe({
        next: (res) => {

        },
        error: (err) => {
          if (err.status) {
            this.toast.error('انتهت الجلسة سجل الدخول مرة أخرى')
          } else {
            this.toast.error("حدث خطأ ما")
          }
        },
        complete: () => {
          // window.location.reload()
        }
      })
    } else {
      this.toast.error('بعض الحقول فارغة')
    }

  }
  // ============================= edit ======================

  editNew(news: any) {
    this.isEditMode = true;
    this.selectedNewsId = news.id;
    this.selectedNews = news
    this.addForm.patchValue({
      arTitle: news.arTitle,
      arDescription: news.arDescription,
      enTitle: news.enTitle,
      enDescription: news.enDescription,
    });

    this.videoFile = null;
    this.imageFiles = [];
    console.log(this.selectedNews);

  }


  updateNew() {
    if (!this.selectedNewsId) {
      this.toast.error('لم يتم تحديد الخبر');
      return;
    }

    const formData = new FormData();

    // البيانات النصية
    formData.append('id', this.selectedNewsId.toString());
    formData.append('arTitle', this.addForm.value.arTitle);
    formData.append('arDescription', this.addForm.value.arDescription);
    formData.append('enTitle', this.addForm.value.enTitle);
    formData.append('enDescription', this.addForm.value.enDescription);

    // ✅ الفيديو (لو المستخدم اختار فيديو جديد)
    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }

    // ✅ الصور الجديدة
    if (this.imageFiles.length > 0) {
      this.imageFiles.forEach((img) => {
        formData.append('imageFiles', img);
      });
    } else {

      formData.append('imagePaths', this.addForm.value.imageFiles);
    }

    // ✅ الصور المراد حذفها (array of string)
    const imagesToDelete = this.addForm.value.ImagesToDelete;
    if (imagesToDelete && imagesToDelete.length > 0) {
      imagesToDelete.forEach((img: string) => {
      });
    }
    console.log(imagesToDelete);

    formData.append('ImagesToDelete', this.imgToDelete);

    // ✅ إرسال الداتا
    this._newsService.editNew(this.selectedNewsId, formData).subscribe({
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
        // window.location.reload();
      }
    });
  }


  show(path: string) {

    if (this.imgToDelete == '') {
      this.imgToDelete = path
    }else{
      this.imgToDelete = ''
    }
    console.log(this.imgToDelete);
    
    this.selectedImgeToDelete = !this.selectedImgeToDelete
  }

  // =============================delete======================
  deleteNew(idx: number, id: number) {
    this._newsService.deleteNew(id).subscribe({
      next: (res) => {
        this.toast.success("تم حذف الخبر بنجاح")
        this.news.splice(idx, 1)
      },
      error: (err) => {

        if (err.status == 401) {

          this.toast.error('انتهت الجلسة سجل الدخول مرة أخري')
        } else {
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
      this.updateNew();
    } else {
      this.addNew();
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
