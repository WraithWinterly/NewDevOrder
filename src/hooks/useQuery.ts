// useCustomQuery.ts

import {useState, useEffect} from 'react';
import {LogBox} from 'react-native';

export default function useQuery(url?: string | null) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const query = async (overrideUrl?: string | null) => {
    try {
      setLoading(true);
      setError(null);
      setData(null);

      if (!url && !overrideUrl) {
        console.error('Must provide a url to query function!');
        return;
      }
      const response = await fetch(overrideUrl ? overrideUrl : url!, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message ?? 'Network response was not ok');
      }
      setData(result);

      return result;
    } catch (error) {
      const e = error as Error;
      setError(e.message ?? 'Generic Server Error');
      LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {data, loading, error, query};
}
