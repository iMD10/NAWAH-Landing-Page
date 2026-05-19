import { getTranslations } from "next-intl/server";
import TeamSection from "@/components/sections/TeamSection";

export async function generateMetadata() {
  const t = await getTranslations("About");
  return { title: `${t("metaTitle")} | Nawah` };
}

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-x-hidden" style={{ background: "var(--bg-page)" }}>
      <TeamSection />
    </div>
  );
}
