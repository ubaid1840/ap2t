import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogTitle
} from "../ui/dialog";
export default function GetSupportDialog() {
  const handleSubmit = () => {
    toast.success("message sent to support team..");
  };
  return (
    <DialogContent>
      <DialogTitle>Get Support</DialogTitle>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="text"
            placeholder="First Name"
            className="w-full rounded bg-neutral-900 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            className="w-full rounded bg-neutral-900 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <input
          required
          type="tel"
          placeholder="Phone Number"
          className="w-full rounded bg-neutral-900 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          required
          type="email"
          placeholder="Email Address"
          className="w-full rounded bg-neutral-900 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          required
          rows={5}
          placeholder="Your Message"
          className="w-full rounded bg-neutral-900 border border-neutral-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </DialogContent>
  );
}
