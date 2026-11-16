export function generateShelve(title: string, description: string, is_public: boolean) {
  return {
    title: `title ${Date.now()}`,
    description,
    is_public,
  };
}
