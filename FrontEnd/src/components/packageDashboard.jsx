
import { PackageCard } from "./packageCard";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";
import { ConstructionIcon, SendHorizontal } from "lucide-react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import NoDataDashboard from "./Nodata";

export function PackageDashboard() {
  const { get: httpGet, loading, error } = useHttp("http://localhost:3000");
  const [packages, setPackages] = useState([]);
  const [hasGymSub, setHasGymSub] = useState(false);
  const [hasNutSub, setHasNutSub] = useState(false);
  const [who, setWho] = useState();
  const [traineeId, setTraineeId] = useState("");

  const { coach_id } = useParams(); // Get the coachId from URL params

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const res = await httpGet("/users/checkAuth");
        const coachId = (res.userType === "Trainer")? res.userId: coach_id;
        const traineeId = (res.userType === "Trainer")? null: res.userId;
        if(res.userType === "Trainer") setWho(0);
        else setWho(1);
        const response = await httpGet(`/users/${coachId}/packages`, {
          headers: { "Cache-Control": "no-cache" },
        });
        console.log(response);
        setPackages(response.data.packages);
      } catch (err) {
        console.log(err);
      }

      if (who === "Trainer" && traineeId) {
        try {
          const gymResponse = await httpGet(
            `/subscriptions/hasGymSubscription/${traineeId}`,
            { headers: { "Cache-Control": "no-cache" } }
          );
          console.log(gymResponse.data);
          setHasGymSub(gymResponse.data.hasGymSubscription.length === 1);
        } catch (err) {
          console.log(err);
        }

        try {
          const nutritionResponse = await httpGet(
            `/subscriptions/hasNutritionSubscription/${traineeId}`,
            { headers: { "Cache-Control": "no-cache" } }
          );
          console.log(nutritionResponse.data);
          setHasNutSub(nutritionResponse.data.hasNutritionSubscription.length === 1);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, []); // Add dependencies to avoid stale closure

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
    <div className="container mx-auto p-12">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-16 w-full">
        {packages.map((pack) => (
          <PackageCard
            key={pack.package_id}
            packageId={pack.package_id}
            name={pack.name}
            description={pack.description}
            price={pack.price}
            duration={pack.duration}
            view={who} // hardcoded
            type={pack.type}
            hasGymSub={hasGymSub}
            hasNutSub={hasNutSub}
            isActive={true} // hardcoded
            className="h-full" // Ensures cards have equal height
          />
        ))}
      </div>
      {packages.length === 0 && <NoDataDashboard header="Packages Available" />}
    </div>
  );
}
