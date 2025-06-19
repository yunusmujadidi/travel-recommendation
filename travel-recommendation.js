document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resultsContainer = document.getElementById("results-container");

  const search = () => {
    const keyword = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";

    fetch("travel-recommendation.json")
      .then((response) => response.json())
      .then((data) => {
        let results = [];
        if (keyword.includes("beach")) {
          results = data.beaches;
        } else if (keyword.includes("temple")) {
          results = data.temples;
        } else if (keyword.includes("country")) {
          results = data.countries.flatMap((country) => country.cities);
        }

        if (results.length > 0) {
          displayResults(results);
        } else {
          resultsContainer.innerHTML = "<p>No results found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML =
          "<p>Error fetching data. Please try again.</p>";
      });
  };

  const displayResults = (results) => {
    results.forEach((result) => {
      const resultCard = document.createElement("div");
      resultCard.className =
        "bg-black bg-opacity-50 rounded-lg m-2 p-5 text-center w-96";

      const image = document.createElement("img");
      image.className = "w-full h-48 object-cover rounded";
      image.src = result.imageUrl;
      image.alt = result.name;

      const name = document.createElement("h3");
      name.className = "my-2 text-xl";
      name.textContent = result.name;

      const description = document.createElement("p");
      description.textContent = result.description;

      resultCard.appendChild(image);
      resultCard.appendChild(name);
      resultCard.appendChild(description);

      resultsContainer.appendChild(resultCard);
    });
  };

  const clearResults = () => {
    resultsContainer.innerHTML = "";
    searchInput.value = "";
  };

  searchBtn.addEventListener("click", search);
  clearBtn.addEventListener("click", clearResults);
});
