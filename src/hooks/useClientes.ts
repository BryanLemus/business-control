import { useCallback, useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Cliente } from "../types/Cliente";

interface state {
  search?: string;
  sort?: { by: string; order: "ascendent" };
  filters?: { zona: string };
}

export function useClientes(props?: state) {
  /**
   * Method1
   */
  const { search } = props || {};
  // const [clientes, setClientes] = useState<Cliente[]>([]);

  // const fetchClients = async () => {
  //   const docsRef = query(collection(db, "clientes"), orderBy("codigo"));
  //   const docsSnap = await getDocs(docsRef);

  //   docsSnap.forEach(async (doc) => {
  //     let newItem = { id: doc.id, ...doc.data() } as Cliente;

  //     if (newItem.zona) {
  //       let zonaData = await getDoc(newItem.zona);
  //       if (zonaData.exists()) {
  //         newItem.zonaDetalle = { ...zonaData.data() };
  //       }
  //     }
  //     setClientes((clientes) => [...clientes, newItem]);
  //   });
  // };

  // useEffect(() => {
  //   fetchClients();
  // }, []);

  // return { clientes };

  /**
   * Method2
   */
  // const { search } = props || {};
  // const [clientes, setClientes] = useState<Cliente[]>([]);
  // let q = query(collection(db, "clientes"), orderBy("codigo"));

  // async function fetchClients() {
  //   await getDocs(q).then((querySnapshot) => {
  //     let newData = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     })) as Cliente[];

  //     if (search) {
  //       newData = newData.filter(
  //         (cliente) =>
  //           cliente.codigo.toLowerCase().includes(search.toLowerCase()) ||
  //           cliente.nombres.toLowerCase().includes(search.toLowerCase()) ||
  //           cliente.apellidos.toLowerCase().includes(search.toLowerCase())
  //       );
  //     }

  //     setClientes(newData);
  //   });
  // }
  const [clients, setClients] = useState<Array<Cliente>>([]);

  async function fetchClients() {
    const docsRef = query(collection(db, "clientes"), orderBy("codigo"));
    const docsSnap = await getDocs(docsRef);
    const docs: Array<Cliente> = [];

    await Promise.all(
      docsSnap.docs.map(async (doc) => {
        let client = { id: doc.id, ...doc.data() } as Cliente;

        if (client.zona) {
          const zonaData = await getDoc(client.zona);
          if (zonaData.exists()) {
            client.zonaDetalle = { ...zonaData.data() };
          }
        }

        docs.push(client);
      })
    );

    setClients(docs);
  }

  useEffect(() => {
    fetchClients();
  }, [search]);

  return { clients };
}

export const addCliente = async (e: Event, cliente: Cliente[]) => {
  e.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "clientes"), {
      cliente,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
