import { Category1Component } from './pages/projects-categories/category-1/category-1.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    { path: "", redirectTo: "home", pathMatch: "full" },
    {
      path: 'home', loadComponent: () => import("./pages/landing/home/home.component").then(c => c.HomeComponent), data: {
        seo: {
          title: 'الرئيسية | جسور المتحدة القابضة',
          description: 'حلول متكاملة في أنظمة الأمن والسلامة وفق أعلى معايير الجودة.',
          keywords: 'الأمن والسلامة, المقاولات العامة, جسور المتحدة'
        }
      }
    },
    {
      path: 'about', loadComponent: () => import("./pages/about/about.component").then(c => c.AboutComponent), data: {
        seo: {
          title: 'من نحن | جسور المتحدة القابضة',
          description: 'حلول متكاملة في أنظمة الأمن والسلامة وفق أعلى معايير الجودة.',
          keywords: 'الأمن والسلامة, المقاولات العامة, جسور المتحدة'
        }
      }
    },
    { path: 'projects', loadComponent: () => import("./pages/all-projects/all-projects.component").then(c => c.AllProjectsComponent) ,data: {
        seo: {
          title: 'المشاريع | جسور المتحدة القابضة',
          description: 'حلول متكاملة في أنظمة الأمن والسلامة وفق أعلى معايير الجودة.',
          keywords: 'الأمن والسلامة, المقاولات العامة, جسور المتحدة'
        }
      }},
    { path: 'services', loadComponent: () => import("./pages/all-services/all-services.component").then(c => c.AllServicesComponent) ,data: {
        seo: {
          title: 'الخدمات | جسور المتحدة القابضة',
          description: 'حلول متكاملة في أنظمة الأمن والسلامة وفق أعلى معايير الجودة.',
          keywords: 'الأمن والسلامة, المقاولات العامة, جسور المتحدة'
        }
      }},
    { path: 'contact', loadComponent: () => import("./pages/contact/contact.component").then(c => c.ContactComponent),data: {
        seo: {
          title: 'تواصل معنا | جسور المتحدة القابضة',
          description: 'حلول متكاملة في أنظمة الأمن والسلامة وفق أعلى معايير الجودة.',
          keywords: 'الأمن والسلامة, المقاولات العامة, جسور المتحدة'
        }
      } },
    { path: 'project-detils/:id', loadComponent: () => import("./pages/projects-detils/projects-detils.component").then(c => c.ProjectsDetilsComponent) },
    { path: 'Security-Projects', loadComponent: () => import("./pages/projects-categories/category-1/category-1.component").then(c => c.Category1Component) },


  ])],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
