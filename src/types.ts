export interface RegisterPayload {
    name: string;
    email: string;
  }

export interface UserItem {
    userId: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface CreateBoardPayload {
    title: string
  }