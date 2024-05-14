console.log("JAVASCRIPT LOADED!!!");
const currentParts = {
  name: "",
  cpu: "",
  "cpu-cooler": "",
  motherboard: "",
  gpu: "",
  ram: "",
  storage: "",
  psu: "",
  case: "",
  "total-price": "",
};
const getData = async (id) => {
  const res = await fetch(`../../../data/${id}.json`);
  const data = await res.json();
  // console.log("INSIDE ASYNC GET DATA", data);
  return data;
};



function updatePriceTotal() {
  const totalPriceEl = document.getElementById("total-price");
  let totalPrice = 0;
  let prices = document.getElementsByClassName("component-price");
  for (let i = 0; i < prices.length; i++) {
    console.log(prices[i].innerText.slice(1));
    totalPrice += parseFloat(prices[i].innerText.slice(1));
  }
  totalPriceEl.innerText = `$${totalPrice.toFixed(2)} + KDV`;
  currentParts["total-price"] = totalPrice.toFixed(2);
}
const contentWrapper = document.getElementById("content-wrapper");

function makeCard(data) {
  // check for previous card and clear for new card
  if (document.getElementById("products-wrapper")) {
    document.getElementById("products-wrapper").outerHTML = "";
  }
  //make card
  const newCard = document.createElement("div");
  newCard.id = "products-wrapper";
  const cardHeader = document.createElement("div");
  cardHeader.id = "products-header";
  const cardTitle = document.createElement("h4");
  cardTitle.innerText = data.title;
  const closeButton = document.createElement("button");
  closeButton.innerText = "x";
  closeButton.addEventListener("click", () => {
    newCard.outerHTML = "";
  });
  cardHeader.append(cardTitle);
  cardHeader.append(closeButton);
  newCard.append(cardHeader);

  const productsList = document.createElement("div");
  productsList.id = "products-list";
  // load options and append to newCard
  for (let i = 0; i < data.products.length; i++) {
    // console.log(data.products[i]);
    const productWrapper = document.createElement("div");
    productWrapper.classList += "product";
    const productTitle = document.createElement("p");
    const productImage = document.createElement("img");
    productImage.classList += "productImage";
    productImage.src = `../../../assets/${data.products[i].img}.jpg`;
    const productPrice = document.createElement("p");
    productPrice.classList += "productPrice";
    productPrice.innerText = `$${data.products[i].price}`;
    if (data.title == "CPU") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].name}`;
    }
    if (data.title == "CPU Cooler") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].name}`;
    }
    if (data.title == "Motherboard") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].series} ${data.products[i].name} ${data.products[i].socket}`;
    }
    if (data.title == "GPU") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].chipset} ${data.products[i].memory} ${data.products[i].name}`;
    }
    if (data.title == "PSU") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i].wattage}W ${data.products[i].rating}`;
    }
    if (data.title == "RAM") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i]["memory-config"]} ${data.products[i].type}-${data.products[i].speed}`;
    }
    if (data.title == "Storage") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i].size} ${data.products[i].type}`;
    }
    if (data.title == "Case") {
      productTitle.innerText = `${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i].type}`;
    }

    productWrapper.append(productTitle);
    productWrapper.append(productImage);
    productWrapper.append(productPrice);
    productWrapper.addEventListener("click", () => {
      //set selection on list
      let selectionWrapper = document.getElementById(
        `picker-${data.title.toLowerCase()}`
      );
      if (data.title == "CPU") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].name}`;
        currentParts.cpu = data.products[i];
      }
      if (data.title == "GPU") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].chipset} ${data.products[i].memory} ${data.products[i].name}`;
        currentParts.gpu = data.products[i];
      }
      if (data.title == "CPU Cooler") {
        selectionWrapper = document.getElementById("picker-cpu-cooler");
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].name}`;
        currentParts["cpu-cooler"] = data.products[i];
      }
      if (data.title == "Motherboard") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].series} ${data.products[i].name} ${data.products[i].socket}`;
        currentParts.motherboard = data.products[i];
      }
      if (data.title == "PSU") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i].wattage}W ${data.products[i].rating}`;
        currentParts.psu = data.products[i];
      }
      if (data.title == "RAM") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i]["memory-config"]} ${data.products[i].type}-${data.products[i].speed}`;
        currentParts.ram = data.products[i];
      }
      if (data.title == "Storage") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i].size} ${data.products[i].type}`;
        currentParts.storage = data.products[i];
      }
      if (data.title == "Case") {
        selectionWrapper.innerHTML = `<img class="productImage" src="../../../assets/${data.products[i].img}.jpg">${data.products[i].manufacturer} ${data.products[i].name} ${data.products[i].type}`;
        currentParts.case = data.products[i];
      }
      //set price on list
      let priceWrapper = document.getElementById(
        `${data.title.toLowerCase()}-price`
      );
      if (data.title == "CPU Cooler") {
        priceWrapper = document.getElementById(`cpu-cooler-price`);
      }
      priceWrapper.innerText = `$${data.products[i].price}`;
      // remove list of products after user selects an option
      if (document.getElementById("products-wrapper")) {
        document.getElementById("products-wrapper").outerHTML = "";
      }

      updatePriceTotal();
      console.log("Parts", currentParts);
    });
    //part compatibility check
    if (currentParts.cpu !== "" && data.title != "CPU") {
      if (data.title == "CPU Cooler") {
        console.log("checking cpu cooler");
        for (let j = 0; j < data.products[i].socket.length; j++) {
          console.log("SOCKET", data.products[i].socket[j]);
          if (!data.products[i].socket.includes(currentParts.cpu.socket))
            productWrapper.classList += " hidden";
        }
      }
      if (
        data.title == "Motherboard" &&
        data.products[i].socket !== currentParts.cpu.socket
      ) {
        console.log(
          "NOT COMPATIBLE",
          data.products[i].name,
          data.products[i].socket
        );
        productWrapper.classList += " hidden";
      }
    }
    productsList.append(productWrapper);
  }
  newCard.append(productsList);
  //testing
  contentWrapper.append(newCard);
  // contentWrapper.append(newCard);
  console.log("JSON:", data);
}
const cpuData = await getData("cpu");
const cpuCoolerData = await getData("cpu-cooler");
const motherboardData = await getData("motherboards");
const gpuData = await getData("gpu");
const psuData = await getData("psu");
const ramData = await getData("ram");
const storageData = await getData("storage");
const caseData = await getData("case");

const cpuButton = document.getElementById("picker-cpu");
const cpuCoolerButton = document.getElementById("picker-cpu-cooler");
const motherboardButton = document.getElementById("picker-motherboard");
const gpuButton = document.getElementById("picker-gpu");
const psuButton = document.getElementById("picker-psu");
const ramButton = document.getElementById("picker-ram");
const storageButton = document.getElementById("picker-storage");
const caseButton = document.getElementById("picker-case");

cpuButton.addEventListener("click", () => {
  makeCard(cpuData);
});

cpuCoolerButton.addEventListener("click", () => {
  makeCard(cpuCoolerData);
});

motherboardButton.addEventListener("click", () => {
  makeCard(motherboardData);
});

gpuButton.addEventListener("click", () => {
  makeCard(gpuData);
});

psuButton.addEventListener("click", () => {
  makeCard(psuData);
});

ramButton.addEventListener("click", () => {
  makeCard(ramData);
});

storageButton.addEventListener("click", () => {
  makeCard(storageData);
});

caseButton.addEventListener("click", () => {
  makeCard(caseData);
});

const saveListButton = document.getElementById("save-button");
const clearListsButton = document.getElementById("clear-button");
const delLists = document.getElementById("delete-lists");
const savedLists = document.getElementById("saved-lists");
function setList(partList) {
  const listName = document.getElementById("list-name");
  if (listName.value == "") {
    listName.value = "Unnamed List";
  }
  console.log("LIST NAME", listName.value);
  partList.name = listName.value;
  window.localStorage.setItem(listName.value, JSON.stringify(partList));
  console.log(JSON.parse(window.localStorage.getItem(listName.value)));
}
// add saved lists to select elements
function loadLists() {
  if (delLists.innerHTML !== "") {
    delLists.innerHTML = `<option value="" disabled selected hidden id="delete-placeholder">Delete a List</option>`;
  }
  if (savedLists.innerHTML !== "") {
    savedLists.innerHTML = `<option value="" disabled selected hidden id="delete-placeholder">Pick a List</option>`;
  }
  for (let i = 0; i < localStorage.length; i++) {
    // check if localStorage item has motherboard to validate item as a part list
    if (localStorage.getItem(localStorage.key(i)).includes("motherboard")) {
      console.log(
        "List Name: ",
        JSON.parse(localStorage.getItem(localStorage.key(i))).name,
        JSON.parse(localStorage.getItem(localStorage.key(i)))
      );
      const listName = document.createElement("option");
      listName.innerText = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      ).name;
      const delListName = document.createElement("option");
      delListName.innerText = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      ).name;
      savedLists.append(listName);
      delLists.append(delListName);
    }
  }
}
savedLists.addEventListener("change", (e) => {
  console.log(JSON.parse(localStorage.getItem(e.target.value)));
  const pickedPartList = JSON.parse(localStorage.getItem(e.target.value));

  document.getElementById("list-name").value = pickedPartList.name;
  currentParts.cpu = pickedPartList.name;

  if (pickedPartList.cpu != "") {
    document.getElementById(
      "picker-cpu"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.cpu.img}.jpg">${pickedPartList.cpu.manufacturer} ${pickedPartList.cpu.name}`;
    document.getElementById(
      "cpu-price"
    ).innerText = `$${pickedPartList.cpu.price}`;
    currentParts.cpu = pickedPartList.cpu;
  }
  if (pickedPartList.cpu === "") {
    document.getElementById("picker-cpu").innerHTML = `+ Choose A CPU`;
    document.getElementById("cpu-price").innerText = `$0.00`;
    currentParts.cpu = pickedPartList.cpu;
  }

  if (pickedPartList["cpu-cooler"] != "") {
    document.getElementById(
      "picker-cpu-cooler"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList["cpu-cooler"].img}.jpg">${pickedPartList["cpu-cooler"].manufacturer} ${pickedPartList["cpu-cooler"].name}`;
    document.getElementById(
      "cpu-cooler-price"
    ).innerText = `$${pickedPartList["cpu-cooler"].price}`;
    currentParts["cpu-cooler"] = pickedPartList["cpu-cooler"];
  }
  if (pickedPartList["cpu-cooler"] === "") {
    document.getElementById(
      "picker-cpu-cooler"
    ).innerHTML = `+ Choose A CPU Cooler`;
    document.getElementById("cpu-cooler-price").innerText = `$0.00`;
    currentParts["cpu-cooler"] = pickedPartList["cpu-cooler"];
  }

  if (pickedPartList.gpu != "") {
    document.getElementById(
      "picker-gpu"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.gpu.img}.jpg">${pickedPartList.gpu.manufacturer} ${pickedPartList.gpu.chipset} ${pickedPartList.gpu.memory} ${pickedPartList.gpu.name}`;
    document.getElementById(
      "gpu-price"
    ).innerText = `$${pickedPartList.gpu.price}`;
    currentParts.gpu = pickedPartList.gpu;
  }
  if (pickedPartList.gpu === "") {
    document.getElementById("picker-gpu").innerHTML = `+ Choose A Video Card`;
    document.getElementById("gpu-price").innerText = `$0.00`;
    currentParts.gpu = pickedPartList.gpu;
  }

  if (pickedPartList.motherboard != "") {
    document.getElementById(
      "picker-motherboard"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.motherboard.img}.jpg">${pickedPartList.motherboard.manufacturer} ${pickedPartList.motherboard.series} ${pickedPartList.motherboard.name} ${pickedPartList.motherboard.socket}`;
    document.getElementById(
      "motherboard-price"
    ).innerText = `$${pickedPartList.motherboard.price}`;
    currentParts.motherboard = pickedPartList.motherboard;
  }
  if (pickedPartList.motherboard === "") {
    document.getElementById(
      "picker-motherboard"
    ).innerHTML = `+ Choose A Motherboard`;
    document.getElementById("motherboard-price").innerText = `$0.00`;
    currentParts.motherboard = pickedPartList.motherboard;
  }

  if (pickedPartList.ram != "") {
    document.getElementById(
      "picker-ram"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.ram.img}.jpg">${pickedPartList.ram.manufacturer} ${pickedPartList.ram.name} ${pickedPartList.ram["memory-config"]} ${pickedPartList.ram.type}-${pickedPartList.ram.speed}`;
    document.getElementById(
      "ram-price"
    ).innerText = `$${pickedPartList.ram.price}`;
    currentParts.ram = pickedPartList.ram;
  }
  if (pickedPartList.ram === "") {
    document.getElementById("picker-ram").innerHTML = `+ Choose A Memory Kit`;
    document.getElementById("ram-price").innerText = `$0.00`;
    currentParts.ram = pickedPartList.ram;
  }

  if (pickedPartList.storage != "") {
    document.getElementById(
      "picker-storage"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.storage.img}.jpg">${pickedPartList.storage.manufacturer} ${pickedPartList.storage.name} ${pickedPartList.storage.size} ${pickedPartList.storage.type}`;
    document.getElementById(
      "storage-price"
    ).innerText = `$${pickedPartList.storage.price}`;
    currentParts.storage = pickedPartList.storage;
  }
  if (pickedPartList.storage === "") {
    document.getElementById(
      "picker-storage"
    ).innerHTML = `+ Choose A Storage Device`;
    document.getElementById("storage-price").innerText = `$0.00`;
    currentParts.storage = pickedPartList.storage;
  }

  if (pickedPartList.case != "") {
    document.getElementById(
      "picker-case"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.case.img}.jpg">${pickedPartList.case.manufacturer} ${pickedPartList.case.name} ${pickedPartList.case.type}`;
    document.getElementById(
      "case-price"
    ).innerText = `$${pickedPartList.case.price}`;
    currentParts.case = pickedPartList.case;
  }
  if (pickedPartList.case === "") {
    document.getElementById("picker-case").innerHTML = `+ Choose A Case`;
    document.getElementById("case-price").innerText = `$0.00`;
    currentParts.case = pickedPartList.case;
  }

  if (pickedPartList.psu != "") {
    document.getElementById(
      "picker-psu"
    ).innerHTML = `<img class="productImage" src="../../../assets/${pickedPartList.psu.img}.jpg">${pickedPartList.psu.manufacturer} ${pickedPartList.psu.name} ${pickedPartList.psu.wattage}W ${pickedPartList.psu.rating}`;
    document.getElementById(
      "psu-price"
    ).innerText = `$${pickedPartList.psu.price}`;
    currentParts.psu = pickedPartList.psu;
  }
  if (pickedPartList.psu === "") {
    document.getElementById("picker-psu").innerHTML = `+ Choose A Power Supply`;
    document.getElementById("psu-price").innerText = `$0.00`;
    currentParts.psu = pickedPartList.psu;
  }

  console.log("CURRENT PARTS AFTER LOAD", currentParts);

  updatePriceTotal();
  loadLists();
});

saveListButton.addEventListener("click", () => {
  console.log("-----Saved List-----");
  console.log(`Name: ${currentParts.name}`);
  console.log(`CPU: ${currentParts.cpu}`);
  console.log(`CPU Cooler: ${currentParts["cpu-cooler"]}`);
  console.log(`Motherboard: ${currentParts.motherboard}`);
  console.log(`GPU: ${currentParts.gpu}`);
  console.log(`Memory: ${currentParts.ram}`);
  console.log(`Storage: ${currentParts.storage}`);
  console.log(`Power Supply: ${currentParts.psu}`);
  console.log(`Case: ${currentParts.case}`);
  console.log("-----Saved List-----");
  setList(currentParts);
  loadLists();
});
delLists.addEventListener("change", (e) => {
  localStorage.removeItem(e.target.value);
  loadLists();
});
clearListsButton.addEventListener("click", () => {
  localStorage.clear();
  loadLists();
});
loadLists();

