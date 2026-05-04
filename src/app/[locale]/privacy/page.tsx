import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("Privacy");
  return {
    title: t("title") + " | Nawah",
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");
  const sections = t.raw("sections");

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div className="glass rounded-3xl p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2 text-foreground">
          {t("title")}
        </h1>
        <p className="text-xl text-foreground/60 font-medium mb-4">
          {t("subtitle")}
        </p>
        <p className="text-sm text-slate-500 mb-12">{t("effectiveDate")}</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 font-sans leading-relaxed">
          <div className="mb-12 whitespace-pre-wrap">
            {t("introduction")}
          </div>

          {Object.entries(sections).map(([key, section]: [string, any]) => (
            <section key={key} id={key} className="scroll-mt-24 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground border-s-4 border-primary ps-4">
                {section.title}
              </h2>
              {section.content && (
                <div className="whitespace-pre-wrap mb-4 text-foreground/80">
                  {section.content}
                </div>
              )}
              
              {section.table && (
                <div className="overflow-x-auto my-6 bg-foreground/5 rounded-2xl p-4">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="border-b border-foreground/10 text-foreground">
                        <th className="py-2 pe-4 font-bold">{t("tableLabels.permission")}</th>
                        <th className="py-2 font-bold">{t("tableLabels.why")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5 text-foreground/80">
                      {section.table.map((row: string[], i: number) => (
                        <tr key={i}>
                          <td className="py-3 pe-4 font-medium text-foreground">{row[0]}</td>
                          <td className="py-3">{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.providers && (
                <div className="overflow-x-auto my-6 bg-foreground/5 rounded-2xl p-4">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="border-b border-foreground/10 text-foreground">
                        <th className="py-2 pe-4 font-bold">{t("tableLabels.provider")}</th>
                        <th className="py-2 pe-4 font-bold">{t("tableLabels.purpose")}</th>
                        <th className="py-2 font-bold">{t("tableLabels.data")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-foreground/5 text-foreground/80">
                      {section.providers.map((row: string[], i: number) => (
                        <tr key={i}>
                          <td className="py-3 pe-4 font-medium text-foreground">{row[0]}</td>
                          <td className="py-3 pe-4">{row[1]}</td>
                          <td className="py-3">{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.footer && (
                <div className="whitespace-pre-wrap mt-4 text-foreground/80">
                  {section.footer}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
