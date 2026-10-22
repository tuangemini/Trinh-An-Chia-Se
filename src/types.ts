export interface Author {
  name: string;
  avatar: string;
  bio: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: Author;
  tags: string[];
  views: number;
  readTime: string;
}

export interface SocialPreview {
  content: string;
  image: string;
  title: string;
  url: string;
}
