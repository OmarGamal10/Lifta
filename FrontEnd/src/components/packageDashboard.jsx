import "./output.css"; // Adjust the path as needed
import { PackageCard } from "./packageCard";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";
import { ConstructionIcon, SendHorizontal } from "lucide-react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import NoDataDashboard from "./Nodata";

export function PackageDashboard({who, trainee_id}) {
  const { get: httpGet, loading, error } = useHttp("http://localhost:3000");
  const [packages, setPackages] = useState([]);
  const [hasGymSub, setHasGymSub] = useState([]);
  const [hasNutSub, setHasNutSub] = useState([]);

  const { coach_id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet(`/users/${coach_id}/packages`, {
          headers: { "Cache-Control": "no-cache" },
        });
        console.log(response);
        setPackages(response.data.packages);
      } catch (err) {
        console.log(err);
      }
      if (who == 1) {
        try {
          const response = await httpGet(
            "/subscriptions/hasGymSubscription/58",
            {
              headers: { "Cache-Control": "no-cache" },
            }
          );
          console.log(response.data);
          if (response.data.hasGymSubscription.length == 1) {
            setHasGymSub(true);
          } else {
            setHasGymSub(false);
          }
        } catch (err) {
          console.log(err);
        }
        try {
          const response = await httpGet(
            "/subscriptions/hasNutritionSubscription/58",
            {
              headers: { "Cache-Control": "no-cache" },
            }
          );
          console.log(response.data);
          if (response.data.hasNutritionSubscription.length == 1) {
            setHasNutSub(true);
          } else {
            setHasNutSub(false);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-8">
        Error loading packages
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 py-12 ">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-16 w-full">
        {packages.map((pack) => (
          <PackageCard
            key={pack.package_id}
            packageId={pack.package_id}
            name={pack.name}
            description={pack.description}
            price={pack.price}
            duration={pack.duration}
            view={who} //hardcoded
            type={pack.type}
            hasGymSub={hasGymSub}
            hasNutSub={hasNutSub}
            isActive={true} //hardcoded
            className="h-full" // Ensures cards have equal height
          />
        ))}
      </div>
      {packages.length === 0 && (
        <NoDataDashboard header="Packages Available" />
      )}
    </div>
  );
}
