import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import blueMarkerIcon from "../../public/img/location.png";
import "../../css/public/markerRt.css";
import Navbar from "../../components/public/Navbar";

function Wilayah() {
  const [markers, setMarkers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mymap, setMyMap] = useState(null); // State untuk menyimpan objek peta
  const mapRef = useRef(null); // Create a map reference

  function createShareButtons(latLong) {
    const lat = latLong[0].replace(/\s+/g, ""); // Menghapus semua spasi di latitude
    const lng = latLong[1].replace(/\s+/g, ""); // Menghapus semua spasi di longitude
    const locationUrl = `https://www.google.com/maps/?q=${lat},${lng}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${locationUrl}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=Check out this location on Google Maps: ${locationUrl}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=Check out this location on Google Maps:&url=${locationUrl}`;
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${locationUrl}`;
    const emailUrl = `mailto:?subject=Check out this location on Google Maps&body=Here's the location: ${locationUrl}`;
    const instagramUrl = `https://www.instagram.com/`; // Instagram tidak mendukung berbagi URL secara langsung

    return `
    <div class="flex items-center justify-around">
      <a href="${facebookUrl}" target="_blank" class="text-[#3b5998]"><i class="fab fa-facebook-f"></i></a>
      <a href="${whatsappUrl}" target="_blank" class="text-[#25D366]"><i class="fab fa-whatsapp"></i></a>
      <a href="${twitterUrl}" target="_blank" class="text-[#1DA1F2]"><i class="fab fa-twitter"></i></a>
      <a href="${linkedinUrl}" target="_blank" class="text-[#0077b5]"><i class="fab fa-linkedin-in"></i></a>
      <a href="${emailUrl}" class="text-black"><i class="fas fa-envelope"></i></a>
      <a href="${instagramUrl}" target="_blank" class="text-[#E1306C]"><i class="fab fa-instagram"></i></a>
    </div>
  `;
  }

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const responseRW = await axios.get("http://localhost:5050/api/rw");
        const dataRW = responseRW.data.map((item) => {
          const latLong = item.latLong ? item.latLong.split(",") : [0, 0];
          const popupContent = `
          <div class="border-2 border-black w-[510px] h-[340px] mx-auto bg-white">
          <p class="bg-[#180e5a] text-white m-0 text-lg text-center p-1 mb-1">${
            item.nama_RW
          }</p>
          <img src="http://localhost:5050/api/images/${item.image_rw}" alt="${
            item.nama_ketua_rw
          }" class="max-w-full h-[115px] border border-black ml-5 mt-5 float-left" />
          <div class="float-left ml-10">
          <p class="mt-6 mb-1">
            <label class="text-sm font-bold mr-4">Nama Ketua RW:</label>
            <label class="text-sm font-bold mr-4 mb-2">${
              item.nama_ketua_rw
            }</label>
            <br>
            <label class="text-sm font-bold mr-4">No Hp:</label>
            <label class="text-sm font-bold mr-4">${item.no_hp}</label>
            <br>
            <label class="text-sm font-bold mr-4">Jumlah Pria:</label>
            <label class="text-sm font-bold mr-4 mb-2">${
              item.jumlah_pria
            }</label>
            <br>
            <label class="text-sm font-bold mr-4">Jumlah Wanita:</label>
            <label class="text-sm font-bold mr-4 mb-2">${
              item.jumlah_wanita
            }</label>
            <br>
            <label class="text-sm font-bold mr-4">Jumlah KK:</label>
            <label class="text-sm font-bold mr-4 mb-2">${item.jumlah_kk}</label>
            <br>
            <label class="text-sm font-bold mr-4">Deskripsi:</label>
            <label class="text-sm font-bold mr-4 mb-2">${item.deskripsi}</label>
            <br>
            ${item.latLong}
          </p>
          <p>
            ${createShareButtons(latLong)}
          </p>
          </div>
        </div>
      `;

          return {
            id: item.id_RW,
            latLong: latLong,
            popupContent: popupContent,
            icon: blueMarkerIcon,
          };
        });

        setMarkers(dataRW);
      } catch (error) {
        console.error("Failed to fetch markers:", error);
      }
    };

    fetchMarkers();
  }, []);

  function handleSearchCombined() {
    const searchRW = axios.get(
      `http://localhost:5050/api/rw/search/${searchQuery}`
    );

    searchRW
      .then((response) => {
        const searchDataRW = response.data;

        if (mymap) {
          // Hapus marker yang ada dari peta
          mymap.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              mymap.removeLayer(layer);
            }
          });

          // Tambahkan marker baru untuk setiap hasil pencarian RW
          searchDataRW.forEach((item) => {
            const latLong = item.latLong ? item.latLong.split(",") : [0, 0];
            const popupContent = `
            <div class="border-2 border-black w-[510px] h-[340px] mx-auto bg-white">
              <p class="bg-[#180e5a] text-white m-0 text-lg text-center p-1 mb-1">${
                item.nama_RW
              }</p>
              <img src="http://localhost:5050/api/images/${
                item.image_rw
              }" alt="${
              item.nama_ketua_rw
            }" class="max-w-full h-[115px] border border-black ml-5 mt-5 float-left" />
              <div class="float-left ml-10">
              <p class="mt-6 mb-1">
                <label class="text-sm font-bold mr-4">Nama Ketua RW:</label>
                <label class="text-sm font-bold mr-4 mb-2">${
                  item.nama_ketua_rw
                }</label>
                <br>
                <label class="text-sm font-bold mr-4">No Hp:</label>
                <label class="text-sm font-bold mr-4">${item.no_hp}</label>
                <br>
                <label class="text-sm font-bold mr-4">Jumlah Pria:</label>
                <label class="text-sm font-bold mr-4 mb-2">${
                  item.jumlah_pria
                }</label>
                <br>
                <label class="text-sm font-bold mr-4">Jumlah Wanita:</label>
                <label class="text-sm font-bold mr-4 mb-2">${
                  item.jumlah_wanita
                }</label>
                <br>
                <label class="text-sm font-bold mr-4">Jumlah KK:</label>
                <label class="text-sm font-bold mr-4 mb-2">${
                  item.jumlah_kk
                }</label>
                <br>
                <label class="text-sm font-bold mr-4">Deskripsi:</label>
                <label class="text-sm font-bold mr-4 mb-2">${
                  item.deskripsi
                }</label>
                <br>
                ${item.latLong}
              </p>
              <p>
                ${createShareButtons(latLong)}
              </p>
              </div>
            </div>
          `;

            const popup = L.popup({ maxWidth: 600, minWidth: 350 }).setContent(
              popupContent
            );
            const icon = L.icon({
              iconUrl: blueMarkerIcon,
              iconSize: [38, 38],
            });
            const marker = L.marker(latLong, { icon: icon })
              .addTo(mymap)
              .bindPopup(popup);

            // Buka popup marker secara otomatis
            marker.openPopup();
          });
        }
      })
      .catch((error) => {
        console.error("Failed to search:", error);
      });
  }

  useEffect(() => {
    if (markers.length && !mymap) {
      // Set peta hanya jika ada marker dan peta belum diset
      const map = L.map("mapid").setView(markers[0].latLong, 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      setMyMap(map); // Simpan objek peta ke state
      mapRef.current = map; // Simpan referensi peta

      markers.forEach((marker) => {
        const popup = L.popup({ maxWidth: 600, minWidth: 350 }).setContent(
          marker.popupContent
        );
        const icon = L.icon({
          iconUrl: marker.icon,
          iconSize: [38, 38],
        });
        L.marker(marker.latLong, { icon: icon }).addTo(map).bindPopup(popup);
      });

      const satelitLayer = L.tileLayer(
        "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        {
          subdomains: ["mt0", "mt1", "mt2", "mt3"],
          attribution:
            'Peta Satelit &copy; <a href="https://maps.google.com">Google Maps</a>',
        }
      ).addTo(map); // Tambahkan peta satelit ke peta dan simpan referensinya

      // Hapus kontrol zoom bawaan
      map.removeControl(map.zoomControl);

      // Tambahkan kontrol zoom di tengah-tengah
      L.control.zoom({ position: "topright" }).addTo(map);

      // Tambahkan kontrol layers
      const basemapLayers = {
        OpenStreetMap: L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ),
        "Google Satellite": satelitLayer,
      };
      L.control
        .layers(basemapLayers, null, { position: "topright" })
        .addTo(map);

      // Tambahkan CSS untuk menyesuaikan posisi
      const zoomControlContainer = document.getElementsByClassName(
        "leaflet-top leaflet-right"
      )[0];
      zoomControlContainer.style.top = "50%";
      zoomControlContainer.style.transform = "translateY(-50%)";

      const layerControlContainer = document.getElementsByClassName(
        "leaflet-top leaflet-right"
      )[0];
      layerControlContainer.style.top = "50%";
      layerControlContainer.style.transform = "translateY(-50%)";
    }
  }, [markers, mymap]);

  return (
    <div>
      <Navbar />
      <div id="mapid" className="w-full h-screen pt-16"></div>
      <div className="absolute bottom-2.5 left-2.5 bg-white bg-opacity-80 p-2.5 rounded z-[9999]">
        <input
          type="text"
          placeholder="Cari lokasi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-1"
        />
        <button
          onClick={handleSearchCombined}
          className="ml-2 bg-blue-500 text-white p-1 rounded"
        >
          Cari
        </button>

        <h5 className="m-0">Keterangan Marker:</h5>
        <h6 className="m-0 text-blue-500">Warna Biru: RW</h6>
      </div>
    </div>
  );
}

export default Wilayah;
