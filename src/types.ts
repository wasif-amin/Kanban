export type CardStatus = "not started" | "in progress" | "completed"| "urgent";

export interface KanbanCard {
  id: number;
  ProjectTitle: string;
  owner: string;
  actionItem: string;
  status: CardStatus;
}
export interface ProjectProps extends KanbanCard {
  onActionUpdate: (e: React.FocusEvent<HTMLInputElement>, id: number) => void;
  onOwnerUpdate: (e: React.FocusEvent<HTMLInputElement>, id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, newStatus: CardStatus) => void;
}