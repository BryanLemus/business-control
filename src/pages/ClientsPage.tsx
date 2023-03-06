import {
  Box,
  TextInput,
  Textarea,
  Title,
  Text,
  Button,
  Select,
  Switch,
  NumberInput,
  Radio,
  Group,
  Stack,
  Table,
  Autocomplete,
  Menu,
  Flex,
  SegmentedControl,
  Checkbox,
  MultiSelect,
  Alert,
  Drawer,
  Grid,
  Paper,
  Container,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Toolbar } from "../components/Toolbar/Toolbar";
import "dayjs/locale/es";
import {
  IconAlertCircle,
  IconArrowsSort,
  IconChevronDown,
  IconPrinter,
} from "@tabler/icons-react";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Cliente } from "../types/Cliente";
import { useDisclosure } from "@mantine/hooks";

export const ClientsPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [clientes, setClientes] = useState<Cliente[] | null>([]);

  const fetchClients = async () => {
    await getDocs(collection(db, "clientes")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClientes(newData as Cliente[]);
      console.log(clientes, newData);
    });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar>
          <Title>Clientes</Title>
          <Group>
            <Button variant="outline">
              <IconPrinter />
              <Text pl="xs">Imprimir</Text>
            </Button>
            <Button onClick={open}>Nuevo</Button>
          </Group>
        </Toolbar>

        <Flex justify={"space-between"} p={"md"} gap={"sm"}>
          <TextInput sx={{ width: "280px" }} placeholder="Buscar clientes" />

          <Group>
            <Menu>
              <Menu.Target>
                <Button variant="outline">
                  <IconArrowsSort />
                  <Text px="xs">Ordenar</Text>
                  <IconChevronDown />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>Nombre</Menu.Item>
                <Menu.Item>Zona</Menu.Item>
              </Menu.Dropdown>
            </Menu>

            <Menu>
              <Menu.Target>
                <Button variant="outline">
                  <IconArrowsSort />
                  <Text px="xs">Zona</Text>
                  <IconChevronDown />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Checkbox label="Acajutla, Sonsonate" defaultChecked />
                </Menu.Item>
                <Menu.Item>
                  <Checkbox label="Juayúa, Sonsonate" />
                </Menu.Item>
                <Menu.Item>
                  <Checkbox label="Tamanique, La Libertad" />
                </Menu.Item>
                <Menu.Item>
                  <Checkbox label="Talnique, La Libertad" />
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>

        <Drawer
          title={
            <Title sx={{ zIndex: 3 }} order={3}>
              Nuevo Cliente
            </Title>
          }
          opened={opened}
          onClose={close}
          position="right"
          overlayProps={{ blur: "8px" }}
          zIndex={1001}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              alignItems: "end",
              gap: "1rem",
            }}
          >
            <Text sx={{ gridColumn: "span 2" }} size="lg">
              Información Personal
            </Text>

            <SegmentedControl
              sx={{ gridColumn: "span 2" }}
              data={[
                { label: "Persona", value: "0" },
                { label: "Empresa", value: "1" },
              ]}
            />

            <TextInput
              label="Nombre"
              placeholder="ej. Juan"
              withAsterisk
              required
            />

            <TextInput label="Apellidos" placeholder="ej. Pérez" withAsterisk />

            <DateInput
              label="Fecha de Nacimiento"
              sx={{ gridColumn: "span 2" }}
              locale="es"
              withAsterisk
            />

            <TextInput
              label="DUI"
              placeholder="XXXXXXXXX"
              maxLength={9}
              withAsterisk
            />

            <TextInput label="Profesión" />

            <TextInput label="Teléfono 1" withAsterisk />

            <TextInput label="Teléfono 2" />

            <Textarea
              label="Dirección"
              sx={{ gridColumn: "span 2" }}
              minRows={2}
              withAsterisk
              autosize
            />

            <Text sx={{ gridColumn: "span 2" }} size="lg">
              Información de Cobro
            </Text>

            <Select
              label="Tipo de Cliente"
              data={["Pasivo", "Crédito", "Contado", "Reservado"]}
            />

            <Textarea
              label="Dirección de cobro"
              sx={{ gridColumn: "span 2" }}
              minRows={2}
              autosize
              disabled
            />

            <Switch
              sx={{ gridColumn: "span 2" }}
              label="Misma dirección"
              defaultChecked
            />

            <Select
              label="Zona"
              data={["Acajutla", "Juayúa", "Tamanique", "Talnique"]}
            />

            <Select
              label="Departamento"
              data={[
                "Sonsonate",
                "Ahuachapán",
                "La Libertad",
                "Santa Ana",
                "San Salvador",
              ]}
            />

            <NumberInput
              label="Dia de Cobro"
              min={1}
              max={31}
              defaultValue={1}
              withAsterisk
            />

            <DateInput label="Fecha de Contrato" locale="es" withAsterisk />

            <Text sx={{ gridColumn: "span 2" }} size="lg">
              Información de Servicio
            </Text>

            <Radio.Group
              sx={{ gridColumn: "span 2" }}
              label="Tipo de Servicio"
              withAsterisk
            >
              <Group mt={"xs"}>
                <Radio value={"catolico"} label="Católico" />
                <Radio value={"evangelico"} label="Evangélico" />
                <Radio value={"otro"} label="Otro" />
              </Group>
            </Radio.Group>

            <TextInput
              sx={{ gridColumn: "span 2" }}
              label="Nombre del Fallecido"
              withAsterisk
            />

            <Select
              sx={{ gridColumn: "span 2" }}
              label="Servicio"
              withAsterisk
              data={[
                {
                  value: "1",
                  label: "Estándar",
                  precio: 499,
                  prima: 20,
                  cuota: 6,
                },
                {
                  value: "2",
                  label: "Jardín Especial",
                  precio: 549,
                  prima: 20,
                  cuota: 7,
                },
                {
                  value: "3",
                  label: "Romano Especial",
                  precio: 769,
                  prima: 25,
                  cuota: 10,
                },
                {
                  value: "4",
                  label: "Estilo Ejecutivo",
                  precio: 849,
                  prima: 30,
                  cuota: 15,
                },
                {
                  value: "5",
                  label: "Americana Especial",
                  precio: 899,
                  prima: 35,
                  cuota: 17,
                },
                {
                  value: "6",
                  label: "Especial fuera de medida",
                  precio: 1199,
                  prima: 50,
                  cuota: 30,
                },
                {
                  value: "7",
                  label: "Colombiana",
                  precio: 1900,
                  prima: 70,
                  cuota: 35,
                },
                {
                  value: "8",
                  label: "Presidente Especial",
                  precio: 2299,
                  prima: 75,
                  cuota: 40,
                },
              ]}
              itemComponent={({ label, precio, prima, cuota, ...rest }) => (
                <div {...rest}>
                  <Stack spacing={"xs"}>
                    <Text weight={"bold"}>{label}</Text>
                    <Group spacing={"xs"}>
                      <Text>{`Precio: $${precio}`}</Text>
                      <Text>{`Prima: $${prima}`}</Text>
                      <Text>{`Cuota: $${cuota}`}</Text>
                    </Group>
                  </Stack>
                </div>
              )}
            />

            <MultiSelect
              sx={{ gridColumn: "span 2" }}
              label="Estado de Servicio"
              data={["En pago", "Cancelado", "Entregado"]}
            />

            <Autocomplete label="Vendedor" data={["Vendedor1", "vendedor2"]} />

            <Autocomplete label="Cobrador" data={["Cobrador1", "Cobrador2"]} />

            <Checkbox label="Muertero" />

            <Alert
              sx={{ gridColumn: "span 2" }}
              icon={<IconAlertCircle size="1rem" />}
              title="Éxito al guardar"
              color="green"
            >
              Número de Poliza: 1
            </Alert>

            <Button sx={{ gridColumn: "span 2" }}>Guardar</Button>
          </Box>
        </Drawer>
      </Box>

      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Estado</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {clientes?.map((cliente) => {
            return (
              <tr key={cliente.id}>
                <td>{cliente.estado ? "Activo" : "Inactivo"}</td>
                <td>{cliente.codigo}</td>
                <td>{cliente.nombres + " " + cliente.apellidos}</td>
                <td>{cliente.telefono1}</td>
                <td>{cliente.direccion1 + ", " + cliente.zona.id}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
