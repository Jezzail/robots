import { http, HttpResponse } from "msw";

import { locations as allLocations, type Location } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) ?? 1;
    const location_name = url.searchParams.get("location_name");
    const robot_id = url.searchParams.get("robot_id");
    const is_starred = url.searchParams.get("is_starred");
    const pageSize = 6;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    console.log("location_name:", location_name);
    console.log("robot_id:", robot_id);
    console.log("is_starred:", is_starred);

    // Get starred locations from sessionStorage
    const starredLocationIds = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    console.log("starredLocationIds:", starredLocationIds);

    const filteredLocations = allLocations.filter((location) => {
      // Check if robot_id is provided and matches (non-strict match)
      const robotMatch = robot_id
        ? location.robot?.id.toLowerCase().includes(robot_id.toLowerCase())
        : true;

      // Check if location_name is provided and matches (non-strict match)
      const locationMatch = location_name
        ? location.name.toLowerCase().includes(location_name.toLowerCase())
        : true;

      // If is_starred is true, filter by starred location ids
      const starredMatch =
        is_starred === "true" ? starredLocationIds.includes(location.id) : true;

      // Include location if it matches location_name, robot_id, and starred status (if is_starred is true)
      return (robotMatch || locationMatch) && starredMatch;
    });

    const locations: Location[] = filteredLocations.slice(startIndex, endIndex);

    const result: LocationsResult = {
      total_count: allLocations.length,
      locations: locations,
    };

    return HttpResponse.json(result);
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
    try {
      // Read the body as text
      const textBody = await request.text();

      if (!textBody) {
        return HttpResponse.json(
          { error_msg: "Encountered unexpected error" },
          { status: 500 },
        );
      }

      // Parse the textBody as JSON
      const requestBody = JSON.parse(textBody);

      sessionStorage.setItem(
        "starred_location_ids",
        JSON.stringify(requestBody),
      );

      return HttpResponse.json({}, { status: 200 });
    } catch (error) {
      console.error("Error parsing body:", error);
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }
  }),
];
