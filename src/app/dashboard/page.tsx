'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Building2, Users, FileText, AreaChart, Building, MapPin, Scale, CalendarDays, Warehouse, Timer, Ruler, Activity } from 'lucide-react'

// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
)

// Örnek veri ve istatistikler
const stats = {
  totalBuildings: 150,
  totalArea: 375000,
  avgAge: 2.5,
  occupancyRate: 92,
  maintenanceScore: 87,
  energyEfficiency: 82,
  buildingTypes: {
    labels: ['Üretim', 'Ofis', 'Altyapı', 'Depo', 'Sosyal'],
    data: [30, 45, 25, 35, 15]
  },
  buildingsByCity: {
    labels: ['Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya'],
    data: [45, 35, 25, 30, 15]
  },
  buildingAreas: {
    labels: ['0-1000m²', '1000-2000m²', '2000-3000m²', '3000-4000m²', '4000-5000m²', '5000m²+'],
    data: [20, 35, 45, 25, 15, 10]
  },
  buildingAgeGroups: {
    labels: ['0-2 Yıl', '2-4 Yıl', '4+ Yıl'],
    data: [60, 50, 40]
  },
  monthlyBuildingUsage: {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    data: [85, 82, 88, 86, 90, 92, 89, 91, 94, 92, 95, 93]
  },
  buildingStatus: {
    labels: ['Aktif', 'Ex', 'As Built Hazır', 'As Built Bekliyor'],
    data: [100, 30, 80, 70]
  },
  maintenanceMetrics: {
    labels: ['Yapısal', 'Elektrik', 'Mekanik', 'İç Mekan', 'Dış Cephe', 'Güvenlik'],
    data: [85, 78, 82, 90, 75, 88]
  },
  energyConsumption: {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    data: [320, 280, 250, 220, 200, 280, 350, 380, 280, 250, 300, 340]
  },
  spaceUtilization: {
    labels: ['Ofis', 'Toplantı', 'Depo', 'Ortak Alan', 'Teknik'],
    data: [40, 15, 20, 15, 10]
  },
  buildingCapacity: {
    labels: ['Ankara', 'İstanbul', 'İzmir', 'Bursa', 'Antalya'],
    maxCapacity: [1200, 1500, 800, 900, 600],
    currentOccupancy: [1100, 1300, 600, 850, 500]
  }
}

export default function DashboardPage() {
  // Grafik seçenekleri ve veri yapılandırmaları
  const buildingTypesData = {
    labels: stats.buildingTypes.labels,
    datasets: [
      {
        label: 'Bina Sayısı',
        data: stats.buildingTypes.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const buildingsByCityData = {
    labels: stats.buildingsByCity.labels,
    datasets: [
      {
        label: 'Bina Sayısı',
        data: stats.buildingsByCity.data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const buildingAreasData = {
    labels: stats.buildingAreas.labels,
    datasets: [
      {
        label: 'Bina Sayısı',
        data: stats.buildingAreas.data,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const buildingAgeData = {
    labels: stats.buildingAgeGroups.labels,
    datasets: [
      {
        label: 'Bina Sayısı',
        data: stats.buildingAgeGroups.data,
        backgroundColor: [
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
      },
    ],
  }

  const buildingUsageData = {
    labels: stats.monthlyBuildingUsage.labels,
    datasets: [
      {
        label: 'Kullanım Oranı (%)',
        data: stats.monthlyBuildingUsage.data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.3,
        fill: true,
      },
    ],
  }

  const buildingStatusData = {
    labels: stats.buildingStatus.labels,
    datasets: [
      {
        label: 'Durum',
        data: stats.buildingStatus.data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
        ],
      },
    ],
  }

  const maintenanceData = {
    labels: stats.maintenanceMetrics.labels,
    datasets: [{
      label: 'Bakım Puanı',
      data: stats.maintenanceMetrics.data,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  }

  const energyConsumptionData = {
    labels: stats.energyConsumption.labels,
    datasets: [{
      label: 'Enerji Tüketimi (MWh)',
      data: stats.energyConsumption.data,
      borderColor: 'rgb(255, 159, 64)',
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
      tension: 0.3,
      fill: true
    }]
  }

  const spaceUtilizationData = {
    labels: stats.spaceUtilization.labels,
    datasets: [{
      label: 'Alan Kullanımı (%)',
      data: stats.spaceUtilization.data,
      backgroundColor: [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
      ]
    }]
  }

  const buildingCapacityData = {
    labels: stats.buildingCapacity.labels,
    datasets: [
      {
        label: 'Maksimum Kapasite',
        data: stats.buildingCapacity.maxCapacity,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      },
      {
        label: 'Mevcut Doluluk',
        data: stats.buildingCapacity.currentOccupancy,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="p-2 space-y-2">
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-1">
            <CardTitle className="text-xs font-medium">Toplam Bina</CardTitle>
            <Building className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-lg font-bold">{stats.totalBuildings}</div>
            <p className="text-[10px] text-muted-foreground">5 farklı tipte</p>
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-1">
            <CardTitle className="text-xs font-medium">Toplam Alan</CardTitle>
            <Scale className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-lg font-bold">{stats.totalArea.toLocaleString()} m²</div>
            <p className="text-[10px] text-muted-foreground">6 şehirde</p>
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-1">
            <CardTitle className="text-xs font-medium">Bakım Puanı</CardTitle>
            <Activity className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-lg font-bold">%{stats.maintenanceScore}</div>
            <p className="text-[10px] text-muted-foreground">Son ay +2.3%</p>
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-1">
            <CardTitle className="text-xs font-medium">Enerji Verimliliği</CardTitle>
            <Timer className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-1">
            <div className="text-lg font-bold">%{stats.energyEfficiency}</div>
            <p className="text-[10px] text-muted-foreground">Hedef: %85</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4">
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Bina Tipleri Dağılımı</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Pie 
              data={buildingTypesData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { position: 'right' as const, labels: { font: { size: 9 }, boxWidth: 10 } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Şehirlere Göre Dağılım</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Bar 
              data={buildingsByCityData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  x: { ticks: { font: { size: 9 } } },
                  y: { ticks: { font: { size: 9 } } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Metrekare Dağılımı</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Bar 
              data={buildingAreasData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  x: { ticks: { font: { size: 9 } } },
                  y: { ticks: { font: { size: 9 } } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Yaş Dağılımı</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Doughnut 
              data={buildingAgeData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { position: 'right' as const, labels: { font: { size: 9 }, boxWidth: 10 } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Aylık Kullanım Oranları</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Line 
              data={buildingUsageData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  x: { ticks: { font: { size: 9 } } },
                  y: { 
                    min: 50,
                    max: 100,
                    ticks: { font: { size: 9 } }
                  }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Bina Durumları</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Bar 
              data={buildingStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                indexAxis: 'y' as const,
                scales: {
                  x: { ticks: { font: { size: 9 } } },
                  y: { ticks: { font: { size: 9 } } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Bakım Metrikleri</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Radar 
              data={maintenanceData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    ticks: { font: { size: 9 }, stepSize: 20 }
                  }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Aylık Enerji Tüketimi</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Line 
              data={energyConsumptionData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { display: false }
                },
                scales: {
                  x: { ticks: { font: { size: 9 } } },
                  y: { ticks: { font: { size: 9 } } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Alan Kullanım Dağılımı</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Doughnut 
              data={spaceUtilizationData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { position: 'right' as const, labels: { font: { size: 9 }, boxWidth: 10 } }
                }
              }}
            />
          </CardContent>
        </Card>
        <Card className="p-1">
          <CardHeader className="p-1">
            <CardTitle className="text-xs">Bina Kapasite Analizi</CardTitle>
          </CardHeader>
          <CardContent className="p-1 h-[180px]">
            <Bar 
              data={buildingCapacityData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: { position: 'top' as const, labels: { font: { size: 9 }, boxWidth: 10 } }
                },
                scales: {
                  x: { ticks: { font: { size: 9 } } },
                  y: { ticks: { font: { size: 9 } } }
                }
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 