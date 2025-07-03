import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200/60", className)}
      {...props}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/70 min-h-[180px]">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-grow">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="text-center">
      <Skeleton className="h-8 w-16 mx-auto mb-2" />
      <Skeleton className="h-4 w-20 mx-auto" />
    </div>
  );
}