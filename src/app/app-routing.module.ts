import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {TransaccionesList} from './components/transaccion-list';
import {DeudasList} from './components/deudas-list';
import {LoginComponent} from './components/login.component';
import {ResumenServiciosList} from './components/resumen-servicios-list';

const routes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: '', redirectTo: 'deudas', pathMatch: 'full' },
    { path: 'deudas', component: DeudasList},
    { path: 'transacciones', component: TransaccionesList},
    { path: 'resumen-servicios', component: ResumenServiciosList}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
