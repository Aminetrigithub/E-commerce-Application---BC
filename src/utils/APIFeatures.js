export default class ApiFeatures {

  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 4;
    this.page = page;
    this.mongooseQuery.skip(skip).limit(4);
    return this;
  }

  filter() {
    let filterObj = { ...this.queryString }; // pourquoi spread operator, on met this.queryString
    let executedQuery = ["page", "sort", "fields", "keywords"]; 
    // console.log(filterObj,'..........')                 /*fil filterObj mouch nest7a99ou lel*/
    executedQuery.forEach((q) => {          /* lel page w sort, 3lech nefs5ou fihom mel query*/                   
      delete filterObj[q];     /* cet delete mnin jet */
      // console.log(filterObj)          
    });
    filterObj = JSON.stringify(filterObj);
    filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, (match) => `$${match}`);
    filterObj = JSON.parse(filterObj);
    this.mongooseQuery.find(filterObj);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(",").join(" ");  /* split and join */
      // ["price", "-sold"]
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      this.mongooseQuery.find({
        $or: [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ],
      });
    }
    return this;
  }

  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}
