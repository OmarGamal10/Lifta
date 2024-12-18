/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../output.css"; // Adjust the path as needed
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { colors } from "@mui/material";

export function AdminStatistics() {
    const { get: httpGet, post } = useHttp("http://localhost:3000");
    const [activeSubscriptionsCount, setActiveSubscriptionsCount] = useState(0);
    const [gymCount, setGymCount] = useState(0);
    const [nutritionCount, setNutritionCount] = useState(0);
    const [bothCount, setBothCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await httpGet("/subscriptions/activeSubscriptionsCount", {
                headers: { "Cache-Control": "no-cache" },
              });
                setActiveSubscriptionsCount(response.data.activeSubscriptionsCount[0].count);
            } catch (err) {
              console.log(err);
            }
            try {
                const response = await httpGet("/subscriptions/subscriptionsCountByPackageType", {
                  headers: { "Cache-Control": "no-cache" },
                });
                setGymCount(response.data.subscriptionsCount.find(obj => obj.type === 'Gym').subscriptions);
                setNutritionCount(response.data.subscriptionsCount.find(obj => obj.type === 'Nutrition').subscriptions);
                setBothCount(response.data.subscriptionsCount.find(obj => obj.type === 'Both').subscriptions);
              } catch (err) {
                console.log(err);
              }
          };
      
          fetchData();
    }, []);

  return (
    <div className="text-textColor p-6">
      <h1 className="text-4xl font-medium mb-6">Statistics</h1>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-medium">
            Current Active Subscriptions:{" "}
            <span className="text-accent">{activeSubscriptionsCount}</span>
          </h1>
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-4">Top Picked Packages</h2>
          <BarChart
            borderRadius={16}
            xAxis={[
              {
                scaleType: "band",
                data: ["Gym", "Nutrition", "Both"],
                tickLabelStyle: {
                  // Instead, use RGB/hex values from Tailwind color palette
                  fill: "#E3E5EF", // equivalent to text-blue-500
                },
                axisLine: {
                  stroke: "#E3E5EF", // Line color for x-axis
                },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: {
                  // Instead, use RGB/hex values from Tailwind color palette
                  fill: "#E3E5EF", // equivalent to text-blue-500
                },
                axisLine: {
                  stroke: "#E3E5EF", // Line color for x-axis
                  strokeWidth: 2,
                },
              },
            ]}
            series={[
              {
                data: [gymCount, nutritionCount, bothCount],
                color: "#B076A9",
              },
            ]}
            width={640}
            height={480}
          />
        </div>
      </div>
    </div>
  );
}
