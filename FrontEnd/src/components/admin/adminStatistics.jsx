/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../output.css"; // Adjust the path as needed
import useHttp from "../../hooks/useHTTP";
import React from "react";
import "primeicons/primeicons.css";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  PieChart,
} from "@mui/x-charts/PieChart";
import { Card, Typography } from "@material-tailwind/react";


export function AdminStatistics() {
  const { get: httpGet, post } = useHttp("http://localhost:3000");
  const [activeSubscriptionsCount, setActiveSubscriptionsCount] = useState(0);
  const [gymCount, setGymCount] = useState(0);
  const [nutritionCount, setNutritionCount] = useState(0);
  const [bothCount, setBothCount] = useState(0);
  const [packages, setPackages] = useState([]);
  const [averagePrice, setAveragePrice] = useState(0);

  const tableHead = ["Package Name", "Type", "Coach ID", "Subscriptions"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet(
          "/subscriptions/activeSubscriptionsCount",
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setActiveSubscriptionsCount(
          response.data.activeSubscriptionsCount[0].count
        );
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await httpGet(
          "/subscriptions/subscriptionsCountByPackageType",
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setGymCount(
          response.data.subscriptionsCount.find((obj) => obj.type === "Gym")
            .subscriptions
        );
        setNutritionCount(
          response.data.subscriptionsCount.find(
            (obj) => obj.type === "Nutrition"
          ).subscriptions
        );
        setBothCount(
          response.data.subscriptionsCount.find((obj) => obj.type === "Both")
            .subscriptions
        );
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await httpGet(
          "/packages/topFive",
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setPackages(response.data.packages);
      } catch (err) {
        console.log(err);
      }
      try {
        const response = await httpGet(
          "/packages/averagePrice",
          {
            headers: { "Cache-Control": "no-cache" },
          }
        );
        setAveragePrice(response.data.average[0].averageprice);
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
        <div className="mb-6">
          <h1 className="text-2xl font-medium">
            Package Price Average:{" "}
            <span className="text-accent">{averagePrice}$</span>
          </h1>
        </div>
        <div className="text-textColor">
        <h2 className="text-2xl font-medium mb-4">Top 5 Packages</h2>
        <Card className="h-fit w-[50%] px-4 mb-6">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {tableHead.map((head) => (
                        <th key={head} className="border-b border-accent p-4">
                          <Typography
                            variant="small"
                            className="font-medium leading-none"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map(
                      ({ package_id, name, type, subscriptions, trainer_id }, index) => {
                        const isLast = index === packages.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-accent";
                        return (
                          <tr key={package_id}>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {type}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {trainer_id}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {subscriptions}
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </Card>
        </div>
        <div className="text-textColor">
          <h2 className="text-2xl font-medium mb-4">Packages Subscriptions</h2>
          <PieChart
            colors={["#B076A9", "#A2A7C9", "#5F3C68"]} // Use palette
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: gymCount,
                    label: "Gym",
                  },
                  { id: 1, value: nutritionCount, label: "Nutrition" },
                  {
                    id: 2,
                    value: bothCount,
                    label: "Both",
                  },
                ],
              },
            ]}
            width={640}
            height={320}
            slotProps={{
              legend: {
                labelStyle: {
                  fill: "#E3E5EF",
                },
              },
            }}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
}
