import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatPaginatorModule, MatSidenavModule } from '@angular/material';
import { AgmCoreModule } from '@agm/core';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './admin/login/auth-interceptor';
import { StroesMainModule } from './stores-main/stroes-main.module';
import { SurveyModule } from './survey/survey.module';
import { UserscategoriesModule } from './categories/categories.module';
import { CategoriesModule } from './admin/categories/categories.module';
import { UserstoresModule } from './userstores/userstores.module';
import { AddcategoryModule } from './admin/addcategory/addcategory.module';
import { StoresModule } from './admin/stores/stores.module';
import { AddStoreModule } from './admin/add-store/add-store.module';
import { AddbranchModule } from './admin/addbranch/addbranch.module';
import { AdminpanelModule } from './admin/adminpanel/adminpanel.module';
import { LoginModule } from './admin/login/login.module';
import { BranchesModule } from './admin/branches/branches.module';
import { AdminsidebarComponent } from './admin/adminsidebar/adminsidebar.component';
import { addAdComponent } from './admin/addAd/addAd.component';
import { AddAdModule } from './admin/addAd/addAd.module';
import { AdsModule } from './admin/ads/ads.module';
import { CompareComponent } from './compare/compare.component';
import { CompareModule } from './compare/compare.module';
import { FooterComponent } from './footer/footer.component';
// import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StroesMainModule,
    SurveyModule,
    UserscategoriesModule,
    UserstoresModule,
    AddcategoryModule,
    StoresModule,
    AddStoreModule,
    AddbranchModule,
    AdminpanelModule,
    LoginModule,
    CategoriesModule,
    BranchesModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AddAdModule,
    AdsModule,
    CompareModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
