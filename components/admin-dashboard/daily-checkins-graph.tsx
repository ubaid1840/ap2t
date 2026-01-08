import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

export function DailyCheckins() {
  return (
    <Card className="flex-3 bg-[#282828]">
      <Tabs defaultValue="today">
        <CardHeader className="flex justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Daily Check-ins</h1>
            <p className="text-md text-[#B0B0B0]">Track attendance patterns over time</p>
          </div>
          <TabsList className="bg-[#4F4F4F] text-[#B0B0B0] rounded-[14px] p-2">
            <TabsTrigger
              value="today"
              className="data-[state=active]:bg-primary data-[state=active]:text-black! rounded-[10px]"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="data-[state=active]:bg-primary data-[state=active]:text-black! rounded-[10px]"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-primary data-[state=active]:text-black! rounded-[10px]"
            >
              Monthly
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <TabsContent value="today">
          <CardContent>
            {/* Bar chart for Today */}
            <p>Today's check-in chart goes here</p>
          </CardContent>
        </TabsContent>

        <TabsContent value="weekly">
          <CardContent>
            {/* Bar chart for Weekly */}
            <p>Weekly check-in chart goes here</p>
          </CardContent>
        </TabsContent>

        <TabsContent value="monthly">
          <CardContent>
            {/* Bar chart for Monthly */}
            <p>Monthly check-in chart goes here</p>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
