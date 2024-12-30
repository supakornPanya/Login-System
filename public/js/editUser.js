const Base_url = "http://localhost:8000";
let id;

window.onload = async () => {
  await loadData();
};

const loadData = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");
    let userData = await axios.get(`${Base_url}/user/${id}`);
    userData = userData.data;
    console.log(userData)
    //set value
    let firstname = document.querySelector("input[name=firstname]");
    firstname.value = userData.firstname;

    let lastname = document.querySelector("input[name=lastname]");
    lastname.value = userData.lastname;
    
    let age = document.querySelector("input[name=age]");
    age.value = userData.age;
    
    let genderInputs = document.querySelectorAll("input[name=gender]");
    for (let i = 0; i < genderInputs.length; i++) {
      if (genderInputs[i].value == userData.gender) {
        genderInputs[i].checked = true;
      }
    }


    let description = document.querySelector("input[name=description]");
    description.value = userData.description;    
    console.log("can get user")
  } catch (error) {
    console.log("Eror get user, eror message : ", error.message);
  }
};

let cnt = 0;
function afterSubmit() {
  let Status = document.getElementById("Status");
  Status.innerHTML = "";
  let textStatus = document.createElement("div");
  textStatus.classList.add("text-xl", "items-center");
  textStatus.innerText = `update User ${cnt}`;
  cnt += 1;
  Status.appendChild(textStatus);
}

const EditUser = async () => {
  try {
    // get value update
    let firstname = document
      .querySelector("input[name=firstname]")
      .value.trim();
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

    let data = {
      firstname,
      lastname,
      age: parseInt(age),
      gender,
      description: description
    };

    //update user
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get("id");   
    console.log(data)
    console.log(`updae at id ${id}`)
    const response = await axios.put(`${Base_url}/user/${id}`, data);
    //set value
    console.log("update successfully!!!");
    console.log(response.data);
    // loadData();
  } catch (error) {
    console.log("Eror put user : ", error.message);
  }
};
