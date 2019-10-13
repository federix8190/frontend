export class Deuda {
	
	index:number;
	servicioId:number;
	vencimiento: string;
    factura: string;
	importe: string;
	cliente: string;
	comision:number;
	
	constructor(data, index) {
		this.index = index;
		this.vencimiento = data.vencimiento;
		this.servicioId = data.servicioId;
		this.factura = data.factura;
		this.importe = data.importe;
		this.cliente = data.cliente;
		this.comision = data.comision;
	}
	
}