import React, { useState } from "react";
import LoadinIcon from "./LoadinIcon";
import PieChart from "./PieChart";

export default function Analysis() {
  const [imageData, setImageData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chartData, setChartData] = useState([]);

  const [showLoading, setShowLoading] = useState(false)

  function fetchAnalysis() {
    if(!searchTerm)
    {
      alert("Enter a search term")
      return
    }
    setShowLoading(()=>true)
    fetch(`https://tweetfarmapi.herokuapp.com/getanalysisresult/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.message){
          alert("No tweets found for the past week or so")
          setShowLoading(()=>false)
          return
        }
       
        setShowLoading(()=>false)
        setImageData("data:image/png;base64," + data.image);
        setChartData(data.chart)
      });
  }

  return (
    <div className="h-[80vh] w-screen grid place-items-center">
      <div className={`space-y-14 w-11/12 ${!imageData ? 'md:w-[40%]' : 'md:w-[80%]'} transition-all duration-200 ease-in-out border border-gray-200 rounded shadow p-6`}>
        <h1 className="font-bold text-center text-3xl">Analysis</h1>

        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="p-2 md:col-span-3 w-full border border-gray-300 outline-none focus:ring focus:ring-purple-600 rounded transition-all duration-300 ease-in-out"
            type="search"
            placeholder="Enter a search term"
            value={searchTerm}
            onInput={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchAnalysis} disabled={showLoading}
          className="bg-sky-500 text-white rounded px-5 py-2 font-semibold outline-none focus:ring focus:ring-purple-700 hover:bg-sky-600 transition-all duration-200 ease-in-out">
            Analyse
          </button>
        </div>
        {showLoading && <LoadinIcon className="mx-auto" />}
        <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
          {imageData && <img src={imageData} className="w-full h-full object-contain mx-auto" alt="Analysed" />}
          {chartData.length>0 && <PieChart data={chartData} />}
        </div>
      </div>
    </div>
  );
}
