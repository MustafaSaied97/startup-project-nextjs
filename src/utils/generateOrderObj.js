export default function generateOrderObj({ id, name = { ar: '', en: '' }, image, quantity, price }) {
  return {
    id,
    name,
    image,
    quantity,
    price,
  };
}
