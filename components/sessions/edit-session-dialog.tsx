"use client";
import {
  Ban,
  Calendar,
  Check,
  CircleAlert,
  DollarSign,
  Eye,
  Gift,
  Image,
  Info,
  Loader2,
  MapPin,
  Save,
  SquarePen,
  Tag,
  Trash,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import axios from "@/lib/axios";
import { AssignCoachDialog } from "./assign-coach-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AppCalendar from "../app-calendar";
import { TimePicker } from "../time-picker";
import { SessionType } from "./create-session-dialog";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import ConfirmationDialog from "../alert-dialog";
import { TimePickerFixed } from "../time-picker-fixed";
import SelectSessionType from "../players/select-session-type";
import { Checkbox } from "../ui/checkbox";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError } from "../ui/field";
import { RequiredStar } from "../required-star";

interface EditSessionDialogProps {
  sessionId?: number;
  sessionData?: SessionType & {
    coach_first_name?: string;
    coach_last_name?: string;
  };
  onSuccess?: () => void;
  coach_id?: string | null;
  promotion?: boolean;
}

export const sessionSchema = z.object({
  name: z.string().min(2, "Session name is required"),

  description: z.string().min(2, "Description is required"),

  type: z.enum(["camp", "comped"], {
    message: "Type is required",
  }),

  age_limit: z.string().min(1, "Age limit is required"),

  session_type: z.string().min(1, "Session type is required"),

  coach_id: z.number().nullable(),

  location: z.string().min(2, "Location is required"),

  date: z.date({
    required_error: "Start date is required",
  }),

  end_date: z.date({
    required_error: "End date is required",
  }),

  start_time: z.string().min(1, "Start time required"),

  end_time: z.string().min(1, "End time required"),

  price: z.coerce.number().min(0, "Price required"),

  max_players: z.coerce.number().min(1, "Max players required"),

  apply_promotion: z.boolean().default(false),

  image: z.string().optional(),

  promotion_start: z.date().optional(),

  promotion_end: z.date().optional(),

  promotion_price: z.coerce.number().optional(),

  show_storefront: z.boolean().default(false),
});
type SessionSchemaValues = z.infer<typeof sessionSchema>;

export function EditSessionDialog({
  sessionId,
  sessionData,
  onSuccess,
  coach_id = null,
  promotion = false,
}: EditSessionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState<null | number>(null);
  const [coach_Name, setCoach_name] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<SessionSchemaValues>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
      description: "",
      type: undefined,
      age_limit: "",
      session_type: "",
      coach_id: coach_id ? Number(coach_id) : null,
      location: "",
      start_time: "",
      end_time: "",
      price: 0,
      max_players: 0,
      apply_promotion: promotion,
      show_storefront: false,
      date: undefined,
      end_date: undefined,
      promotion_price: 0,
      image: "",
      promotion_start: undefined,
      promotion_end: undefined,
    },
  });

  const applyPromotion = form.watch("apply_promotion");
  const image = form.watch("image");
  const selectedCoachId = form.watch("coach_id");

  useEffect(() => {
    if (open && sessionData) {
      form.reset({
        name: sessionData.name,
        description: sessionData.description,
        type: sessionData.type as "camp" | "comped",
        age_limit: sessionData.age_limit,
        session_type: sessionData.session_type,
        coach_id: sessionData.coach_id,
        location: sessionData.location,
        date: new Date(sessionData.date),
        end_date: new Date(sessionData.end_date),
        start_time: sessionData.start_time,
        end_time: sessionData.end_time,
        price: Number(sessionData.price),
        max_players: Number(sessionData.max_players),
        apply_promotion: sessionData.apply_promotion,
        image: sessionData.image,
        promotion_price: Number(sessionData.promotion_price),
        promotion_start: sessionData.promotion_start
          ? new Date(sessionData.promotion_start)
          : undefined,
        promotion_end: sessionData.promotion_end
          ? new Date(sessionData.promotion_end)
          : undefined,
        show_storefront: (sessionData.show_storefront as boolean) ?? false,
      });
      setCoach_name(`${sessionData?.coach_first_name} ${sessionData?.coach_last_name}`)
    }
  }, [open, sessionData]);

  const editSession = async (values: SessionSchemaValues) => {
    if (!sessionId) {
      toast.error("Session ID is required");
      return;
    }
    setLoading(true);
    try {
      await axios.put(`/admin/sessions`, { ...values, id: sessionId });

      toast.success("Session updated successfully");
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async () => {
    if (!sessionId) {
      toast.error("Session ID is required");
      return;
    }

    setDeleteLoading(true);

    try {
      await axios.delete(`/admin/sessions/${sessionId}`);
      toast.success("Session deleted successfully");
      setDeleteLoading(false);
      setSelectedSession(null);
      setOpen(false);
      if (promotion) {
        router.replace("/portal/admin/promotions");
      } else {
        router.replace("/portal/admin/sessions");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(!open)} variant={"outline"}>
        <SquarePen className="w-5 h-5" />
        {!promotion && "Edit"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0 gap-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Edit {promotion ? "Promotion" : "Session"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(editSession)}>
            <ScrollArea className=" py-1 space-y-4 px-2 h-[70vh]">
              <div className="space-y-2 px-2 pb-2">
                <div className="flex gap-2 text-md ">
                  <Tag className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Basic Information</h1>
                </div>
                <div className="space-y-2">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Label className="text-sm text-[#99A1AF]">
                          Session Name <RequiredStar />
                        </Label>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Advance Skill Training"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <Label className="text-sm text-[#99A1AF]">
                          Description <RequiredStar />
                        </Label>
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder=""
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Controller
                      name="type"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Type <RequiredStar />
                          </Label>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="w-full dark:bg-[#1A1A1A]">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={"camp"}>Camp</SelectItem>
                              <SelectItem value={"comped"}>Clinic</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Controller
                      name="age_limit"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Age Limit <RequiredStar />
                          </Label>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="18-24"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Controller
                      name="session_type"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Session Type <RequiredStar />
                          </Label>
                          <SelectSessionType
                            placeholder="Select session type"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Assigned Coach *
                    </Label>

                    <div className="flex gap-4 items-center">
                      {selectedCoachId && coach_Name && (
                        <p className="mt-1 text-sm text-ghost-text">
                          Selected Coach: {coach_Name}
                        </p>
                      )}
                      {/* !selectedCoachId && to remove assign coach button after the coach has been selected*/}
                      { (
                        <AssignCoachDialog
                          onSelect={(coach) => {
                            form.setValue("coach_id", coach.id, {
                              shouldValidate: true,
                            });
                            setCoach_name(
                              `${coach.first_name} ${coach.last_name}`,
                            );
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Calendar className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Schedule</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Controller
                      name="date"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Start Date <RequiredStar />
                          </Label>
                          <AppCalendar
                            className="h-9"
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                            onChange={field.onChange}
                            required
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Controller
                      name="end_date"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            End Date <RequiredStar />
                          </Label>
                          <AppCalendar
                            className="h-9"
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                            onChange={field.onChange}
                            required
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Controller
                      name="start_time"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Start Time <RequiredStar />
                          </Label>
                          <TimePickerFixed
                            className="h-9"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="end_time"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            End Time <RequiredStar />
                          </Label>
                          <TimePickerFixed
                            className="h-9"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <MapPin className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Location & Pricing</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Controller
                      name="location"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Location <RequiredStar />
                          </Label>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="price"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Price <RequiredStar />
                          </Label>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Users className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Capacity & Promotions</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Controller
                      name="max_players"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Max Players <RequiredStar />
                          </Label>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="apply_promotion"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Label className="text-sm text-[#99A1AF]">
                            Apply Promotion (Optional)
                          </Label>
                          <Select
                            value={String(field.value)}
                            onValueChange={(val) =>
                              field.onChange(val === "true")
                            }
                          >
                            <SelectTrigger className="w-full dark:bg-[#1A1A1A] rounded-sm">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>

                            <SelectContent className="!bg-[#1A1A1A]">
                              <SelectGroup>
                                <SelectLabel>Select</SelectLabel>
                                <SelectItem value="true">Yes</SelectItem>
                                <SelectItem value="false">No</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                {applyPromotion && (
                  <>
                    <div className="flex gap-2 text-md items-center">
                      <Image className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">Promotional Flyer</h1>
                    </div>
                    <div className="space-y-2">
                      <Controller
                        name="image"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <Label className="text-sm text-[#99A1AF]">
                              Image Url <RequiredStar />
                            </Label>
                            <Input
                              {...field}
                              id={field.name}
                              aria-invalid={fieldState.invalid}
                              placeholder=""
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                      <h1 className="text-[#99A1AF]">Preview:</h1>

                      {image ? (
                        <img
                          src={image}
                          className="w-full h-50 object-contain"
                        />
                      ) : (
                        <div className="w-full h-50" />
                      )}
                    </div>

                    <div className="flex gap-2 text-md items-center">
                      <Calendar className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">Promotion Duration</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Controller
                          name="promotion_start"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Label className="text-sm text-[#99A1AF]">
                                Start Date <RequiredStar />
                              </Label>
                              <AppCalendar
                                className="h-9"
                                date={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onChange={field.onChange}
                                required
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Controller
                          name="promotion_end"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Label className="text-sm text-[#99A1AF]">
                                End Date <RequiredStar />
                              </Label>
                              <AppCalendar
                                className="h-9"
                                date={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onChange={field.onChange}
                                required
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 text-md items-center">
                      <DollarSign className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">Price</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Controller
                          name="promotion_price"
                          control={form.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <Label className="text-sm text-[#99A1AF]">
                                Promotion Price <RequiredStar />
                              </Label>
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder=""
                                autoComplete="off"
                              />
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 text-md items-center">
                      <Eye className="text-primary" size={16} />
                      <h1 className="text-[#F3F4F6]">Storefront Display</h1>
                    </div>

                    <div className="flex items-center gap-4 px-8 bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-2">
                      <Controller
                        name="show_storefront"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <>
                            <div className="pt-1 flex-none">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-4 w-4"
                              />
                            </div>

                            <div className="flex-1">
                              <label className="text-sm font-medium text-[#D1D5DC]">
                                Show on Online Storefront
                              </label>

                              <p className="text-sm text-[#6A7282]">
                                Display promotional card with image, title,
                                price
                              </p>

                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </div>
                          </>
                        )}
                      />
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
            <Separator />

            <div className="p-4 flex flex-wrap gap-4 justify-between">
              <Button
                variant={"destructive"}
                type="button"
                onClick={() =>
                  setSelectedSession(sessionId ? Number(sessionId) : null)
                }
              >
                <Trash2 /> Delete
              </Button>
              <div className="flex gap-4 flex-wrap">
                <DialogClose className="text-[13px] font-medium h-8 px-4 py-2 has-[>svg]:px-3 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 text-[13px]"
                >
                  {loading && <Spinner className="text-black" />}
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        loading={deleteLoading}
        open={!!selectedSession}
        onPressCancel={() => setSelectedSession(null)}
        onPressYes={async () => await deleteSession()}
        title={"Are you sure you want to delete?"}
        description={"Your action will remove this item from the system"}
      />
    </>
  );
}
