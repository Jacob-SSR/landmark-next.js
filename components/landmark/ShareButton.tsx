"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";

const ShareButton = ({
  landmark,
  name,
}: {
  landmark: string;
  name: string;
}) => {
  const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const shareLink = `${url}/landmark/${landmark}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Share2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="flex w-full gap-x-2 items-center"
      >
        <FacebookShareButton url={shareLink} name={name}>
          <FacebookIcon size={"36px"} className="rounded-full" />
        </FacebookShareButton>
        <TwitterShareButton url={shareLink} name={name}>
          <TwitterIcon size={"36px"} className="rounded-full" />
        </TwitterShareButton>
      </PopoverContent>
    </Popover>
  );
};
export default ShareButton;
