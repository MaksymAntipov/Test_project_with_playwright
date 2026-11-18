export function generateShelve(title: string, description: string, is_public: boolean) {
  return {
    title: `${title} - ${Date.now()}`,
    description: description,
    is_public: is_public,
  };
}
