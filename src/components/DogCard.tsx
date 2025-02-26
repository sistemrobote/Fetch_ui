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
import { useCallback, useState } from "react";

type Props = {
  dog: Dog;
};

export const DogCard = ({ dog }: Props) => {
  const theme = useTheme();
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const isFavorit = favorites.includes(dog.id);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = useCallback(() => {
    setFavorites((prevFavorites: string[]) => {
      let updatedFavorites;
      if (prevFavorites.includes(dog.id)) {
        updatedFavorites = prevFavorites.filter((id) => id !== dog.id); // Remove from favorites
      } else {
        updatedFavorites = [...prevFavorites, dog.id]; // Add to favorites
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Store in localStorage
      return updatedFavorites;
    });
  }, [dog.id]);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: 2,
        flexDirection: isMobile ? "column" : "row",
        width: 600,
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
