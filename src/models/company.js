// Companies Model
class Company {
    constructor(company_id, company_name, location, industry, description, website, founded_at, created_at, updated_at) {
      this.company_id = company_id;
      this.company_name = company_name;
      this.location = location;
      this.industry = industry;
      this.description = description;
      this.website = website;
      this.founded_at = founded_at;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }
  
  module.exports = Company;
  