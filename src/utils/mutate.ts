import {LogBox} from 'react-native';

export default async function mutate(url: string, body: any) {
  let result: any = null;
  let error: string | null = null;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      method: 'POST',
      body: JSON.stringify(body),
    });
    const localResult = await response.json();

    result = localResult;

    if (!response.ok) {
      throw new Error(result?.message ?? 'Network response was not ok');
    }
  } catch (err) {
    const e = err as Error;
    error = result.message ?? 'Generic Server Error';
    result = null;
    console.error(error);
    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
  } finally {
    return {result, error};
  }
}
