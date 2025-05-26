import React from "react";
import { Job as JobType } from "../types/Job";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormik } from "formik";

interface ModalProps {
  job: JobType | null;
  user_id: string;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ job, user_id, onClose }) => {
  const formik = useFormik({
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
    onSubmit: (values) => {
      console.log(values);
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
                <Button
                  type="submit"
                  id="update-btn"
                  name="buttonType"
                  className="w-full"
                >
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
