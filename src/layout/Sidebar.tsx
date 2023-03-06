import {
  createStyles,
  Navbar,
  TextInput,
  UnstyledButton,
  Badge,
  Text,
  Group,
  rem,
} from "@mantine/core";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
    height: "100%",
  },

  section: {
    // marginLeft: `calc(${theme.spacing.md} * -1)`,
    // marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    userSelect: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

const links = [
  { icon: IconBulb, label: "Actividad", notifications: 3 },
  { icon: IconCheckbox, label: "Tareas", notifications: 4 },
  { icon: IconUser, label: "Contactos" },
];

const collections = [
  { emoji: "👍", label: "Ventas", to: "/sales" },
  { emoji: "🚚", label: "Entregas", to: "/deliveries" },
  { emoji: "💸", label: "Descuentos", to: "/discounts" },
  { emoji: "💰", label: "Ganancias", to: "/profits" },
  { emoji: "✨", label: "Reportes", to: "/reports" },
  { emoji: "🛒", label: "Órdenes", to: "/orders" },
  { emoji: "📅", label: "Eventos", to: "/events" },
  { emoji: "🙈", label: "Deudas", to: "/doubts" },
  { emoji: "💁‍♀️", label: "Clientes", to: "/clients" },
];

export function Sidebar() {
  /**
   * State
   */
  const { classes } = useStyles();
  const navigate = useNavigate();

  /**
   * Main Links
   */
  const mainLinks = links.map((link) => (
    <UnstyledButton key={link.label} className={classes.mainLink}>
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  /**
   * Collection Links
   */
  const collectionLinks = collections.map((collection) => (
    <a
      onClick={(event) => {
        event.preventDefault();
        navigate(collection.to);
      }}
      key={collection.label}
      className={classes.collectionLink}
    >
      <span
        style={{
          marginRight: rem(9),
          fontSize: rem(16),
        }}
      >
        {collection.emoji}
      </span>{" "}
      {collection.label}
    </a>
  ));

  return (
    <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <TextInput
        placeholder="Buscar"
        size="xs"
        icon={<IconSearch size="0.8rem" stroke={1.5} />}
        mb="sm"
      />

      {/* Main Links */}
      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      {/* Collections Links */}
      <Navbar.Section className={classes.section}>
        <Group className={classes.collectionsHeader} position="apart">
          <Text size="xs" weight={500} color="dimmed">
            Colecciones
          </Text>
        </Group>
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
    </Navbar>
  );
}
