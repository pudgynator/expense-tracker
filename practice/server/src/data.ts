export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type Book = {
  id: number;
  title: string;
  author: string;
};

export const users = [
  { username: 'ada', password: 'password123', role: 'admin' },
] as const;

export let todos: Todo[] = [
  { id: 1, text: 'Learn useFetch', done: false },
  { id: 2, text: 'Practice optimistic delete', done: false },
  { id: 3, text: 'Build the auth-gated page', done: false },
];

export let nextTodoId = 4;

export function addTodo(text: string): Todo {
  const todo: Todo = { id: nextTodoId, text, done: false };
  nextTodoId += 1;
  todos = [...todos, todo];
  return todo;
}

export function deleteTodo(id: number): boolean {
  const exists = todos.some((todo) => todo.id === id);
  if (!exists) return false;
  todos = todos.filter((todo) => todo.id !== id);
  return true;
}

export const books: Book[] = [
  { id: 1, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' },
  { id: 2, title: 'You Don’t Know JS', author: 'Kyle Simpson' },
  { id: 3, title: 'Clean Code', author: 'Robert C. Martin' },
  { id: 4, title: 'The Pragmatic Programmer', author: 'Andrew Hunt' },
  { id: 5, title: 'Refactoring', author: 'Martin Fowler' },
  { id: 6, title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
  { id: 7, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford' },
  { id: 8, title: 'CSS Secrets', author: 'Lea Verou' },
  { id: 9, title: 'Don’t Make Me Think', author: 'Steve Krug' },
  { id: 10, title: 'Atomic Habits', author: 'James Clear' },
  { id: 11, title: 'Deep Work', author: 'Cal Newport' },
  { id: 12, title: 'The Mythical Man-Month', author: 'Frederick Brooks' },
  { id: 13, title: 'Introduction to Algorithms', author: 'CLRS' },
  { id: 14, title: 'Structure and Interpretation of Computer Programs', author: 'Abelson & Sussman' },
  { id: 15, title: 'Working Effectively with Legacy Code', author: 'Michael Feathers' },
  { id: 16, title: 'Domain-Driven Design', author: 'Eric Evans' },
  { id: 17, title: 'Test-Driven Development', author: 'Kent Beck' },
  { id: 18, title: 'The Art of Computer Programming', author: 'Donald Knuth' },
  { id: 19, title: 'Grokking Algorithms', author: 'Aditya Bhargava' },
  { id: 20, title: 'React Quickly', author: 'Azat Mardan' },
  { id: 21, title: 'Learning TypeScript', author: 'Josh Goldberg' },
  { id: 22, title: 'Effective TypeScript', author: 'Dan Vanderkam' },
  { id: 23, title: 'Node.js Design Patterns', author: 'Mario Casciaro' },
  { id: 24, title: 'HTTP: The Definitive Guide', author: 'David Gourley' },
];
