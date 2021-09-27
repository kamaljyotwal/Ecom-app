class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyw = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyw });
    return this;
  }

  filter() {
    const newStr = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];

    removeFields.forEach((i) => delete newStr[i]);
    let stringnew = JSON.stringify(newStr);
    let stringSec = stringnew.replace(/(gt|gte|lt|lte)/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(stringSec));
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
