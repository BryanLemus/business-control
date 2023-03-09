import {
  Title,
  Text,
  TextInput,
  Textarea,
  Select,
  Switch,
  NumberInput,
  Radio,
  Group,
  Stack,
  MultiSelect,
  Autocomplete,
  Checkbox,
  Alert,
  Button,
  createStyles,
  Container,
  Modal,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconAlertCircle } from "@tabler/icons-react";
import "dayjs/locale/es";
import { collection, doc, getDoc } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { Cliente } from "../../types/Cliente";
import { Zona } from "../../types/Zona";

const useStyles = createStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    alignItems: "end",
    gap: "1rem",
  },
}));

interface Props {
  opened: boolean;
  close: () => void;
}

export function FormularioCliente({ opened, close }: Props) {
  const getZona = async () => {
    let zonaRef = doc(db, "zonas", "IogG6iyiZgxLzmZnd9Mf");
    let zonaDoc = await getDoc(zonaRef);
    //console.log(zonaDoc.get("nombre"), zonaDoc.get("departamento"));
  };

  useEffect(() => {
    getZona();
  });

  const { classes } = useStyles();
  const [cliente, setCliente] = useState<Cliente>({
    id: "",
    codigo: "",
    nombres: "",
    apellidos: "",
    direccion1: "",
    direccion2: "",
    telefono1: "",
    telefono2: "",
    estado: false,
    tipoDocumento: "",
    documento: "",
    tipoCliente: "persona",
    profesion: "",
    fechaNacimiento: new Date(),
    zona: "",
  });

  function onChangeHandler(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setCliente({ ...cliente, [name]: value });
  }

  return (
    <Modal withCloseButton={false} opened={opened} onClose={close} size="50%">
      <Container className={classes.container}>
        <Title sx={{ gridColumn: "span 2" }} order={3}>
          Nuevo Cliente
        </Title>
        <Text>Información Personal</Text>

        <Radio.Group sx={{ gridColumn: "span 2" }} value={cliente.tipoCliente}>
          <Group>
            <Radio
              value="persona"
              label="Persona"
              onClick={(e) =>
                setCliente({ ...cliente, tipoCliente: e.currentTarget.value })
              }
            />
            <Radio
              value="empresa"
              label="Empresa"
              onClick={(e) =>
                setCliente({ ...cliente, tipoCliente: e.currentTarget.value })
              }
            />
          </Group>
        </Radio.Group>

        <TextInput
          name="nombres"
          value={cliente.nombres}
          label="Nombre"
          placeholder="ej. Juan"
          withAsterisk
          required
          onChange={onChangeHandler}
        />

        <TextInput
          name="apellidos"
          value={cliente.apellidos}
          label="Apellidos"
          placeholder="ej. Pérez"
          withAsterisk
          onChange={onChangeHandler}
        />

        <DateInput
          value={cliente.fechaNacimiento}
          label="Fecha de Nacimiento"
          sx={{ gridColumn: "span 2" }}
          locale="es"
          withAsterisk
          onChange={(input) => {
            setCliente({
              ...cliente,
              fechaNacimiento: input ? new Date(input) : new Date(),
            });
          }}
        />

        <TextInput
          name="documento"
          value={cliente.documento}
          label={cliente.tipoCliente === "persona" ? "DUI" : "NRC"}
          placeholder="XXXXXXXXX"
          maxLength={9}
          withAsterisk
          onChange={onChangeHandler}
        />

        <TextInput
          name="profesion"
          value={cliente.profesion}
          label={cliente.tipoCliente === "persona" ? "Profesión" : "Giro"}
          onChange={onChangeHandler}
        />

        <TextInput
          name="telefono1"
          value={cliente.telefono1}
          label="Teléfono 1"
          withAsterisk
          onChange={onChangeHandler}
        />

        <TextInput
          name="telefono2"
          value={cliente.telefono2}
          label="Teléfono 2"
          onChange={onChangeHandler}
        />

        <Textarea
          name="direccion1"
          value={cliente.direccion1}
          label="Dirección"
          sx={{ gridColumn: "span 2" }}
          minRows={2}
          withAsterisk
          autosize
          onChange={onChangeHandler}
        />

        <Text sx={{ gridColumn: "span 2" }} size="lg">
          Información de Cobro
        </Text>

        <Select
          label="Tipo de Cliente"
          data={["Pasivo", "Crédito", "Contado", "Reservado"]}
        />

        <Textarea
          value={cliente.direccion2}
          label="Dirección de cobro"
          sx={{ gridColumn: "span 2" }}
          minRows={2}
          autosize
          disabled
          onChange={onChangeHandler}
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

        <Group grow sx={{ gridColumn: "span 2" }}>
          <Button variant={"outline"}>Cancelar</Button>
          <Button>Guardar</Button>
        </Group>
      </Container>
    </Modal>
  );
}
