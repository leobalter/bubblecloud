// set the dimensions and margins of the graph
const width = 1920
const height = 1080

// append the svg object to the body of the page
const svg = d3.select("#bubblecloud")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("border", "1px solid black");

// Read data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/11_SevCatOneNumNestedOneObsPerGroup.csv").then( function(data) {

export default function (data, rangeScheme = d3.schemeSet1) {
  
  // Color palette for regions?
  const color = d3.scaleOrdinal()
    .domain(["Selected", "Requested", "Internal", "Roadmap"])
    .range(rangeScheme); // ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999']

  const size = d3.scaleLinear()
    .domain([0, 100])
    .range([10,350])  // circle will be between 7 and 255 px wide

  // create a tooltip
  const Tooltip = d3.select("#bubblecloud")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  const mouseover = function(event, d) {
    Tooltip
      .style("opacity", 1)
  }
  const mousemove = function(event, d) {
    Tooltip
      .html('<u>' + d.key + '</u>' + "<br>" + d.value + "%")
      .style("left", (event.x/2+20) + "px")
      .style("top", (event.y/2-30) + "px")
  }
  var mouseleave = function(event, d) {
    Tooltip
      .style("opacity", 0)
  }

  // Initialize the circle: all located at the center of the svg area
  var foo = svg
    .selectAll("circle")
    .data(data)
    .join("g")
    // .on("mouseover", mouseover) // What to do when hovered
    // .on("mousemove", mousemove)
    // .on("mouseleave", mouseleave)
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
      .attr("stroke", "black")
      .style("stroke-width", 1)

  var textNode = foo.append("text")
    .attr("x", x)
    .attr("y", y)
    .text(function(d){return d.key})
    .attr("text-anchor", "middle")
    .attr("font-size", d => size(d.value / 12))
    .attr("font-family", "sans-serif")
    .attr("font-weight", 700)
    .attr("fill", "#fff")
  
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
            .attr("y", d => d.y)

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
