import "../output.css"; // Adjust the path as needed
import { useState, useEffect, useRef } from "react";
import useHttp from "../../hooks/useHTTP";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function PackagesList() {
  const {
    get: httpGet,
    post,
    loading,
    error,
    del,
    patch,
  } = useHttp("http://localhost:3000");

  const fetchData = async () => {
    try {
      const response = await httpGet("/packages/packagesDetails", {
        headers: { "Cache-Control": "no-cache" },
      });
      console.log(response);
      setPackages(response.data.packages);
    } catch (err) {
      console.log(err);
    }
  };

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-medium mb-6 text-textColor">Packages</h1>
      <DataTable
        value={packages}
        paginator
        rows={10}
        dataKey="user_id"
        className="border-accent text-textColor focus-ring-accent"
        rowClassName="hover:bg-secondary hover:bg-opacity-50 border-accent"
        filter
        filterDisplay="row"
        emptyMessage="No packages found."
      >
        <Column
          field="package_id"
          filterField="pakcage_id"
          header="ID"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="name"
          filterField="name"
          header="name"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="first_name"
          filterField="first_name"
          header="Coach First Name"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: "240px" }}
        />
        <Column
          field="last_name"
          filterField="last_name"
          header="Coach Last Name"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: "240px" }}
        />
        <Column
          field="type"
          filterField="type"
          header="Type"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="price"
          header="Price"
          sortable
          headerClassName="bg-secondary"
          style={{ minWidth: "150px" }}
        />
        <Column
          field="active_subscriptions"
          header="Active Subscriptions"
          headerClassName="bg-secondary"
          sortable
          style={{ minWidth: "240px" }}
        />
        <Column
          field="pending_subscriptions"
          header="Pending Subscriptions"
          sortable
          headerClassName="bg-secondary"
          style={{ minWidth: "240px" }}
        />
        <Column
          field="rejected_subscriptions"
          header="Rejected Subscriptoins"
          sortable
          headerClassName="bg-secondary"
          style={{ minWidth: "240px" }}
        />
      </DataTable>
    </div>
  );
}
