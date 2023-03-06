export interface Cliente {
  id: string;
  codigo: string;
  nombres: string;
  apellidos: string;
  direccion1: string;
  direccion2?: string;
  telefono1: string;
  telefono2?: string;
  estado: boolean;
  fechaNacimiento?: Date;
  dui: string;
  zona: { id: string; nombre: string; departamento: string };
}
