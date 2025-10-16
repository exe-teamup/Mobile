type Post = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  hashtags?: string[];
  contact?: string;
  fields?: Record<string, string>;
};

let currentPost: Post | null = null;

export function savePost(post: Post) {
  currentPost = post;
}

export function getPost(): Post | null {
  return currentPost;
}

export function clearPost() {
  currentPost = null;
}
