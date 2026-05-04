import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Terms");
  return {
    title: t("title") + " | Nawah",
  };
}

export default async function TermsPage() {
  const t = await getTranslations("Terms");
  const sections = t.raw("sections") as Record<string, { title: string; content: string }>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8 font-sans">
      <div className="glass rounded-3xl p-8 md:p-12 lg:p-16">
        <header className="mb-12 border-b border-foreground/10 pb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3 text-foreground">
            {t("title")}
          </h1>
          <p className="text-xl text-foreground/70 mb-4 font-medium italic">
            {t("subtitle")}
          </p>
          <p className="text-sm text-slate-500 font-medium">
            {t("effectiveDate")}
          </p>
        </header>

        <div className="space-y-12">
          {Object.entries(sections).map(([key, section]) => (
            <section key={key} id={key} className="scroll-mt-24">
              <h2 className="text-2xl font-bold mb-6 text-foreground border-s-4 border-primary ps-4">
                {section.title}
              </h2>
              <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap space-y-4">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 pt-8 border-t border-foreground/10 text-center text-sm text-slate-500 italic">
          &copy; {new Date().getFullYear()} Nawah. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
