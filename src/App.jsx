// Основной компонент сайта: тёмная карта + мигающие новости
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "tailwindcss/tailwind.css"; // Убедитесь, что Tailwind подключён

// Создание пользовательской иконки для маркеров
const customIcon = new L.DivIcon({
  html: '<div class="animate-ping w-4 h-4 bg-red-600 rounded-full border-2 border-white"></div>',
  className: '',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

// Моковые данные новостей
const newsDataMock = [
  {
    id: 1,
    title: "Взрыв в центре Багдада",
    description: "Произошёл мощный взрыв, есть пострадавшие.",
    coords: [33.3152, 44.3661]
  },
  {
    id: 2,
    title: "Протесты в Париже",
    description: "Демонстрации против налоговой реформы.",
    coords: [48.8566, 2.3522]
  },
  {
    id: 3,
    title: "Наводнение в Индии",
    description: "Тысячи людей эвакуированы.",
    coords: [22.5726, 88.3639]
  }
];

// Главный компонент
export default function NewsMap() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Здесь можно подключить реальный API новостей
    setNews(newsDataMock);
  }, []);

  return (
    <div className="h-screen w-full bg-black text-white">
      <h1 className="text-xl font-bold p-4">🌍 Мир в реальном времени</h1>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="h-[90vh] w-full z-0"
        scrollWheelZoom={true}
        style={{ backgroundColor: '#111' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {news.map((item) => (
          <Marker key={item.id} position={item.coords} icon={customIcon}>
            <Popup>
              <h2 className="font-semibold text-black">{item.title}</h2>
              <p className="text-sm text-black">{item.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
