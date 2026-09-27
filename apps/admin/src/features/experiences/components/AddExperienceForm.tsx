import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateExperienceBodySchema,
  type CreateExperienceBody,
} from "@dojo-portfolio/shared";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";

import ButtonLoader from "@/components/common/ButtonLoader";
import { useCreateExperience } from "../hooks/useCreateExperience";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldError } from "@/components/ui/field";

type Props = {
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddExperienceForm = ({ setDialogOpen }: Props) => {
  const { mutateAsync: createExperience, isPending } = useCreateExperience();

  const form = useForm({
    resolver: zodResolver(CreateExperienceBodySchema),
    defaultValues: {
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
    },
  });

  const current = form.watch("current");

  useEffect(() => {
    if (current) {
      form.setValue("endDate", "");
    }
  }, [current, form]);

  const onSubmit = async (data: CreateExperienceBody) => {
    await createExperience(data);

    form.reset();
    setDialogOpen(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="experience-company">Company</Label>

        <Input
          id="experience-company"
          placeholder="e.g. Google"
          {...form.register("company")}
        />

        <FieldError errors={[form.formState.errors.company]} />
      </div>

      {/* Position */}
      <div className="space-y-2">
        <Label htmlFor="experience-position">Position</Label>

        <Input
          id="experience-position"
          placeholder="e.g. Backend Developer"
          {...form.register("position")}
        />

        <FieldError errors={[form.formState.errors.position]} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="experience-description">Description</Label>

        <Textarea
          id="experience-description"
          placeholder="Describe your responsibilities, achievements, and work..."
          className="min-h-32 resize-none"
          {...form.register("description")}
        />

        <FieldError errors={[form.formState.errors.description]} />
      </div>

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="experience-start-date">Start Date</Label>

          <Input
            id="experience-start-date"
            type="date"
            {...form.register("startDate")}
          />

          <FieldError errors={[form.formState.errors.startDate]} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience-end-date">End Date</Label>

          <Input
            id="experience-end-date"
            type="date"
            disabled={current}
            {...form.register("endDate")}
          />

          <FieldError errors={[form.formState.errors.endDate]} />
        </div>
      </div>

      {/* Current */}
      <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
        <Checkbox
          id="experience-current"
          checked={current}
          onCheckedChange={(checked) => {
            form.setValue("current", checked === true);
          }}
        />

        <div className="space-y-0.5">
          <Label htmlFor="experience-current" className="cursor-pointer">
            I currently work here
          </Label>

          <p className="text-xs text-muted-foreground mt-1 italic">
            End date will be set to present.
          </p>
        </div>
      </div>

      <FieldError errors={[form.formState.errors.current]} />

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
          <ButtonLoader isLoading={isPending}>Add Experience</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddExperienceForm;
