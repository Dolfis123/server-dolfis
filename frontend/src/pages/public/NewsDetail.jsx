import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/Footer";

function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`https://dolfis.store/api/news/${id}`);
        setNews(response.data.Result[0]);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("https://dolfis.store/api/news");
        setLatestNews(response.data.Result.slice(0, 5)); // Get the latest 4 news items
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchNewsDetail();
    fetchLatestNews();
  }, [id]);

  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5 flex">
        <div className="w-3/4 max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <h1
            style={{ marginTop: "80px", marginLeft: "10px" }}
            className="text-3xl font-bold mb-4"
          >
            {news.title}
          </h1>
          <p className="text-gray-600 mb-4" style={{ marginLeft: "10px" }}>
            <strong>Diterbitkan:</strong>{" "}
            {new Date(news.created_at).toLocaleDateString()}
          </p>
          <img
            src={`https://dolfis.store/api/images/${news.image_url}`}
            alt={news.title}
            className="w-full h-96 object-contain"
          />
          <div className="p-5">
            <p className="text-gray-600 mb-4">
              <strong>Category:</strong> {news.category}
            </p>
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>
            <br />
            <br />
            <br />

            <p className="text-gray-600 mb-4">
              <strong>Author:</strong> {news.author}
            </p>
          </div>
        </div>
        <div className="w-1/4 pl-5">
          <h2 style={{ marginTop: "60px" }} className="text-2xl font-bold mb-4">
            Beritan Terkini
          </h2>
          <ul className="space-y-4">
            {latestNews.map((item) => (
              <li key={item.id} className="bg-white p-3 shadow-md rounded-lg">
                <a href={`/news/${item.id}`} className="text-blue-500">
                  <img
                    src={`https://dolfis.store/api/images/${item.image_url}`}
                    alt={item.title}
                    className="w-full h-32 object-cover mb-2"
                  />
                  {item.title}
                </a>
                <p className="text-gray-600 text-sm">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NewsDetail;
