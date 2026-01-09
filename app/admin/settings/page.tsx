import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";
import { FaBell, FaCreditCard, FaLock, FaUser } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { RiShieldKeyholeLine } from "react-icons/ri";

export default function Page() {
  return (
       <div className="flex flex-col w-full gap-6">
            <Header >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button className="rounded-full">
                        <FaFloppyDisk /> Save Changes
                    </Button>
                </div>
            </Header>
   <Card className="bg-[#282828] p-0 overflow-hidden">
        <Tabs defaultValue="Profile info">
          <TabsList className="bg-[#282828] p-0">
            <TabsTrigger value="Profile info" className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none rounded-tl-xl">
              <div className="py-4 px-2 gap-2 flex items-center ">
                <FaUser />
                <h1 className="text-sm">Profile Info</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="Notification Preference" className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none">
              <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                <FaBell />
                <h1 className="text-sm">
                  Notification Preference
                </h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="Role Permission" className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none">
              <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                <RiShieldKeyholeLine />
                <h1 className="text-sm">Role Permission</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="Square Integration" className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none">
              <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                <FaCreditCard />
                <h1 className="text-sm">Square Integration</h1>
              </div>
            </TabsTrigger>
            <TabsTrigger value="Security" className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none">
              <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                <FaLock />
                 <h1 className="text-sm">Security</h1>
              </div>
            </TabsTrigger>
          </TabsList>
          <CardContent className="p-4 space-y-12">
            <TabsContent value="Profile info" className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <h1 className="text-xl font-semibold">Profile Information</h1>
                  <p className="text-md text-[#B0B0B0]">Manage your personal details and keep your contact</p>
                </div>

                <div className="flex gap-8">
                  <div className="relative w-24 h-24">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src="/settings/profilepic.png"
                      alt=""
                    />

                    <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
                      <FaUser className="text-black text-sm" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h1 className="text-xl font-semibold">Admin User</h1>
                    <p className="text-md text-[#B0B0B0]">Super Admin</p>
                    <div className="flex gap-2">
                      <Button variant={"link"} className="p-0">Delete</Button>
                      <Button variant={"link"} className="p-0">Update</Button>
                    </div>

                  </div></div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <Label>Full Name</Label>
                    <Input type="text" placeholder="Admin User" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]" />
                  </div>
                  <div className="space-y-1">
                    <Label>E-mail</Label>
                    <Input type="text" placeholder="Admin@ap2t.com" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]" />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone No.</Label>
                    <Input type="text" placeholder="+91 23298453" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]" />
                  </div>
                  <div className="space-y-1">
                    <Label>Role</Label>
                    <Input type="text" placeholder="" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password</Label>
                    <Input type="text" placeholder="*******" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]" />
                  </div>
                  <div className="space-y-1">
                    <Label>Phone No.</Label>
                    <Input type="text" placeholder="+91 9489483" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]" />
                  </div>

                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}


const Header = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex w-full gap-4 justify-between flex-wrap items-center">
            <div className="space-y-2">
                <p className="text-xl">Setings</p>
                <span className="text-xs text-muted-foreground flex items-center">
                    <span>Manage your account, preferences and integration</span>  
                </span>
            </div>

            {children}

        </div>
    )
}