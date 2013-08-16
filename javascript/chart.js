function drawSupplierToFromGraph(names, switchesFrom, switchesTo) {
  // for (var i= 0; i< names.length; i++) {
  //   console.log(names[i] + " from: " + switchesFrom[i] + " to: " + switchesTo[i]);  }

  var labelArea = 160;

  var chart,
      width = 400,
      bar_height = 20,
      height = bar_height * (names.length);

  var rightOffset = width + labelArea;

  // box around everything
  var chart = d3.select($("#supplier-popularity")[0]) 
    .append('svg')
    .attr('class', 'chart')
    .attr('width', labelArea + width + width)
    .attr('height', height);
  
  var xFrom = d3.scale.linear()
     .domain([0, d3.max(switchesFrom)])
     .range([0, width]);

  var y = d3.scale.ordinal()
     .domain(names)
     .rangeBands([0, height]);

  chart.selectAll("rect.left")
    .data(switchesFrom)
    .enter().append("rect")
    .attr("x", function(pos) { return width - xFrom(pos); })
    .attr("y", function(d,z) {  return y(z); })
    .attr("class", "left")
    .attr("width", xFrom)
    .attr("height", y.rangeBand()); 

  chart.selectAll("text.leftscore")
    .data(switchesFrom)
    .enter().append("text")
    .attr("x", function(d) { return width - xFrom(d); })
    .attr("y", function(d,z){ return y(z) + y.rangeBand()/2; } )
    .attr("dx", "45")
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr('class', 'leftscore')
    .text(function(x) { if(x< 200) { return "" }; return x;});

  chart.selectAll("text.name")
    .data(names)
    .enter().append("text")
    .attr("x", (labelArea / 2) + width)
    .attr("y", function(d){ return y(d) + y.rangeBand()/2; } )
    .attr("dy", ".20em")
    .attr("text-anchor", "middle")
    .attr('class', 'name')
    .text(String);

  var xTo = d3.scale.linear()
     .domain([0, d3.max(switchesTo)])
     .range([0, width]);

  chart.selectAll("rect.right")
    .data(switchesTo)
    .enter().append("rect")
    .attr("x", rightOffset)
    .attr("y", function(d, z){ return y(z); } )
    .attr("class", "right")
    .attr("width", xTo)
    .attr("height", y.rangeBand()); 

  chart.selectAll("text.score")
    .data(switchesTo)
    .enter().append("text")
    .attr("x", function(d) { return xTo(d) +  rightOffset; })
    .attr("y", function(d,z){ return y(z) + y.rangeBand()/2; } )
    .attr("dx", -5)
    .attr("dy", ".36em")
    .attr("text-anchor", "end")
    .attr('class', 'score')
    .text(function(x) { if(x< 15) { return "" }; return x;});
};