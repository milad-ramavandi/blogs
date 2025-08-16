const Skeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 post-item sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2.5">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={idx} className="animate-pulse space-y-3">
          <div className="h-48 bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
