import {
  Box,
  TextInput,
  Title,
  Text,
  Button,
  Group,
  Menu,
  Flex,
  Checkbox,
} from "@mantine/core";
import { Toolbar } from "../components/Toolbar/Toolbar";
import {
  IconArrowsSort,
  IconChevronDown,
  IconMapPin,
  IconPrinter,
} from "@tabler/icons-react";

import { useDisclosure } from "@mantine/hooks";
import { TablaClientes } from "../features/Clientes/TablaClientes";
import { FormularioCliente } from "../features/Clientes/FormularioCliente";
import { useZonas } from "../hooks/useZonas";
import { useState } from "react";

export const ClientsPage = () => {
  const [search, setSearch] = useState("");
  const { zonas } = useZonas();
  const [opened, { open, close }] = useDisclosure(false);

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
          <TextInput
            sx={{ width: "280px" }}
            placeholder="Buscar clientes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

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
                  <IconMapPin />
                  <Text px="xs">Zona</Text>
                  <IconChevronDown />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {zonas?.map((zona) => (
                  <Menu.Item key={zona.id}>
                    <Checkbox.Group>
                      <Group>
                        <Checkbox
                          label={zona.nombre + ", " + zona.departamento}
                          defaultChecked
                        />
                      </Group>
                    </Checkbox.Group>
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Flex>
      </Box>
      <FormularioCliente opened={opened} close={close} />
      <TablaClientes search={search} />
    </>
  );
};
