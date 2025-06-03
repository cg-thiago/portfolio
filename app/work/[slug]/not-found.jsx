import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">Project Not Found</h1>
        <p className="text-lg mb-6">
          The project you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/work"
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    </div>
  );
} 