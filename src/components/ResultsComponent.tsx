import { useEffect, useState } from "react";
import { dogsService } from "../api/dogsService";
import { Dog } from "../models/dogs";
import { DogCard } from "./DogCard";
import { Box, Button, Typography } from "@mui/material";
import { useDogsStore } from "../state/dogStore";

type Props = {
  ids: string[];
  loadingData: boolean;
  page: number;
  setPage: (page: number) => void;
  totalResults: number;
  size: number;
};

export const ResultsComponent = (props: Props) => {
  const { loadingData, ids, page, setPage, totalResults, size } = props;
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);
  const { results, setResults } = useDogsStore();

  useEffect(() => {
    if (!loadingData && ids.length)
      dogsService
        .fetchDogsByIds(ids)
        .then((result) => {
          setDogs(result);
        })
        .catch((error) => console.error("Error fetching Gogs by Ids", error));
  }, [loadingData, ids]);

  const generateMatch = async () => {
    if (favorites.length === 0) {
      alert("You must favorite at least one dog before matching!");
      return;
    }

    try {
      const matchId = await dogsService.matchDog(favorites);
      setMatchedDogId(matchId);
    } catch (error) {
      console.error("Error generating match", error);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);
  const handleNextClick = async () => {
    setPage(page + 1);
    try {
      const response = await dogsService.searchDogs({}, results?.next);
      setResults(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePreviousClick = async () => {
    setPage(page - 1);
    try {
      const response = await dogsService.searchDogs({}, results?.prev);
      setResults(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handlePreviousClick}
          disabled={page === 0} // Disable if first page
        >
          Previous
        </Button>
        <Typography>
          Page {page + 1} of {Math.ceil(totalResults / size)}
        </Typography>
        <Button
          variant="outlined"
          onClick={handleNextClick}
          disabled={page >= Math.ceil(totalResults / size) - 1} // Disable if last page
        >
          Next
        </Button>
      </Box>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isFavorit={isFavorite(dog.id)}
          setFavorites={setFavorites}
        />
      ))}
      {!!favorites.length && (
        <Button
          variant="outlined"
          onClick={generateMatch}
          sx={{
            marginTop: 3,
          }}
        >
          Match
        </Button>
      )}
    </>
  );
};
