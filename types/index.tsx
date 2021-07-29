export type User = {
  name: string, 
  email: string, 
  createdAt: string, 
  updatedAt: string,
}

export type Post = {
  title: string, 
  content: string, 
  user: User, 
  createdAt: string, 
  updatedAt: string,
}
