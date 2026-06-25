import { useTranslations } from "next-intl";
import Hero from "@/components/home/Hero";
import StatBar from "@/components/home/StatBar";
import AchievementsTeaser from "@/components/home/AchievementsTeaser";
import NextRace from "@/components/home/NextRace";
import SponsorStrip from "@/components/home/SponsorStrip";
import { RESULTS, CALENDAR_EVENTS, ACHIEVEMENTS, SPONSORS } from "@/lib/data";
import Link from "next/link";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations("home");

  const latestResult = RESULTS[0];
  const nextRace = CALENDAR_EVENTS.find((e) => e.status === "upcoming");
  const featuredAchievements = ACHIEVEMENTS.slice(0, 4);

  return (
    <>
      <Hero locale="en" />
      <StatBar />
      <AchievementsTeaser achievements={featuredAchievements} locale="en" />
      {nextRace && <NextRace event={nextRace} />}
      <SponsorStrip sponsors={SPONSORS} />
    </>
  );
}
