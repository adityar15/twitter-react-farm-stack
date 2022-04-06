import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useEffect } from "react";

export default function PieChart({ data }) {
 


  useEffect(() => {
    console.log("data", data)
    if (data.length > 0) 
    {
        let chartRoot = am5.Root.new("chartdiv")
        plotChart(chartRoot);

        return () => {
            chartRoot.dispose()
        }
    }
  }, [data]);

  function plotChart(chartRoot) {
    let chart = chartRoot.container.children.push(
      am5percent.PieChart.new(chartRoot, {})
    );
    let series = chart.series.push(
      am5percent.PieSeries.new(chartRoot, {
        name: "Series",
        categoryField: "category",
        valueField: "value",
      })
    );

    series.data.setAll(data);

    let legend = chart.children.push(
      am5.Legend.new(chartRoot, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: chartRoot.horizontalLayout,
      })
    );

    legend.data.setAll(series.dataItems);
  }

  return <div id="chartdiv" className="h-[300px] w-full"></div>;
}
