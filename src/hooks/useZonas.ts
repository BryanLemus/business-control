import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Zona } from "../types/Zona";

interface state {
  search?: string;
  sort: { by: string; order: "ascendent" };
}

export function useZonas(props?: state) {
  const [zonas, setZonas] = useState<Zona[] | null>([]);

  const fetchData = async () => {
    await getDocs(collection(db, "zonas")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setZonas(newData as Zona[]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { zonas };
}
