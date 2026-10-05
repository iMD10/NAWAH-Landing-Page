import Image from "next/image";

/** A real Nawah app screenshot (1170×2532) in a slim device frame. */
export default function PhoneScreen({
  src,
  alt,
  sizes = "(min-width: 1024px) 300px, 260px",
  preload = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`nw-phone ${className}`}>
      <Image src={src} alt={alt} width={1170} height={2532} sizes={sizes} preload={preload} />
    </div>
  );
}
