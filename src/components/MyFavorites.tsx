import { useCallback, useEffect, useState } from "react";
import { Box, Button, CardMedia, IconButton, Typography } from "@mui/material";
import { dogsService } from "../api/dogsService";
import { Dog } from "../models/dogs";
import { DogCard } from "../components/DogCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const MyFavorites = () => {
  const [favoritesIds, setFavoritesIds] = useState<string[]>([]);
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavoritesIds(JSON.parse(storedFavorites));
    }
  }, []);

  const handleMatch = async () => {
    if (favoritesIds.length === 0) {
      alert("You must have at least one favorite dog to find a match!");
      return;
    }

    try {
      const responseId = await dogsService.matchDog(favoritesIds);
      // Fetch the matched dog's full details
      const matchedDogDetails = await dogsService.fetchDogsByIds([responseId]);
      setMatchedDog(matchedDogDetails[0]);
      localStorage.setItem("favorites", "");
    } catch (error) {
      console.error("Error matching dog:", error);
    }
  };

  useEffect(() => {
    if (favoritesIds.length > 0) {
      dogsService
        .fetchDogsByIds(favoritesIds)
        .then(setFavoriteDogs)
        .catch(console.error);
    }
  }, [favoritesIds]);

  const handleBackButtonClick = useCallback(
    () => navigate("/dashboard"),
    [navigate]
  );
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5, p: 3 }}>
      <IconButton onClick={handleBackButtonClick} sx={{ mb: 2 }}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        My Favorite Dogs
      </Typography>
      {!matchedDog && !!favoritesIds.length && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 3 }}
          onClick={handleMatch}
        >
          Find My Match
        </Button>
      )}

      {matchedDog ? (
        <>
          <Typography
            sx={{ paddingBottom: 4, width: "100%", textAlign: "center" }}
          >
            CONGRATULATIONS!!! Your match is lovely {matchedDog.name}
          </Typography>
          <CardMedia
            component="img"
            image={matchedDog.img}
            alt={matchedDog.name}
            sx={{
              objectFit: "cover",
              borderRadius: "8px 0 0 8px",
            }}
          />
        </>
      ) : favoriteDogs.length === 0 ? (
        <Typography textAlign="center">No favorite dogs yet.</Typography>
      ) : (
        favoriteDogs.map((dog) => <DogCard key={dog.id} dog={dog} />)
      )}
    </Box>
  );
};
