import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/ui/field";
import { ImagePlus, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProjectBodySchema,
  type UpdateProjectBody,
} from "@dojo-portfolio/shared";
import { useNavigate, useParams } from "react-router-dom";

import ButtonLoader from "@/components/common/ButtonLoader";
import { useUpdateProject } from "@/features/projects/hooks/useUpdateProject";
import { useProject } from "@/features/projects/hooks/useProject";

const UpdateProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: project, isPending: isProjectPending } = useProject(projectId!);

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const form = useForm<UpdateProjectBody>({
    resolver: zodResolver(UpdateProjectBodySchema),

    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      problem: undefined,
      solution: undefined,
      githubUrl: undefined,
      liveUrl: undefined,
      featured: false,
      status: "planned",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!project) return;

    form.reset({
      title: project.title,
      shortDescription: project.short_description,
      description: project.description,
      problem: project.problem ?? undefined,
      solution: project.solution ?? undefined,
      githubUrl: project.github_url ?? undefined,
      liveUrl: project.live_url ?? undefined,
      featured: project.featured,
      status: project.status,
      startDate: project.start_date ?? undefined,
      endDate: project.end_date ?? undefined,
    });

    if (project.thumbnail_url) {
      setThumbnailPreview(project.thumbnail_url);
    }
  }, [project, form]);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnail(undefined);
    setThumbnailPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = (data: UpdateProjectBody) => {
    if (!projectId) return;

    updateProject(
      { projectId, body: { ...data, thumbnail } },
      { onSuccess: () => navigate("/projects") },
    );
  };

  const isPending = isProjectPending || isUpdating;

  if (isProjectPending) {
    return null;
  }

  if (!project) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Update Project
            </h1>

            <p className="text-sm text-muted-foreground">
              Update the details of your project.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          form="project-form"
          size="lg"
          className="px-4 text-white"
          disabled={isPending}
        >
          <ButtonLoader isLoading={isUpdating}>
            <Save className="mr-2 h-4 w-4" />
            Update Project
          </ButtonLoader>
        </Button>
      </div>

      <form id="project-form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>

                <CardDescription>
                  Describe your project and what it does.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>

                  <Input
                    id="title"
                    placeholder="e.g. Dojo Portfolio"
                    disabled={isPending}
                    {...form.register("title")}
                  />

                  <FieldError errors={[form.formState.errors.title]} />
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>

                  <Input
                    id="shortDescription"
                    placeholder="A short summary of the project"
                    disabled={isPending}
                    {...form.register("shortDescription")}
                  />

                  <FieldError
                    errors={[form.formState.errors.shortDescription]}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>

                  <Textarea
                    id="description"
                    placeholder="Describe the project in more detail..."
                    className="min-h-32 resize-y"
                    disabled={isPending}
                    {...form.register("description")}
                  />

                  <FieldError errors={[form.formState.errors.description]} />
                </div>
              </CardContent>
            </Card>

            {/* Problem & Solution */}
            <Card>
              <CardHeader>
                <CardTitle>Problem & Solution</CardTitle>

                <CardDescription>
                  Explain the problem this project solves and how you solved it.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Problem */}
                <div className="space-y-2">
                  <Label htmlFor="problem">Problem</Label>

                  <Textarea
                    id="problem"
                    placeholder="What problem were you trying to solve?"
                    className="min-h-32 resize-y"
                    disabled={isPending}
                    {...form.register("problem")}
                  />

                  <FieldError errors={[form.formState.errors.problem]} />
                </div>

                {/* Solution */}
                <div className="space-y-2">
                  <Label htmlFor="solution">Solution</Label>

                  <Textarea
                    id="solution"
                    placeholder="How does your project solve the problem?"
                    className="min-h-32 resize-y"
                    disabled={isPending}
                    {...form.register("solution")}
                  />

                  <FieldError errors={[form.formState.errors.solution]} />
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>

                <CardDescription>
                  Add links to the project's source code and live deployment.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* GitHub */}
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>

                  <Input
                    id="githubUrl"
                    placeholder="https://github.com/..."
                    disabled={isPending}
                    {...form.register("githubUrl")}
                  />

                  <FieldError errors={[form.formState.errors.githubUrl]} />
                </div>

                {/* Live URL */}
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Project URL</Label>

                  <Input
                    id="liveUrl"
                    placeholder="https://..."
                    disabled={isPending}
                    {...form.register("liveUrl")}
                  />

                  <FieldError errors={[form.formState.errors.liveUrl]} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>

                <CardDescription>
                  Configure how this project appears.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>

                  <Controller
                    control={form.control}
                    name="status"
                    disabled={isPending}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>

                          <SelectItem value="in_progress">
                            In Progress
                          </SelectItem>

                          <SelectItem value="maintained">Maintained</SelectItem>

                          <SelectItem value="completed">Completed</SelectItem>

                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <FieldError errors={[form.formState.errors.status]} />
                </div>

                {/* Featured */}
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="featured">Featured</Label>

                    <p className="text-xs text-muted-foreground">
                      Highlight this project on your portfolio.
                    </p>
                  </div>

                  <Controller
                    control={form.control}
                    name="featured"
                    disabled={isPending}
                    render={({ field }) => (
                      <Switch
                        id="featured"
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />

                  <FieldError errors={[form.formState.errors.featured]} />
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>

                <CardDescription>
                  When did you work on this project?
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>

                  <Input
                    id="startDate"
                    type="date"
                    disabled={isPending}
                    {...form.register("startDate")}
                  />

                  <FieldError errors={[form.formState.errors.startDate]} />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>

                  <Input
                    id="endDate"
                    type="date"
                    disabled={isPending}
                    {...form.register("endDate")}
                  />

                  <p className="text-xs text-muted-foreground">
                    Leave empty if the project is ongoing.
                  </p>

                  <FieldError errors={[form.formState.errors.endDate]} />
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle>Thumbnail</CardTitle>

                <CardDescription>
                  Add an image to represent this project.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                  disabled={isPending}
                />

                {thumbnailPreview ? (
                  <div className="relative overflow-hidden rounded-lg border">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="aspect-video w-full object-cover"
                    />

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={removeThumbnail}
                      disabled={isPending}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed transition-colors hover:bg-muted/50"
                    disabled={isPending}
                  >
                    <ImagePlus className="h-8 w-8 text-muted-foreground" />

                    <div className="text-center">
                      <p className="text-sm font-medium">Select thumbnail</p>

                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, WEBP or other image
                      </p>
                    </div>
                  </button>
                )}

                {thumbnail && (
                  <p className="mt-2 truncate text-xs text-muted-foreground">
                    {thumbnail.name}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProjectPage;
