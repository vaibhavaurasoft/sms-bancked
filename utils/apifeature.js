class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query; // User.find()
    this.queryStr = queryStr; //nama=""
  }

  search() {
    const schoolname = this.queryStr.schoolname
      ? {
          schoolname: {
            $regex: this.queryStr.schoolname,
            $options: "i",
          },
          role: {
            $regex: this.queryStr.role,
            $options: "i",
          },
          name: {
            $regex: this.queryStr.name,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...schoolname });
    return this;
  }



  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
