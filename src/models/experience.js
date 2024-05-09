// Experience Model
class Experience {
    constructor(experience_id, user_id, company_name, position, start_date, end_date) {
      this.experience_id = experience_id;
      this.user_id = user_id;
      this.company_name = company_name;
      this.position = position;
      this.start_date = start_date;
      this.end_date = end_date;
    }
  }
  
  module.exports = Experience;
  