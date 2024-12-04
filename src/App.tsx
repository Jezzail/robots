import { useEffect, useState } from "react";

import { ThemeProvider } from "@mui/material/styles";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Box, ButtonBase, Typography } from "@mui/material";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import RefreshIcon from "@mui/icons-material/Refresh";

import theme from "./theme"; // Import the custom theme file
import Dropdown from "./components/Dropdown";
import Input from "./components/Input";

import { worker } from "./mocks/browser"; // Import the worker from browser.ts
import { type Location as LocationType } from "./mocks/db";

const App = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 6,
    page: 0,
  });
  const [starredLocations, setStarredLocations] = useState<Set<number>>(
    new Set(),
  );
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isStarred, setIsStarred] = useState(false);

  // Function to toggle starred locations
  const toggleStarred = async (id: number) => {
    const updatedStarredLocations = new Set(starredLocations);
    if (updatedStarredLocations.has(id)) {
      updatedStarredLocations.delete(id);
    } else {
      updatedStarredLocations.add(id);
    }
    setStarredLocations(updatedStarredLocations);

    try {
      await fetch("/starred_location_ids", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Array.from(updatedStarredLocations)),
      });
    } catch (error) {
      console.error("Error updating starred locations:", error);
    }
  };

  useEffect(() => {
    // Fetch the starred locations from the mocked endpoint
    const fetchStarredLocations = async () => {
      await worker.start(); // Ensure MSW worker starts first

      try {
        const response = await fetch("/starred_location_ids");
        const data = await response.json();
        console.log("Starred locations:", data.location_ids);
        setStarredLocations(new Set(data.location_ids));
      } catch (error) {
        console.error("Error fetching starred locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredLocations();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      await worker.start(); // Ensure MSW worker starts first

      const fetchData = async () => {
        setLoading(true);

        try {
          // Add searchText as a query parameter
          const response = await fetch(
            `/locations?page=${paginationModel.page + 1}&location_name=${encodeURIComponent(searchText)}&robot_id=${encodeURIComponent(searchText)}&is_starred=${isStarred}`,
          );
          const data = await response.json();
          console.log(data);
          setLocations(data.locations);
          setTotalCount(data.total_count);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    };

    fetchLocations();
  }, [paginationModel, searchText, isStarred]);

  const columns: GridColDef[] = [
    {
      field: "id",
      width: 75,
      sortable: false,
      renderHeader: (params: GridColumnHeaderParams) => <RefreshIcon />,
      renderCell: (params: GridRenderCellParams<LocationType>) => {
        return (
          <ButtonBase onClick={() => toggleStarred(Number(params.id))}>
            {starredLocations.has(Number(params.id)) ? (
              <StarIcon color="action" />
            ) : (
              <StarBorderIcon color="action" />
            )}
          </ButtonBase>
        );
      },
    },
    { field: "name", width: 400, headerName: "Locations", sortable: false },
    {
      field: "robot_id",
      headerName: "Robots",
      width: 200,
      sortable: false,
      display: "flex",
      renderCell: (params: GridRenderCellParams<LocationType>) => {
        if (params.row.robot === undefined) {
          return (
            <Typography
              component="a"
              variant="caption"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Add
            </Typography>
          );
        } else {
          return (
            <Box sx={{ display: "flex", gap: 2 }}>
              <CircleRoundedIcon
                color={params.row.robot.is_online ? "success" : "error"}
                sx={{ height: 16, width: 16 }}
              />
              <Typography variant="caption">{params.row.robot.id}</Typography>
            </Box>
          );
        }
      },
    },
    {
      field: "type",
      headerName: "Location Types",
      sortable: false,
      width: 200,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          marginX: "3.25rem",
          marginY: "2.5rem",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1.5rem" }}>
          Your Fleet
        </Typography>
        <Box
          sx={{
            display: "flex",
            marginBottom: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Dropdown
            options={[
              { value: "all", label: "All Locations" },
              { value: "starred", label: "Starred" },
            ]}
            onChange={(value) => setIsStarred(value === "starred")}
          />
          <Input value={searchText} onChange={setSearchText} />
        </Box>
        <DataGrid
          rows={locations}
          columns={columns}
          rowCount={totalCount}
          paginationMode="server"
          paginationModel={paginationModel}
          loading={loading}
          checkboxSelection
          pageSizeOptions={[6]}
          disableRowSelectionOnClick
          onPaginationModelChange={(model) => {
            console.log(model);
            setPaginationModel(model);
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
