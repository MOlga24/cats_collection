export const getItemsCountText = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `Найдено ${count} товаров`;
  }

  if (lastDigit === 1) {
    return `Найден ${count} товар`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `Найдено ${count} товара`;
  }

  return `Найдено ${count} товаров`;
};

export const getImagePath = (
  image:
    | string
    | { id: number; image_url: string; sort_order?: number }
    | undefined
): string => {
  if (!image) return "/images/placeholder.jpg";

  const imagePath = typeof image === "string" ? image : image.image_url;

  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/images/")) return imagePath;

  return `/images/${imagePath}`;
};
