export interface Job {
  id: string;
  job_status: string;
  job_company: string;
  job_name: string;
  job_salary: string;
  job_location: string;
  job_post_url: string;
  job_desc: string;
  job_application_date: string;
  job_interview_date: string;
  job_offer_received_date: string;
  job_offer_accepted_date: string;
}

// excludes user id