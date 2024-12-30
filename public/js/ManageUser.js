const Base_url = "http://localhost:8000";

window.onload = async () => {
  await loadData();
};

function FunctionlistUsers(userData) {
  const listUsers = document.getElementById("listUsers");
  listUsers.innerHTML = "";
  for (let i = 0; i < userData.length; i++) {
    const user = document.createElement("div");
    user.innerHTML = `
    <div class="card bg-neutral text-neutral-content w-full my-5 p-2">
        <div class="card-body items-center text-center p-3">
            <div class="text-white text-lg">
                ID : ${userData[i].id}
                , Fist name : ${userData[i].firstname}
                , Last name : ${userData[i].lastname}
                , age : ${userData[i].age}
                <br>
                description : ${userData[i].description}
            </div>
            <div class="card-actions">
                <a href="editUser.html?id=${userData[i].id}">
                    <button class="edit-btn btn bg-green-300 text-lg" data-id="${userData[i].id}">Edit</button>
                </a>
                <button class="delete-btn btn bg-red-300 text-lg" data-id="${userData[i].id}">Delete</button>
            </div>
        </div>
    </div>
    `;
    listUsers.appendChild(user);
  }
}

const loadData = async () => {
  try {
    const response = await axios.get(`${Base_url}/users`);
    console.log(response.data);
    FunctionlistUsers(response.data);
    deleteBtn();
  } catch (error) {
    console.log("Error get data : ", error.message);
  }
};

function deleteBtn() {
  const deleteUser = document.querySelectorAll(".delete-btn");
  deleteUser.forEach((button) => {
    button.addEventListener("click", async () => {
      try {
        console.log("click delete button");
        const userID = event.target.dataset.id;
        await axios.delete(`${Base_url}/user/${userID}`);
        loadData();
      } catch (error) {
        console.log("Error delete data : ", error.message);
      }
    });
  });
}
