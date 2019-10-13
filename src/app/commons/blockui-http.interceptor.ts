import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import {BlockUI, BlockUIService, NgBlockUI} from 'ng-block-ui';
import {Router} from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class BlockuiHttpInterceptor implements HttpInterceptor {
  constructor(private blockUIS: BlockUIService, private router:Router, private _dialog: MatDialog, private modal: NgbModal) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
      this.blockUIS.start('ui');
      if (req.url.indexOf("/guardar-archivo") > 0 || req.url.indexOf("/guardar-resolucion") > 0 || req.url.indexOf("importar-excel") > 0) {
          req = req.clone({
              headers: req.headers.delete("Content-Type"),
              withCredentials: true
          });
      } else {
          req = req.clone({
              headers: req.headers.set('Content-Type', 'application/json'),
              withCredentials: true
          });
      }
      return next.handle(req)
      .map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // TODO Controlar estado de Respuesta

        }
        setTimeout(() => {
          this.blockUIS.stop('ui');
        }, 1000);
        return event;
      })
      .catch((err: any, caught) => {
        if (err.status == 401)
        {
          this.onClose();
          this.router.navigate(['/login']);
          localStorage.removeItem("autenticado");
        }
        setTimeout(() => {
          this.blockUIS.stop('ui');
        }, 1000);
        return Observable.throw(err);
      });
  }
  public onClose(): void {
    /**cerrar todos los modales**/
    this._dialog.closeAll();
    this.modal.dismissAll('no autenticado');
  }

}
