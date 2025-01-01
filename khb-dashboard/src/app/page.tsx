import { redirect } from 'next/navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            KHB Dashboard
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Modern ve kullanıcı dostu bir yönetim platformu.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Özellikler</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon="👥"
              title="Rol tabanlı yetkilendirme sistemi"
              description="Kullanıcı rollerine göre özelleştirilebilir erişim yetkileri"
            />
            <Feature
              icon="📊"
              title="Özelleştirilebilir dashboard"
              description="İhtiyaçlarınıza göre düzenlenebilir gösterge paneli"
            />
            <Feature
              icon="✅"
              title="Görev yönetimi"
              description="Projelerinizi ve görevlerinizi kolayca takip edin"
            />
            <Feature
              icon="📈"
              title="Veri analizi ve görsellestirme"
              description="Verilerinizi anlamlı grafiklere dönüştürün"
            />
            <Feature
              icon="🔔"
              title="Bildirim sistemi"
              description="Önemli güncellemeleri anında alın"
            />
            <Feature
              icon="👥"
              title="Ekip yönetimi"
              description="Ekip üyelerinizi ve projelerinizi organize edin"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Teknolojiler</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Technology name="Next.js 13+" description="App Router ile modern web geliştirme" />
            <Technology name="TypeScript" description="Tip güvenli kod geliştirme" />
            <Technology name="Tailwind CSS" description="Özelleştirilebilir ve modern tasarım" />
            <Technology name="Redux Toolkit" description="Güçlü durum yönetimi" />
            <Technology name="React Query" description="Sunucu durumu yönetimi" />
            <Technology name="Prisma" description="Type-safe veritabanı erişimi" />
            <Technology name="NextAuth.js" description="Güvenli kimlik doğrulama" />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Başlangıç</h2>
          <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-4">
                <Step number={1} title="Gereksinimleri yükleyin:">
                  <pre className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto">
                    <code>npm install</code>
                  </pre>
                </Step>
                <Step number={2} title="Geliştirme sunucusunu başlatın:">
                  <pre className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto">
                    <code>npm run dev</code>
                  </pre>
                </Step>
                <Step number={3} title="Tarayıcınızda açın:">
                  <pre className="mt-2 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-x-auto">
                    <code>http://localhost:3000</code>
                  </pre>
                </Step>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

function Technology({ name, description }: { name: string; description: string }) {
  return (
    <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{name}</h3>
      <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
          {number}
        </div>
        <div className="ml-4 text-lg font-medium text-gray-900 dark:text-white">{title}</div>
      </div>
      <div className="mt-2 ml-12">{children}</div>
    </div>
  )
}
