"use client";

export default function Error({
  error,
}: {
  error: Error;
}) {

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center py-10">
      <h2 className="text-lg sm:text-2xl font-bold mb-4 text-white text-center">
       {error?.message}
      </h2>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-[#181818] text-white rounded hover:bg-[rgb(207,255,17)] hover:text-black transition duration-300"
      >
        Try again
      </button>
    </div>
  );
}
