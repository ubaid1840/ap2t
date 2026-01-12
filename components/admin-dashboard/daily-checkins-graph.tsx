import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart } from "@/components/bar-chart";
import { CHECKINS_CHART_DATA } from "./constants";

export function DailyCheckins() {
  return (
    <Card className="flex-3 bg-[#282828] border border-[#3A3A3A]">
      <Tabs defaultValue="Today">
        <CardHeader className="flex justify-between gap-3 flex-wrap">
          <div className="space-y-1">
            <h1 className="text-xl font-medium">Daily Check-ins</h1>
            <p className="text-md text-[#B0B0B0] tracking-tight">Track attendance patterns over time</p>
          </div>

          <TabsList className="bg-[#4F4F4F] relative flex gap-2 h-10 ">
            {["Today", "Weekly", "Monthly"].map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="p-4"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>


        </CardHeader>

        <TabsContent value="Today">
          <CardContent>
            {/* Bar chart for Today */}
            <BarChart chartData={CHECKINS_CHART_DATA.today} />
          </CardContent>
        </TabsContent>

        <TabsContent value="Weekly">
          <CardContent>
            {/* Bar chart for Weekly */}
            <BarChart chartData={CHECKINS_CHART_DATA.week} />
          </CardContent>
        </TabsContent>

        <TabsContent value="Monthly">
          <CardContent>
            {/* Bar chart for Monthly */}
            <BarChart chartData={CHECKINS_CHART_DATA.month} />
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
