import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {

   errorMessage:string = ''
    // ============= form ================
    addForm:FormGroup = new FormGroup ({
      arTitle: new FormControl('' , Validators.required),
      arDescription: new FormControl('' , Validators.required),
      enTitle: new FormControl('' , Validators.required),
      enDescription: new FormControl('' , Validators.required),
      VideoPath: new FormControl('' ),
      ImageFiles: new FormControl('' ),
    })
  
  
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
