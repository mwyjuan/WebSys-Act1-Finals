function fetchSystemSpecs() {
  const userId = document.getElementById('userId').value;
  const messageDiv = document.getElementById('message');

  if (!userId) {
      messageDiv.innerText = "Please enter a valid User ID.";
      return;
  }

  const apiUrl = `https://mwyjuan.github.io/poy/data.json`;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', apiUrl, true);

  xhr.onload = function () {
      if (xhr.status === 200) {
          try {
              const data = JSON.parse(xhr.responseText);
              const user = data.find(item => item.id === parseInt(userId));

              if (user) {
                  messageDiv.innerHTML = `
                      <p><strong>Name:</strong> ${user.name}</p>
                      <p><strong>Email:</strong> ${user.email}</p>
                      <p><strong>Phone:</strong> ${user.phone}</p>
                      <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}</p>
                      <p><strong>Company:</strong> ${user.company.name} (${user.company.department} - ${user.company.position})</p>
                  `;
              } else {
                  messageDiv.innerText = "User not found!";
              }
          } catch (error) {
              messageDiv.innerText = "Error parsing server response.";
          }
      } else {
          messageDiv.innerText = `Error: Unable to fetch data (Status ${xhr.status}).`;
      }
  };

  xhr.onerror = function () {
      messageDiv.innerText = "Network error. Please try again.";
  };

  xhr.send();
}
