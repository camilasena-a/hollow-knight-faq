export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  category: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  image: string;
  tags: string[];
  likes: number;
  readTime: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  likes: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
