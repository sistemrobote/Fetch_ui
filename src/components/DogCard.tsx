import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dog } from "../models/dogs";

type Props = {
  dog: Dog;
};

export const DogCard = ({ dog }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Card
      sx={{
        display: "flex",
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
    </Card>
  );
};
