import "../output.css"; // Adjust the path as needed
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function TraineesList() {

  const { get:httpGet, post, loading, error } = useHttp("http://localhost:3000");

  const [trainees, setTrainees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await httpGet('/users/trainees', { headers: { 'Cache-Control': 'no-cache' } });
        console.log(response);
        setTrainees(response.data.trainees);
      } catch (err) {
        console.log(err);
      }
   }
  
    fetchData();

  }, []);

  return (
    <div>
      <DataTable
        value={trainees}
        paginator
        rows={10}
        dataKey="user_id"
        className="border-accent text-textColor focus-ring-accent"
        rowClassName="hover:bg-secondary hover:bg-opacity-50 border-accent"
        filter
        filterDisplay="row"
        emptyMessage="No users found."
      >
        <Column
          field="user_id"
          filterField="user_id"
          header="ID"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by ID"
          headerClassName="bg-secondary"
          style={{ minWidth: '220px'}}
        />
         <Column
          field="email"
          filterField="email"
          header="Email"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by email"
          headerClassName="bg-secondary"
          style={{ minWidth: '240px' }}
        />
         <Column
          field="first_name"
          filterField="first_name"
          header="First Name"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by first name"
          headerClassName="bg-secondary"
          style={{ minWidth: '280px' }}
        />
        <Column
         field="last_name"
         filterField="last_name"
         header="Last Name"
         filter          
         filterMenuClassName="bg-secondary text-textColor"
         filterPlaceholder="Search by last name"
          headerClassName="bg-secondary"
          style={{ minWidth: '280px' }}
       />
        <Column
          field="phone_number"
          filterField="phone_number"
          header="Phone Number"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by phone number"
          headerClassName="bg-secondary"
          style={{ minWidth: '320px' }}
        />
        <Column
          field="gender"
          filterField="gender"
          header="Gender"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by gender"
          headerClassName="bg-secondary"
          style={{ minWidth: '260px' }}
        />
        <Column
          field="birth_date"
          filterField="birth_date"
          header="Birth Date"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by birth date"
          headerClassName="bg-secondary"
          style={{ minWidth: '280px' }}
        />
        <Column
          field="height"
          filterField="height"
          header="Heigh"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by height"
          headerClassName="bg-secondary"
          style={{ minWidth: '260px' }}
        />
        <Column
          field="weight"
          filterField="weight"
          header="Weight"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by weight"
          headerClassName="bg-secondary"
          style={{ minWidth: '260px' }}
        />
        <Column
          field="food_allergies"
          filterField="food_allergies"
          header="Food Allergies"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by food allergies"
          headerClassName="bg-secondary"
          style={{ minWidth: '300px' }}
        />
        <Column
          field="workout_preferences"
          filterField="workout_preferences"
          header="Workout Preferences"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by workout preferences"
          headerClassName="bg-secondary"
          style={{ minWidth: '360px' }}
        />
        <Column
          field="bio"
          filterField="bio"
          header="BIO"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by BIO"
          headerClassName="bg-secondary"
          style={{ minWidth: '240px' }}
        />
        <Column
          field="photo"
          filterField="photo"
          header="Photo"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by photo"
          headerClassName="bg-secondary"
          style={{ minWidth: '260px' }}
        />
        <Column
          field="coach_id"
          filterField="coach_id"
          header="Coach ID"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by coach ID"
          headerClassName="bg-secondary"
          style={{ minWidth: '300px' }}
        />
        <Column
          field="nutritionist_id"
          filterField="nutritionist_id"
          header="Nutritionist ID"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search by nutritionist ID"
          headerClassName="bg-secondary"
          style={{ minWidth: '320px' }}
        />
  </DataTable>

    </div>
  );
}
