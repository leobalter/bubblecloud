import { render as Bubblecloud, clear } from "./script.js";

const regions = {
  "Selected": "#0b5cab",
  "Requested": "#0d9dda",
  "Internal": "#9a8f87",
  "Roadmap": "#0b827c",
};

const selected = {
  "Dynamic Components": 90,
  "Workspace API": 80,
  "Toast": 60,
  "RefreshView API": 80,
};

const roadmap = {
  "Toast": 65,
  "Dynamic Components": 90,
  "Workspace API": 80,
  "Utility Bar API": 54,
  "RefreshView API": 80,
  "Url Addressable": 40,
};

const requested = {
  "Dynamic Components": 90,
  "Workspace API": 80,
  "PDF Export": 44,
  "List View Buttons": 42,
  "Overrides": 20,
  "Lightning Out": 30,
  "Dependency Injection": 48,
  "Lightning Actions": 48,
};

const internal = {

};

const stillAura = {
  "Capability Gaps": 100,
  "ROI": 66,
  "Tooling Gaps": 46,
  "Dev Console": 40,
  "Company/Team": 36,
  "Time constraints": 24,
  "Experience": 16,
  "Desktop": 12,
  "Complexity": 8,
  // "Other": 42, 
};

function fillUp(data, selections = [], max = 100) {
  selections.forEach(region => {
    for(let i=0; i<max; i++) {
      data.push({
        key: "",
        value: Math.floor(Math.random() * 11),
        region
      });
    }
  });
}

document.querySelector("#requested").addEventListener("click", function() {
  clear();
  const data = Object.entries(requested).map(([key, value]) => ({
      key,
      value,
      region: "Requested",
    }));
  fillUp(data, ["Requested"]);
  Bubblecloud(data, Object.keys(regions), Object.values(regions));
});

document.querySelector("#roadmap").addEventListener("click", function() {
  clear();
  const data = Object.entries(roadmap).map(([key, value]) => ({
      key,
      value,
      region: "Roadmap",
    }));
  fillUp(data, ["Roadmap"]);
  Bubblecloud(data, Object.keys(regions), Object.values(regions));
});

document.querySelector("#selected").addEventListener("click", function() {
  clear();
  const data = Object.entries(selected).map(([key, value]) => ({
      key,
      value,
      region: "Selected",
    }));
  Bubblecloud(data, Object.keys(regions), Object.values(regions));
});

document.querySelector("#all").addEventListener("click", function() {
  clear();
  const data = Object.entries(selected).map(([key, value]) => ({
    key,
    value,
    region: "Selected",
  }));
  Object.entries(roadmap).forEach(([key, value]) => {
    console.log(data);
    if (!data.map(d => d.key).includes(key)) {
      data.push({
        key,
        value,
        region: "Roadmap",
      });
    }
  });
  Object.entries(requested).forEach(([key, value]) => {
    if (!data.map(d => d.key).includes(key)) {
      data.push({
        key,
        value,
        region: "Requested",
      })
    }
  });
  fillUp(data, ["Requested", "Roadmap", "Internal"], 50);
  Bubblecloud(data, Object.keys(regions), Object.values(regions));
});

document.querySelector("#stillAura").addEventListener("click", function() {
  clear();
  const data = Object.entries(stillAura).map(([key, value]) => ({
    key,
    value,
    region: "Selected",
  }));
  fillUp(data, ["Requested"]);
  Bubblecloud(data, Object.keys(regions), Object.values(regions));
});

document.querySelector("#clear").addEventListener("click", function() {
  clear();
});

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

document.querySelector("#eeaao").addEventListener("click", function() {
  clear();
  const data = [];
  fillUp(data, ["Requested", "Roadmap", "Internal", "Selected"], 1000);
  shuffle(data);
  Bubblecloud(data, Object.keys(regions), Object.values(regions));
});
