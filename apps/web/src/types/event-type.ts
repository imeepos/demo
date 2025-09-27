export interface EventType {
  id: number;
  code: string;
  name: string;
  description?: string;
  color?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface EventTypeCreateInput {
  code: string;
  name: string;
  description?: string;
  color?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface EventTypeUpdateInput {
  code?: string;
  name?: string;
  description?: string;
  color?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface EventTypeSearchParams {
  keyword?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt' | 'sortOrder';
  sortOrder?: 'ASC' | 'DESC';
}
