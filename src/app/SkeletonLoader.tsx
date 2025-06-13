// src/components/SkeletonLoader.tsx
const SkeletonCard = () => (
  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
    <div className="h-6 w-1/3 bg-slate-200 rounded mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-slate-200 rounded"></div>
      <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
      <div className="h-4 w-4/6 bg-slate-200 rounded"></div>
    </div>
  </div>
);

const SkeletonLoader = () => {
  return (
    <div className="mt-8 w-full bg-white p-6 md:p-8 rounded-lg shadow-md animate-pulse">
      <div className="h-8 w-1/2 mx-auto bg-slate-200 rounded-lg mb-6"></div>
      <div className="space-y-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default SkeletonLoader;