import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DatePipe, HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResponsiveModule } from 'ngx-responsive';
import {NgxMaskModule} from 'ngx-mask';
import {BlockUIModule, BlockUIService} from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {BlockuiHttpInterceptor} from './commons/blockui-http.interceptor';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import {LoginComponent} from './components/login.component';
import {ConfirmDialogComponent} from './components/confirm-dialog.component';
import {ConfirmDialogService} from './services/confirm-dialog.service';
import {AppRoutingModule } from './app-routing.module';
import {AppComponent } from './app.component';
import {SidebarComponent } from './components/sidebar/sidebar.component';
import {DeudasList} from './components/deudas-list';
import {ResumenServiciosList} from './components/resumen-servicios-list';
import {TransaccionesList} from './components/transaccion-list';

import {
  MAT_DATE_LOCALE,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

//Material
import { 
  MatInputModule,
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import {AngularFileUploaderComponent, AngularFileUploaderModule} from 'angular-file-uploader';
import {Mensajes} from './commons/mensajes';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const config = {
    breakPoints: {
        xs: {max: 600},
        sm: {min: 601, max: 959},
        md: {min: 960, max: 1279},
        lg: {min: 1280, max: 1919},
        xl: {min: 1920}
    },
    debounceTime: 100
};

import localePy from '@angular/common/locales/es-PY';
registerLocaleData(localePy);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    TransaccionesList,
    ResumenServiciosList,
    DeudasList,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PerfectScrollbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    SlimLoadingBarModule,
    BrowserAnimationsModule,
    NgbModule,
    ResponsiveModule.forRoot(config),
    NgxMaskModule.forRoot(),

    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    AngularFileUploaderModule,
    BlockUIModule.forRoot(),
    ToastrModule.forRoot(),
    BlockUIModule.forRoot({message: 'Cargando...'})

  ],
  providers: [
    {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    DatePipe,
    BlockUIService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: BlockuiHttpInterceptor,
        multi: true
    },
    ConfirmDialogService,
    Mensajes, 
    { provide: MAT_DATE_LOCALE, useValue: 'es-PY' },
    AngularFileUploaderComponent,
    { provide: LOCALE_ID, useValue: 'es-PY'},
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
