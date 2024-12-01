//  import { Link } from "react-router-dom";
import { useState } from "react";
import "./output.css"; // Adjust the path as needed
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";

export function PackageCard(probs) {
  const [deactivated, setDeactivated] = useState(false); // 'false' means it's initially 'off'

  //0 for coach view
  //1 for trainee browsing coach
  //2 for trainee packages dashboard

  function handleToggle() {
    if (deactivated) {
      setDeactivated(false);
    } else {
      setDeactivated(true);
    }
  }

  function renderEditBtn() {
    if (probs.view == 0) {
      return (
        <>
          <Button
            label="Submit"
            icon="pi pi-pen-to-square"
            rounded
            size="small"
            unstyled
            className="group"
            pt={{
              root: {
                className:
                  "border-accent hover:bg-accent text-textColor hover:bg-accent hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
              },
              label: {},
              icon: {
                className: "group-hover:text-backGroundColor text-accent",
              }, // OR { className: 'text-white text-2xl' }
            }}
          />
        </>
      );
    }
  }

  function renderFooter() {
    if (probs.view == 0) {
      return (
        <div className="flex justify-between mt-auto pb-6 px-6">
          <Button
            label="Delete"
            icon="pi pi-trash"
            rounded
            unstyled
            className="group"
            pt={{
              root: {
                className:
                  "w-28 text-xs border-accent hover:bg-accent text-textColor hover:bg-accent hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
              },
              label: {},
              icon: {
                className: "group-hover:text-backGroundColor text-accent",
              }, // OR { className: 'text-white text-2xl' }
            }}
          />
          <Button
            label={deactivated ? "Deactivate" : "Activate"}
            icon={deactivated ? "pi pi-circle-fill" : "pi pi-circle"}
            onClick={handleToggle}
            rounded
            unstyled
            className="group"
            pt={{
              root: {
                className:
                  "w-28 text-xs border-accent hover:bg-accent text-textColor hover:bg-accent hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
              },
              label: {},
              icon: {
                className: "group-hover:text-backGroundColor text-accent",
              }, // OR { className: 'text-white text-2xl' }
            }}
          />
        </div>
      );
    } else if (probs.view == 1) {
      return (
        <div className="flex justify-center mt-auto pb-6">
          <button
            className={
              "border-accent border-[1px] py-2 px-6 rounded-full hover:bg-accent hover:text-backGroundColor active:ring active:ring-accent/50" +
              (probs.isActive ? " " : " btn-disabled")
            }
          >
            Subscribe Now
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col border-[2px] border-secondary rounded-2xl text-textColor w-[307px] h-[402px]">
      {/* header */}
      <div className="bg-secondary text-center p-2">
        <h3 className="text-2xl font-medium">{probs.name}</h3>
        <span>{probs.type}</span>
      </div>
      {/* price */}
      <div className="flex pl-6 pr-10 py-6 justify-between items-center">
        <h2 className="text-4xl font-medium">${probs.price}</h2>
        {renderEditBtn()}
      </div>
      <div className="px-6 divide-secondary text-secondary">
        <hr className="border-[1px] text-secondary" />
      </div>
      {/* body */}
      <div className="px-6 py-4">
        <h3 className="text-2xl font-medium text-primary mb-4">
          {probs.duration}
        </h3>
        <ScrollPanel style={{ width: "100%", height: (probs.view == 2)? "140px" : "80px"}} className="pl-3">
          <p className="font-thin text-sm">
            {probs.description}
          </p>
        </ScrollPanel>
      </div>
      {renderFooter()}
    </div>
  );
}
