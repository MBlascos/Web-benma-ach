import Hero from "@/components/home/Hero";
import StatBar from "@/components/home/StatBar";
import AchievementsTeaser from "@/components/home/AchievementsTeaser";
import NextRace from "@/components/home/NextRace";
import SponsorStrip from "@/components/home/SponsorStrip";
import { CALENDAR_EVENTS, ACHIEVEMENTS, SPONSORS } from "@/lib/data";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const nextRace = CALENDAR_EVENTS.find((e) => e.status === "upcoming");
  const featuredAchievements = ACHIEVEMENTS.slice(0, 4);

  return (
    <>
      <Hero locale={locale} />
      <StatBar />
      <AchievementsTeaser achievements={featuredAchievements} locale={locale} />
      {nextRace && <NextRace event={nextRace} />}
      <SponsorStrip sponsors={SPONSORS} locale={locale} />
    </>
  );
}
