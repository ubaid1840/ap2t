
import { joinNames } from '@/lib/functions'
import CardStatus from '../card-status'
import { AddParticipantDialog } from '../sessions/add-participant-dialog'
import { Badge } from '../ui/badge'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { ScrollArea } from '../ui/scroll-area'
import { CalendarEvent } from './calendar-data'
import ParticipateButton from './participate-button'


const EventDetail = ({
    open,
    onOpenChange,
    events,
    player_id = null,
    parent_id = null,
    onSuccess
}: {
    events: CalendarEvent[];
    open: boolean;
    onOpenChange: () => void;
    player_id: string | null | undefined,
    onSuccess: () => Promise<void>,
    parent_id: string | null | undefined | number
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
                <DialogHeader className="border-b border-[#3A3A3A] p-4">
                    <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
                        Event details
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[70dvh] px-4 py-3">
                    <div className="space-y-3">
                        {events.length === 0 && (
                            <div className="text-sm text-muted-foreground text-center py-10">
                                No events found
                            </div>
                        )}

                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="rounded-lg border border-[#3A3A3A] bg-[#1E1E1E] p-4 flex flex-col justify-between hover:bg-[#242424] transition gap-2"
                            >
                                <div className='flex items-center justify-between'>
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-white">
                                            {event.title} {event?.enrolled && <Badge className='ml-2 bg-green-500/10 text-green-400'>Enrolled</Badge>}
                                        </h3>

                                        <div className="text-xs text-muted-foreground flex gap-3">
                                            <span>{event.date}</span>
                                            <span>•</span>
                                            <span>{event.time}</span>
                                        </div>
                                        {event?.children?.length > 0 && (
                                            <p className="text-xs">
                                                <span className="font-medium text-sm">Players enrolled:</span>{" "}
                                                {event.children
                                                    .map(child => joinNames([child.first_name, child.last_name]))
                                                    .join(", ")}
                                            </p>
                                        )}



                                    </div>

                                    <div className='flex gap-2 flex-wrap'>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full font-medium capitalize bg-alternative-bg text-alternative-text`}
                                        >
                                            {event.sessionType}
                                        </span>
                                        <CardStatus value={event?.status} />
                                    </div>
                                </div>

                                {event.status === 'upcoming' &&
                                    <>
                                        {player_id && <ParticipateButton player_id={player_id} session_id={event.id} onSuccess={async () => {
                                            await onSuccess()
                                            onOpenChange()
                                        }} />}

                                        {parent_id && <AddParticipantDialog parent_id={parent_id} sessionId={Number(event.id)} onSuccess={async () => {
                                            await onSuccess()
                                            onOpenChange()
                                        }} />}</>
                                }



                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
                    <div className="flex gap-4">
                        <DialogClose className="text-[13px] font-medium leading-none h-8 px-4  bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                            Close
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventDetail