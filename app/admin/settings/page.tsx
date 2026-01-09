import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, File } from "lucide-react";
import { FaUser, FaLock, FaCreditCard, FaBell } from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-md text-[#99A1AF] ">
            Manage your account, preferences, and integrations
          </p>
        </div>
        <Button className="rounded-3xl px-6 py-5 text-lg font-bold">
          <File /> Save changes
        </Button>
      </div>

      <Card className="bg-[#282828] border border-[#3A3A3A] p-0">
        <Tabs defaultValue="Profile info">
          <CardHeader className="p-0 border border-b-[#3A3A3A]">
            <TabsList className="bg-[#282828]">
              <TabsTrigger value="Profile info" className="data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-b-primary rounded-none">
                <div className="py-4 px-2 gap-2 flex items-center ">
                  <FaUser />
                  <h1 className="text-xl text-[#B0B0B0]">Profile Info</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="Notification Preference">
                <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                  <FaBell />
                  <h1 className="text-xl text-[#B0B0B0]">
                    Notification Preference
                  </h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="Role Permission">
                <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                  <RiShieldKeyholeLine />
                  <h1 className="text-xl text-[#B0B0B0]">Role Permission</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="Square Integration">
                <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                  <FaCreditCard />
                  <h1 className="text-xl text-[#B0B0B0]">Square Integration</h1>
                </div>
              </TabsTrigger>
              <TabsTrigger value="Security">
                <div className="py-4 px-2 gap-2 flex items-center data-[state=active]:bg-[#CBFD0026] data-[state=active]:text-primary data-[state=active]:border-primary">
                  <FaLock />
                  <h1 className="text-xl text-[#B0B0B0]">Security</h1>
                </div>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
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
                        <Input type="text" placeholder="Admin User" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]"/>
                    </div>
                    <div className="space-y-1">
                        <Label>E-mail</Label>
                        <Input type="text" placeholder="Admin@ap2t.com" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]"/>
                    </div>
                    <div className="space-y-1">
                        <Label>Phone No.</Label>
                        <Input type="text" placeholder="+91 23298453" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]"/>
                    </div>
                    <div className="space-y-1">
                        <Label>Role</Label>
                        <Input type="text" placeholder="" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]"/>
                    </div>
                    <div className="space-y-1">
                        <Label>Password</Label>
                        <Input type="text" placeholder="*******" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]"/>
                    </div>
                    <div className="space-y-1">
                        <Label>Phone No.</Label>
                        <Input type="text" placeholder="+91 9489483" className="rounded-[1px] bg-[#18181B] border-[#3A3A3A]"/>
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
