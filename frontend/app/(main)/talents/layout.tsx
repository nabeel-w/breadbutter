"use client";

import { fetchTalents, resetTalents } from "@/app/redux/slices/talentSlice";
import { useAppDispatch } from "@/app/redux/useDispatch";
import { useEffect, useState } from "react";

export default function TalentsLayout({
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
        // Simulate fetching talents data
        const talents = await dispatch(fetchTalents());
        if (fetchTalents.rejected.match(talents)) {
          throw new Error(talents.error.message);
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
      dispatch(resetTalents());
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
