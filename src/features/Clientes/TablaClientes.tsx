import { Table } from "@mantine/core";
import { useClientes } from "../../hooks/useClientes";

interface Props {
  search?: string;
}

export function TablaClientes({ search }: Props) {
  const { clients } = useClientes({ search });

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
        {clients?.map((client) => {
          return (
            <tr key={client.id}>
              <td>{client.codigo}</td>
              <td>{client.nombres + " " + client.apellidos}</td>
              <td>{` ${client.telefono1} ${client.telefono2}`}</td>
              <td>
                {client.direccion1 +
                  `, ${client.zonaDetalle?.nombre}` +
                  `, ${client.zonaDetalle?.departamento}`}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
