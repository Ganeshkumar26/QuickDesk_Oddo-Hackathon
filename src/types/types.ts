export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
  avatar?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: Category;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdBy: User;
  assignedTo?: User;
  attachments?: string[];
  upvotes: number;
  downvotes: number;
  userVote?: 'up' | 'down';
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  ticketId: string;
  content: string;
  author: User;
  isInternal: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface TicketFilters {
  status?: string;
  category?: string;
  assignedTo?: string;
  search?: string;
  sortBy?: 'created' | 'updated' | 'replies' | 'votes';
  sortOrder?: 'asc' | 'desc';
}