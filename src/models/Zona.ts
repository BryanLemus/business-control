import {
  doc,
  DocumentData,
  getDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export class Zona {
  id: string | null;
  nombre: string;
  departamento: string;

  constructor(id: string | null, nombre: string, departmaneto: string) {
    this.id = id;
    this.nombre = nombre;
    this.departamento = departmaneto;
  }

  static getDocumentById(id: string) {
    const [zona, setZona] = useState<Zona>({
      id: "",
      nombre: "",
      departamento: "",
    });

    const fetchZona = async () => {
      const docRef = doc(db, "zonas", id)
      const docSnap = await getDoc(docRef);
      setZona({ id: docSnap.id, ...docSnap.data() } as Zona);
    };

    useEffect(() => {
      fetchZona();
    }, []);

    return { zona };
  }

  toString() {
    return this.nombre + ", " + this.departamento;
  }
}

export const zonaConverter = {
  toFirestore: (zona: Zona) => {
    return {
      id: zona.id,
      nombre: zona.nombre,
      departamento: zona.departamento,
    };
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options: SnapshotOptions
  ): Zona => {
    const data = snapshot.data(options);
    return new Zona(data.id, data.nombre, data.departmaneto);
  },
};
