
import AppCalendar from "@/components/app-calendar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios";
import {
    Edit
} from "lucide-react";
import { useEffect, useState } from "react";
const EditCoachProfile = ({ id, data, onRefresh }: { id: string | undefined, data: any, onRefresh: () => Promise<void> }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [specialityInput, setSpecialityInput] = useState("")
  const [certificationInput, setCertificationInput] = useState("")

  const [coach, setCoach] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    career_start: "",
    bio: "",
    zip_code : "",
    specialities: [],
    certifications: []
  });

  useEffect(() => {
    if (data) {
      setCoach({
        first_name: data?.first_name,
        last_name: data?.last_name,
        phone: data?.phone_no,
        career_start: data?.profile?.career_start,
        bio: data?.profile?.bio,
        specialities: data?.profile?.specialities || [],
        certifications: data?.profile?.certifications || [],
        zip_code : data?.zip_code || ""
      })
    }
  }, [data])

  const changeCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axios.put(`/user`, {
        id: id,
        first_name: coach?.first_name,
        last_name: coach?.last_name,
        phone_no: coach?.phone,
        zip_code : coach?.zip_code
      })
      await axios.put(`/admin/coaches/${id}`, {
        id: id,
        career_start: coach?.career_start,
        bio: coach?.bio,
        specialities: coach?.specialities,
        certifications: coach?.certifications
      })

      await onRefresh()
      setOpen(false)
    } finally {
      setLoading(false)
    }
  };


  const handleAddSpeciality = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = specialityInput.trim();
      if (!trimmed) return;

      setCoach((prev: any) => {
        if (prev.specialities.includes(trimmed)) return prev;

        return {
          ...prev,
          specialities: [...prev.specialities, trimmed]
        };
      });

      setSpecialityInput("");
    }
  };


  const handleRemoveSpeciality = (tag: string) => {
    setCoach(prev => ({
      ...prev,
      specialities: prev.specialities.filter(t => t !== tag)
    }));
  };


  const handleAddCertification = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmed = certificationInput.trim();
      if (!trimmed) return;

      setCoach((prev: any) => {
        if (prev.certifications.includes(trimmed)) return prev;

        return {
          ...prev,
          certifications: [...prev.certifications, trimmed]
        };
      });

      setCertificationInput("");
    }
  };


  const handleRemoveCertification = (tag: string) => {
    setCoach(prev => ({
      ...prev,
      certifications: prev.certifications.filter(t => t !== tag)
    }));
  };

  return (
    <>
      <Button onClick={() => setOpen(!open)} variant={"outline"}>
        {" "}
        <Edit /> Edit Profile
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Edit Coach Profile
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={changeCoach} className="">
            <ScrollArea className="h-[60vh] py-1 space-y-4 px-2 ">
              <div className="space-y-2 px-2 pb-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      First Name
                    </Label>
                    <Input
                      name="fullName"
                      placeholder="Coach Martinez"

                      required
                      value={coach.first_name}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Last Name
                    </Label>
                    <Input
                      name="lastName"
                      placeholder="Coach Martinez"

                      required
                      value={coach.last_name}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">Phone</Label>
                    <Input
                      name="phone"
                      placeholder="(555) 123-4567"

                      required
                      value={coach.phone}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Start of Career
                    </Label>
                    <AppCalendar

                      date={coach.career_start ? new Date(coach.career_start) : undefined}
                      onChange={(date) =>
                        setCoach((prevState) => ({
                          ...prevState,
                          career_start: date,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                 <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Zip Code
                    </Label>
                    <Input
                      name="zip_code"
                      placeholder="54000"

                      required
                      value={coach.zip_code}
                      onChange={(e) =>
                        setCoach((prev) => ({
                          ...prev,
                          zip_code: e.target.value,
                        }))
                      }
                    />
                  </div>


                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">
                    Biography
                  </Label>
                  <Textarea className="min-h-28"
                    value={coach.bio}
                    onChange={(e) =>
                      setCoach((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">Specialities</Label>
                  <div className="flex flex-col gap-2 border rounded-md p-2">

                    <Input
                      placeholder="Type speciality and press Enter"
                      value={specialityInput}
                      onChange={(e) => setSpecialityInput(e.target.value)}
                      onKeyDown={handleAddSpeciality}
                    />
                    <div className="flex flex-wrap gap-2">
                      {coach.specialities.map((tag, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 bg-primary text-black px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveSpeciality(tag)}
                            className="ml-1 text-xs hover:text-red-300"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


                <div className="space-y-2">
                  <Label className="text-sm text-[#99A1AF]">Certifications</Label>
                  <div className="flex flex-col gap-2 border rounded-md p-2">

                    <Input
                      placeholder="Type certification and press Enter"
                      value={certificationInput}
                      onChange={(e) => setCertificationInput(e.target.value)}
                      onKeyDown={handleAddCertification}
                    />
                    <div className="flex flex-wrap gap-2">
                      {coach.certifications?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 bg-primary text-black px-2 py-1 rounded-md text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveCertification(tag)}
                            className="ml-1 text-xs hover:text-red-300"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>


              </div>
            </ScrollArea>
            <Separator />
            <div className="p-4">
              <div className="flex gap-4 flex-wrap">
                <DialogClose className="text-[13px] font-medium leading-none px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button
                  disabled={loading}
                  type="submit"
                  className="flex-1 text-[13px]"
                >
                  {loading && <Spinner />} Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCoachProfile