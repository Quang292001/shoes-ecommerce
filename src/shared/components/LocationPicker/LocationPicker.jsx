import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

// Sửa lỗi phổ biến: icon marker mặc định của Leaflet không load được
// khi dùng chung với bundler (Vite/Webpack), nên phải trỏ lại thủ công.
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * Bản đồ chọn vị trí giao hàng.
 *
 * Props:
 * - center: { lat, lng } — vị trí map sẽ bay tới khi đổi tỉnh/thành
 * - selectedPosition: { lat, lng } | null — vị trí ghim hiện tại (điều khiển từ ngoài)
 * - onLocationSelect(pos): callback trả về { lat, lng } khi người dùng chọn vị trí
 */
function LocationPicker({ center, selectedPosition, onLocationSelect }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Khởi tạo bản đồ một lần duy nhất
  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(
      [center.lat, center.lng],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("click", (e) => placeMarker(e.latlng));

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Khi đổi tỉnh/thành (center thay đổi) → bay bản đồ tới vị trí mới
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([center.lat, center.lng], 13);
    }
  }, [center]);

  // Đồng bộ marker khi selectedPosition được set/đổi từ bên ngoài (ví dụ "dùng vị trí của tôi")
  useEffect(() => {
    if (!mapRef.current || !selectedPosition) return;

    if (markerRef.current) {
      markerRef.current.setLatLng([selectedPosition.lat, selectedPosition.lng]);
    } else {
      addMarkerAt(selectedPosition.lat, selectedPosition.lng);
    }
  }, [selectedPosition]);

  const addMarkerAt = (lat, lng) => {
    const marker = L.marker([lat, lng], { draggable: true }).addTo(
      mapRef.current
    );
    marker.on("dragend", () => {
      const pos = marker.getLatLng();
      onLocationSelect({ lat: pos.lat, lng: pos.lng });
    });
    markerRef.current = marker;
  };

  const placeMarker = (latlng) => {
    if (markerRef.current) {
      markerRef.current.setLatLng(latlng);
    } else {
      addMarkerAt(latlng.lat, latlng.lng);
    }
    onLocationSelect({ lat: latlng.lat, lng: latlng.lng });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        mapRef.current.setView([latlng.lat, latlng.lng], 16);
        placeMarker(latlng);
      },
      () => {
        alert("Không thể lấy vị trí hiện tại. Vui lòng chọn thủ công trên bản đồ.");
      }
    );
  };

  return (
    <div className="location-picker">
      <div className="location-picker-header">
        <span>
          <i className="fa-solid fa-location-dot"></i> Chọn vị trí giao hàng
          trên bản đồ
        </span>
        <button type="button" onClick={handleUseMyLocation}>
          Dùng vị trí của tôi
        </button>
      </div>

      <div ref={mapContainerRef} className="location-picker-map" />

      <p className="location-picker-hint">
        Nhấp vào bản đồ hoặc kéo ghim để xác định chính xác vị trí giao hàng.
      </p>

      {selectedPosition && (
        <p className="location-picker-coords">
          Toạ độ đã chọn: {selectedPosition.lat.toFixed(5)},{" "}
          {selectedPosition.lng.toFixed(5)}
        </p>
      )}
    </div>
  );
}

export default LocationPicker;