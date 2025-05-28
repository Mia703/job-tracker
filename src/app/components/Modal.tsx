import React from "react";
import { Job as JobType } from "../types/Job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";
import { createJob, deleteJob, updateJob } from "../utils/tasks";

interface ModalProps {
  job: JobType | null;
  status: string; // either col slug or job.job_status
  user_id: string;
  onClose: () => void;
  upsertJob: (job: JobType, type: string) => void;
}

export const Modal: React.FC<ModalProps> = ({
  job,
  status,
  user_id,
  onClose,
  upsertJob,
}) => {
  const formik_withOutJob = useFormik({
    initialValues: {
      name: "",
      company: "",
      salary: "",
      postURL: "",
      location: "",
      applicationDate: "",
      interviewDate: "",
      offerReceivedDate: "",
      offerAcceptedDate: "",
      description: "",
    },
    onSubmit: async (values) => {
      const data = await createJob(
        user_id,
        status,
        values.name,
        values.company,
        values.salary,
        values.location,
        values.postURL,
        values.description,
        values.applicationDate,
        values.interviewDate,
        values.offerReceivedDate,
        values.offerAcceptedDate,
      );

      if (data) {
        const newJob = JSON.parse(data) as JobType;
        upsertJob(newJob, "insert");
      }
    },
  });

  const formik_withJob = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: job?.job_name === "empty" || !job?.job_name ? "" : job.job_name,
      company:
        job?.job_company === "empty" || !job?.job_company
          ? ""
          : job.job_company,
      salary:
        job?.job_salary === "empty" || !job?.job_salary ? "" : job.job_salary,
      postURL:
        job?.job_post_url === "empty" || !job?.job_post_url
          ? ""
          : job.job_post_url,
      location:
        job?.job_location === "empty" || !job?.job_location
          ? ""
          : job.job_location,
      applicationDate:
        job?.job_application_date === "empty" || !job?.job_application_date
          ? ""
          : job.job_application_date,
      interviewDate:
        job?.job_interview_date === "empty" || !job?.job_interview_date
          ? ""
          : job.job_interview_date,
      offerReceivedDate:
        job?.job_offer_received_date === "empty" ||
        !job?.job_offer_received_date
          ? ""
          : job.job_offer_received_date,
      offerAcceptedDate:
        job?.job_offer_accepted_date === "empty" ||
        !job?.job_offer_accepted_date
          ? ""
          : job.job_offer_accepted_date,
      description:
        job?.job_desc === "empty" || !job?.job_desc ? "" : job.job_desc,
    },
    onSubmit: async (values) => {
      if (job) {
        // only returns error message, else null
        const data = await updateJob(
          job.id,
          status,
          values.name,
          values.company,
          values.salary,
          values.location,
          values.postURL,
          values.description,
          values.applicationDate,
          values.interviewDate,
          values.offerReceivedDate,
          values.offerAcceptedDate,
        );

        if (data) {
          const updatedJob = JSON.parse(data) as JobType;
          upsertJob(updatedJob, "update");
        }
      } else {
        console.error("updateJob: Selected job is null");
      }
    },
  });

  return (
    <div className="job-modal-background fixed top-0 left-0 z-10 flex h-dvh w-full flex-row items-center justify-center overflow-y-auto bg-slate-400/50 p-6">
      <div className="job-modal-wrapper w-full md:w-3/4">
        <Card>
          <CardContent>
            {job ? (
              // display this form if job is NOT null
              <form
                action=""
                method="post"
                id="with-job-form"
                onSubmit={formik_withJob.handleSubmit}
              >
                <div className="wrapper my-4 flex flex-row items-end justify-between gap-2 border-b-2 border-slate-300 pb-6">
                  <div className="input-wrapper w-full">
                    <Label htmlFor="name" className="my-2">
                      Position
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      onBlur={formik_withJob.handleBlur}
                      onChange={formik_withJob.handleChange}
                      value={formik_withJob.values.name}
                    />
                  </div>

                  <Button type="button" onClick={onClose}>
                    Close
                  </Button>
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.company}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.salary}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.postURL}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.location}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.applicationDate}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.interviewDate}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.offerReceivedDate}
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
                        onBlur={formik_withJob.handleBlur}
                        onChange={formik_withJob.handleChange}
                        value={formik_withJob.values.offerAcceptedDate}
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
                    onBlur={formik_withJob.handleBlur}
                    onChange={formik_withJob.handleChange}
                    value={formik_withJob.values.description}
                  />
                </div>

                <div className="button-wrapper mt-6 grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={"destructive"}
                    id="del-btn"
                    className="w-full"
                    onClick={async () => {
                      const data = await deleteJob(job.id);

                      if (data) {
                        const removedJob = JSON.parse(data) as JobType;
                        upsertJob(removedJob, "delete");
                      }
                    }}
                  >
                    Delete
                  </Button>
                  <Button type="submit" className="update-btn w-full">
                    Update
                  </Button>
                </div>
              </form>
            ) : (

              // display this form if job is null
              <form
                action=""
                method="post"
                id="without-job-form"
                onSubmit={formik_withOutJob.handleSubmit}
              >
                <div className="wrapper my-4 flex flex-row items-end justify-between gap-2 border-b-2 border-slate-300 pb-6">
                  <div className="input-wrapper w-full">
                    <Label htmlFor="name" className="my-2">
                      Position <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      required
                      onBlur={formik_withOutJob.handleBlur}
                      onChange={formik_withOutJob.handleChange}
                      value={formik_withOutJob.values.name}
                    />
                  </div>

                  <Button type="button" onClick={onClose}>
                    Close
                  </Button>
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.company}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.salary}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.postURL}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.location}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.applicationDate}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.interviewDate}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.offerReceivedDate}
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
                        onBlur={formik_withOutJob.handleBlur}
                        onChange={formik_withOutJob.handleChange}
                        value={formik_withOutJob.values.offerAcceptedDate}
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
                    onBlur={formik_withOutJob.handleBlur}
                    onChange={formik_withOutJob.handleChange}
                    value={formik_withOutJob.values.description}
                  />
                </div>

                <div className="button-wrapper mt-6">
                  <Button type="submit" className="update-btn w-full">
                    Update
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
