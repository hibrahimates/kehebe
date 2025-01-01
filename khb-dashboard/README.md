# KHB Dashboard

Modern ve kullanıcı dostu bir yönetim platformu.

## Özellikler

- 🔐 Rol tabanlı yetkilendirme sistemi
- 📊 Özelleştirilebilir dashboard
- 📋 Görev yönetimi
- 📈 Veri analizi ve görselleştirme
- 🔔 Bildirim sistemi
- 👥 Ekip yönetimi

## Teknolojiler

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Query
- Prisma
- NextAuth.js

## Başlangıç

1. Gereksinimleri yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Proje Yapısı

```
src/
├── app/                # Next.js App Router yapısı
├── features/          # Feature-based modüller
│   ├── auth/         # Kimlik doğrulama
│   ├── dashboard/    # Dashboard özellikleri
│   ├── tasks/        # Görev yönetimi
│   └── teams/        # Ekip yönetimi
├── shared/           # Paylaşılan kaynaklar
│   ├── components/   # Genel componentler
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Üçüncü parti kütüphane konfigürasyonları
│   ├── api/          # API istemcileri ve servisler
│   ├── types/        # TypeScript tipleri
│   ├── utils/        # Yardımcı fonksiyonlar
│   └── store/        # Redux store yapılandırması
```

## Geliştirme Kuralları

- TypeScript kullanımı zorunludur
- Her feature kendi içinde bağımsız olmalıdır
- Shared componentler atomik tasarım prensiplerine uygun olmalıdır
- API çağrıları için repository pattern kullanılmalıdır
- State yönetimi için Redux Toolkit tercih edilmelidir
