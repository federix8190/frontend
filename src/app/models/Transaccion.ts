export class Transaccion {
	
	fecha: string;
    factura: string;
	servicio: string;
    cliente: string;
	total: string;
	
	constructor(data) {
		this.fecha = data.fecha;
		this.factura = data.factura;
		this.servicio = data.servicio;
		this.cliente = data.cliente;
		this.total = data.total;
	}
	
}