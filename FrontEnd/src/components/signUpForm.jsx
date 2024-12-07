import React, { useState } from "react";
import "./output.css"; // Adjust the path as needed
import ErrorMessage from "./errorMsg"; // Import the ErrorMessage component
import Form1 from "./mainForm";
import Form2Trainee from "./trainee/formTrainee";
import Form2Coach from "./coach/formCoach";
import UserTypeForm from "./userTypeForm";

function SignUpForm() {
  const [userType, setUserType] = useState("");
  const [curForm, setCurForm] = useState(1);
  const [form1Data, setForm1Data] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    bio: "",
    gender: "male",
    birthdate: "",
  });

  const [traineeData, setTraineeData] = useState({
    height: "",
    weight: "",
    goals: "",
    foodAllergies: "",
    chronicDiseases: "",
    workoutPreferences: "outdoors",
  });

  const [coachData, setCoachData] = useState({
    yearsOfExperience: "",
    clientsLimit: "",
  });
  const [certData, setCertData] = useState({
    certTitle: "",
    certIssueDate: "",
    certDiscription: "",
  });

  return (
    <>
      {userType ? (
        ""
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <UserTypeForm setType={setUserType} type={userType} />
        </div>
      )}
      {curForm == 1 && (
        <Form1
          formData={form1Data}
          setFormData={setForm1Data}
          toNext={setCurForm}
        />
      )}

      {curForm == 2 &&
        (userType == "trainee" ? (
          <Form2Trainee
            formData={traineeData}
            setFormData={setTraineeData}
            setCurForm={setCurForm}
          />
        ) : (
          <Form2Coach
            formData={coachData}
            setFormData={setCoachData}
            setCurForm={setCurForm}
            certData={certData}
            setCertData={setCertData}
          />
        ))}
    </>
  );
}

export default SignUpForm;
