import "./output.css"; // Adjust the path as needed
import { PackageCard } from "./packageCard";
import { useState, useEffect } from "react";
import useHttp from "../hooks/useHTTP";

const objs = [
  {
    id: 1,
    name: "package name",
    type: "blah",
    price: 30,
    duration: 6,
    description: "I'm a cutie package",
    isActive: true,
  },
  {
    id: 2,
    name: "package name",
    type: "blah",
    price: 30,
    duration: 6,
    description: "I'm a cutie package",
    isActive: true,
  },
  {
    id: 3,
    name: "package name",
    type: "blah",
    price: 30,
    duration: 6,
    description: "I'm a cutie package",
    isActive: true,
  },
  {
    id: 4,

    name: "package name",
    type: "blah",
    price: 30,
    duration: 6,
    description: "I'm a cutie package",
    isActive: true,
  },
  {
    id: 5,
    name: "package name",
    type: "blah",
    price: 30,
    duration: 6,
    description: "I'm a cutie package",
    isActive: true,
  },
  {
    id: 6,
    name: "package name",
    type: "blah",
    price: 30,
    duration: 6,
    description: "I'm a cutie package",
    isActive: true,
  },
];

export function PackageDashboard() {

  const { get:httpGet, post, loading, error } = useHttp("http://localhost:3000");

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet('/users/23/packages', { headers: { 'Cache-Control': 'no-cache' } });
        console.log(response);
        setPackages(response.data.packages);
      } catch (err) {
        console.log(err);
      }
   }
  
    fetchData();

  }, []);
  
  
  function renderCards() {
  console.log(packages);
  const cards = packages.map((pack) => {
    return (
      <PackageCard
        key={pack.id}
        name={pack.name}
        description={pack.description}
        price={pack.price}
        duration={pack.duration}
        view={0}
        type={pack.type}
      />
    );
  });
  return cards;
}

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-16 w-full">
      {renderCards()}
    </div>
  );
}
