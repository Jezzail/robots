export interface Location {
  id: number;
  name: string;
  type: "Disinfection" | "Serving";
  robot?: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  // Please add more locations to show features

  {
    id: 0,
    name: "Location blue",
    type: "Disinfection",
    robot: {
      id: "Pennybot-123456",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Location red",
    type: "Disinfection",
    robot: {
      id: "Pennybot-fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Location green",
    type: "Serving",
  },
  {
    id: 3,
    name: "Location yellow",
    type: "Serving",
    robot: {
      id: "Pennybot-pqrst123",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "Location orange",
    type: "Disinfection",
  },
  {
    id: 5,
    name: "Location purple",
    type: "Disinfection",
  },
  {
    id: 6,
    name: "Location pink",
    type: "Serving",
    robot: {
      id: "Pennybot-67890",
      is_online: true,
    },
  },
  {
    id: 7,
    name: "Location black",
    type: "Disinfection",
  },
  {
    id: 8,
    name: "Location white",
    type: "Serving",
  },
  {
    id: 9,
    name: "Location brown",
    type: "Disinfection",
    robot: { id: "Pennybot-klmno789", is_online: true },
  },
];
