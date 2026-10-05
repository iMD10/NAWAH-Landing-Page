import Image from "next/image";

/**
 * Phone-shaped frame around an app screenshot.
 * Size it with `className` (width); height follows the 9:19.5 aspect ratio.
 */
export default function PhoneFrame({
  src,
  alt,
  className = "",
  sizes = "260px",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: "9 / 19.5",
        borderRadius: "2.4rem",
        padding: "7px",
        background: "var(--device-frame)",
        boxShadow: "var(--shadow-device)",
      }}
    >
      <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: "1.95rem" }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" priority={priority} />
      </div>
      {/* glass sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "2.4rem",
          background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, transparent 28%)",
        }}
      />
    </div>
  );
}
