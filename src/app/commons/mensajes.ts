import {Component, Injectable, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class Mensajes {
  constructor( private toastr: ToastrService ) {}
  exito(titulo: any, mensaje) {

    this.toastr.success(titulo, mensaje, {
      timeOut: 5000
    });
  }
  error(titulo: any, mensaje) {

    this.toastr.warning(titulo, mensaje, {
      timeOut: 7000
    });
  }
}
