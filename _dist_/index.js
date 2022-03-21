const URL = "https://platzi-avo.vercel.app/api/avo";
const container = document.querySelector("div.container");

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const fetchData = async (URL) => {
    return await new Promise(
        (resolve, reject) => {
            window.fetch(URL)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(error => reject(new Error(error)));
        }
    );
}

fetchData(URL)
    .then(response => {
        response.data.forEach(avo => {
            const img = document.createElement("img");
            img.src = `https://platzi-avo.vercel.app/${avo.image}`;
            const title = document.createElement("h1");
            title.textContent = avo.name;
            const price = document.createElement("p")
            price.textContent = formatPrice(avo.price);
            price.className = "text-2xl font-bold";
            const hr = document.createElement("hr");
            hr.style = "border: 2.5px solid #eaeaea; width: 100%;";
            const arr = [img,hr ,title, price];
            const div = document.createElement("div");
            container.appendChild(div);
            div.append(...arr);
        });
    })
    .catch(error => console.log(error));