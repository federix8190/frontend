import {Component, OnInit} from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LocalDataSource} from 'ng2-smart-table';
import {ActivatedRoute, Router} from '@angular/router';

import {Mensajes} from '../commons/mensajes';
import {ConfirmDialogService} from '../services/confirm-dialog.service';
import {Deuda} from '../models/Deuda';
import {RestService} from '../services/rest.service';
import {Servicio} from '../models/Servicio';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Component({
    selector: 'app-deudas-list',
    templateUrl: 'deudas-list.html',
    styleUrls: ['deudas-list.scss'],
    providers:[SlimLoadingBarService]
})
export class DeudasList implements OnInit {
    
    ITEM_PAGE:number = 10;
    list: Deuda[];
    total: number;
    paginator: any;
    loading: boolean = false;
    mostrarFiltro: boolean = false;
    filterUserForm: FormGroup;
    source: LocalDataSource;
    filterComboForm: FormGroup;
    tipoDocumentoList:any = ['CI', 'RUC'];
    serviciosList:any = [];

    settings = {
        mode: 'external',
        hideSubHeader: true,
        columns: {
            index: {},
            factura: { title: 'factura', width: '20%' },
            cliente: { title: 'cliente', width: '30%' },
            vencimiento: { title: 'vencimiento', width: '15%' },
            importe: { title: 'importe', width: '15%' }
        },
        noDataMessage: 'No hay datos',
        actions: {
            custom: [{
                name: 'pagar',
                title: '<i title="Procesar Pago">Procesar Pago </i>'
            }],
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
              private confirmDialogService: ConfirmDialogService,
              private service: RestService, private mensaje: Mensajes,
              private router: ActivatedRoute) {

        this.filterComboForm = this.formBuild.group({});
    }

    ngOnInit(): void {
        this.createFormFilter();
        this.initFiltros();
        this.cargarServicios();
    }

    createFormFilter() {
        this.filterUserForm = this.formBuild.group({
            numeroDocumento: [''],
            tipoDocumento : [''],
            servicio:  ['']
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

    cargarServicios() {
        this.service.getServicios().subscribe(
            rs => {
                rs.forEach(a => {
                    this.serviciosList.push(new Servicio(a));
                });
            }, er => { }, () => { }
        );
    }

    getParams() {
        var parametros = {};
        parametros['pagina'] = this.paginator.desde;
        var numeroDocumento = this.filterUserForm.get('numeroDocumento').value;
        if (numeroDocumento != undefined && numeroDocumento != '')
            parametros['numeroDocumento'] = numeroDocumento;
        var tipoDocumento = this.filterUserForm.get('tipoDocumento').value;
        if (tipoDocumento != undefined && tipoDocumento != '')
            parametros['tipoDocumento'] = tipoDocumento;
        var servicio = this.filterUserForm.get('servicio').value;
        if (servicio != undefined && servicio != '')
            parametros['servicio'] = servicio;
        return parametros;
    }

    buscar() {
        
        this.slimLoadingBarService.start(() => {});
        this.blockUI.start('');
        this.paginator.desde = 1;
        this.service.listarDeudas(this.getParams()).subscribe(
            rs => {
                this.list = [];
                var i = 1;
                rs.lista.forEach(a => {
                    this.list.push(new Deuda(a, i));
                    i++;
                });
                this.total = rs.registros;
                this.paginator.total = this.total;
                this.source = new LocalDataSource();
                if (this.paginator.total >= this.ITEM_PAGE) {
                    this.paginator.hasta = Math.ceil(this.paginator.total / this.paginator.cantidad);
                } else {
                    this.paginator.hasta = 1;
                }
                this.source.load(this.list);
            }, er => { }, () => {this.slimLoadingBarService.complete();
            this.blockUI.stop();
            }
        );
    } 

    toggleFiltro() {
        if (this.mostrarFiltro) {
          this.mostrarFiltro = false;
        } else {
          this.mostrarFiltro = true;
        }
    }

    onCustomAction(event) {
        this.confirmDialogService.confirm('Por favor confirme', 'Esta seguro que desea realizar el pago de la deuda ?')
        .then((confirmed) => {
            if (confirmed == true) {
                var i = event.data.index - 1;
                var datos = this.list[i];
                var pago = {
                    servicioId: datos.servicioId,
                    factura: datos.factura,
                    importe: datos.importe,
                    comision: datos.comision,
                }
                this.service.pagarDeuda(pago).subscribe(
                    rs => {
                        this.buscar();
                        if (rs.exitoso) {
                            this.mensaje.exito("Operación realizada exitosamente", "Exitoso");
                        } else {
                            this.mensaje.error("Ocurrio un error al realizar la operación", "Error");
                        }
                    }, er => {}, () => {}
                );
            }
        });
    }

  pagination(step: number) {

      if (step > 0) {

        this.slimLoadingBarService.start(() => {});
        if (this.paginator.desde < this.paginator.hasta) {
          this.paginator.desde += 1;
          this.service.listarDeudas(this.getParams()).subscribe(
                rs => {
                  this.list = [];
                  var i = 1;
                  rs.lista.forEach(a => {
                      this.list.push(new Deuda(a, i));
                      i++;
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

              this.service.listarDeudas(this.getParams()).subscribe(
                  rs => {
                      this.list = [];
                      var i = 1;
                      rs.lista.forEach(a => {
                          this.list.push(new Deuda(a, i));
                          i++;
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
