type PhotoPlaceholderProps = {
  title: string;
  need: string;
};

export default function PhotoPlaceholder({ title, need }: PhotoPlaceholderProps) {
  return (
    <figure className="border border-dashed border-navy/25 bg-paper p-5">
      <div className="mb-4 flex aspect-[4/3] items-center justify-center bg-navy/5 text-center text-sm font-semibold uppercase tracking-wide text-muted">
        Photo needed
      </div>
      <figcaption>
        <p className="font-bold text-navy">{title}</p>
        <p className="mt-1 text-sm text-muted">{need}</p>
      </figcaption>
    </figure>
  );
}
