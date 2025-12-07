import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
      path: "login",
      loadComponent: () =>
        import('./pages/login/login.component').then(c => c.LoginComponent)
    },
    {
      path: "dashboard",
      loadComponent: () =>
        import('./pages/dashboard/dashboard.component').then(c => c.DashboardComponent) ,
      canActivate: [authGuard],
      children:[
        {path:'' , redirectTo:"manage_projects" , pathMatch:"full"},
        {path:'manage_projects' , loadComponent:() => import('./pages/manage-projects/manage-projects.component').then(c => c.ManageProjectsComponent)},
        {path:'projects_type' , loadComponent:() => import('./pages/project-type/project-type.component').then(c => c.ProjectTypeComponent)},
        {path:'projects_status' , loadComponent:() => import('./pages/projects-status/projects-status.component').then(c => c.ProjectsStatusComponent)},
        {path:'services' , loadComponent:() => import('./pages/our-services/our-services.component').then(c => c.OurServicesComponent)},
        {path:'news' , loadComponent:() => import('./pages/news/news.component').then(c => c.NewsComponent)},
      ]

      
    }
  ])],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
