import "./output.css"; // Adjust the path as needed
import { PackageCard } from "./packageCard";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";
import { ConstructionIcon } from "lucide-react";

export function PackageDashboard() {
  const { get: httpGet, loading, error } = useHttp("http://localhost:3000");

  const [packages, setPackages] = useState([]);
  // const [hasGymSub, setHasGymSub] = useState([]);
  // const [hasNutSub, setHasNutSub] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet("/users/70/packages", {
          headers: { "Cache-Control": "no-cache" },
        });
        console.log(response);
        setPackages(response.data.packages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading packages...</div>;
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
            view={0}  //hardcoded
            type={pack.type}
            hasGymSub={true}  //hardcoded
            hasNutSub={false} //hardcoded
            isActive = {true} //hardcoded
            className="h-full" // Ensures cards have equal height
          />
        ))}
      </div>
      {packages.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No packages available
        </div>
      )}
    </div>
  );
}
