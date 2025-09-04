export type User = { id: string; name: string; email: string };

const users: User[] = [];

export function listAllUsers(filterName?: string): User[] {
  if (!filterName) return users;
  const needle = filterName.toLowerCase();
  return users.filter((u) => u.name.toLowerCase().includes(needle));
}

export function findUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function saveUser(input: { name: string; email: string }): User {
  const user: User = { id: String(users.length + 1), ...input };
  users.push(user);
  return user;
}
