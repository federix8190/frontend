export class ResumenServicios {
	
	servicio: string;
    porcentaje: number;
	
	constructor(data) {
		this.servicio = data.servicio;
		this.porcentaje = data.porcentaje;
	}
	
}