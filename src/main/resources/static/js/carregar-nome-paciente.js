let username = sessionStorage.getItem("nome_usuario");

    if (!username) {
      try {
        const response = fetch("http://localhost:8080/usuarios", {
          credentials: "include" // important if you're using Spring Security cookies (JSESSIONID)
        });

        if (!response.ok) {
          throw new Error("Failed to fetch username");
        }

        username = response.text();

        // save in sessionStorage
        sessionStorage.setItem("username", username);
      } catch (err) {
        console.error("Error loading username:", err);
        username = "Guest";
      }
    }

    // show username in the page
    document.getElementById("usernameDisplay").textContent = "Olá " + username;
  
