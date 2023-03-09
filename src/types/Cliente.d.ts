import { DocumentReference } from "firebase/firestore";
import { Zona } from "../models/Zona";

export interface Cliente {
  newItem: { id: string | null; nombre: string; departamento: string };
  [x: string]: { id: string };
  id: string;
  tipoCliente: string;
  codigo: string;
  nombres: string;
  apellidos: string;
  profesion: string;
  direccion1: string;
  direccion2?: string;
  telefono1: string;
  telefono2?: string;
  estado: boolean;
  fechaNacimiento: Date;
  tipoDocumento: string;
  documento: string;
  zona: DocumentReference<Zona>;
  zonaDetalle: Zona;
}
