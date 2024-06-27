export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = req.queryString.page * 1 || 1;
    if (req.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 4;
    this.page = page;
    this.mongooseQuery.skip(skip).limit(4);
    return this;
  }

  filter() {
    let filterObj = { ...req.queryString };
    let executedQuery = ["page", "sort", "fields", "keywords"];
    executedQuery.forEach((q) => {
      delete filterObj[q];
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, (match) => `$${match}`);
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    if (req.queryString.sort) {
      let sortBy = req.queryString.sort.split(",").join(" ");
      // ["price", "-sold"]
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  search() {
    if (req.query.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: req.queryString.keyword, $options: "i" } },
          { description: { $regex: req.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (req.query.fields) {
      let fields = req.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
