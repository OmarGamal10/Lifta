/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import useHttp from "../../hooks/useHTTP";

export function SubscriptionRequestCard(probs) {
  const { get, patch, error, data } = useHttp("http://localhost:3000");
  const handleResponse = async (status) => {
    try {
      const response = await patch(`/subscriptions/${probs.subscriptionId}`, {
        status,
      });
      probs.setTrigger(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col border-[2px] border-secondary rounded-2xl text-textColor w-[307px] overflow-hidden p-8">
      <div className="text-center">
        <h3 className="text-2xl font-medium text-center">
          Subscription Request
        </h3>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <Link to="#" className="font-bold">
          {probs.traineeName}
        </Link>
        <span>
          sent a subscription request to <b>{probs.packageName}</b> package
        </span>
      </div>
      <div className="flex justify-around mt-10 mb-1">
        <Button
          icon="pi pi-check"
          outlined
          aria-label="Filter"
          className="group"
          tooltip="Accept"
          tooltipOptions={{
            position: "bottom",
            className: "text-textColor mt-[-8px] text-sm",
          }}
          pt={{
            root: {
              className:
                "border-accent hover:bg-accent text-textColor hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
            },
            icon: {
              className: "group-hover:text-backGroundColor text-accent",
            },
          }}
          onClick={() => {
            handleResponse(true);
          }}
        />
        <Button
          icon="pi pi-times"
          outlined
          aria-label="Filter"
          className="group"
          tooltip="Reject"
          tooltipOptions={{
            position: "bottom",
            className: "text-textColor mt-[-8px] text-sm",
          }}
          pt={{
            root: {
              className:
                "border-accent hover:bg-accent text-textColor hover:text-backGroundColor focus:outline-none focus:ring-0 active:ring active:ring-accent/50",
            },
            icon: {
              className: "group-hover:text-backGroundColor text-accent",
            },
          }}
          onClick={() => {
            handleResponse(false);
          }}
        />
      </div>
    </div>
  );
}
