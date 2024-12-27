document.addEventListener("DOMContentLoaded", () => {
  // Load students from localStorage and display them
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach((student, index) => display(student, index));
});

// Handle form submission
document.getElementById("EnteredData").addEventListener("submit", function (e) {
  e.preventDefault();

  const Name = document.getElementById("Name").value.trim();
  const Id = document.getElementById("Id").value.trim();
  const No = document.getElementById("No").value.trim();
  const Email = document.getElementById("Email").value.trim();

  if (!Name || !Id || !No || !Email) {
    alert("Please fill all the details!");
    return;
  }

  const student = { Name, Id, No, Email };
  let students = JSON.parse(localStorage.getItem("students")) || [];
  const editIndex = document.getElementById("editIndex").value;

  if (editIndex !== "") {
    // Update an existing student
    students[editIndex] = student;
    document.getElementById("editIndex").value = ""; // Clear edit index
    localStorage.setItem("students", JSON.stringify(students)); // Save the updated array
    refreshTable(); // Refresh the table
  } else {
    // Add a new student
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students)); // Save the new array
    display(student, students.length - 1); // Display the new student
  }

  document.getElementById("EnteredData").reset(); // Clear the form
});

// Function to display a student row
function display(student, index) {
  const body = document.getElementById("NewData");
  const newRow = document.createElement("tr");

  // Name column
  const nameCell = document.createElement("td");
  nameCell.textContent = student.Name;
  newRow.appendChild(nameCell);

  // ID column
  const idCell = document.createElement("td");
  idCell.textContent = student.Id;
  newRow.appendChild(idCell);

  // Contact No column
  const noCell = document.createElement("td");
  noCell.textContent = student.No;
  newRow.appendChild(noCell);

  // Email column
  const emailCell = document.createElement("td");
  emailCell.textContent = student.Email;
  newRow.appendChild(emailCell);

  // Delete button
  const deleteCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deletestudent(index));
  deleteCell.appendChild(deleteBtn);
  newRow.appendChild(deleteCell);

  // Edit button
  const editCell = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editFunction(index));
  editCell.appendChild(editBtn);
  newRow.appendChild(editCell);
   newRow.classList.add("forRows")
  body.appendChild(newRow);
}

// Function to delete a student
function deletestudent(index) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.splice(index, 1); // Remove the student at the given index
  localStorage.setItem("students", JSON.stringify(students));
  refreshTable(); // Refresh the table
}

// Function to refresh the table
function refreshTable() {
  const body = document.getElementById("NewData");
  body.innerHTML = ""; // Clear the existing table rows
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach(display); // Rebuild the table
}

// Function to edit a student
function editFunction(index) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const editData = students[index];

  document.getElementById("Name").value = editData.Name;
  document.getElementById("Id").value = editData.Id;
  document.getElementById("No").value = editData.No;
  document.getElementById("Email").value = editData.Email;
  document.getElementById("editIndex").value = index; // Set the hidden editIndex field
}
