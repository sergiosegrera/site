import { getTranslations } from "next-intl/server";
import Header from "@/components/header";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
      <Header />
      <div className="flex flex-col gap-2">
        <h1 className="text-base font-medium">{t("title")}</h1>
        <p className="text-xs text-slate-500">{t("description")}</p>
        <Link href="/" className="text-xs text-slate-500 hover:underline w-fit">
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
