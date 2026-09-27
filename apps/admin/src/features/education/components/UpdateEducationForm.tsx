import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateEducationBodySchema,
  type CreateEducationBody,
  type EducationEntity,
} from "@dojo-portfolio/shared";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import ButtonLoader from "@/components/common/ButtonLoader";
import { FieldError } from "@/components/ui/field";

import { useUpdateEducation } from "../hooks/useUpdateEducation";

type Props = {
  education: EducationEntity;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateEducationForm = ({ education, setDialogOpen }: Props) => {
  const { mutateAsync: updateEducation, isPending } = useUpdateEducation();

  const form = useForm({
    resolver: zodResolver(CreateEducationBodySchema),
    defaultValues: {
      institution: education.institution,
      degree: education.degree,
      field: education.field,
      description: education.description,
      startDate: education.start_date,
      endDate: education.end_date ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      institution: education.institution,
      degree: education.degree,
      field: education.field,
      description: education.description,
      startDate: education.start_date,
      endDate: education.end_date ?? "",
    });
  }, [education, form]);

  const onSubmit = async (data: CreateEducationBody) => {
    await updateEducation({
      educationId: education.id,
      body: data,
    });

    form.reset();
    setDialogOpen(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Institution */}
      <div className="space-y-2">
        <Label htmlFor="education-institution">Institution</Label>

        <Input
          id="education-institution"
          placeholder="e.g. University of the Philippines"
          {...form.register("institution")}
        />

        <FieldError errors={[form.formState.errors.institution]} />
      </div>

      {/* Degree */}
      <div className="space-y-2">
        <Label htmlFor="education-degree">Degree</Label>

        <Input
          id="education-degree"
          placeholder="e.g. Bachelor of Science"
          {...form.register("degree")}
        />

        <FieldError errors={[form.formState.errors.degree]} />
      </div>

      {/* Field */}
      <div className="space-y-2">
        <Label htmlFor="education-field">Field of Study</Label>

        <Input
          id="education-field"
          placeholder="e.g. Information Technology"
          {...form.register("field")}
        />

        <FieldError errors={[form.formState.errors.field]} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="education-description">Description</Label>

        <Textarea
          id="education-description"
          placeholder="Describe your studies, achievements, activities, or relevant coursework..."
          className="min-h-32 resize-none"
          {...form.register("description")}
        />

        <FieldError errors={[form.formState.errors.description]} />
      </div>

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Start Date */}
        <div className="space-y-2">
          <Label htmlFor="education-start-date">Start Date</Label>

          <Input
            id="education-start-date"
            type="date"
            {...form.register("startDate")}
          />

          <FieldError errors={[form.formState.errors.startDate]} />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <Label htmlFor="education-end-date">End Date</Label>

          <Input
            id="education-end-date"
            type="date"
            {...form.register("endDate")}
          />

          <FieldError errors={[form.formState.errors.endDate]} />
        </div>
      </div>

      {/* Footer */}
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDialogOpen(false)}
          disabled={isPending}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isPending} className="px-4 text-white">
          <ButtonLoader isLoading={isPending}>Update Education</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default UpdateEducationForm;
