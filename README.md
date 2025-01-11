## depoyu kullanma:

git clone https://github.com/kullaniciAdi/Nextjs_Proje_Adı.git
cd Nextjs_Proje_Adı

pnpm install

NEXT_PUBLIC_API_URL=https://api.ornek.com
DATABASE_URL=postgres://user:password@localhost:5432/mydatabase
SECRET_KEY=your_secret_key_here

pnpm dev

pnpm build

Nextjs_Proje_Adı/
├── components/         # React bileşenleri
├── pages/              # Next.js sayfaları
│   ├── api/            # API Routes
│   └── index.tsx       # Ana sayfa
├── public/             # Statik dosyalar
├── styles/             # CSS/Tailwind dosyaları
├── utils/              # Yardımcı fonksiyonlar
├── .env.local          # Çevresel değişkenler
├── next.config.js      # Next.js yapılandırma
├── pnpm-lock.yaml      # pnpm kilit dosyası
├── package.json        # Bağımlılıklar ve script'ler
└── README.md           # Proje dokümantasyonu
