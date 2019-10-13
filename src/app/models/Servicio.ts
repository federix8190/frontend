export class Servicio {
	
	id: number;
    descripcion: string;
	comision: number;
	
	constructor(data) {
		this.id = data.id;
		this.descripcion = data.descripcion;
		this.comision = data.comision;
	}
	
}