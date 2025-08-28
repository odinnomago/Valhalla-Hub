import MarketingCopyGenerator from '@/components/marketing/MarketingCopyGenerator';

export default function MarketingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-4 mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
          AI Marketing Copy Generator
        </h1>
        <p className="max-w-[700px] mx-auto text-foreground/80 md:text-xl">
          Craft compelling marketing copy for your music in seconds. Describe your track, define your audience, and let our AI do the rest.
        </p>
      </div>
      <MarketingCopyGenerator />
    </div>
  );
}
