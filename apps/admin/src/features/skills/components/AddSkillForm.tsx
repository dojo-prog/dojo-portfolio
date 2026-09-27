import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateSkillBodySchema,
  SkillCategorySchema,
  type CreateSkillBody,
} from "@dojo-portfolio/shared";
import ButtonLoader from "@/components/common/ButtonLoader";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateSkill } from "../hooks/useCreateSkill";
import type { Dispatch, SetStateAction } from "react";
import { Label } from "@/components/ui/label";

type Props = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const AddSkillForm = ({ setDialogOpen }: Props) => {
  const { mutateAsync: createSkill, isPending } = useCreateSkill();

  const skillCategories: string[] = SkillCategorySchema.options;

  console.log(skillCategories);

  const form = useForm({
    resolver: zodResolver(CreateSkillBodySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CreateSkillBody) => {
    await createSkill(data);

    form.reset();
    setDialogOpen(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Skill Name */}
      <div className="space-y-2">
        <Label htmlFor="skill-name">Skill Name</Label>

        <Input
          id="skill-name"
          placeholder="e.g. TypeScript"
          {...form.register("name")}
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>

        <Controller
          name="category"
          control={form.control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="skill-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>

              <SelectContent className={"w-max"}>
                {skillCategories.map((sc) => (
                  <SelectItem key={sc} value={sc} className={"capitalize"}>
                    {sc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </Button>

        <Button type="submit" className={"text-white px-4"}>
          <ButtonLoader isLoading={isPending}>Add Skill</ButtonLoader>
        </Button>
      </DialogFooter>
    </form>
  );
};

export default AddSkillForm;
