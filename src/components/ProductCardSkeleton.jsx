export default function ProductCardSkeleton() {
  return (
    <div>
      <div
        className="skeleton"
        style={{ aspectRatio: '2/3', width: '100%', marginBottom: 12 }}
      />
      <div
        className="skeleton"
        style={{ height: 10, width: '40%', marginBottom: 8 }}
      />
      <div
        className="skeleton"
        style={{ height: 14, width: '90%', marginBottom: 6 }}
      />
      <div
        className="skeleton"
        style={{ height: 14, width: '65%', marginBottom: 10 }}
      />
      <div
        className="skeleton"
        style={{ height: 15, width: '30%' }}
      />
    </div>
  );
}
