import Image from "next/image";

const LandmarkCard = ({ landmark }) => {
  const { name, image } = landmark;
  return (
    <article className="group relative">
      <div className="relative h-[300px]">
        <Image
          src={image}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          alt={name}
          className="object-cover"
        />
      </div>
    </article>
  );
};
export default LandmarkCard;
