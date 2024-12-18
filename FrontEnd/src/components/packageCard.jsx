/* eslint-disable no-unused-vars */
//  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./output.css"; // Adjust the path as needed
import { ScrollPanel } from "primereact/scrollpanel";
import { Button } from "primereact/button";
import useHttp from "../hooks/useHTTP";

export function PackageCard(probs) {
  const [deactivated, setDeactivated] = useState(false); // 'false' means it's initially 'on'
  const { post, loading, error, data } = useHttp("http://localhost:3000");

  const [subscribeEnabled, setSubscribeEnabled] = useState(true);
  //0 for coach view
  //1 for trainee browsing coach
  //2 for trainee packages dashboard

  useEffect(() => {
    if (
      (probs.type === "Gym" && probs.hasGymSub) || 
      (probs.type === "Nutrition" && probs.hasNutSub) || 
      (probs.type === "Both" && (probs.hasGymSub || probs.hasNutSub))
    ) {
      setSubscribeEnabled(false);
    }
    else {
      setSubscribeEnabled(true);
    }
    setDeactivated(probs.isActive);
  }, []);

  function handleToggle() {
    if (deactivated) {
      setDeactivated(false);
    } else {
      setDeactivated(true);
    }
  }

  async function handleSubscribe() {

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    // Function to decode a JWT (without a library like jwt-decode)
    const decodeJwt = (token) => {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    };

    // Retrieve the JWT token from the cookie
    
    const jwtToken = getCookie("jwt");
    // Decode the JWT token
    const decoded = decodeJwt(jwtToken);
    
    // Extract the traineeId from the decoded JWT (assuming it's in the payload)
    const traineeId = decoded.user_id;

    console.log(traineeId)
    try {
      console.log(probs.PackageId, traineeId)
      const response = await post("/subscriptions", {
        packageId: probs.packageId,
        traineeId: traineeId, 
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  function renderEditBtn() {
    if (probs.view == 0) {
      return (
        <>
          <Button
            label="Edit"
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
            disabled = {!subscribeEnabled}
            className={
              "border-accent border-[1px] py-2 px-6 rounded-full" +
              (subscribeEnabled ? " hover:bg-accent hover:text-backGroundColor active:ring active:ring-accent/50" : " btn-disabled cursor-not-allowed ")
            }
            onClick={handleSubscribe}
          >
            Subscribe Now
          </button>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col border-[2px] border-secondary rounded-2xl text-textColor w-[307px] h-[402px] overflow-hidden">
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
          {probs.duration} {probs.duration > 1 ? "Months" : "Month"}
        </h3>
        <ScrollPanel
          style={{ width: "100%", height: probs.view == 2 ? "140px" : "80px" }}
          className="pl-3"
        >
          <p className="font-thin text-sm">{probs.description}</p>
        </ScrollPanel>
      </div>
      {renderFooter()}
    </div>
  );
}
