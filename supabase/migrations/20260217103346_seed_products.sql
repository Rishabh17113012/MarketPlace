-- Clear old products and seed new products with updated image URLs
DELETE FROM public.products;

INSERT INTO public.products (title, description, price, image_url, category) VALUES
(
  'Smart LED Table Lamp',
  'A modern LED table lamp with adjustable brightness and color temperature.',
  3999,
  'https://example.com/images/smart-led-lamp.jpg',
  'Lighting'
),
(
  'Insulated Travel Mug',
  'Double-walled stainless steel travel mug to keep your drinks hot or cold.',
  799,
  'https://example.com/images/insulated-travel-mug.jpg',
  'Kitchenware'
),
(
  'Ergonomic Office Chair',
  'Comfortable office chair with lumbar support and adjustable height.',
  8999,
  'https://example.com/images/ergonomic-office-chair.jpg',
  'Office'
),
(
  'Bluetooth Speaker',
  'Portable Bluetooth speaker with excellent sound quality and long battery life.',
  2499,
  'https://example.com/images/bluetooth-speaker.jpg',
  'Electronics'
),
(
  'Artisan Notebook',
  'Handcrafted notebook with recycled paper and a unique design.',
  699,
  'https://example.com/images/artisan-notebook.jpg',
  'Stationery'
),
(
  'Hanging Planter',
  'Stylish hanging planter for indoor plants, perfect for small spaces.',
  599,
  'https://example.com/images/hanging-planter.jpg',
  'Home Decor'
),
(
  'Desk Organizer Set',
  'Complete desk organizer set with trays, pen holders, and more.',
  1999,
  'https://example.com/images/desk-organizer-set.jpg',
  'Office'
),
(
  'Multi-Port Charger',
  'Fast-charging multi-port USB charger for all your devices.',
  1299,
  'https://example.com/images/multi-port-charger.jpg',
  'Electronics'
) ON CONFLICT DO NOTHING;
