export type User = {
  id: number,
  name: string, 
  email: string, 
  createdAt: string, 
  updatedAt: string,
}

export type Post = {
  id: number,
  title: string, 
  content: string, 
  user: User, 
  createdAt: string, 
  updatedAt: string,
}
