// Loaders para demostrar data fetching con React Router

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function postsLoader() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function postDetailLoader({ params }: { params: { id: string } }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );

  if (!response.ok) {
    throw new Error("Post not found");
  }

  return response.json();
}
