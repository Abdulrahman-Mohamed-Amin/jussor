import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"" ,loadChildren:() => import("./features/website/website.module").then(m => m.WebsiteModule)},
    {path:"admin" ,loadChildren:() => import("./features/dashboard/dashboard.module").then(m => m.DashboardModule)}
];
