import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Dog } from "../models/dogs";
import { useCallback, useEffect } from "react";

type Props = {
  dog: Dog;
  favorites?: string[];
  setFavorites?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const DogCard = ({ dog, favorites, setFavorites }: Props) => {
  const theme = useTheme();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites?.(JSON.parse(storedFavorites));
  }, [setFavorites]);

  const isFavorit = favorites?.includes(dog.id);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = useCallback(() => {
    setFavorites?.((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(dog.id)) {
        updatedFavorites = prevFavorites.filter((id) => id !== dog.id); // Remove favorite
      } else {
        updatedFavorites = [...prevFavorites, dog.id]; // Add favorite
      }

      try {
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update localStorage
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }

      return updatedFavorites;
    });
  }, [dog.id, setFavorites]);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 2,
        flexDirection: isMobile ? "column" : "row",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardMedia
        component="img"
        image={dog.img}
        alt={dog.name}
        sx={{
          width: isMobile ? "100%" : 200,
          height: isMobile ? 250 : 200,
          objectFit: "cover",
          borderRadius: isMobile ? "8px 8px 0 0" : "8px 0 0 8px",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          {dog.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {dog.breed}
        </Typography>
        <Typography variant="body2">Age: {dog.age}</Typography>
        <Typography variant="body2">Location: {dog.zip_code}</Typography>
      </CardContent>
      <IconButton
        aria-label="fingerprint"
        color="secondary"
        disableRipple
        sx={{
          paddingRight: 5,
          "&.MuiButtonBase-root:hover": {
            bgcolor: "transparent",
          },
        }}
        onClick={handleClick}
      >
        {isFavorit ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
      </IconButton>
    </Card>
  );
};
