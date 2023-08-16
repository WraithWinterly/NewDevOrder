// useCustomQuery.ts

import {useState} from 'react';
import {LogBox} from 'react-native';

export default function useMutation(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (body: any) => {
    try {
      setLoading(true);
      setError(null);
      setData(null);
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${globalThis.authToken}`,
        },
        method: 'POST',
        body: JSON.stringify(body),
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
      console.error(e.message ?? 'Generic Server Error');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {data, loading, error, mutate};
}
