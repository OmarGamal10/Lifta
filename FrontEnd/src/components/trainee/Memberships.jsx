/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import useHttp from "../../hooks/useHTTP";

const Memberships = ({ userId, view = true }) => {
  const [openTrainer, setOpenTrainer] = useState(null);
  const [openMembership, setOpenMembership] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [memberships, setMemberships] = useState([]);

  const { get, loading, error } = useHttp("http://localhost:3000");

  const fetchMemberships = useCallback(async () => {
    try {
      let response;
      if (view)
        response = await get(`/subscriptions/memberships/trainee/${userId}`);
      //else response = await get(`/subscriptions/memberships/trainee/${userId}/trainer/${trainerId}`); //trainerId da el trainer el by3ml visit ya magdy
      setMemberships(response.data.memberships);
      console.log(response.data.memberships);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchMemberships();
  }, [fetchMemberships]);

  const filteredTrainers = memberships
    .filter((trainer) => {
      // Search filter
      if (
        searchQuery &&
        !trainer.trainer_name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Status filter
      const filteredSubscriptions = trainer.subscriptions.filter(
        (subscription) => {
          if (
            statusFilter !== "all" &&
            statusFilter !== subscription.status.toLowerCase()
          ) {
            return false;
          }
          return true;
        }
      );

      return filteredSubscriptions.length > 0;
    })
    .map((trainer) => ({
      ...trainer,
      subscriptions: trainer.subscriptions.filter((subscription) => {
        if (
          statusFilter !== "all" &&
          statusFilter !== subscription.status.toLowerCase()
        ) {
          return false;
        }
        return true;
      }),
    }));

  return (
    <div className="w-full max-w-[95vw] mx-auto p-6 text-textColor">
      <h2 className="text-2xl font-medium mb-8">My Memberships</h2>

      {view && (
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search trainer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg bg-secondary/20 text-textColor outline-none focus:ring-2 focus:ring-accent"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-secondary/20 outline-none focus:ring-2 focus:ring-accent [&>option]:bg-backGroundColor [&>option]:text-textColor"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      )}

      <div className="space-y-4">
        {filteredTrainers.map((trainer) => (
          <Accordion
            key={trainer.trainer_id}
            open={openTrainer === trainer.trainer_id}
            className="w-full border border-secondary rounded-lg overflow-hidden"
          >
            <AccordionHeader
              onClick={() =>
                setOpenTrainer(
                  openTrainer === trainer.trainer_id ? null : trainer.trainer_id
                )
              }
              className="w-full px-6 py-4 hover:bg-secondary/20"
            >
              <div className="flex justify-between w-full items-center">
                <div className="flex items-center gap-8">
                  <span className="text-lg">{trainer.trainer_name}</span>
                </div>
                <span className="text-sm text-accent">{trainer.email}</span>
              </div>
            </AccordionHeader>
            <AccordionBody className="px-6 py-4">
              <div className="space-y-4">
                {trainer.subscriptions.map((subscription, idx) => (
                  <Accordion
                    key={idx}
                    open={openMembership === `${trainer.trainer_id}-${idx}`}
                    className="border border-secondary/20 rounded-lg"
                  >
                    <AccordionHeader
                      onClick={() =>
                        setOpenMembership(
                          openMembership === `${trainer.trainer_id}-${idx}`
                            ? null
                            : `${trainer.trainer_id}-${idx}`
                        )
                      }
                      className="px-4 py-2 hover:bg-secondary/10"
                    >
                      <div className="flex justify-between w-full items-center">
                        <span className="text-lg rounded-full bg-secondary/20 px-3 py-1">
                          {new Date(
                            subscription.start_date
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(subscription.end_date).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-accent bg-secondary/20 `}
                        >
                          {subscription.status}
                        </span>
                      </div>
                    </AccordionHeader>
                    <AccordionBody className="px-4 py-2">
                      <div className="p-4 rounded-lg border border-secondary/50">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="text-lg font-medium text-accent">
                              {subscription.name}
                            </h3>
                            <p className="text-sm text-accent rounded-full bg-secondary/20 px-2 py-1 inline-block mt-1">
                              {subscription.type === "Both"
                                ? "Gym & Nutrition"
                                : subscription.type === "Gym"
                                ? "Gym"
                                : "Nutrition"}
                            </p>
                          </div>
                          <span className="text-lg text-accent">
                            ${subscription.price}
                          </span>
                        </div>
                        <p className="text-gray-400 mb-3">
                          {subscription.description}
                        </p>
                      </div>
                    </AccordionBody>
                  </Accordion>
                ))}
              </div>
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Memberships;
