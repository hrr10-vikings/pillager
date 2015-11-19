var getTagFrequencies = function(bookmarks) {
  var tags = {};
  var temp = _.pluck(bookmarks, "tags");
  var allTags = _.flatten(temp);
  for (var i = 0; i < allTags.length; i++) {
    tags[allTags[i]] = tags.hasOwnProperty(allTags[i]) ? tags[allTags[i]] + 1 : 1;
  }
  return tags;
}