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
import { ImagePlus, Save, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProjectBodySchema,
  type CreateProjectBody,
} from "@dojo-portfolio/shared";
import { FieldError } from "@/components/ui/field";
import { useCreateProject } from "@/features/projects/hooks/useCreateProject";
import { useNavigate } from "react-router-dom";

const AddProjectPage = () => {
  const form = useForm({
    resolver: zodResolver(CreateProjectBodySchema),

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

  const { mutate: createProject } = useCreateProject();

  const [thumbnail, setThumbnail] = useState<File | undefined>(undefined);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const removeThumbnail = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnail(undefined);
    setThumbnailPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const navigate = useNavigate();

  const onSubmit = (data: CreateProjectBody) => {
    createProject(
      { ...data, thumbnail },
      { onSuccess: () => navigate("/projects") },
    );
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Add Project</h1>

            <p className="text-sm text-muted-foreground">
              Create a new project for your portfolio.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          form="project-form"
          size="lg"
          className="px-4 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Create Project
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
                    // {...form.register("githubUrl")}
                  />

                  <FieldError errors={[form.formState.errors.githubUrl]} />
                </div>

                {/* Live URL */}
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Project URL</Label>

                  <Input
                    id="liveUrl"
                    placeholder="https://..."
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
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed transition-colors hover:bg-muted/50"
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

export default AddProjectPage;
