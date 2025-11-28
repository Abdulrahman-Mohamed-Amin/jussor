import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectTypeService } from '../../../../core/services/projects/project-type.service';
import { ProjectStatusService } from '../../../../core/services/projects/project-status.service';
import { ProjectService } from '../../../../core/services/projects/project.service';

@Component({
  selector: 'app-manage-projects',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './manage-projects.component.html',
  styleUrl: './manage-projects.component.css',
})
export class ManageProjectsComponent implements OnInit {
types:any[]=[]
status:any[]=[]
projects:any[]=[]
errorMessage:string=''


  // ============= form ================
  addForm:FormGroup = new FormGroup ({
    arTitle: new FormControl('' , Validators.required),
    arDescription: new FormControl('' , Validators.required),
    enTitle: new FormControl('' , Validators.required),
    enDescription: new FormControl('' , Validators.required),
    locationName: new FormControl('' , Validators.required),
    locationUrl: new FormControl('' , Validators.required),
    latitude: new FormControl(0),
    longitude: new FormControl(0),
    videoFile: new FormControl(null),
    videoPath: new FormControl(null),
    imageFiles: new FormControl(null),
    projectImages: new FormControl([]),
    projectStatusId: new FormControl(null ,Validators.required),
    projectTypeId: new FormControl(null ,Validators.required),
  })


  constructor(private _types:ProjectTypeService ,private _status:ProjectStatusService , private _projects:ProjectService){}

  ngOnInit(): void {
    this.getTypes()
    this.getStatus()
    this.getProjects()
  }

  getStatus(){
    this._status.getALlStatus().subscribe(res =>{
      this.status = res
    })
  }
  getTypes(){
    this._types.getALltype().subscribe(res =>{
      this.types = res
    })
  }

  addProject(){
    const formValue = this.addForm.value;
    
    // نحول الـIDs إلى أرقام
    formValue.projectStatusId = Number(formValue.projectStatusId);
    formValue.projectTypeId = Number(formValue.projectTypeId);

    this._projects.addProject(this.addForm.value).subscribe(res =>{
      console.log(res);
      
    })
    console.log(this.addForm.value);
  }

  getProjects(){
    this._projects.getAllProjects().subscribe(res =>{
      this.projects = res
    })
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
