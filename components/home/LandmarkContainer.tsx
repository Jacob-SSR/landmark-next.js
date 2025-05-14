import { fetchLandmarkHeros, fetchLandmarks } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";
import CategoriesList from "./CategoriesList";
import EmptyList from "./EmptyList";

const LandmarkContainer = async ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const landmarks: LandmarkCardProps[] = await fetchLandmarks({
    search,
    category,
  });
  const landmarkHeros: LandmarkCardProps[] = await fetchLandmarkHeros();

  // if (landmarks.length === 0) {
  //   return <EmptyList />;
  // }

  return (
    <div>
      <Hero landmarks={landmarkHeros} />
      <CategoriesList search={search} category={category} />
      {landmarks.length === 0 ? (
        <EmptyList heading="No results" btnText="Clear Filters" />
      ) : (
        <LandmarkList landmarks={landmarks} />
      )}
    </div>
  );
};
export default LandmarkContainer;
