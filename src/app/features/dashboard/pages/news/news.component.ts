// ===================== Imports =====================
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { NewsService } from '../../../../core/services/news/news.service';
import { News } from '../../../../core/interfaces/news';


// ===================== Component =====================
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {

  // ===================== Global States =====================

  errorMessage: string = '';
  news: News[] = [];

  isEditMode: boolean = false;

  selectedNewsId: number | null = null;
  selectedNews: News | null = null;

  videoFile: File | null = null;
  imageFiles: File[] = [];

  imgToDelete: string = '';
  selectedImgeToDelete: boolean = false;


  // ===================== Reactive Form =====================

  addForm: FormGroup = new FormGroup({
    arTitle: new FormControl('', Validators.required),
    arDescription: new FormControl('', Validators.required),
    enTitle: new FormControl('', Validators.required),
    enDescription: new FormControl('', Validators.required),

    videoPath: new FormControl(null),

    imagePaths: new FormControl([], Validators.required),
    ImagesToDelete: new FormControl(null),
  });


  // ===================== Constructor =====================

  constructor(
    private _newsService: NewsService,
    private toast: ToastrService
  ) { }


  // ===================== Lifecycle =====================

  ngOnInit(): void {
    this.getNews();
  }


  // ===================== Toggle Required For Images =====================
  toggleImageRequired() {
    const control = this.addForm.get('imagePaths');

    if (this.isEditMode) {
      control?.clearValidators(); // ✅ في التعديل الصور مش إجبارية
    } else {
      control?.setValidators([Validators.required]); // ✅ في الإضافة الصور إجبارية
    }

    control?.updateValueAndValidity();
  }


  // ===================== File Handlers =====================

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


  // ===================== UI Helpers =====================

  closeForm() {
    this.isEditMode = false;
    this.addForm.reset();
    this.videoFile = null;
    this.imageFiles = [];
  }


  show(path: string) {
    this.imgToDelete = this.imgToDelete === '' ? path : '';
    this.selectedImgeToDelete = !this.selectedImgeToDelete;
  }


  // ===================== Get All News =====================

  getNews() {
    this._newsService.getAllNews().subscribe(res => {
      this.news = res;
    });
  }


  // ===================== Add New =====================

  addNew() {
    if (!this.addForm.valid) {
      this.toast.error('بعض الحقول فارغة');
      return;
    }

    const formData = new FormData();

    // ✅ البيانات النصية
    formData.append('arTitle', this.addForm.value.arTitle);
    formData.append('arDescription', this.addForm.value.arDescription);
    formData.append('enTitle', this.addForm.value.enTitle);
    formData.append('enDescription', this.addForm.value.enDescription);

    // ✅ الفيديو
    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }

    // ✅ الصور
    if (this.imageFiles.length > 0) {
      this.imageFiles.forEach(img => {
        formData.append('imageFiles', img);
      });
    }

    this._newsService.addNew(formData).subscribe({
      next: () => this.toast.success('تم إضافة الخبر بنجاح ✅'),
      error: (err) => {
        err.status
          ? this.toast.error('انتهت الجلسة، سجل الدخول مرة أخرى')
          : this.toast.error('حدث خطأ ما');
      },
      complete: () => setTimeout(() => window.location.reload(), 1000)
    });
  }


  // ===================== Edit Mode =====================

  editNew(news: News) {
    this.isEditMode = true;
    this.selectedNewsId = news.id!;
    this.selectedNews = news;

    this.toggleImageRequired();

    this.addForm.patchValue({
      arTitle: news.arTitle,
      arDescription: news.arDescription,
      enTitle: news.enTitle,
      enDescription: news.enDescription,
    });

    this.videoFile = null;
    this.imageFiles = [];
  }


  // ===================== Update =====================

  updateNew() {
    if (!this.selectedNewsId) {
      this.toast.error('لم يتم تحديد الخبر');
      return;
    }

    // ✅ اجبار المستخدم يضيف صورة لو مسح واحدة
    const control = this.addForm.get('imagePaths');
    if (this.imgToDelete !== '') {
      control?.setValidators([Validators.required]);
    }
    control?.updateValueAndValidity();

    if (!this.addForm.valid) {
      this.toast.error('بعض الحقول فارغة');
      return;
    }

    const formData = new FormData();

    // ✅ البيانات النصية
    formData.append('id', this.selectedNewsId.toString());
    formData.append('arTitle', this.addForm.value.arTitle);
    formData.append('arDescription', this.addForm.value.arDescription);
    formData.append('enTitle', this.addForm.value.enTitle);
    formData.append('enDescription', this.addForm.value.enDescription);

    // ✅ الفيديو
    if (this.videoFile) {
      formData.append('videoFile', this.videoFile);
    }

    // ✅ الصور الجديدة
    if (this.imageFiles.length > 0) {
      this.imageFiles.forEach(img => {
        formData.append('imageFiles', img);
      });
    }

    // ✅ الصور المحذوفة
    formData.append('ImagesToDelete', this.imgToDelete);


    if (this.addForm.valid) {
      
      this._newsService.editNew(this.selectedNewsId, formData).subscribe({
        next: () => this.toast.success('تم تحديث الخبر بنجاح ✅'),
        error: (err) => {
          err.status === 401
            ? this.toast.error('انتهت الجلسة، سجل الدخول مرة أخرى')
            : this.toast.error('حدث خطأ أثناء التحديث');
        },
        complete: () => setTimeout(() => window.location.reload(), 1000)
      });
    } else {
      this.toast.error("بعض الحقول فارغة")
    }
  }


  // ===================== Delete =====================

  deleteNew(idx: number, id: number) {
    this._newsService.deleteNew(id).subscribe({
      next: () => {
        this.toast.success('تم حذف الخبر بنجاح ✅');
        this.news.splice(idx, 1);
      },
      error: (err) => {
        err.status === 401
          ? this.toast.error('انتهت الجلسة، سجل الدخول مرة أخرى')
          : this.toast.error('حدث خطأ أثناء الحذف');
      },
      complete: () => setTimeout(() => location.reload(), 500)
    });
  }


  // ===================== Submit =====================

  onSubmit() {
    this.isEditMode ? this.updateNew() : this.addNew();
  }


  // ===================== Language Validation =====================

  allowEnglishOnly(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  allowArabicOnly(event: any) {
    event.target.value = event.target.value.replace(/[^ء-ي\s\u0621-\u064A]/g, '');
  }



}
