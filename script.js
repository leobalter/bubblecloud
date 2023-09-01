// set the dimensions and margins of the graph
const width = 1920;
const height = 1080;

export function clear() {
  d3.select("#bubblecloud").selectAll("svg").remove();
  d3.select("#bubblecloud").selectAll("div").remove();
}

export function render(data, domainScheme = [], rangeScheme = d3.schemeSet1) {
  // append the svg object to the body of the page
  const svg = d3.select("#bubblecloud")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");

  // Color palette for regions?
  const color = d3.scaleOrdinal()
    .domain(domainScheme)
    .range(rangeScheme); // ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']

  const size = d3.scaleLinear()
    .domain([0, 100])
    .range([7,200])  // circle will be between 7 and 255 px wide

  // Initialize the circle: all located at the center of the svg area
  var foo = svg
    .selectAll("circle")
    .data(data)
    .join("g")
    .call(d3.drag() // call specific function when circle is dragged
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("class", "node")
    .attr("transform", "translate(0, 0)");

  let x = width / 2;
  let y = height / 2;

  var node = foo.append("circle")
      .attr("r", d => size(d.value))
      .attr("cx", x)
      .attr("cy", y)
      .style("fill", d => color(d.region))
      .style("fill-opacity", 0.8)
      // .attr("stroke", "black")
      // .style("stroke-width", 1)

  var textNode = foo.append("text")
    .attr("x", x)
    .attr("y", y)
    .text(function(d){return d.key})
    .attr("text-anchor", "middle")
    .attr("font-size", d => size(d.value / 8))
    .attr("font-family", "sans-serif")
    .attr("font-weight", 700)
    .attr("fill", "#fff")
    .style("margin-top", "10px");
  
  // Features of the forces applied to the nodes:
  const simulation = d3.forceSimulation()
      .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.value)+3) }).iterations(1)) // Force that avoids circle overlapping

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y)
        textNode
            .attr("x", d => d.x)
            .attr("y", d => d.y + (Math.floor(textNode.attr("font-size") / 4)))
      });

  // What happens when a circle is dragged?
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(.03);
    d.fx = null;
    d.fy = null;
  }
}
