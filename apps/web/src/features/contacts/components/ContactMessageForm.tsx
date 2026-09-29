import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowUpRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateContactMessageBodySchema,
  type CreateContactMessageBody,
} from "@dojo-portfolio/shared";
import { FieldError } from "@/components/ui/field";
import { useCreateMessage } from "../hooks/useCreateMessage";
import ButtonLoader from "@/components/common/ButtonLoader";

type Props = {
  onSuccess: () => void;
};

const ContactMessageForm = ({ onSuccess }: Props) => {
  const { mutateAsync: createMessage, isPending } = useCreateMessage();

  const form = useForm({
    resolver: zodResolver(CreateContactMessageBodySchema),

    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: CreateContactMessageBody) => {
    await createMessage(data);

    onSuccess();
    form.reset();
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-xl border bg-card p-6 sm:p-8 z-50"
    >
      <h3 className="text-2xl font-semibold mb-4">Send me a message</h3>

      <div className="space-y-6">
        {/* Name + Email */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              placeholder="John Doe"
              {...form.register("name")}
            />

            <FieldError errors={[form.formState.errors.name]} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...form.register("email")}
            />

            <FieldError errors={[form.formState.errors.email]} />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>

          <Input
            id="subject"
            placeholder="What's this about?"
            {...form.register("subject")}
          />

          <FieldError errors={[form.formState.errors.subject]} />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>

          <Textarea
            id="message"
            placeholder="Kindly enter your message here..."
            className="min-h-36 resize-none"
            {...form.register("message")}
          />

          <FieldError errors={[form.formState.errors.message]} />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button type="submit" className={"text-white"} size={"lg"}>
            <ButtonLoader isLoading={isPending}>
              Send message
              <ArrowUpRight />
            </ButtonLoader>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContactMessageForm;
