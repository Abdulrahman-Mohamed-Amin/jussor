import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:"" , redirectTo:"home" , pathMatch:"full"},
    {path:'home' , loadComponent:() => import("./pages/landing/home/home.component").then(c => c.HomeComponent)},
    {path:'about' , loadComponent:() => import("./pages/about/about.component").then(c => c.AboutComponent)},
    {path:'projects' , loadComponent:() => import("./pages/all-projects/all-projects.component").then(c => c.AllProjectsComponent)},
    {path:'services' , loadComponent:() => import("./pages/all-services/all-services.component").then(c => c.AllServicesComponent)},
    {path:'contact' , loadComponent:() => import("./pages/contact/contact.component").then(c => c.ContactComponent)},
    {path:'project-detils/:id' , loadComponent:() => import("./pages/projects-detils/projects-detils.component").then(c => c.ProjectsDetilsComponent)},
  ])],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
