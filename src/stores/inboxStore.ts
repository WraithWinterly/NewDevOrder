import {Notification} from 'src/sharedTypes';
import query from 'src/utils/query';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type InboxStore = {
  notifications: Notification[];
  fetchNotifications: () => void;
  removeNotification: (id: string) => void;
};
const useInboxStore = create<InboxStore>((set, get) => ({
  notifications: [],
  fetchNotifications: async () => {
    set({notifications: []});
    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_NOTIFICATIONS),
    );
    if (result) {
      set({notifications: result});
    }
  },
  removeNotification: (id: string) => {
    set({notifications: get().notifications.filter(n => n.id !== id)});
  },
}));

export default useInboxStore;
