import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';

import {Transaccion} from '../models/Transaccion';

import {RestService} from '../services/rest.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
    selector: 'app-transaccion-list',
    templateUrl: 'transaccion-list.html',
    styleUrls: ['transaccion-list.scss'],
    providers:[SlimLoadingBarService]
})
export class TransaccionesList implements OnInit {
    
    ITEM_PAGE:number = 10;
    list: Transaccion[];
    total: number;
    paginator: any;
    loading: boolean = false;
    mostrarFiltro: boolean = false;
    filterUserForm: FormGroup;
    source: LocalDataSource;
    filterComboForm: FormGroup;
    
    settings = {
        mode: 'external',
        hideSubHeader: true,
        columns: {
            fecha: { title: 'Fecha', width: '15%' },
            servicio: { title: 'Servicio', width: '20%' },
            factura: { title: 'Factura', width: '20%' },
            cliente: { title: 'cliente', width: '30%' },
            total: { title: 'Total', width: '10%' }
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
        this.initFiltros();
    }

    createFormFilter() {
        this.filterUserForm = this.formBuild.group({
            desde: [''],
            hasta : ['']
        });
    }

    limpiar() {
        this.filterUserForm.reset();
    }

    initFiltros() {
        this.paginator = {
            cantidad: 10,
            pagina: 0,
            total: 0
        }
        this.paginator.desde = this.paginator.pagina + 1;
        this.paginator.hasta = this.paginator.pagina + 1;
        this.buscar();
    }

    getParams() {
        var parametros = {};
        parametros['pagina'] = this.paginator.desde;
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
        this.paginator.desde = 1;
        this.service.listarTransacciones(this.getParams()).subscribe(
            rs => {
                this.list = [];
                rs.lista.forEach(a => {
                    this.list.push(new Transaccion(a));
                });
                this.total = rs.registros;
                this.paginator.total = this.total;
                this.source = new LocalDataSource();
                if (this.paginator.total >= this.ITEM_PAGE) {
                    this.paginator.hasta = Math.ceil(this.paginator.total / this.paginator.cantidad);
                } else {
                    this.paginator.hasta=1;
                }
                this.source.load(this.list);
            }, er => { }, () => {this.slimLoadingBarService.complete();
            this.blockUI.stop();
            }
        );
    }

    onCustomAction(event) {
        if (event.action == 'iniciarAction') {
            /*this.service.getEtapasConcurso(event.data.id)
            .subscribe(response => {
                console.log('iniciar : ', response);
            });*/
            this.route.navigate(['convocatorias/concursos/editar/' + event.data.id ]);
        } else if (event.action == 'gestionarAction') {
            this.route.navigate(['../gestionar/' + event.data.id ], { relativeTo: this.router });
        } else if (event.action == 'verAction') {
            this.route.navigate(['../gestionar/' + event.data.id ], { relativeTo: this.router });
        } else if (event.action == 'extenderAction') {
            this.route.navigate(['convocatorias/concursos/extender/' + event.data.id ]);
        }
    }

  pagination(step: number) {

      if (step > 0) {

        this.slimLoadingBarService.start(() => {});

        if (this.paginator.desde < this.paginator.hasta) {
          this.paginator.desde += 1;
          this.service.listarTransacciones(this.getParams()).subscribe(
                rs => {
                  this.list = [];
                  rs.lista.forEach(a => {
                      this.list.push(new Transaccion(a));
                  });
                  this.total = rs.registros;
                  this.paginator.total = this.total;
                  this.source = new LocalDataSource(this.list);
                  this.slimLoadingBarService.complete();
                }, er => {}, () => {}
            );
        }

      } else {

          this.slimLoadingBarService.start(() => {});
           if (this.paginator.desde > 1) {
              this.paginator.desde -= 1;

              this.service.listarTransacciones(this.getParams()).subscribe(
                  rs => {
                      this.list = [];
                      rs.lista.forEach(a => {
                          this.list.push(new Transaccion(a));
                      });
                      this.total = rs.registros;
                      this.paginator.total = this.total;
                      this.source = new LocalDataSource(this.list);
                      this.slimLoadingBarService.complete();
                  },
                  er => { },
                  () => { }
              );
          }
      }
  }  

}
