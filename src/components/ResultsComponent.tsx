import { useEffect, useState } from "react";
import { dogsService } from "../api/dogsService";
import { Dog } from "../models/dogs";
import { DogCard } from "./DogCard";

type Props = {
  ids: string[];
  loadingData: boolean;
};

export const ResultsComponent = (props: Props) => {
  const { loadingData, ids } = props;
  const [dogs, setDogs] = useState<Dog[]>([]);
  useEffect(() => {
    if (!loadingData && ids.length)
      dogsService
        .fetchDogsByIds(ids)
        .then((result) => {
          setDogs(result);
        })
        .catch((error) => console.error("Error fetching Gogs by Ids", error));
  }, [loadingData, ids]);

  return (
    <>
      {dogs.map((dog) => (
        <DogCard dog={dog} />
      ))}
    </>
  );
};
