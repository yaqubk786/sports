"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../features/news/newsSlice";
import ExportButtons from "../Components/ExportBtn";
import AuthorStatsChart from "../Components/Charts/AuthorStatsChart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter(); 
  const dispatch = useDispatch();
  const { articles, status, error } = useSelector((state) => state.news);

  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [payoutRate, setPayoutRate] = useState(50);
  const [editablePayouts, setEditablePayouts] = useState({});
  const [activeEdits, setActiveEdits] = useState({});

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  useEffect(() => {
    const storedRate = localStorage.getItem("payoutRate");
    if (storedRate) {
      const value = parseFloat(storedRate);
      if (!isNaN(value)) {
        setPayoutRate(value);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("payoutRate", payoutRate);
  }, [payoutRate]);

  const uniqueAuthors = [
    ...new Set(articles.map((a) => a.author).filter(Boolean)),
  ];
  

  useEffect(() => {
    const storedOverrides = {};
    uniqueAuthors.forEach((author) => {
      const rate = localStorage.getItem(`payoutRate_${author}`);
      if (rate) storedOverrides[author] = parseFloat(rate);
    });
    setEditablePayouts(storedOverrides);
  }, [articles]);

  // Protect the route properly
  useEffect(() => {
    if (sessionStatus === "loading") return; 
    if (!session) {
      router.push("/login"); 
    }
  }, [session, sessionStatus, router]);

  if (sessionStatus === "loading") {
    return <p>Loading...</p>; 
  }

  const filteredArticles = articles.filter((article) => {
    const matchesAuthor = authorFilter ? article.author === authorFilter : true;
    const matchesSearch = searchTerm
      ? article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const publishedDate = new Date(article.publishedAt);
    const matchesStartDate = startDate
      ? publishedDate >= new Date(startDate)
      : true;
    const matchesEndDate = endDate ? publishedDate <= new Date(endDate) : true;
    const matchesType = typeFilter ? typeFilter === "news" : true;

    return (
      matchesAuthor &&
      matchesSearch &&
      matchesStartDate &&
      matchesEndDate &&
      matchesType
    );
  });

  const authorStats = {};
  filteredArticles.forEach((article) => {
    const author = article.author || "Unknown";
    if (!authorStats[author]) {
      authorStats[author] = 0;
    }
    authorStats[author] += 1;
  });

  const chartData = {
    labels: Object.keys(authorStats),
    datasets: [
      {
        label: "Articles per Author",
        data: Object.values(authorStats),
        backgroundColor: ["#4f46e5", "#06b6d4", "#a855f7", "#facc15"],
      },
    ],
  };

  const handleEditPayout = (author, value) => {
    setActiveEdits((prev) => ({
      ...prev,
      [author]: value,
    }));
  };

  const handleSavePayout = (author) => {
    const updatedPayout = parseFloat(activeEdits[author]);
    if (!isNaN(updatedPayout)) {
      localStorage.setItem(`payoutRate_${author}`, updatedPayout);
      setEditablePayouts((prev) => ({
        ...prev,
        [author]: updatedPayout,
      }));
    }
    setActiveEdits((prev) => {
      const newState = { ...prev };
      delete newState[author];
      return newState;
    });
  };

  const handleResetPayout = (author) => {
    localStorage.removeItem(`payoutRate_${author}`);
    setEditablePayouts((prev) => {
      const newState = { ...prev };
      delete newState[author];
      return newState;
    });
    setActiveEdits((prev) => {
      const newState = { ...prev };
      delete newState[author];
      return newState;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-green-300 py-12 px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex justify-end ">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-white text-indigo-600 cursor-pointer font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-100 transition-all"
          >
            Logout
          </button>
        </div>
        {/* Title */}
        <div className="text-white">
          <h1 className="text-5xl font-extrabold leading-tight mb-2">
            Dashboard
          </h1>
          <p className="opacity-80 text-lg">
            Analyze the current statistics and performance.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-lg grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Search by keyword..."
            className="input-style rounded-xl p-3 text-lg focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input-style rounded-xl p-3 text-lg focus:ring-2 focus:ring-indigo-400"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="">Filter by Author</option>
            {uniqueAuthors.map((author, i) => (
              <option key={i} value={author}>
                {author}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input-style rounded-xl p-3 text-lg focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input-style rounded-xl p-3 text-lg focus:ring-2 focus:ring-indigo-400"
          />
          <select
            className="input-style rounded-xl p-3 text-lg focus:ring-2 focus:ring-indigo-400 md:col-span-2 lg:col-span-1"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">Filter by Type</option>
            <option value="news">News</option>
          </select>
        </div>

        {/* News Cards */}
        <div>
          {status === "loading" && (
            <p className="text-white text-xl">Loading news...</p>
          )}
          {status === "failed" && (
            <p className="text-red-300 text-xl">{`Error: ${error}`}</p>
          )}
          {filteredArticles.length === 0 ? (
            <p className="text-white text-xl">No matching articles found.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  <h2 className="text-xl font-semibold text-indigo-600">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {article.author || "Unknown"} •{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                  <p className="mt-3 text-gray-600">{article.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payout Calculator */}
        <div className="bg-white p-6 rounded-3xl shadow-lg space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">
              💰 Payout Calculator
            </h2>
            <ExportButtons
              authorStats={authorStats}
              payoutRate={payoutRate}
              editablePayouts={editablePayouts}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg text-gray-500 mb-2">
                Default payout per article ($):
              </label>
              <input
                type="number"
                value={payoutRate}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  setPayoutRate(isNaN(value) ? 0 : value);
                }}
                className="input-style rounded-xl p-3 text-lg focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-lg text-gray-700">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="p-4 text-left">Author</th>
                  <th className="p-4 text-left">Articles</th>
                  <th className="p-4 text-left">Total Payout ($)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(authorStats).map(([author, count]) => {
                  const rate = editablePayouts[author] ?? payoutRate;
                  const total = (count * rate).toFixed(2);

                  return (
                    <tr key={author} className="border-b border-gray-200">
                      <td className="p-4">{author}</td>
                      <td className="p-4">{count}</td>
                      <td className="p-4">
                        {activeEdits[author] !== undefined ? (
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              value={activeEdits[author]}
                              onChange={(e) =>
                                handleEditPayout(author, e.target.value)
                              }
                              className="input-style rounded-xl w-32"
                            />
                            <button
                              onClick={() => handleSavePayout(author)}
                              className="text-indigo-600 hover:underline"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => handleResetPayout(author)}
                              className="text-red-500 hover:underline"
                            >
                              Reset
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            {total}
                            <button
                              onClick={() => handleEditPayout(author, rate)}
                              className="text-indigo-600 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <AuthorStatsChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
