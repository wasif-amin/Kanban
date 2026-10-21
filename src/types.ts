export type CardStatus = "not started" | "in progress" | "completed";

export interface KanbanCard {
  id: number;
  ProjectTitle: string;
  owner: string;
  actionItem: string;
  status: string;
}
