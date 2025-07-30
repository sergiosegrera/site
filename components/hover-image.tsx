import Image from "next/image";

export default function HoverImage({
  blurredImage,
  image,
  alt,
}: {
  blurredImage: string;
  image: string;
  alt: string;
}) {
  return (
    <div className="relative w-[48px] h-[48px] rounded-lg shadow-sm overflow-hidden">
      <Image src={image} alt={alt} fill className="object-cover" />
      <Image
        src={blurredImage}
        alt={alt}
        fill
        className="object-cover group-hover:opacity-0 transition-opacity duration-300"
        priority
      />
    </div>
  );
}
