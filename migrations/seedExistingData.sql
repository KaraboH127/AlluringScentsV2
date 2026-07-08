-- Seed collections
insert into collections (id, name, label, tagline, description, prices) values
(
  'standard',
  'Standard Collection',
  'White Label',
  'Elegant Everyday Luxury',
  'Our Standard Collection brings accessible luxury to everyday life, beautifully balanced fragrances crafted from the finest ingredients.',
  '{"10ml": 120, "50ml": 400, "100ml": 700}'
),
(
  'private',
  'Private Collection',
  'Black Label',
  'Exclusively Crafted. Unapologetically Bold.',
  'Our Private Collection represents the pinnacle of olfactory artistry, bold, complex compositions designed for those who wear fragrance as a statement.',
  '{"10ml": 200, "50ml": 600, "100ml": 1100}'
);

-- Seed fragrances
insert into fragrances (id, slug, name, collection_id, description, extrait, notes, best_for, occasions, personality, image_url) values
(
  'lush', 'lush', 'Lush', 'standard',
  'A radiant floral-green composition with polished depth.',
  'Extrait de Parfum',
  '{"top": "Bergamot and pear leaf", "middle": "Jasmine petals and white tea", "base": "Creamy musk and sandalwood"}',
  'Daily elegance',
  '["Workdays", "Brunch", "Evening transitions"]',
  'Refined, calm, effortlessly confident',
  '/image10.webp'
),
(
  'whiskey-sour', 'whiskey-sour', 'Whiskey Sour', 'standard',
  'Citrus brightness wrapped in warm ambered woods.',
  'Extrait de Parfum',
  '{"top": "Lemon zest and ginger", "middle": "Clary sage and aromatic spice", "base": "Oakwood and soft vanilla"}',
  'Bold evenings',
  '["Dinner dates", "Lounges", "Night events"]',
  'Magnetic, adventurous, polished',
  '/image9.webp'
),
(
  'velvet-nectar', 'velvet-nectar', 'Velvet Nectar', 'standard',
  'Silken fruit and petals balanced with warm resins.',
  'Extrait de Parfum',
  '{"top": "Nectarine and pink pepper", "middle": "Rose absolute and iris", "base": "Amber resin and tonka bean"}',
  'Signature wear',
  '["Celebrations", "Day-to-night wear", "Special meetings"]',
  'Elegant, expressive, poised',
  '/image5.webp'
),
(
  'midnight-oud', 'midnight-oud', 'Midnight Oud', 'standard',
  'Dark woods and spice with a velvety modern trail.',
  'Extrait de Parfum',
  '{"top": "Saffron and smoked cardamom", "middle": "Rose and cedar", "base": "Oud accord and patchouli"}',
  'After-dark presence',
  '["Formal events", "Winter evenings", "Statement moments"]',
  'Commanding, luxurious, deep',
  '/image6.webp'
),
(
  'purple-rain', 'purple-rain', 'Purple Rain', 'standard',
  'Velvet florals lit by sparkling citrus and musk.',
  'Extrait de Parfum',
  '{"top": "Mandarin and blackcurrant", "middle": "Violet and peony", "base": "Clean musk and amberwood"}',
  'Fresh confidence',
  '["Day events", "Creative work", "Weekend outings"]',
  'Modern, romantic, expressive',
  '/image3.webp'
),
(
  'taboo', 'taboo', 'Taboo', 'standard',
  'A sensual amber-spice blend with smoky sophistication.',
  'Extrait de Parfum',
  '{"top": "Pink pepper and saffron", "middle": "Labdanum and suede", "base": "Incense and vanilla absolute"}',
  'Evening attraction',
  '["Date nights", "Cocktail evenings", "Luxury occasions"]',
  'Fearless, alluring, unforgettable',
  '/image2.webp'
),
(
  'ocean-eyes', 'ocean-eyes', 'Ocean Eyes', 'standard',
  'Marine freshness elevated with citrus and soft woods.',
  'Extrait de Parfum',
  '{"top": "Grapefruit and sea breeze accord", "middle": "Lavender and neroli", "base": "Driftwood and white musk"}',
  'Clean versatility',
  '["Warm days", "Travel", "Office wear"]',
  'Fresh, focused, relaxed',
  '/image1.webp'
),
(
  'fresh', 'fresh', 'Fresh', 'standard',
  'Crisp citrus and herbal brightness with clean depth.',
  'Extrait de Parfum',
  '{"top": "Lime and petitgrain", "middle": "Green tea and basil", "base": "Vetiver and soft musk"}',
  'Everyday ease',
  '["Morning routines", "Gym-to-day transitions", "Hot weather"]',
  'Minimal, energetic, sharp',
  '/image0.webp'
),
(
  '9-lives', '9-lives', '9 Lives', 'private',
  'A daring signature built on radiant spice and woods.',
  'Extrait de Parfum',
  '{"top": "Bergamot and pink pepper", "middle": "Geranium and nutmeg", "base": "Sandalwood and ambergris accord"}',
  'Statement identity',
  '["High-impact meetings", "Events", "Nightlife"]',
  'Bold, charismatic, uncompromising',
  '/image12.webp'
),
(
  'golden-amber', 'golden-amber', 'Golden Amber', 'private',
  'Liquid gold warmth with noble woods and resins.',
  'Extrait de Parfum',
  '{"top": "Saffron and bergamot", "middle": "Amber and orange blossom", "base": "Guaiac wood and benzoin"}',
  'Luxury evenings',
  '["Formal dinners", "Celebratory nights", "Cool seasons"]',
  'Confident, warm, regal',
  '/image11.webp'
),
(
  'island-water', 'island-water', 'Island Water', 'private',
  'A refined tropical interpretation with mineral depth.',
  'Extrait de Parfum',
  '{"top": "Bitter orange and coconut water", "middle": "Tiare flower and sea salt", "base": "Cedar and ambrette"}',
  'Luxurious freshness',
  '["Resort wear", "Summer evenings", "Holiday escapes"]',
  'Relaxed, premium, luminous',
  '/image7.webp'
),
(
  'signature', 'signature', 'Signature', 'private',
  'The house icon, smooth spice, woods, and rare florals.',
  'Extrait de Parfum',
  '{"top": "Black pepper and bergamot", "middle": "Orris and rose", "base": "Sandalwood, musk, and labdanum"}',
  'Defining moments',
  '["Daily signature wear", "Business", "Elegant evenings"]',
  'Timeless, assured, sophisticated',
  '/image4.webp'
);