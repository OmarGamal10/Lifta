import "./output.css"; // Adjust the path as needed
import { PackageCard } from "./packageCard";

const obj = {
  name: "package name",
  type: "blah",
  price: 30,
  duration: 6,
  description: "I'm a cutie package",
  isActive: true,
};

export function PackageDashboard() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-16 w-full">
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
      <PackageCard
        name={obj.name}
        type={obj.type}
        price={obj.price}
        duration={obj.duration}
        description={obj.description}
        isActive={obj.isActive}
        view={0}
      />
    </div>
  );
}
