import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <main className="md:w-[600px] mx-auto">
      <h1>{dictionary.title}</h1>
    </main>
  );
}
