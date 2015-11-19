var massageData = function (bookmarks) {
  var allUniqueTags = _.chain(bookmarks).pluck('tags').flatten().uniq().value();

  var arrRoot = [];
  var id = 0;

  for (var i = 0; i < allUniqueTags.length; i++) {
    var siteArr = [];
    var tagname = allUniqueTags[i];
    var siteCount = 0;

    for (var j = 0; j < bookmarks.length; j++) {
      if (bookmarks[j].tags.indexOf(tagname) > -1) {
        var siteObj = {};
        siteObj['name'] = bookmarks[j].site;
        siteObj['size'] = bookmarks.length * 1000;

        siteArr.push(siteObj);
        siteCount++;
      }
    }

    var tagObj = {};
    //tagObj['id'] = ++id;
    tagObj['name'] = tagname;
    tagObj['children'] = siteArr;
    tagObj['size'] = siteCount * 20000;

    arrRoot.push(tagObj);
  }

  var retObj = {};
  //retObj['id'] = ++id;
  retObj['name'] = 'root';
  retObj['children'] = arrRoot;

  //console.log({'root'});

  buildGraph(retObj);
};

var buildGraph = function (data) {
  var width = $(document).width(),
    height = $(document).height(),
    root;

  var force = d3.layout.force()
    .size([width, height])
    .on("tick", tick)
    .charge(-400)
    .linkDistance(200);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

  //d3.json(data, function (error, json) {
  //  if (error) throw error;
  //
  //  root = json;
  //  update();
  //});

  update();

  function update() {
    var nodes = flatten(data),
      links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
      .nodes(nodes)
      .links(links)
      //.gravity(-0.1)
      //.charge(this.charge)
      //.friction(1.5)
      .start();

    // Update the links…
    link = link.data(links, function (d) {
      return d.target.id;
    });

    // Exit any old links.
    link.exit().remove();

    // Enter any new links.
    link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    // Update the nodes…
    node = node.data(nodes, function (d) {
      return d.id;
    }).style("fill", color);

    // Exit any old nodes.
    node.exit().remove();

    // Enter any new nodes.
    node.enter()
      .append("circle")
        .attr("class", "node")
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        })
        .attr("r", function (d) {
          return Math.sqrt(d.size) / 10 || 4.5;
        })
        .style("fill", color)
        .on("click", click)
        .call(force.drag);

    //node.enter()
    //  .append("text")
    //    .attr("class", "text")
    //    .attr("x", function (d) {
    //      return d.x;
    //    })
    //    .attr("y", function (d) {
    //      return d.y;
    //    })
    //    .text(function (d) {
    //      return d.name
    //    });
  }

  function tick() {
    link.attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    node.attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });
  }

// Color leaf nodes orange, and packages white or blue.
  function color(d) {
    return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
  }

// Toggle children on click.
  function click(d) {
    if (!d3.event.defaultPrevented) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update();
    }
  }

  // Returns a list of all nodes under the root.
  function flatten(root) {
    var nodes = [], i = 0;

    function recurse(node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }
};