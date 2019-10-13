import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

import {ResumenServicios} from '../models/ResumenServicios';

import {RestService} from '../services/rest.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
    selector: 'app-resumen-list',
    templateUrl: 'resumen-servicios-list.html',
    styleUrls: ['resumen-servicios-list.scss'],
    providers:[SlimLoadingBarService]
})
export class ResumenServiciosList implements OnInit {
    
    ITEM_PAGE:number = 10;
    list: ResumenServicios[];
    total: number;
    loading: boolean = false;
    mostrarFiltro: boolean = false;
    filterUserForm: FormGroup;
    source: LocalDataSource;
    filterComboForm: FormGroup;

    settings = {
        mode: 'external',
        hideSubHeader: true,
        columns: {
            servicio: { title: 'Servicio', width: '20%' },
            porcentaje: { title: 'Porcentaje', width: '10%' }
        },
        noDataMessage: 'No hay datos',
        actions: {
            custom: [],
            columnTitle: 'Acciones',
            position: 'right',
            add: false,
            edit: false,
            delete: false
        },
        attr: {
            class: 'table table-bordered'
        }
    };
    @BlockUI() blockUI: NgBlockUI;
    constructor(private route: Router, private formBuild: FormBuilder,   
              private slimLoadingBarService: SlimLoadingBarService,
              private service: RestService, 
              private router: ActivatedRoute) {

        this.filterComboForm = this.formBuild.group({});
    }

    ngOnInit(): void {
        this.createFormFilter();
        this.buscar();
    }

    limpiar() {
        this.filterUserForm.reset();
    }

    createFormFilter() {
        this.filterUserForm = this.formBuild.group({
            desde: [''],
            hasta : ['']
        });
    }

    getParams() {
        var parametros = {};
        var desde = this.filterUserForm.get('desde').value;
        if (desde != undefined && desde != '')
            parametros['fechaDesde'] = desde;
        var hasta = this.filterUserForm.get('hasta').value;
        if (hasta != undefined && hasta != '')
            parametros['fechaHasta'] = hasta;
        return parametros;
    }

    buscar() {
        this.slimLoadingBarService.start(() => {});
        this.blockUI.start('');
        this.service.resumenServicios(this.getParams()).subscribe(
            rs => {
                this.list = [];
                rs.forEach(a => {
                    this.list.push(new ResumenServicios(a));
                });
                this.source = new LocalDataSource();
                this.source.load(this.list);
            }, er => { }, () => {this.slimLoadingBarService.complete();
            this.blockUI.stop();
            }
        );
    } 

}
