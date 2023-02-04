import { IGroup } from "@/types/entity";

export type GetGroupsResponse = Array<IGroup>;

export interface CreateGroupPayload {
  name: string;
  // TODO: uncomment when the backend is ready
  // color: string;
}

export interface CreateGroupResponse extends IGroup {}
