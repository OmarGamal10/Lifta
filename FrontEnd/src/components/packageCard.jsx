//  import { Link } from "react-router-dom";
import "./output.css"; // Adjust the path as needed

export function PackageCard(probs) {
  return (
    <div className="flex flex-col border-[2px] border-secondary rounded-2xl text-textColor w-[307px] h-[402px]">
      <div className="bg-secondary text-center p-2">
        <h3 className="text-2xl font-medium">{probs.name}</h3>
        <span>{probs.type}</span>
      </div>
      <div className="flex px-6 py-6">
        <h2 className="text-4xl font-medium">${probs.price}</h2>
      </div>
      <div className="px-6 divide-secondary text-secondary">
        <hr className="border-[1px] text-secondary" />
      </div>
      <div className="px-6 py-4">
        <h3 className="text-2xl font-medium text-primary mb-4">{probs.duration}</h3>
        <p className="font-thin text-sm">
          {probs.description}
        </p>
      </div>
      <div className="flex justify-center mt-auto pb-6">
        <button className={"border-accent border-[1px] py-2 px-6 rounded-full hover:bg-accent hover:text-backGroundColor" + (probs.isActive? " ":" btn-disabled")}>
          Subscribe Now
        </button>
      </div>
    </div>
  );
}
