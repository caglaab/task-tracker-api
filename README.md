# Görev Takip API'si

Bir yazılım şirketinin görevlerini, projelerini ve çalışan sorumluluklarını takip etmek için geliştirilmiş REST API.
Node.js ve Express.js ile yazılmıştır.

## Özellikler

- Görev ekleme, listeleme, detay, güncelleme ve silme (CRUD)
- Görev durumu (`todo`, `in-progress`, `done`) ve önceliği (`low`, `medium`, `high`)
- Görevi çalışana atama (`assigneeId`)
- Durum, öncelik ve çalışana göre filtreleme
- Logger middleware: her isteğin method, endpoint ve zamanı konsola ve `logs/access.log` dosyasına yazılır

## Kurulum

```bash
git clone [repo-adresin]
cd task-tracker-api
npm install
npm run dev
```

Sunucu `http://localhost:3000` adresinde çalışır.

## Klasör Yapısı

```
src/
├── server.js        # sunucuyu başlatır
├── app.js           # Express ayarları ve middleware'ler
├── routes/          # URL yönlendirmeleri
├── controllers/     # iş mantığı ve doğrulama
├── middlewares/     # logger
└── data/            # bellek içi veri deposu
docs/                # tasarım dokümanları
logs/                # access.log (git'e eklenmez)
```

## Endpoint'ler

| Method | Endpoint | Açıklama | Başarılı kod |
| --- | --- | --- | --- |
| POST | `/api/tasks` | Görev ekler | 201 |
| GET | `/api/tasks` | Görevleri listeler | 200 |
| GET | `/api/tasks/:id` | Görev detayı | 200 |
| PUT | `/api/tasks/:id` | Görevi günceller | 200 |
| DELETE | `/api/tasks/:id` | Görevi siler | 200 |

Filtreleme: `GET /api/tasks?status=todo&priority=high&assigneeId=2`

## Örnek İstek

`POST /api/tasks`

```json
{
  "title": "Giriş sayfasını geliştir",
  "priority": "high"
}
```

Cevap (201):

```json
{
  "id": 1,
  "title": "Giriş sayfasını geliştir",
  "description": "",
  "status": "todo",
  "priority": "high",
  "assigneeId": null,
  "projectId": null,
  "createdAt": "2026-10-13T09:00:00.000Z",
  "updatedAt": "2026-10-13T09:00:00.000Z"
}
```

## Hata Kodları

| Kod | Anlamı |
| --- | --- |
| 400 | Eksik veya geçersiz veri |
| 404 | Kayıt veya endpoint bulunamadı |

## Not

Veriler bellekte tutulur; sunucu yeniden başladığında sıfırlanır.

ÇAĞLA BURHAN