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
  const [who, setWho] = useState(0);
  const [traineeId, setTraineeId] = useState("");

  const { coach_id } = useParams(); // Get the coachId from URL params

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    };

    const decodeJwt = (token) => {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    };

    const fetchPackages = async (coachId) => {
      try {
        const response = await httpGet(`/users/${coachId}/packages`, {
          headers: { "Cache-Control": "no-cache" },
        });
        console.log(response);
        setPackages(response.data.packages);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    const fetchSubscriptions = async (traineeId) => {
      try {
        const gymResponse = await httpGet(
          `/subscriptions/hasGymSubscription/${traineeId}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        console.log(gymResponse.data);
        setHasGymSub(gymResponse.data.hasGymSubscription.length === 1);

        const nutritionResponse = await httpGet(
          `/subscriptions/hasNutritionSubscription/${traineeId}`,
          { headers: { "Cache-Control": "no-cache" } }
        );
        console.log(nutritionResponse.data);
        setHasNutSub(
          nutritionResponse.data.hasNutritionSubscription.length === 1
        );
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      }
    };

    const fetchData = async () => {
      try {
        const jwtToken = getCookie("jwt");
        if (!jwtToken) {
          throw new Error("JWT token not found");
        }

        const decoded = decodeJwt(jwtToken);
        const isTrainer = decoded.type === "Trainer";
        const coachId = isTrainer ? decoded.user_id : coach_id;
        const traineeId = isTrainer ? null : decoded.user_id;

        setWho(isTrainer ? 0 : 1);

        await fetchPackages(coachId);

        if (!isTrainer && traineeId) {
          await fetchSubscriptions(traineeId);
        }
      } catch (err) {
        console.error("Error during fetchData:", err);
      }
    };

    fetchData();
  }, [hasGymSub, hasNutSub]); //To be corrected

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
        {console.log(packages)}
        {packages.map((pack) =>
          
          pack.is_active || who == 0? (
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
              isActive={pack.is_active} // hardcoded
              className="h-full" // Ensures cards have equal height
            />
          ) : (
            <></>
          )
        )}
      </div>
      {packages.length === 0 && <NoDataDashboard header="Packages Available" />}
    </div>
  );
}
