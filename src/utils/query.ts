import {LogBox} from 'react-native';

export default async function query(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result?.message ?? 'Network response was not ok');
    }

    return result;
  } catch (error) {
    const e = error as Error;

    LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
    return null;
  }
}
