import "../output.css"; // Adjust the path as needed
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";
import { SubscriptionRequestCard } from "./subscriptionRequestCard";

const objs = [
  {
    id: 1,
    traineeName: "package name",
    packageName: "blah"
  },
  {
    id: 2,
   traineeName: "package name",
    packageName: "blah"
  },
  {
    id: 3,
    traineeName: "package name",
    packageName: "blah"
  },
  {
    id: 4,
traineeName: "package name",
    packageName: "blah"
  },
  {
    id: 5,
  traineeName: "package name",
    packageName: "blah"
  },
  {
    id: 6,
   traineeName: "package name",
    packageName: "blah"
  },
];

export function SubReqDashboard() {

//   const { get:httpGet, post, loading, error } = useHttp("http://localhost:3000");

//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await httpGet('/users/23/packages', { headers: { 'Cache-Control': 'no-cache' } });
//         console.log(response);
//         setRequests(response.data.packages);
//       } catch (err) {
//         console.log(err);
//       }
//    }
  
//     fetchData();

//   }, []);
  
  
  function renderCards() {
  const cards = objs.map((request) => {
    return (
        <SubscriptionRequestCard
        key={request.id}
        traineeName={request.traineeName}
       packageName={request.packageName}
      />
    );
  });
  return cards;
}

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-16 w-full">
          {renderCards()}
    </div>
  );
}
