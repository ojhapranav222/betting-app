class ApiFeatures{
    constructor(data, queryStr){
        this.data = data;
        this.queryStr = queryStr;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
    
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(field => delete queryCopy[field]);

        if (queryCopy.status && ["Active", "Inactive", "Suspended", "Scheduled", "Cancelled", "New", "Resolved", "Inprogress", "Closed"].includes(queryCopy.status)) {
            this.data = this.data.filter(user => user.status === queryCopy.status);
        }

    
        return this;
    }   

    pagination(resultsPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultsPerPage*(currentPage-1);
        this.data = this.data.slice(skip, skip+resultsPerPage);
        return this;
    }
}

module.exports = ApiFeatures;