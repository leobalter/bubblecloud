import Bubblecloud from "./script.js";

const rangeScheme = ["#0b5cab", "#0d9dda", "#9a8f87", "#0b827c"];

const data = [
  {
  	key: "Dynamic Components",
    value: 45,
    region: "Selected",
  },
 	{
  	key: "Workspace API",
    value: 40,
    region: "Selected",
  },
  {
  	key: "Lightning Actions",
    value: 24,
    region: "Roadmap",
  },
  {
  	key: "PDF Export",
    value: 22,
    region: "Requested",
  },
  {
  	key: "List View Buttons",
    value: 21,
    region: "Requested",
  },
  {
  	key: "Utility Bar API",
    value: 27,
    region: "Roadmap",
  },
  {
  	key: "Dependency Injection",
    value: 24,
    region: "Roadmap",
  },
  {
  	key: "Lightning Out",
    value: 15,
    region: "Roadmap",
  },
  {
  	key: "Overrides",
    value: 10,
    region: "Requested",
  },
  {
  	key: "Toast",
    value: 30,
    region: "Selected"
  },
  {
  	key: "RefreshView API",
    value: 40,
    region: "Selected"
  },
];

for(let i=0; i<30; i++) {
	data.push({
  	key: "",
    value: Math.floor(Math.random() * 11),
    region: "Roadmap"
  });
}
for(let i=0; i<30; i++) {
	data.push({
  	key: "",
    value: Math.floor(Math.random() * 11),
    region: "Requested"
  });
}
for(let i=0; i<30; i++) {
	data.push({
  	key: "",
    value: Math.floor(Math.random() * 11),
    region: "Internal"
  });
}

document.querySelector("#bubblecloud").addEventListener("click", function() {
  Bubblecloud(data, rangeScheme);
}, { once: true });
