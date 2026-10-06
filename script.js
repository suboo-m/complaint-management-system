// =========================================
//       COMPLAINT MANAGEMENT SYSTEM
// =========================================


// =========================================
//       FIND HTML ELEMENTS
// =========================================

// Find the complaint form
const complaintForm =
    document.getElementById("complaintForm");

// Find the name input
const nameInput =
    document.getElementById("name");

// Find the complaint input
const complaintInput =
    document.getElementById("complaint");

// Find the date input
const dateInput =
    document.getElementById("date");

// Find the complaint list
const complaintList =
    document.getElementById("complaintList");


// =========================================
//       LOAD SAVED COMPLAINTS
// =========================================

// Get saved complaints from localStorage
let complaints =
    JSON.parse(localStorage.getItem("complaints")) || [];


// Display complaints when page opens
displayComplaints();


// =========================================
//       SUBMIT COMPLAINT
// =========================================

complaintForm.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();


    // Get information entered by user
    const name = nameInput.value.trim();

    const complaint =
        complaintInput.value.trim();

    const date =
        dateInput.value;


    // Check if all fields are filled
    if (
        name === "" ||
        complaint === "" ||
        date === ""
    ) {

        alert("Please fill in all the fields.");

        return;
    }


    // Create new complaint
    const newComplaint = {

        name: name,

        complaint: complaint,

        date: date

    };


    // Add complaint to array
    complaints.push(newComplaint);


    // Save complaints
    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );


    // Update complaint display
    displayComplaints();


    // Show success message
    alert("Complaint submitted successfully!");


    // Clear form
    complaintForm.reset();

});


// =========================================
//       DISPLAY COMPLAINTS
// =========================================

function displayComplaints() {

    // Clear current list
    complaintList.innerHTML = "";


    // Check if there are no complaints
    if (complaints.length === 0) {

        complaintList.innerHTML =
            "<p>No complaints submitted yet.</p>";

        return;
    }


    // Display every complaint
    complaints.forEach(function(item, index) {

        // Create complaint card
        const complaintCard =
            document.createElement("div");


        // Add CSS class
        complaintCard.classList.add(
            "complaint-card"
        );


        // Add complaint information
        complaintCard.innerHTML = `

            <h3>
                Complaint #${index + 1}
            </h3>

            <p>
                <strong>Name:</strong>
                ${item.name}
            </p>

            <p>
                <strong>Complaint:</strong>
                ${item.complaint}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

        `;


        // Add card to webpage
        complaintList.appendChild(
            complaintCard
        );

    });

}


// =========================================
//          ADMIN SECTION
// =========================================


// Find admin login form
const adminForm =
    document.getElementById("adminForm");

// Find admin password
const adminPassword =
    document.getElementById("adminPassword");

// Find admin login section
const adminLogin =
    document.getElementById("adminLogin");

// Find admin dashboard
const adminDashboard =
    document.getElementById("adminDashboard");

// Find total complaints number
const totalComplaints =
    document.getElementById("totalComplaints");

// Find logout button
const logoutButton =
    document.getElementById("logoutButton");


// Admin password
const ADMIN_PASSWORD = "admin123";


// =========================================
//          ADMIN LOGIN
// =========================================

adminForm.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();


    // Get entered password
    const password =
        adminPassword.value;


    // Check password
    if (password === ADMIN_PASSWORD) {

        // Hide admin login
        adminLogin.style.display = "none";


        // Show dashboard
        adminDashboard.style.display = "block";


        // Show total complaints
        totalComplaints.textContent =
            complaints.length;


        // Display complaints in dashboard
        displayAdminComplaints();


        // Clear password
        adminPassword.value = "";


        alert("Admin login successful!");

    } else {

        alert("Incorrect admin password.");

    }

});


// =========================================
//       DISPLAY ADMIN COMPLAINTS
// =========================================

function displayAdminComplaints() {

    // Find admin complaint area
    const adminComplaintList =
        document.getElementById(
            "adminComplaintList"
        );


    // Clear old complaints
    adminComplaintList.innerHTML = "";


    // Check if there are no complaints
    if (complaints.length === 0) {

        adminComplaintList.innerHTML =
            "<p>No complaints submitted yet.</p>";

        return;
    }


    // Go through every complaint
    complaints.forEach(function(item, index) {

        // Create complaint box
        const complaint =
            document.createElement("div");


        // Add CSS class
        complaint.classList.add(
            "admin-complaint"
        );


        // Add complaint information
        complaint.innerHTML = `

            <h3>
                Complaint #${index + 1}
            </h3>

            <p>
                <strong>Name:</strong>
                ${item.name}
            </p>

            <p>
                <strong>Complaint:</strong>
                ${item.complaint}
            </p>

            <p>
                <strong>Date:</strong>
                ${item.date}
            </p>

            <button
                onclick="adminDeleteComplaint(${index})">

                Delete Complaint

            </button>

        `;


        // Add complaint to dashboard
        adminComplaintList.appendChild(
            complaint
        );

    });

}


// =========================================
//       ADMIN DELETE COMPLAINT
// =========================================

function adminDeleteComplaint(index) {

    // Ask for confirmation
    const confirmDelete = confirm(
        "Are you sure you want to delete this complaint?"
    );


    // Stop if Cancel is selected
    if (!confirmDelete) {

        return;
    }


    // Remove complaint
    complaints.splice(index, 1);


    // Save updated complaints
    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );


    // Update normal complaint list
    displayComplaints();


    // Update admin complaint list
    displayAdminComplaints();


    // Update total number
    totalComplaints.textContent =
        complaints.length;

}


// =========================================
//             ADMIN LOGOUT
// =========================================

logoutButton.addEventListener("click", function() {

    // Hide dashboard
    adminDashboard.style.display = "none";


    // Show admin login
    adminLogin.style.display = "block";


    alert("Admin logged out.");

});