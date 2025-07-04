import { User } from '../types/User';
import { Comment } from '../types/Comment';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  if (!response.ok) throw new Error('Failed to fetch comments');
  return response.json();
}; 