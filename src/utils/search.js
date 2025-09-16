export const searchItems = (query, items) => {
  if (!query || !items) return [];

  const normalizeString = (str) => {
    return str
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  const searchTerms = normalizeString(query).split(" ");

  return items.filter((item) => {
    const searchString = [
      item.title,
      item.description,
      item.fulldescription,
      item.category,
      item.subcategory,
    ]
      .filter(Boolean)
      .map(normalizeString)
      .join(" ");

    return searchTerms.every((term) => searchString.includes(term));
  });
};
