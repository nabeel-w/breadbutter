"use client";
import { fetchGigs, resetGigs } from "@/app/redux/slices/gigsSlice";
import { useAppDispatch } from "@/app/redux/useDispatch";
import { useEffect, useState } from "react";

export default function GigsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const gigs = await dispatch(fetchGigs());
        if (fetchGigs.rejected.match(gigs)) {
          throw new Error(gigs.error.message);
        }
        if (isMounted) {
          setIsLoading(false);
          setError(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (isMounted) {
          setIsLoading(false);
          setError(
            error instanceof Error ? error.message : "An error occurred"
          );
        }
      }
    };

    fetchData();

    return () => {
      // Cleanup if necessary
      isMounted = false;
      dispatch(resetGigs());
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <section>{children}</section>;
}
