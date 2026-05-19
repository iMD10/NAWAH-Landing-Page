import { getTranslations } from "next-intl/server";
import MissionSection from "@/components/sections/MissionSection";
import TeamSection from "@/components/sections/TeamSection";
import OriginTimelineSection from "@/components/sections/OriginTimelineSection";
import TechUniversitySection from "@/components/sections/TechUniversitySection";
import CtaSection from "@/components/sections/CtaSection";

export async function generateMetadata() {
  const t = await getTranslations("About");
  return { title: `${t("metaTitle")} | Nawah` };
}

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-x-hidden" style={{ background: "var(--bg-page)" }}>
      <MissionSection />
      <TeamSection />
      <OriginTimelineSection />
      <TechUniversitySection />
      <CtaSection />
    </div>
  );
}
