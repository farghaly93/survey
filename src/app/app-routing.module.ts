import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './admin/admin-guard';
import { AdminsidebarComponent } from './admin/adminsidebar/adminsidebar.component';
import { HeaderComponent } from './header/header.component';
import { SurveyComponent } from './survey/survey.component';

const routes: Routes = [

  {path: 'stores', loadChildren: '../app/stores-main/stroes-main.module#StroesMainModule'},
  {path: 'survey', loadChildren: '../app/survey/survey.module#SurveyModule'},
  {path: '',  loadChildren: '../app/categories/categories.module#UserscategoriesModule'},
  {path: 'userstores',  loadChildren: '../app/userstores/userstores.module#UserstoresModule'},
  {path: 'compare',  loadChildren: '../app/compare/compare.module#CompareModule'},

  {path: 'login',  loadChildren: '../app/admin/login/login.module#LoginModule'},
  {path: 'admin',  loadChildren: '../app/admin/adminpanel/adminpanel.module#AdminpanelModule', canActivate: [AuthGuard]},
  {path: 'admin/categories',  loadChildren: '../app/admin/categories/categories.module#CategoriesModule', canActivate: [AuthGuard]},
  {path: 'admin/branches',  loadChildren: '../app/admin/branches/branches.module#BranchesModule', canActivate: [AuthGuard]},
  {path: 'admin/addcategory',  loadChildren: '../app/admin/addcategory/addcategory.module#AddcategoryModule', canActivate: [AuthGuard]},
  {path: 'admin/stores',  loadChildren: '../app/admin/stores/stores.module#StoresModule', canActivate: [AuthGuard]},
  {path: 'admin/addstore',  loadChildren: '../app/admin/add-store/add-store.module#AddStoreModule', canActivate: [AuthGuard]},
  {path: 'admin/addbranch',  loadChildren: '../app/admin/addbranch/addbranch.module#AddbranchModule', canActivate: [AuthGuard]},
  {path: 'admin/addAd',  loadChildren: '../app/admin/addAd/addAd.module#AddAdModule', canActivate: [AuthGuard]},
  {path: 'admin/ads',  loadChildren: '../app/admin/ads/ads.module#AdsModule', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, Location]
})
export class AppRoutingModule { }
