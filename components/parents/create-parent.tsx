"use client";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "@/lib/axios";
import { splitFullName } from "@/lib/functions";
import { Spinner } from "../ui/spinner";

type EditParentsProps = {
  visible: boolean
  onChange: (open: boolean) => void
}

export function CreateParent({ onRefresh }: { onRefresh: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [parent, setParent] = useState({
    first_name: "",
    last_name:"",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post("/user",
        {
          first_name: parent.first_name,
          last_name: parent.last_name,
          email: parent.email,
          phone_no: parent.phone,
          location: parent.address,
          role: "parent"
        }
      )
      console.log("parent created", result)
      await onRefresh()
      clearForm()
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  function clearForm() {
    setParent({
      first_name: "",
      last_name:"",
      email: "",
      phone: "",
      address: "",
    });

  }
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        <Plus /> Add Parent
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[550px] bg-[#252525]">
          <form onSubmit={handleSubmit}>
            <DialogHeader className=" pb-4">
              <DialogTitle className="text-sm font-normal">
                Add New Parent
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4 border-t">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                <Label htmlFor="first_name" className="text-xs text-muted-foreground">
                  First Name
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="Pedro"
                  required
                  className="dark:bg-black"
                  value={parent.first_name}
                  onChange={(e) =>
                    setParent((prev) => ({
                      ...prev,
                      first_name: e.target.value,
                    }))
                  }
                />
                </div>
                <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-xs text-muted-foreground">
                  last Name
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Duarte"
                  required
                  className="dark:bg-black"
                  value={parent.last_name}
                  onChange={(e) =>
                    setParent((prev) => ({
                      ...prev,
                      last_name: e.target.value,
                    }))
                  }
                />
                </div>

              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="pedro@example.com"
                  required
                  className="dark:bg-black"
                  value={parent.email}
                  onChange={(e) =>
                    setParent((prev) => ({
                      ...prev,
                      email: e.target.value.trim().toLowerCase(),
                    }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="phone"
                  className="text-xs text-muted-foreground"
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="dark:bg-black"
                  value={parent.phone}
                  onChange={(e) =>
                    setParent((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="address"
                  className="text-xs text-muted-foreground"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="New York, USA"
                  className="dark:bg-black"
                  value={parent.address}
                  onChange={(e) =>
                    setParent((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>{loading && <Spinner />}Add Parent</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
