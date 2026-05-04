"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, HelpCircle, AlertTriangle } from "lucide-react";

export default function SupportPage() {
  const t = useTranslations("Support");

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
  ];

  const deletionSteps = [
    t("deletionStep1"),
    t("deletionStep2"),
    t("deletionStep3"),
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8 font-sans">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">
          {t("title")}
        </h1>
        <p className="text-xl text-foreground/70 font-medium max-w-2xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="glass rounded-3xl p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
          {t("howCanWeHelp")}
        </h2>
        <p className="text-lg text-foreground/80 leading-relaxed max-w-3xl">
          {t("intro")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="space-y-8">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 border-primary/10 shadow-lg shadow-primary/5"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                <Mail size={24} />
              </div>
              <h2 className="text-2xl font-bold font-heading text-foreground">
                {t("technicalSupport")}
              </h2>
            </div>
            <p className="text-foreground/70 mb-4 font-medium">
              {t("technicalSupportDesc")}
            </p>
            <a href="mailto:support@nawahfamily.com" className="text-lg font-bold text-primary hover:underline block break-all">
              support@nawahfamily.com
            </a>
            
            <div className="mt-8 pt-8 border-t border-foreground/10">
              <h3 className="text-xl font-bold font-heading text-foreground mb-4">
                {t("business")}
              </h3>
              <p className="text-foreground/70 mb-4 font-medium">
                {t("businessDesc")}
              </p>
              <a href="mailto:info@nawahfamily.com" className="text-lg font-bold text-foreground/80 hover:underline block break-all">
                info@nawahfamily.com
              </a>
            </div>
          </motion.div>

          {/* Account Deletion - Danger Zone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-3xl p-8 border-red-500/20 bg-red-500/[0.02] shadow-lg shadow-red-500/5 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
              <AlertTriangle size={120} className="text-red-600" />
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 shadow-inner">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-2xl font-bold font-heading text-red-600 dark:text-red-400">
                {t("deletionTitle")}
              </h2>
            </div>
            
            <p className="text-foreground/80 mb-6 font-medium">
              {t("deletionDesc")}
            </p>

            <div className="space-y-3 mb-8">
              {deletionSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-foreground/80 bg-white/40 dark:bg-black/20 p-3 rounded-xl border border-white/20 dark:border-white/5">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-center justify-center font-bold border border-red-500/20">
                    {i + 1}
                  </span>
                  <p className="text-sm font-medium">{step}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-600 dark:text-red-400 font-bold leading-relaxed">
                {t("deletionWarning")}
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-8 md:p-12 shadow-xl shadow-black/5"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-inner">
              <HelpCircle size={24} />
            </div>
            <h2 className="text-2xl font-bold font-heading text-foreground">
              {t("faqTitle")}
            </h2>
          </div>

          <div className="space-y-10">
            {faqs.map((faq, index) => (
              <div key={index} className="group">
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-start gap-3">
                  <span className="text-indigo-500 mt-1">Q.</span>
                  {faq.q}
                </h3>
                <div className="ps-8">
                  <p className="text-foreground/70 leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
                {index < faqs.length - 1 && (
                  <div className="mt-10 border-b border-foreground/5" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
