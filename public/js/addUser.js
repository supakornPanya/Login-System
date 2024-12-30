const Base_url = "http://localhost:8000";
let cnt = 1;

function afterSubmit() {
  let Status = document.getElementById("Status");
  Status.innerHTML = "";
  let textStatus = document.createElement("div");
  textStatus.classList.add("text-xl", "items-center");
  textStatus.innerText = `clicked ${cnt}`;
  cnt += 1; 
  Status.appendChild(textStatus);
}

const AddUser = async () => {
  // Retrieve form values
  let firstname = document.querySelector("input[name=firstname]").value.trim();
  let lastname = document.querySelector("input[name=lastname]").value.trim();
  let age = document.querySelector("input[name=age]").value.trim();
  let genderInput = document.querySelector("input[name=gender]:checked");
  let description = document
    .querySelector("input[name=description]")
    .value.trim();

  afterSubmit();
  // Validate input values
  if (!firstname || !lastname || !age || !genderInput) {
    console.error("All required fields must be filled.");
    return;
  }

  let gender = genderInput.value;

  let userData = {
    firstname,
    lastname,
    age: parseInt(age),
    gender,
    description: description || null, // Allow null for optional field
  };

  try {
    const response = await axios.post(`${Base_url}/user`, userData);
    console.log("Response data:", response.data);
  } catch (error) {
    console.error("Error posting data:", error.response?.data || error.message);
  }

  console.log("User data sent:", userData);
};
