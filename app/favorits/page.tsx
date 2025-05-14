import { fetchFavorites } from "@/actions/actions";
import EmptyList from "@/components/home/EmptyList";
import LandmarkList from "@/components/home/LandmarkList";

const FavoritesPage = async () => {
  const favorites = await fetchFavorites();
  if (favorites.length === 0) {
    return <EmptyList heading="No items Favorits"/>;
  }
  return <LandmarkList landmarks={favorites} />;
};
export default FavoritesPage;
