
export interface MultilingualText {
  en: string;
  pt: string;
  es: string;
}

export interface MultilingualArray {
  en: string[];
  pt: string[];
  es: string[];
}

export interface Artist {
  id: string;
  name: string;
  genres: MultilingualArray;
  bio: MultilingualText;
  imageUrl: string;
  pressKitUrl: string;
  socials: { spotify: string; instagram: string; youtube: string };
  music: { title: string; url: string }[];
  upcomingEvents: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: { name: string; address: string };
  imageUrl: string;
  artists: string[];
}

export interface Post {
  slug: string;
  title: string;
  author: string;
  authorImageUrl: string;
  publishedAt: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
}

export interface Product {
  id: string;
  name: string;
  seller: string;
  sellerId: string;
  price: number;
  imageUrl: string;
  category: 'Beat' | 'Merch' | 'Course' | 'Sound Kit';
  rating: number;
  description: string;
  reviews: number;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorPhotoUrl: string | null;
  rating: number;
  comment: string;
  createdAt: any; // Firestore timestamp
}

export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    imageUrl: string;
    category: 'Production' | 'Business' | 'Instrument' | 'Theory';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    rating: number;
    students: number;
    price: number;
    modules: {
        title: string;
        lessons: {
            title: string;
            duration: string;
        }[];
    }[];
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  type: 'Single' | 'EP' | 'Album';
  releaseDate: string;
  coverArt: string;
  status: 'Live' | 'Pending' | 'Rejected' | 'Draft';
  platforms: ('spotify' | 'apple' | 'deezer')[];
}

export interface Order {
  id: string;
  buyerId: string;
  stripePaymentIntentId: string;
  items: {
    id: string;
    name: string;
    price: number;
    sellerId: string;
  }[];
  total: number;
  shippingDetails: any; // Can be more specific later
  status: 'Paid' | 'Shipped' | 'Delivered';
  createdAt: any; // Firestore timestamp
}

export const testimonials = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://picsum.photos/seed/john/100/100',
    quote: 'This platform is amazing! It helped me connect with great artists and find new music.',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://picsum.photos/seed/jane/100/100',
    quote: 'I love the variety of content available. The courses are top-notch!',
  },
  {
    id: '3',
    name: 'Peter Jones',
    avatar: 'https://picsum.photos/seed/peter/100/100',
    quote: 'A fantastic community and a great place to discover new talent.',
  },
];


export const artists: Artist[] = [
  {
    id: 'luna-flare',
    name: 'Luna Flare',
    genres: {
        en: ['Synthwave', 'Indie Pop'],
        pt: ['Synthwave', 'Pop Indie'],
        es: ['Synthwave', 'Pop Indie'],
    },
    bio: {
        en: 'Luna Flare blends nostalgic 80s synth sounds with modern indie pop sensibilities. Her ethereal vocals and dreamy soundscapes have captivated audiences worldwide, creating a unique sonic experience that is both retro and futuristic.',
        pt: 'Luna Flare mistura sons nostálgicos de sintetizador dos anos 80 com sensibilidades modernas do pop indie. Seus vocais etéreos e paisagens sonoras oníricas cativaram audiências em todo o mundo, criando uma experiência sônica única que é tanto retrô quanto futurista.',
        es: 'Luna Flare fusiona nostálgicos sonidos de sintetizador de los 80 con sensibilidades modernas de pop indie. Sus etéreas voces y oníricos paisajes sonoros han cautivado a audiencias de todo el mundo, creando una experiencia sónica única que es tanto retro como futurista.',
    },
    imageUrl: 'https://picsum.photos/seed/luna/800/800',
    pressKitUrl: '#',
    socials: { spotify: '#', instagram: '#', youtube: '#' },
    music: [
      { title: 'Neon Dreams', url: '#' },
      { title: 'Starlight Echoes', url: '#' },
      { title: 'Midnight Drive', url: '#' },
    ],
    upcomingEvents: ['celestial-sound-festival', 'synth-city-live'],
  },
  {
    id: 'sol-rhythm',
    name: 'Sol Rhythm',
    genres: {
        en: ['Lo-fi Hip Hop', 'Jazz Fusion'],
        pt: ['Lo-fi Hip Hop', 'Jazz Fusion'],
        es: ['Lo-fi Hip Hop', 'Fusión de Jazz'],
    },
    bio: {
        en: 'A master of chill beats and jazzy undertones, Sol Rhythm crafts instrumental tracks that are perfect for studying, relaxing, or a late-night vibe. His music is a fusion of classic jazz improvisation and modern lo-fi production techniques.',
        pt: 'Um mestre das batidas relaxantes e tons jazzísticos, Sol Rhythm cria faixas instrumentais perfeitas para estudar, relaxar ou para uma vibe noturna. Sua música é uma fusão de improvisação de jazz clássico e técnicas modernas de produção lo-fi.',
        es: 'Un maestro de los ritmos relajados y los matices jazzísticos, Sol Rhythm crea pistas instrumentales que son perfectas para estudiar, relajarse o para un ambiente nocturno. Su música es una fusión de la improvisación del jazz clásico y las técnicas modernas de producción lo-fi.',
    },
    imageUrl: 'https://picsum.photos/seed/sol/800/800',
    pressKitUrl: '#',
    socials: { spotify: '#', instagram: '#', youtube: '#' },
    music: [
      { title: 'Urban Serenity', url: '#' },
      { title: 'Coffee Shop Groove', url: '#' },
      { title: 'Rainy Day Tapes', url: '#' },
    ],
    upcomingEvents: ['chill-vibes-gathering'],
  },
  {
    id: 'apex-predators',
    name: 'Apex Predators',
    genres: {
        en: ['Industrial Metal', 'Hard Rock'],
        pt: ['Metal Industrial', 'Hard Rock'],
        es: ['Metal Industrial', 'Hard Rock'],
    },
    bio: {
        en: 'With thunderous riffs, aggressive vocals, and a high-energy stage presence, Apex Predators are a force to be reckoned with in the metal scene. Their music tackles themes of power, technology, and societal decay.',
        pt: 'Com riffs estrondosos, vocais agressivos e uma presença de palco de alta energia, os Apex Predators são uma força a ser reconhecida na cena do metal. Sua música aborda temas de poder, tecnologia e decadência social.',
        es: 'Con atronadores riffs, voces agresivas y una presencia escénica de alta energía, Apex Predators son una fuerza a tener en cuenta en la escena del metal. Su música aborda temas de poder, tecnología y decadencia social.',
    },
    imageUrl: 'https://picsum.photos/seed/apex/800/800',
    pressKitUrl: '#',
    socials: { spotify: '#', instagram: '#', youtube: '#' },
    music: [
      { title: 'Machina', url: '#' },
      { title: 'Wasteland Anthem', url: '#' },
      { title: 'Cybernetic Fury', url: '#' },
    ],
    upcomingEvents: ['metal-mayhem-fest', 'synth-city-live'],
  },
  {
    id: 'echo-grove',
    name: 'Echo Grove',
    genres: {
        en: ['Folktronica', 'Ambient'],
        pt: ['Folktronica', 'Ambiente'],
        es: ['Folktronica', 'Ambiental'],
    },
    bio: {
        en: 'Echo Grove combines acoustic folk instruments with electronic textures and ambient sounds to create immersive and introspective music. Their songs often draw inspiration from nature and personal journeys.',
        pt: 'Echo Grove combina instrumentos folk acústicos com texturas eletrônicas e sons ambientes para criar músicas imersivas e introspectivas. Suas canções frequentemente se inspiram na natureza e em jornadas pessoais.',
        es: 'Echo Grove combina instrumentos folclóricos acústicos con texturas electrónicas y sonidos ambientales para crear música inmersiva e introspectiva. Sus canciones a menudo se inspiran en la naturaleza y en viajes personales.',
    },
    imageUrl: 'https://picsum.photos/seed/echo/800/800',
    pressKitUrl: '#',
    socials: { spotify: '#', instagram: '#', youtube: '#' },
    music: [
      { title: 'Whispering Woods', url: '#' },
      { title: 'River of Time', url: '#' },
      { title: 'Digital Dawn', url: '#' },
    ],
    upcomingEvents: [],
  },
];

export const events: Event[] = [
  {
    id: 'celestial-sound-festival',
    title: 'Celestial Sound Festival',
    description: 'An otherworldly experience featuring the best in synthwave, dream pop, and ambient music. Join us under the stars for a night of cosmic melodies and stunning visuals.',
    date: 'October 26, 2024',
    time: '7:00 PM',
    location: { name: 'Starlight Amphitheater', address: '123 Cosmos Avenue, Music City' },
    imageUrl: 'https://picsum.photos/seed/celestial/1200/800',
    artists: ['luna-flare'],
  },
  {
    id: 'metal-mayhem-fest',
    title: 'Metal Mayhem Fest',
    description: 'The heaviest festival of the year is back! Featuring a lineup of industrial, death, and black metal bands ready to shake the earth. Brace yourself for a day of pure, unadulterated metal.',
    date: 'November 9, 2024',
    time: '2:00 PM',
    location: { name: 'The Forge', address: '666 Iron Street, Metalburg' },
    imageUrl: 'https://picsum.photos/seed/mayhem/1200/800',
    artists: ['apex-predators'],
  },
  {
    id: 'synth-city-live',
    title: 'Synth City Live',
    description: 'A celebration of all things synth. From classic 80s vibes to modern electronic beats, Synth City Live brings together a diverse lineup of synth-driven artists for one unforgettable night.',
    date: 'November 15, 2024',
    time: '8:00 PM',
    location: { name: 'Neon Club', address: '456 Retro Road, Downtown' },
    imageUrl: 'https://picsum.photos/seed/synth/1200/800',
    artists: ['luna-flare', 'apex-predators'],
  },
  {
    id: 'chill-vibes-gathering',
    title: 'Chill Vibes Gathering',
    description: 'Relax and unwind at the Chill Vibes Gathering. A cozy evening of lo-fi hip hop, jazz, and ambient music. Perfect for chilling out with friends and enjoying smooth beats.',
    date: 'December 1, 2024',
    time: '6:00 PM',
    location: { name: 'The Lounge', address: '789 Mellow Lane, Groove Town' },
    imageUrl: 'https://picsum.photos/seed/chill/1200/800',
    artists: ['sol-rhythm'],
  },
];

export const posts: Post[] = [
  {
    slug: 'the-rise-of-synthwave',
    title: 'The Rise of Synthwave: More Than Just Nostalgia',
    author: 'Alex Chen',
    authorImageUrl: 'https://picsum.photos/seed/alex/100/100',
    publishedAt: 'September 15, 2024',
    excerpt: 'Synthwave has seen a massive resurgence in recent years. But is it just 80s nostalgia, or is there something more to this retro-futuristic genre? We dive deep into the sound, aesthetics, and culture of synthwave.',
    content: '<p>Synthwave, also known as outrun, is a microgenre of electronic music that emerged in the mid-2000s. It is heavily inspired by the music and aesthetics of 1980s film soundtracks, video games, and pop culture. With its signature gated reverb on drums, analog synth sounds, and neon-drenched visuals, synthwave taps into a collective nostalgia for a past that, for many of its fans, never really existed.</p><p>However, to dismiss it as mere nostalgia would be a disservice. The genre has evolved, branching into subgenres like darksynth, which incorporates elements of industrial and metal, and chillwave, which focuses on more relaxed and atmospheric sounds. Artists like Luna Flare are pushing the boundaries of what synthwave can be, blending it with indie pop and dream pop to create something fresh and exciting. The rise of synthwave is a testament to the enduring power of strong melodies, evocative soundscapes, and the timeless cool of the 1980s.</p>',
    imageUrl: 'https://picsum.photos/seed/post1/1200/800',
    tags: ['Synthwave', 'Music History', 'Trends'],
  },
  {
    slug: 'lo-fi-hip-hop-study-beats',
    title: 'How Lo-fi Hip Hop Became the Soundtrack for Studying and Relaxation',
    author: 'Maria Garcia',
    authorImageUrl: 'https://picsum.photos/seed/maria/100/100',
    publishedAt: 'September 10, 2024',
    excerpt: 'The phenomenon of "lo-fi hip hop radio - beats to relax/study to" has taken over YouTube and Spotify. What makes this genre so effective for focus and relaxation? We explore the science and the sound.',
    content: '<p>You\'ve seen it: the endless YouTube stream with a looping animation of a girl studying. Lo-fi hip hop has become a cultural phenomenon, a go-to for millions seeking a soundtrack for focus, relaxation, or sleep. The genre is characterized by its "low-fidelity" production, often including vinyl crackles, tape hiss, and a generally "imperfect" sound. This, combined with simple, repetitive drum loops, and jazzy chord progressions, creates a non-intrusive and calming listening experience.</p><p>Artists like Sol Rhythm have perfected this craft, creating beats that are engaging but not distracting. The lack of complex song structures or vocals allows the listener\'s brain to remain in a state of flow, making it ideal for tasks that require concentration. It\'s more than just background music; it\'s an atmospheric tool that has defined a new way of interacting with music in the digital age.</p>',
    imageUrl: 'https://picsum.photos/seed/post2/1200/800',
    tags: ['Lo-fi', 'Hip Hop', 'Music Psychology'],
  },
  {
    slug: 'diy-artist-marketing',
    title: 'Marketing Your Music in 2024: A Guide for the DIY Artist',
    author: 'David Kim',
    authorImageUrl: 'https://picsum.photos/seed/david/100/100',
    publishedAt: 'September 5, 2024',
    excerpt: 'In today\'s crowded music landscape, great music is only half the battle. As an independent artist, effective marketing is crucial. Here are our top tips for getting your music heard without a major label budget.',
    content: '<p>The dream of getting signed is no longer the only path to success. With the tools available today, independent artists can build a career on their own terms. But this requires a strategic approach to marketing.</p><p><strong>1. Build Your Brand:</strong> Your brand is your story. It\'s the visual identity, the tone of voice, and the message behind your music. Be consistent across all platforms.</p><p><strong>2. Know Your Audience:</strong> Who are you trying to reach? Understanding your target audience helps you tailor your marketing efforts for maximum impact.</p><p><strong>3. Leverage Social Media:</strong> Platforms like TikTok, Instagram, and YouTube are powerful tools for discovery. Create engaging content that showcases your personality and your music.</p><p><strong>4. Use AI Tools:</strong> Platforms like Valhalla Beats offer AI marketing tools to help you craft compelling copy for your social posts, ads, and press releases. This can save you time and help you connect with your audience more effectively.</p>',
    imageUrl: 'https://picsum.photos/seed/post3/1200/800',
    tags: ['Music Business', 'Marketing', 'DIY'],
  },
];

export const products: Product[] = [
  {
    id: 'beat-odyssey',
    name: 'Odyssey - Trap Beat',
    seller: 'Sol Rhythm',
    sellerId: 'sol-rhythm',
    price: 29.99,
    imageUrl: 'https://picsum.photos/seed/beat1/600/600',
    category: 'Beat',
    rating: 4.8,
    reviews: 112,
    description: 'A hard-hitting trap beat with a dark, atmospheric melody. Perfect for artists looking for a modern, epic sound. Includes WAV and MP3 files.'
  },
  {
    id: 'merch-luna-tee',
    name: 'Luna Flare "Neon Dreams" T-Shirt',
    seller: 'Luna Flare',
    sellerId: 'luna-flare',
    price: 24.99,
    imageUrl: 'https://picsum.photos/seed/merch1/600/600',
    category: 'Merch',
    rating: 4.9,
    reviews: 245,
    description: 'High-quality black cotton t-shirt featuring the "Neon Dreams" album art. Available in all sizes.'
  },
  {
    id: 'course-mixing-masterclass',
    name: 'Mixing & Mastering Masterclass',
    seller: 'Apex Predators',
    sellerId: 'apex-predators',
    price: 99.99,
    imageUrl: 'https://picsum.photos/seed/course1/600/600',
    category: 'Course',
    rating: 4.7,
    reviews: 88,
    description: 'Learn the secrets of a powerful metal mix from the band themselves. 20+ video lessons covering EQ, compression, and mastering for heavy music.'
  },
  {
    id: 'kit-vintage-drums',
    name: 'Vintage Drum Loops Vol. 1',
    seller: 'Echo Grove',
    sellerId: 'echo-grove',
    price: 19.99,
    imageUrl: 'https://picsum.photos/seed/kit1/600/600',
    category: 'Sound Kit',
    rating: 4.9,
    reviews: 150,
    description: 'A collection of 100+ live-recorded vintage drum loops. Perfect for adding a human feel to your Folktronica or Lo-fi tracks. All samples are royalty-free.'
  }
];

export const courses: Course[] = [
  {
    id: 'music-production-101',
    title: 'Music Production for Beginners',
    description: 'Learn the fundamentals of music production in this comprehensive course. From setting up your DAW to mixing your first track, we cover it all.',
    instructor: 'Sol Rhythm',
    imageUrl: 'https://picsum.photos/seed/course1/600/400',
    category: 'Production',
    level: 'Beginner',
    duration: '8 hours',
    rating: 4.9,
    students: 1250,
    price: 49.99,
    modules: [
        { title: 'Introduction to DAWs', lessons: [{title: 'Choosing your DAW', duration: '15m'}, {title: 'DAW Interface Tour', duration: '30m'}] },
        { title: 'Recording Audio', lessons: [{title: 'Microphone Basics', duration: '20m'}, {title: 'Recording Vocals', duration: '45m'}] },
        { title: 'MIDI and Synthesis', lessons: [{title: 'Intro to MIDI', duration: '25m'}, {title: 'Your First Synth Patch', duration: '50m'}] },
        { title: 'Mixing Fundamentals', lessons: [{title: 'EQ and Compression', duration: '60m'}, {title: 'Reverb and Delay', duration: '45m'}] },
    ]
  },
  {
    id: 'advanced-synthwave',
    title: 'Advanced Synthwave Production',
    description: 'Take your synthwave tracks to the next level. Dive deep into sound design, arrangement, and advanced mixing techniques with Luna Flare.',
    instructor: 'Luna Flare',
    imageUrl: 'https://picsum.photos/seed/course2/600/400',
    category: 'Production',
    level: 'Advanced',
    duration: '12 hours',
    rating: 4.8,
    students: 780,
    price: 149.99,
    modules: [
        { title: 'Advanced Sound Design', lessons: [{title: 'Creating Complex Basses', duration: '75m'}, {title: 'Lush Pads and Atmospheres', duration: '90m'}] },
        { title: 'Arrangement and Composition', lessons: [{title: 'Song Structure Secrets', duration: '60m'}, {title: 'Writing Memorable Melodies', duration: '80m'}] },
        { title: 'Mixing for Impact', lessons: [{title: 'Punchy Drums', duration: '70m'}, {title: 'Wide and Epic Mixes', duration: '85m'}] },
    ]
  },
  {
    id: 'music-business-essentials',
    title: 'The Music Business in 2024',
    description: 'Navigate the modern music industry. Learn about royalties, distribution, marketing, and building your artist brand.',
    instructor: 'Apex Predators Management',
    imageUrl: 'https://picsum.photos/seed/course3/600/400',
    category: 'Business',
    level: 'Intermediate',
    duration: '6 hours',
    rating: 4.7,
    students: 2100,
    price: 79.99,
    modules: [
        { title: 'Copyright and Royalties', lessons: [{title: 'Understanding Publishing', duration: '45m'}, {title: 'How PROs Work', duration: '40m'}] },
        { title: 'Distribution and Marketing', lessons: [{title: 'Choosing a Distributor', duration: '50m'}, {title: 'Building a Marketing Plan', duration: '70m'}] },
    ]
  },
   {
    id: 'guitar-for-producers',
    title: 'Guitar for Electronic Producers',
    description: 'Learn to write and record compelling guitar parts for your electronic tracks, even if you\'re not a guitarist. Taught by Echo Grove.',
    instructor: 'Echo Grove',
    imageUrl: 'https://picsum.photos/seed/course4/600/400',
    category: 'Instrument',
    level: 'Beginner',
    duration: '5 hours',
    rating: 4.9,
    students: 950,
    price: 69.99,
    modules: [
        { title: 'Guitar Basics', lessons: [{title: 'Anatomy of the Guitar', duration: '30m'}, {title: 'Basic Chords and Strumming', duration: '60m'}] },
        { title: 'Recording and Effects', lessons: [{title: 'DI vs. Amp', duration: '45m'}, {title: 'Essential Guitar Pedals', duration: '75m'}] },
    ]
  }
];

export const releases: Release[] = [
    {
        id: 'release-neon-dreams',
        title: 'Neon Dreams',
        artist: 'Luna Flare',
        type: 'Album',
        releaseDate: '2024-10-26',
        coverArt: 'https://picsum.photos/seed/album1/600/600',
        status: 'Live',
        platforms: ['spotify', 'apple', 'deezer'],
    },
    {
        id: 'release-urban-serenity',
        title: 'Urban Serenity',
        artist: 'Sol Rhythm',
        type: 'EP',
        releaseDate: '2024-11-15',
        coverArt: 'https://picsum.photos/seed/album2/600/600',
        status: 'Live',
        platforms: ['spotify', 'apple'],
    },
    {
        id: 'release-machina',
        title: 'Machina',
        artist: 'Apex Predators',
        type: 'Single',
        releaseDate: '2024-12-01',
        coverArt: 'https://picsum.photos/seed/album3/600/600',
        status: 'Pending',
        platforms: ['spotify', 'apple', 'deezer'],
    },
    {
        id: 'release-whispering-woods',
        title: 'Whispering Woods',
        artist: 'Echo Grove',
        type: 'Album',
        releaseDate: '2025-01-10',
        coverArt: 'https://picsum.photos/seed/album4/600/600',
        status: 'Draft',
        platforms: [],
    },
];

    
