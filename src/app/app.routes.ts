import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"" ,redirectTo:"admin" , pathMatch:"full"},
    {path:"admin" ,loadChildren:() => import("./features/dashboard/dashboard.module").then(m => m.DashboardModule)},
    {path:"home" ,loadChildren:() => import("./features/website/website.module").then(m => m.WebsiteModule)}
];
