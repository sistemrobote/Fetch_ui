import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  Autocomplete,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { dogsService } from "../api/dogsService";
import { ResultsComponent } from "./ResultsComponent";
import { InputData } from "../models/dogs";
import { transformData } from "./utils";
import { withAuth } from "../routing/ProtectedWrapper";
import { Header } from "./Header";
import { useDogsStore } from "../state/dogStore";

export const Dashboard: React.FC = withAuth(() => {
  const { control, handleSubmit, watch, setValue } = useForm<InputData>({
    defaultValues: {
      breeds: [],
      zipCodes: "",
      ageMin: "0",
      ageMax: "20",
      size: "25",
      from: "0",
      sort: "",
    },
  });

  const { results, setResults } = useDogsStore();
  const [loading, setLoading] = useState(false);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await dogsService.getBreeds();

        setBreeds(data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  const onSubmit = async (data: InputData) => {
    setLoading(true);
    const parsedData = transformData(data);
    try {
      const response = await dogsService.searchDogs({
        ...parsedData,
        size: data.size,
        from: data.from,
        sort: data.sort || undefined, // Send sort param if selected
      });
      setResults(response);
    } catch (error) {
      console.error("Error searching dogs:", error);
    } finally {
      setLoading(false);
    }
  };
  const selectedSize = watch("size");

  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: 600,
          mx: "auto",
          mt: 6,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Search for Dogs
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Controller
              name="breeds"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  options={breeds}
                  value={value || []}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Favorite Breeds"
                    />
                  )}
                />
              )}
            />
          </FormControl>

          <Controller
            name="zipCodes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zip Codes (comma separated)"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name="ageMin"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={field.value}
                label="Minimum age"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />

          <Controller
            name="ageMax"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                defaultValue={field.value}
                label="Maximum age"
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
          <Stack direction="row" spacing={4}>
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Results per Page"
                  type="number"
                  sx={{ mb: 2, maxWidth: "120px" }}
                />
              )}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Controller
                name="sort"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label={"Sort by"}
                    onChange={(e) => setValue("sort", e.target.value)}
                    displayEmpty
                    sx={{ mb: 2, maxWidth: "120px" }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="breed:asc">Breed (A-Z)</MenuItem>
                    <MenuItem value="breed:desc">Breed (Z-A)</MenuItem>
                    <MenuItem value="name:asc">Name (A-Z)</MenuItem>
                    <MenuItem value="name:desc">Name (Z-A)</MenuItem>
                    <MenuItem value="age:asc">Age (Youngest First)</MenuItem>
                    <MenuItem value="age:desc">Age (Oldest First)</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#45a049" },
            }}
          >
            Search Dogs
          </Button>
        </form>
        {results?.resultIds.length === 0 && !loading ? (
          <Typography>No results matched, try update filters</Typography>
        ) : (
          <ResultsComponent
            ids={results?.resultIds ?? []}
            loadingData={loading}
            page={page}
            setPage={setPage}
            totalResults={results?.total ?? 0}
            size={parseInt(selectedSize || "25")}
          />
        )}
      </Box>
    </>
  );
});
