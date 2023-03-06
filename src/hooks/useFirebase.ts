import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

export function useFirebase(collectionName: string) {
  const [data, setData] = useState<any[]>([]);

  const get = async () => {
    await getDocs(collection(db, collectionName))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setData(newData);
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return data;
}
