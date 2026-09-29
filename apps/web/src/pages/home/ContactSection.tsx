import GradientWavesBackground from "@/components/common/GradientWavesBackground";
import ContactInformation from "@/features/contacts/components/ContactInformation";
import ContactMessageForm from "@/features/contacts/components/ContactMessageForm";
import MessageSentConfirmationDialog from "@/features/contacts/components/MessageSentConfirmationDialog";
import { useState } from "react";

const ContactSection = () => {
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false);

  return (
    <>
      <section id="contact" className="relative h-screen px-6 py-24">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <GradientWavesBackground />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Contact
            </p>

            <h2 className="text-5xl font-bold tracking-tight sm:text-5xl">
              Let's work together.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Want to get in touch? Feel free to send me a message.
            </p>
          </div>

          {/* Contact Content */}
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <ContactInformation />
            <ContactMessageForm onSuccess={() => setConfirmationOpen(true)} />
          </div>
        </div>
      </section>

      {confirmationOpen && (
        <MessageSentConfirmationDialog
          open={confirmationOpen}
          setOpen={setConfirmationOpen}
        />
      )}
    </>
  );
};

export default ContactSection;
