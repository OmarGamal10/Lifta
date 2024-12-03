import "./output.css"; // Adjust the path as needed
import { PackageCard } from "./packageCard";

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

function renderCards() {
  const cards = objs.map((obj) => {
    return (
      <PackageCard
        key={obj.id}
        name={obj.name}
        description={obj.description}
        price={obj.price}
        duration={obj.duration}
        view={0}
        type={obj.type}
      />
    );
  });
  return cards;
}

export function PackageDashboard() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-16 w-full">
      {renderCards()}
    </div>
  );
}
