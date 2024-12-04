import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3961F8", // Your primary color
      dark: "#133BD3", // Darker shade of primary color
      light: "#B8DDFF", // Lighter shade of primary color
    },
    secondary: {
      main: "#0091FF", // Your secondary color
      dark: "#00457A", // Darker shade of secondary color
      light: "#D7EEFF", // Lighter shade of secondary color
    },
    text: {
      primary: "#3961F8", // Default text color
      secondary: "#666", // Secondary text color
    },
    background: {
      default: "#f5f5f5", // Background color
    },
    grey: {
      50: "#FAFAFB",
    },
  },
  typography: {
    h1: {
      fontSize: 96, // Adjust h1 size
      fontWeight: 300, // Boldness
      lineHeight: 1.2, // Line height
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    // You can add more typography variants as needed
  },
});

export default theme;
