import {useState} from 'react';
import axios from 'axios';
import {CreateProfile} from 'sharedTypes';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

const createProfile = async (profile: CreateProfile | undefined) => {
  if (!profile) {
    throw new Error('profile is undefined');
  }

  console.log(getServerEndpoint(Endpoints.CREATE_PROFILE));

  const {data} = await axios.post(
    getServerEndpoint(Endpoints.CREATE_PROFILE),
    profile,
  );
  return data;
};

const useCreateProfile = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mutateAsync = async (profile: CreateProfile | undefined) => {
    try {
      setIsLoading(true);
      const result = await createProfile(profile);
      setData(result);
      setIsLoading(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    mutateAsync,
  };
};

export default useCreateProfile;
