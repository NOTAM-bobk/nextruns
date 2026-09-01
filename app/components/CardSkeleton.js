export function CardSkeleton() {
  return (
    <div className="card card--skeleton" aria-hidden="true">
      <div className="sk sk--badge" />
      <div className="sk sk--title" />
      <div className="sk sk--line" />
      <div className="sk sk--line sk--line-short" />
      <div className="sk sk--tag" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-3" style={{ paddingBottom: 64 }}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
