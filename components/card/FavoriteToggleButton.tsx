import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { SignInCardButton } from "../form/Buttons";
import { fetchFavoriteId } from "@/actions/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ landmarkId }: { landmarkId: string }) => {
  const { userId } = await auth();
  console.log(userId);

  if (!userId) return <SignInCardButton />;

  const foveriteId = await fetchFavoriteId({ landmarkId });
  console.log(foveriteId);

  return <FavoriteToggleForm favoriteId={foveriteId} landmarkId={landmarkId} />;
};
export default FavoriteToggleButton;
