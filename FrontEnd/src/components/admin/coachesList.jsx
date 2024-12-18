import "../output.css"; // Adjust the path as needed
import { useState, useEffect, useRef } from "react";
import useHttp from "../../hooks/useHTTP";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export function CoachesList() {

  const { get:httpGet, post, loading, error, del } = useHttp("http://localhost:3000");

  const [coaches, setCoaches] = useState([]);

  const fetchData = async () => {
    try {
      const response = await httpGet('/users/coaches', { headers: { 'Cache-Control': 'no-cache' } });
      console.log(response);
      setCoaches(response.data.coaches);
    } catch (err) {
      console.log(err);
    }
 }

  useEffect(() => {  
    fetchData();

  }, []);

  const handleDelete = async (userId) => {
      try {
        const response = await del(`/users/${userId}`, {
          headers: { "Cache-Control": "no-cache" },
          body: {},
          data: {},
        });
        console.log(response);
        
        fetchData();
      } catch (err) {
        console.log(err);
      }
    
    }
  
    const [selectedUser, setSelectedUser] = useState(null);
    const dialogRef = useRef(null);
  
    const onRowClick = (event) => {
      const user = event.data;
      setSelectedUser(user);
  
      // Open the dialog
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    };
  
    // Close modal handler
    const handleCloseModal = () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
      setSelectedUser(null);
    };

  return (
    <div>
      <DataTable
        value={coaches}
        paginator
        rows={10}
        onRowClick={onRowClick}
        dataKey="user_id"
        className="border-accent text-textColor focus-ring-accent"
        rowClassName="hover:bg-secondary hover:bg-opacity-50 border-accent cursor-pointer"
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
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          filterHeaderClassName="flex items-center space-x-2"
          style={{ minWidth: '150px'}}
        />
         <Column
          field="email"
          filterField="email"
          header="Email"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: '145px' }}
        />
         <Column
          field="first_name"
          filterField="first_name"
          header="First Name"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: '150px' }}
        />
        <Column
         field="last_name"
         filterField="last_name"
         header="Last Name"
         filter          
         filterMenuClassName="bg-secondary text-textColor"
         filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: '150px' }}
       />
        <Column
          field="phone_number"
          filterField="phone_number"
          header="Phone Number"
          filter
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: '150px' }}
        />
        <Column
          field="gender"
          filterField="gender"
          header="Gender"
          filter          
          filterMenuClassName="bg-secondary text-textColor"
          filterPlaceholder="Search..."
          headerClassName="bg-secondary"
          style={{ minWidth: '150px' }}
        />
        <Column
          field="experience_years"
          header="Experience Years"
          sortable
          headerClassName="bg-secondary"
        />
        <Column
          field="rating"
          header="Rating"
          sortable
          headerClassName="bg-secondary"
        />
        <Column
          field="subscriptions"
          header="Subscriptions"
          sortable 
          headerClassName="bg-secondary"
        />
      </DataTable>
      
      <dialog
        ref={dialogRef}
        className="p-6 rounded-lg w-full max-w-md bg-textColor text-backGroundColor"
      >
        {selectedUser && (
          <>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">
                  {selectedUser.first_name} {selectedUser.last_name}
                </h2>
                <p className="py-2 px-4"> {selectedUser.bio}</p>
              </div>
              <button
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 px-4">
              <div>
                <strong>User ID:</strong> {selectedUser.user_id}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <button onClick={()=>handleDelete(selectedUser.user_id)} className="border-accent border-2 py-2 px-6 rounded-full hover:bg-accent hover:text-backGroundColor active:ring active:ring-accent/50">
                Delete User
              </button>
            </div>
          </>
        )}
      </dialog>

    </div>
  );
}
