"use client";
import AppCalendar from "@/components/app-calendar";
import { BarChart } from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart";
import { AssignCoachDialog } from "@/components/sessions/assign-coach-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  ChartColumn,
  DollarSign,
  Download,
  FileText,
  Filter,
  LucideProps,
} from "lucide-react";
import { ReactNode, useState } from "react";

export default function Page() {
  const [stats, setStats] = useState();
  const [dates, setDates] = useState<{
    start: Date | undefined;
    end: Date | undefined;
  }>({
    start: undefined,
    end: undefined,
  });
  const [filter, setFilter] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [coachId, setCoachId] = useState<number | undefined>();
  const [coachName, setCoachName] = useState<string | undefined>();
  const data = [
    {
      title: "Total Revenue",
      value: `$${stats?.totals?.totalRevenue || 0}`,
      Icon: (props: LucideProps) => <DollarSign {...props} />,
      color: "active",
    },

    {
      title: "Total Sessions",
      value: stats?.totals?.totalSessions || 0,
      Icon: (props: LucideProps) => <ChartColumn {...props} />,
      color: "info",
    },

    {
      title: "Outstanding",
      value: stats?.totals?.totalPending || 0,
      Icon: (props: LucideProps) => <FileText {...props} />,
      color: "warning",
    },

    {
      title: "Comped",
      value: stats?.totals?.totalComped || 0,
      Icon: (props: LucideProps) => <FileText {...props} />,
      color: "other",
    },
  ];
  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <Button>
            <Download /> Export All Data
        </Button>
      </Header>
      <div className="mt-4 flex w-full flex-wrap gap-4 justify-center">
        {data.map((item, i) => (
          <HeaderCard
            key={i}
            title={String(item.value)}
            description={item.title}
            icon={
              <div
                className={`rounded-[8px] flex w-7 h-7 items-center justify-center bg-${item.color}-bg  border-${item.color}-text/32`}
              >
                <item.Icon className={`text-${item.color}-text`} size={16} />
              </div>
            }
          />
        ))}
      </div>

      {filter && (
        <Card>
          <CardContent className="space-y-4">
            <div className="text-sm flex gap-2 items-center">
              <Filter className="text-primary" size={16} /> Filters
            </div>

            <div className="flex flex-col w-full gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">
                    Start Date
                  </Label>
                  <AppCalendar
                    date={dates.start}
                    onChange={(d) =>
                      setDates((prevState) => ({ ...prevState, start: d }))
                    }
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <Label className="text-muted-foreground font-normal text-xs">
                    End Date
                  </Label>
                  <AppCalendar
                    date={dates.end}
                    onChange={(d) =>
                      setDates((prevState) => ({ ...prevState, end: d }))
                    }
                  />
                </div>
                {
                    <div className="flex flex-1 flex-col gap-2">
                        <Label className="text-muted-foreground font-normal text-xs">
                    Select coach
                        </Label>

                        <AssignCoachDialog
                          onSelect={(coach) => {
                            setCoachId(coach.id);
                            setCoachName(`${coach.first_name} ${coach.last_name}`);
                          }}
                        />
                    </div>
                }
              </div>
              <Button
                disabled={filterLoading || !dates.start || !dates.end}
                onClick={() => {
                  setFilterLoading(true);
                }}
              >
                {filterLoading && <Spinner className="text-black" />}Apply
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <Card>
                <CardContent className="space-y-2">
      
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
      
                      <p className="text-sm">Revenue by Coach</p>
                      <p className="text-xs text-muted-foreground">Total earnings per coach</p>
                    </div>
                    <Button variant={"outline"} size={"icon-sm"} className="h-6 w-6 rounded-sm text-[10px] text-muted-foreground"><Download /></Button>
                  </div>
      
                  <BarChart chartData={stats?.revenueByCoach || []} xaxis="coach" yaxis="value" />
      
                </CardContent>
              </Card>
      
              <Card>
                <CardContent className="space-y-2">
      
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
      
                      <p className="text-sm">Session by Type</p>
                      <p className="text-xs text-muted-foreground">Distribution on session types</p>
                    </div>
                    <Button variant={"outline"} size={"icon-sm"} className="h-6 w-6 rounded-sm text-[10px] text-muted-foreground"><Download /></Button>
                  </div>
      
      
                  <div className="h-70">
                    {/* <PieChart
                      data={stats?.sessionTypeData || []}
                      config={SESSION_TYPE_CHART_CONFIG} /> */}
                  </div>
                </CardContent>
              </Card>
            </div>


    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-1">
        <p className="text-xl">Coach Analytics</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>Filter, analyze, and coaches status</span>
        </span>
      </div>
      {children}
    </div>
  );
};
const HeaderCard = ({
  title = "",
  description = "",
  icon = null,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) => {
  return (
    <Card className="flex-1 rounded-[10px] bg-[#1A1A1A] border-[#3A3A3A] sm:w-[204px] w-full p-0 py-2 px-4">
      <CardContent className="p-0 py-2 space-y-2">
        <div className="flex gap-2 items-center">
          {icon}
          <div className="space-y-0">
            <p className="text-muted-foreground text-[12px] ">{description}</p>
          </div>
        </div>
        <p className="text-[24px] text-white leading-tight">{title}</p>
      </CardContent>
    </Card>
  );
};
