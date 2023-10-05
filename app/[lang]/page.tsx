import Introduction from "@/components/Introduction";
import LocaleSwitcher from "@/components/LocalSwitcher";
import ModelViewer from "@/components/Marcus";
import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="h-[100dvh] grid grid-rows-2 md:grid-cols-2 md:auto-cols-[1fr] md:grid-rows-none items-stretch content-stretch flex-nowrap p-4 gap-4">
      <section className="bg-slate-200 p-4 rounded-lg flex flex-col gap-8 justify-center">
        <Introduction
          intro={dictionary.introduction}
          subtitle={dictionary.subtitle}
        />
      </section>
      <section className="bg-slate-200 p-4 rounded-lg flex justify-center items-center">
        <ModelViewer />
      </section>
    </main>
  );
}
