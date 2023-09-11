import {Bounty, Member, Project, Submission, Team} from 'src/sharedTypes';
import query from 'src/utils/query';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type OfficerStore = {
  fetchItems: () => Promise<void>;
  items:
    | {
        projects: Project[];
        submissions:
          | (Submission & {
              bounty: Bounty & {project: Project};
              team: Team & {
                creator: Member;
              };
            })[];
      }
    | undefined;
};

const useOfficerStore = create<OfficerStore>(set => ({
  fetchItems: async () => {
    set({items: undefined});

    const data = await query(getServerEndpoint(Endpoints.FINANCIAL_OFFICER));

    if (!!data.result) {
      set({items: data.result});
    }
    if (!!data.error) {
      set({items: undefined});
      console.error(data.error);
    }
  },
  items: undefined,
}));

export default useOfficerStore;
