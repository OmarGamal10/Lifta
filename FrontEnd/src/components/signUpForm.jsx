import { useState } from "react";
import "../style/output.css"; // Adjust the path as needed
import Form1 from "./mainForm";
import Form2Trainee from "./trainee/formTrainee";
import Form2Coach from "./coach/formCoach";
import UserTypeForm from "./userTypeForm";
import AdminUserTypeForm from "./admin/adminUserTypeForm";
import AdminForm from "./admin/adminForm";

function SignUpForm(probs) {
  const [userType, setUserType] = useState("");
  const [curForm, setCurForm] = useState(1);
  const [form1Data, setForm1Data] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    gender: "M",
    birthDate: "",
    type: "",
    photo: "",
  });

  const [traineeData, setTraineeData] = useState({
    height: "",
    weight: "",
    goal: "",
    foodAllergies: "",
    workoutPreferences: "Gym",
  });

  const [coachData, setCoachData] = useState({
    experienceYears: "",
    clientLimit: "",
  });

  // const [adminData, setAdminData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: "",
  // });

  const [certData, setCertData] = useState({
    title: "",
    dateIssued: "",
    description: "",
    certificatePhoto: "",
  });

  return (
    <>
      {userType ? (
        ""
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {probs.isAdmin == 0 ? (
            <UserTypeForm setType={setUserType} setFormData={setForm1Data} />
          ) : (
            <AdminUserTypeForm
              setType={setUserType}
              setFormData={setForm1Data}
            />
          )}
        </div>
      )}
      {curForm == 1 && (
        <Form1
          formData={form1Data}
          setFormData={setForm1Data}
          toNext={setCurForm}
          type={userType}
        />
      )}

      {/* {curForm == 1 && userType == "Admin" && (
        <AdminForm formData={adminData} setFormData={setAdminData} />
      )} */}

      {curForm == 2 &&
        (userType == "Trainee" ? (
          <Form2Trainee
            formData={form1Data}
            traineeData={traineeData}
            setTraineeData={setTraineeData}
            setCurForm={setCurForm}
            isAdmin={probs.isAdmin}
          />
        ) : (
          <Form2Coach
            userData={form1Data}
            formData={coachData}
            setFormData={setCoachData}
            setCurForm={setCurForm}
            certData={certData}
            setCertData={setCertData}
            isAdmin={probs.isAdmin}
          />
        ))}
    </>
  );
}

export default SignUpForm;
