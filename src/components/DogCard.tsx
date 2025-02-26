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
import { useCallback } from "react";

type Props = {
  dog: Dog;
  setFavorites: React.Dispatch<React.SetStateAction<string[]>>;
  isFavorit?: boolean;
};

export const DogCard = ({ dog, setFavorites, isFavorit }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = useCallback(
    () => setFavorites((prev) => [...prev, dog.id]),
    [dog.id, setFavorites]
  );
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
