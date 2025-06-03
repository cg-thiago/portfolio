export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section Skeleton */}
      <div className="relative w-full min-h-[60vh] bg-black/20 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/10" />
        <div className="relative z-20 p-8 md:p-16 max-w-3xl">
          <div className="h-12 md:h-16 w-3/4 bg-white/10 rounded-lg mb-4" />
          <div className="h-6 md:h-8 w-1/2 bg-white/10 rounded-lg" />
        </div>
      </div>

      {/* Description Section Skeleton */}
      <div className="max-w-2xl mx-auto px-4 py-12 md:py-20">
        <div className="h-8 md:h-10 w-full bg-white/10 rounded-lg mb-6" />
        <div className="h-6 md:h-8 w-3/4 bg-white/10 rounded-lg mb-4" />
        <div className="h-6 md:h-8 w-2/3 bg-white/10 rounded-lg" />
      </div>

      {/* Tags Skeleton */}
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 w-20 bg-white/10 rounded-full" />
          ))}
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="max-w-2xl mx-auto px-4 py-12 grid gap-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 rounded-xl p-6 border-l-4 border-orange-500">
            <div className="h-6 w-1/3 bg-white/10 rounded-lg mb-4" />
            <div className="h-4 w-full bg-white/10 rounded-lg mb-2" />
            <div className="h-4 w-3/4 bg-white/10 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Gallery Skeleton */}
      <div className="w-full py-16 px-0 md:px-8">
        <div className="h-8 w-1/3 bg-white/10 rounded-lg mb-6 mx-4" />
        <div className="overflow-x-auto hide-scrollbar">
          <div className="flex gap-8 px-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="min-w-[340px] max-w-[480px] aspect-[4/3] rounded-2xl bg-white/10 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 