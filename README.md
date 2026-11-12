# Movie Explorer | React Film Keşif Uygulaması

[English](#english) · [Canlı demo](https://movie-explorer-react-sigma.vercel.app/)

## Türkçe

**Movie Explorer**, React ile geliştirilmiş, filmleri kategorilere göre keşfetmeye, aramaya ve favorilerde saklamaya yönelik responsive bir uygulamadır. Portfolyoda **REST API entegrasyonu, istemci tarafı yönlendirme, durum yönetimi ve otomatik test** çalışmalarını gösterir.

### Özellikler
- SampleAPIs Movie API üzerinden kategoriye göre film listesi ve isimle arama
- React Router ile film detayları ve favoriler sayfası
- Kategori bilgisiyle hedefli film detayı sorgusu; eski bağlantılar için geri dönüş desteği
- Açıklama doğrulamasıyla favorilere ekleme, listeleme ve silme
- Favorilerin `localStorage` ile korunması; depolama erişimi engellendiğinde güvenli davranış
- API isteklerinde zaman aşımı, kategori önbelleği ve yanıt doğrulaması
- Responsive arayüz; Node.js testleri ve GitHub Actions üzerinden CI

**Teknolojiler:** React 18 · JavaScript · Vite · Axios · React Router · CSS · Node.js test runner · GitHub Actions · Vercel

### Yerel geliştirme
```bash
npm install
npm run dev
```

### Kontroller
```bash
npm test
npm run build
```

**Canlı uygulama:** https://movie-explorer-react-sigma.vercel.app/

> Uygulama harici SampleAPIs servisine bağlıdır; servis erişilemezse film verileri yüklenemeyebilir.

## English

A responsive React movie discovery application demonstrating **REST API integration, client-side routing, persistent favorites, defensive API handling, and automated testing**.

**Features:** category browsing and search, movie details, validated favorites, `localStorage` persistence, category-aware lookups, API timeout and caching, responsive layout, and GitHub Actions CI.

**Stack:** React 18, JavaScript, Vite, Axios, React Router, CSS, Node.js test runner, GitHub Actions, Vercel.

**Run:** `npm install && npm run dev` · **Check:** `npm test && npm run build`

**Live demo:** https://movie-explorer-react-sigma.vercel.app/
