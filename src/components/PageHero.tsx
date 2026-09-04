import SiteShell from '@/components/SiteShell';

export default function PageHero({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-navy py-16 text-white">
      <div className="container-custom">
        <h1 className="headline mb-4 text-4xl md:text-5xl">{title}</h1>
        <p className="max-w-3xl text-lg text-white/80">{description}</p>
      </div>
    </div>
  );
}
