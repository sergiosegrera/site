import { LucideMapPin } from "lucide-react";
import { LazyMotion, domAnimation } from "motion/react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Bio from "./_components/bio";
import Blog from "./_components/blog";
import Contact from "./_components/contact";
import LanguageSwitcher from "./_components/language-switcher";
import Projects from "./_components/projects";

export default async function Home() {
  const t = await getTranslations("home");

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
          <p className="text-xs text-slate-500">{t("title")}</p>
          <p className="text-xs text-slate-500 flex flex-row items-center">
            <LucideMapPin
              className="inline-block mr-1 text-slate-400"
              size={12}
            />
            {t("location")}
          </p>
        </div>
        <div id="lang-switcher" className="flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>
      <LazyMotion features={domAnimation}>
        {/* Bio */}
        <Bio />

        {/* Projects */}
        <Projects />

        {/* Blog */}
        <Blog />

        {/* Contact */}
        <Contact />
      </LazyMotion>
    </main>
  );
}
