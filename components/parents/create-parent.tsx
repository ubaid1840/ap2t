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
import axios from "axios";

type EditParentsProps = {
    visible: boolean
    onChange: (open: boolean) => void
}

export function CreateParent() {
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async () => {
    try {
      const result=await axios.post("/api/admin/parents",parent)
      console.log("parent created",result)
    } catch (error) {
      console.log(error)
    }
  };
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
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Pedro Duarte"
                  required
                  className="dark:bg-black"
                  value={parent.full_name}
                  onChange={(e) =>
                    setParent((prev) => ({
                      ...prev,
                      full_name: e.target.value,
                    }))
                  }
                />
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
                      email: e.target.value,
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
              <Button type="submit">Add Parent</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
