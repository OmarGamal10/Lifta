/* eslint-disable no-unused-vars */
import "../output.css";
import { useState, useEffect } from "react";
import { SubscriptionRequestCard } from "./subscriptionRequestCard";
import useHttp from "../../hooks/useHTTP";
import Loader from "../Loader";
import NoDataDashboard from "../Nodata";

export function SubReqDashboard({ user_id }) {
  const [userId, setUserId] = useState(user_id);
  const [requests, setRequests] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { get, error } = useHttp("http://localhost:3000");
  const [loading, setLoading] = useState(true); // State to track loading

  const fetchRequests = async () => {
    try {
      console.log(userId);
      const response = await get(`/subscriptions/trainer/pending/${userId}`, {
        headers: { "Cache-Control": "no-cache" },
      }); //70 is the coach id from cookie lmfrod httzbt ba3d man-reach el page de mel profile
      if (response && response.data) {
        setRequests(response.data.subscriptions);
      }
      setTrigger(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchRequests();
    };
    fetchData();
  }, [trigger]);

  const renderComponent = () => {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {requests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {requests.map((request, index) => (
                <div
                  key={request.subscription_id}
                  className="flex justify-center items-stretch"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <SubscriptionRequestCard
                    traineeName={request.first_name + " " + request.last_name}
                    packageName={request.name}
                    subscriptionId={request.subscription_id}
                    setTrigger={setTrigger}
                  />
                </div>
              ))}
            </div>
          ) : (
            <NoDataDashboard header="Subscription Requests" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">{loading ? <Loader /> : renderComponent()}</div>
  );
}
