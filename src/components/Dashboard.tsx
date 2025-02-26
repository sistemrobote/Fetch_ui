import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { dogsService } from "../api/dogsService";
import { ResultsComponent } from "./ResultsComponent";
import { InputData } from "../models/dogs";
import { transformData } from "./utils";
import { withAuth } from "../routing/ProtectedWrapper";
import { LogoutButton } from "./LogoutButton";
import { useDogsStore } from "../state/dogStore";

export const Dashboard: React.FC = withAuth(() => {
  const { control, handleSubmit, watch } = useForm<InputData>({
    defaultValues: {
      breeds: [],
      zipCodes: "",
      ageMin: "0",
      ageMax: "20",
      size: "4", // change to 25
      from: "0",
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
      <LogoutButton />
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
