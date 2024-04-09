import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppFooterComponent } from './layouts/components/app-footer/app-footer.component';
import { AppMenuComponent } from './layouts/components/app-menu/app-menu.component';
import { AppTopbarComponent } from './layouts/components/app-topbar/app-topbar.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgbAlertModule, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerModule, NgbDropdownModule, NgbDropdownToggle, NgbModalModule, NgbPaginationModule, NgbRatingModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './icons/font-awesome-icons';
import moment from 'moment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChaineHoteliereService } from '../admin/services/chaine-hoteliere.service';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthServerProvider } from '../core/auth/auth-jwt.service';
import { LoginService } from '../core/services/login.service';
// import { LocalStorageService, NgxWebstorageModule, SessionStorageService, StrategyCacheService, StrategyIndex } from 'ngx-webstorage';
import { AccountService } from '../core/auth/account.service';
import { StateStorageService } from '../core/auth/state-storage.service';
import { AuthExpiredInterceptor } from '../core/interceptors/auth-expired.interceptor';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { CompteUtilisateurService } from '../admin/services/compte-utilisateur.service';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  declarations: [
    SidebarLayoutComponent,
    MainLayoutComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppTopbarComponent,
    HasAnyAuthorityDirective
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    // HasAnyAuthorityDirective,
    NgbDatepicker,
    FontAwesomeModule,
    NgSwitch, NgSwitchCase, NgSwitchDefault,
    NgbDropdownModule,
    NgbModalModule
  ],
  exports: [
    SidebarLayoutComponent,
    MainLayoutComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppTopbarComponent,
    HasAnyAuthorityDirective,
    ReactiveFormsModule,
    NgbAlertModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbToastModule,
    NgbDatepicker,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbRatingModule,
    FontAwesomeModule,
    NgSwitch, NgSwitchCase, NgSwitchDefault,
    NgFor,
  ],
  providers: [
    ChaineHoteliereService,
    CompteUtilisateurService, 
    AuthServerProvider, 
    LoginService, 
    AccountService, 
    StateStorageService,
  ]
})
export class SharedModule { 

  constructor(library: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    library.addIcons(...fontAwesomeIcons);
    dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
  }
}
