export type User = {
  name: string, 
  email: string, 
}

export type Post = {
  title: string, 
  content: string, 
  user: User
}
