import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild([
    {path:'' , loadComponent:() => import("./pages/landing/home/home.component").then(c => c.HomeComponent)}
  ])],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
