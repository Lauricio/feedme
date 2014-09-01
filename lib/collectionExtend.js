Meteor.Collection.prototype.searchByName = function(keyword, options){
    if(keyword){
      if(keyword.length >= 3){
        check(keyword, String);
        // console.log(keyword)
        mongoDbArr = [];
        mongoDbArr.push();
        mongoDbArr.push({thaiName: { $regex : keyword, $options:"i" } });
        mongoDbArr.push({englishName: { $regex : keyword, $options:"i" } });
        if (options) {
          return this.find({$and: [{ $or: mongoDbArr}, options]});
        } else {
          return this.find({ $or: mongoDbArr});
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
}
