import { getDictionary } from "@/get-dictionaries";
import { Locale } from "@/i18n-config";
import Image from "next/image";
import {
  LucideExternalLink,
  LucideGithub,
  LucideLinkedin,
  LucideMail,
  LucideMapPin,
} from "lucide-react";
import Link from "next/link";
import Projects from "./_components/projects";
import Bio from "./_components/bio";
import Contact from "./_components/contact";
import LanguageSwitcher from "./_components/language-switcher";
import { LazyMotion, domAnimation } from "motion/react";

export default async function Home(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;

  const { lang } = params;

  const dictionary = await getDictionary(lang);

  return (
    <main className="md:w-[600px] mx-auto my-8 md:my-16 px-4 flex flex-col gap-12">
      {/* Header */}
      <div id="header" className="grid grid-cols-[64px_1fr_auto] gap-4 w-full">
        {/* <div id="logo" className="w-16 h-16 bg-slate-200 rounded-lg"></div> */}
        <Image
          src="/static/profile.webp"
          alt="profile"
          width={64}
          height={64}
          className="rounded-lg shadow-md"
          priority
          placeholder="blur"
          blurDataURL="/static/profile-blur.webp"
        />
        <div id="info" className="flex flex-col h-full justify-between gap-1">
          <h1 className="text-base font-medium">Sergio Segrera</h1>
          <p className="text-xs text-slate-500">
            {dictionary.title} @{" "}
            <Link
              href="https://clarum.ai"
              className="inline-flex items-center gap-1 hover:underline"
            >
              {dictionary.company}
              <LucideExternalLink size={12} />
            </Link>
          </p>
          <p className="text-xs text-slate-500 flex flex-row items-center">
            <LucideMapPin
              className="inline-block mr-1 text-slate-400"
              size={12}
            />
            {dictionary.location}
          </p>
        </div>
        <div id="lang-switcher" className="flex justify-end">
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
      <LazyMotion features={domAnimation}>
        {/* Bio */}
        <Bio dictionary={dictionary} />

        {/* Projects */}
        <Projects dictionary={dictionary} />

        {/* Contact */}
        <Contact dictionary={dictionary} />
      </LazyMotion>
    </main>
  );
}
