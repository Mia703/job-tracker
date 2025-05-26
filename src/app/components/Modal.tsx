import React, { useEffect, useState } from "react";
import { Job as JobType } from "../types/Job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";

interface ModalProps {
  job: JobType;
  user_id: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ job, user_id, onClose }) => {
  const [displayAlert, setDisplayAlert] = useState("");

  useEffect(() => {

  }, [displayAlert])

  const formik = useFormik({
    initialValues: {
      name: job.job_name == "empty" ? "" : job.job_name,
      company: job.job_company == "empty" ? "" : job.job_company,
      salary: job.job_salary == "0" ? "" : job.job_salary,
      postURL: job.job_post_url == "empty" ? "" : job.job_post_url,
      location: job.job_location == "empty" ? "" : job.job_location,
      applicationDate:
        job.job_application_date == "empty" ? "" : job.job_application_date,
      interviewDate:
        job.job_interview_date == "empty" ? "" : job.job_interview_date,
      offerReceivedDate:
        job.job_offer_accepted_date == "empty"
          ? ""
          : job.job_offer_accepted_date,
      offerAcceptedDate:
        job.job_offer_accepted_date == "empty"
          ? ""
          : job.job_offer_accepted_date,
      description: job.job_desc == "empty" ? "" : job.job_desc,
    },
    onSubmit: async (values) => {
      const response = await fetch("/pages/api/jobs/setJobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: job.id,
          status: job.job_status,
          userID: user_id,
          name: values.name == "" ? "empty" : values.name,
          company: values.company == "" ? "empty" : values.company,
          salary: values.salary == "" ? "empty" : values.salary,
          location: values.location == "" ? "empty" : values.location,
          postURL: values.postURL == "" ? "empty" : values.postURL,
          desc: values.description == "" ? "empty" : values.description,
          appDate:
            values.applicationDate == "" ? "empty" : values.applicationDate,
          interviewDate:
            values.interviewDate == "" ? "empty" : values.interviewDate,
          offerReceivedDate:
            values.offerReceivedDate == "" ? "empty" : values.offerReceivedDate,
          offerAcceptedDate:
            values.offerAcceptedDate == "" ? "empty" : values.offerAcceptedDate,
        }),
      });

      const data = await response.json();
      console.log("data", data);
      // TODO: on data update, update form values to reflect change
    },
  });

  return (
    <div className="job-modal-background fixed top-0 left-0 z-10 flex h-dvh w-full flex-row items-center justify-center overflow-y-auto bg-slate-400/50 p-6">
      <div className="job-modal-wrapper w-full md:w-3/4">
        <Card>
          <CardContent>
            <form action="" method="post" onSubmit={formik.handleSubmit}>
              <div className="wrapper my-4 flex flex-row items-end justify-between gap-2 border-b-2 border-slate-300 pb-6">
                <div className="input-wrapper w-full">
                  <Label htmlFor="name" className="my-2">
                    Position
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>

                <Button onClick={onClose}>Close</Button>
              </div>

              <div className="wrapper grid grid-cols-2 gap-4">
                <div className="left-wrapper col-span-1">
                  <div className="input-wrapper mb-4">
                    <Label htmlFor="company" className="my-2">
                      Company
                    </Label>
                    <Input
                      type="text"
                      name="company"
                      id="company"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.company}
                    />
                  </div>

                  <div className="input-wrapper mb-4">
                    <Label htmlFor="salary" className="my-2">
                      Salary
                    </Label>
                    <Input
                      type="text"
                      name="salary"
                      id="salary"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.salary}
                    />
                  </div>

                  <div className="input-wrapper mb-4">
                    <Label htmlFor="postURL" className="my-2">
                      Post URL
                    </Label>
                    <Input
                      type="url"
                      name="postURL"
                      id="postURL"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.postURL}
                    />
                  </div>

                  <div className="input-wrapper">
                    <Label htmlFor="location" className="my-2">
                      Location
                    </Label>
                    <Input
                      type="text"
                      name="location"
                      id="location"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.location}
                    />
                  </div>
                </div>

                <div className="right-wrapper col-span-1">
                  <div className="input-wrapper mb-4">
                    <Label htmlFor="applicationDate" className="my-2">
                      Application Date
                    </Label>
                    <Input
                      type="date"
                      name="applicationDate"
                      id="applicationDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.applicationDate}
                    />
                  </div>

                  <div className="input-wrapper mb-4">
                    <Label htmlFor="interviewDate" className="my-2">
                      Interview Date
                    </Label>
                    <Input
                      type="date"
                      name="interviewDate"
                      id="interviewDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.interviewDate}
                    />
                  </div>

                  <div className="input-wrapper mb-4">
                    <Label htmlFor="offerReceivedDate" className="my-2">
                      Offer Received Date
                    </Label>
                    <Input
                      type="date"
                      name="offerReceivedDate"
                      id="offerReceivedDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.offerReceivedDate}
                    />
                  </div>

                  <div className="input-wrapper mb-4">
                    <Label htmlFor="offerAcceptedDate" className="my-2">
                      Offer Accepted Date
                    </Label>
                    <Input
                      type="date"
                      name="offerAcceptedDate"
                      id="offerAcceptedDate"
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.offerAcceptedDate}
                    />
                  </div>
                </div>
              </div>

              <div className="input-wrapper mb-4">
                <Label htmlFor="description" className="my-2">
                  Job Description
                </Label>
                <Textarea
                  name="description"
                  id="description"
                  cols={30}
                  className="field-sizing-fixed resize-y overflow-y-scroll"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
              </div>

              <div className="button-wrapper mt-6 grid grid-cols-2 gap-2">
                <Button type="submit" id="update-btn" className="w-full">
                  Update
                </Button>
                <Button
                  type="button"
                  variant={"destructive"}
                  id="del-btn"
                  className="w-full"
                >
                  Delete
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
