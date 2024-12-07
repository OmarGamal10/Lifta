import { useState } from "react";
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
    phoneNumber: "",
    bio: "",
    gender: "M",
    birthdate: "",
    type: "",
  });

  const [traineeData, setTraineeData] = useState({
    height: "",
    weight: "",
    goal: "",
    foodAllergies: "",
    workoutPreferences: "outdoors",
  });

  const [coachData, setCoachData] = useState({
    experienceYears: "",
    clientLimit: "",
  });
  const [certData, setCertData] = useState({
    title: "",
    dateIssued: "",
    description: "",
  });

  return (
    <>
      {userType ? (
        ""
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <UserTypeForm setType={setUserType} setFormData={setForm1Data} />
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
        (userType == "Trainee" ? (
          <Form2Trainee
            formData={form1Data}
            traineeData={traineeData}
            setTraineeData={setTraineeData}
            setCurForm={setCurForm}
          />
        ) : (
          <Form2Coach
            userData={form1Data}
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
