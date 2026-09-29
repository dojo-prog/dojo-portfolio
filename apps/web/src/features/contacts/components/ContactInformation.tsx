import { ArrowUpRight, Mail, MapPin } from "lucide-react";

const ContactInformation = () => {
  return (
    <div className="rounded-xl border bg-card p-6 sm:p-8">
      <h3 className="text-2xl font-semibold">Get in touch</h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        I'm open to collaborations, and opportunities.
      </p>

      <div className="mt-8 space-y-6">
        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
            <Mail className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium">Email</p>

            <a
              href="mailto:djdumaluan@gmail.com"
              className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              djdumaluan@gmail.com
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
            <MapPin className="size-4" />
          </div>

          <div>
            <p className="text-sm font-medium">Location</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Quezon City, Philippines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
