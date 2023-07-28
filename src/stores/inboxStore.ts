import {create} from 'zustand';
import axios from 'axios';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {Notification} from 'src/sharedTypes';

type InboxStore = {
  notifications: Notification[];
  fetchInbox: () => Promise<void>;
  removeNotification: (id: string) => void;
};

const useInboxStore = create<InboxStore>((set, get) => ({
  notifications: [],
  fetchInbox: async () => {
    set({notifications: undefined});
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_INBOX));
    set({notifications: data});
  },
  removeNotification: id => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
}));

export default useInboxStore;
