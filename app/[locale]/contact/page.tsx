import { useTranslations } from "next-intl";
import ContactForm from "@/components/forms/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[#E10600] font-display font-bold text-xs tracking-[0.2em] uppercase mb-2">
            Contact
          </p>
          <h1 className="font-display font-black uppercase text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            {t("title")}
          </h1>
          <p className="text-[#8A9099] max-w-xl">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="bg-[#16181D] border border-white/5 rounded-lg p-5">
              <p className="text-[#E10600] text-xs font-bold tracking-widest uppercase mb-2">Management</p>
              <p className="text-white text-sm font-medium mb-1">Mañach Family</p>
              <p className="text-[#8A9099] text-xs leading-relaxed">{t("managed_by")}</p>
            </div>
            <div className="bg-[#16181D] border border-white/5 rounded-lg p-5">
              <p className="text-[#E10600] text-xs font-bold tracking-widest uppercase mb-2">Instagram</p>
              <a
                href="https://www.instagram.com/benjamin_manach"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:text-[#E10600] transition-colors"
              >
                @benjamin_manach
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
