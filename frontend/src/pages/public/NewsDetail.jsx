import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
        const response = await axios.get(
          `https://website.fahri.life/api/news/${id}`
        );
        setNews(response.data.Result[0]);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    };

    const fetchLatestNews = async () => {
      try {
        const response = await axios.get("https://website.fahri.life/api/news");
        // Assuming the response is not sorted by default
        const sortedNews = response.data.Result.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setLatestNews(sortedNews.slice(0, 5)); // Get the latest 5 news items
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchNewsDetail();
    fetchLatestNews();
  }, [id]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };
  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5 flex flex-col lg:flex-row">
        <div className="lg:w-3/4 max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <h1
            style={{ marginTop: "80px", marginLeft: "10px" }}
            className="text-3xl font-bold mb-4"
          >
            {news.title}
          </h1>
          <p className="text-gray-600 mb-4" style={{ marginLeft: "10px" }}>
            {formatDate(news.created_at)}
          </p>
          <img
            src={`https://website.fahri.life/api/images/${news.image_url}`}
            alt={news.title}
            className="w-full h-96 object-contain"
          />
          <div className="p-3">
            <p className="text-gray-600 mb-4">
              <strong>Kategori:</strong> {news.category}
            </p>
            <div
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>
            <br />
            <br />
            <br />

            <p className="text-gray-600 mb-4">
              <strong>Penulis:</strong> {news.author}
            </p>
          </div>
        </div>
        <div className="lg:w-1/4 pl-5 lg:pl-5 mt-5 lg:mt-0">
          <h2 className="text-2xl font-bold mb-4">Beritan Terkini</h2>
          <ul className="space-y-4">
            {latestNews.map((item) => (
              <li key={item.id} className="bg-white p-3 shadow-md rounded-lg">
                <Link to={`/news/${item.id}`} className="text-blue-500">
                  <img
                    src={`https://website.fahri.life/api/images/${item.image_url}`}
                    alt={item.title}
                    className="w-full h-32 object-cover mb-2"
                  />
                  {item.title}
                </Link>
                <p className="text-gray-600 text-sm">
                  {formatDate(news.created_at)}
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
