export function useCard(post) {
  const shortDesc =
    post?.description?.length > 20
      ? post.description.substring(0, 20) + "..."
      : post?.description;
  return {
    shortDesc,
  };
}
