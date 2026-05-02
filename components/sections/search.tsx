'use client'

import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { useDebounce } from '@/hooks/use-debounce'
import axios from '@/lib/axios'
import { Player, Session } from '@/lib/kiosk-data'
import { Search, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import RenderAvatar from '../render-avatar'

type DataProps = {
    prebooked: { user: Player, session: Session }[],
    walkin: { user: Player, session: null }[]
}

const SearchPage = ({ onClick }: { onClick: (val: any) => void }) => {


    const [searchQuery, setSearchQuery] = useState('')
    const debouncedSearch = useDebounce(searchQuery, 500);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<DataProps>({ prebooked: [], walkin: [] })
  

    useEffect(() => {
        if (!debouncedSearch?.trim()) {
            setData({ prebooked: [], walkin: [] });

            return;
        }
        fetchData();
    }, [debouncedSearch]);


    async function fetchData() {
        setLoading(true);
        try {
            const response = await axios.get(`/frontdesk/search?query=${encodeURIComponent(debouncedSearch)}`);
            setData(response.data);
        } catch (err) {
            console.error(err);
            setData({ prebooked: [], walkin: [] });
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="flex flex-1 flex-col items-center justify-center  px-6 py-12">
            {searchQuery === '' && (
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary">
                        <User className="h-12 w-12 text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground">Welcome!</h2>
                    <p className="mt-2 text-foreground/60">
                        Tap the search box above to find your name
                    </p>
                </div>
            )}

            <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/40" />
                <Input
                    type="text"
                    placeholder="Enter name or member number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-14 w-full rounded-lg bg-background pl-12 pr-4 text-lg text-foreground placeholder:text-foreground/40"
                />
            </div>



            {searchQuery.trim() && (

                <div className="w-[70dvw] overflow-hidden rounded-lg border border-[#4F4F4F] bg-[#18181B] mt-6">

                    {loading && (
                        <div className="w-full h-[100px] flex items-center justify-center">
                            <Spinner />
                        </div>
                    )}

                    {searchQuery && !loading && data.prebooked.length > 0 && (
                        <div>
                            <h3 className="flex items-center gap-2 bg-secondary p-4 text-sm font-medium text-primary tracking-wide">
                                Pre-Booked Sessions
                            </h3>
                            <div >
                                {data.prebooked.map((item, i) =>
                                    <div
                                        key={`${item.user.id}-${i}`}
                                        onClick={() => onClick(item)}

                                        className="flex w-full items-center justify-between border-b p-5 transition-all hover:bg-secondary/50"
                                    >
                                        <div className="flex items-center gap-4">
                                            <RenderAvatar className="h-8 w-8" img={item.user.picture} fallback={item.user.name} />
                                            <div className="text-left">
                                                <p className="font-semibold text-foreground">{item.user.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-foreground">{item.session.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.session.start_time} - {item.session.end_time}</p>
                                        </div>
                                        <div className="flex h-9 w-28 items-center justify-center rounded-md border border-success-text/30 bg-success-bg text-xs text-success-text">
                                        Pre-Booked
                                        </div>
                                    </div>

                                )}
                            </div>
                        </div>
                    )}

                    {searchQuery && !loading && data.walkin.length > 0 && (
                        <div>
                            <h3 className="flex items-center gap-2 bg-secondary p-4 text-sm font-medium text-alternative-text">
                                Walk-In (Select Session)
                            </h3>
                            <div className="space-y-3">
                                {data.walkin.map((item, i) => (

                                    <div
                                        key={`${item.user.id}-${i}`}
                                        onClick={() => onClick(item)}
                                        className="flex w-full items-center justify-between p-4 transition-all hover:bg-secondary/50"
                                    >
                                        <div className="flex items-center gap-4">
                                             <RenderAvatar className="h-8 w-8" img={item.user.picture} fallback={item.user.name} />

                                            <div className="text-left">
                                                <p className="font-semibold text-foreground">{item.user.name}</p>
                                                {/* <p className="text-sm text-foreground/60">Member: {player.memberId}</p> */}
                                            </div>
                                        </div>
                                        <div className="flex h-9 w-28 items-center justify-center rounded-md border border-warning-text/30 bg-warning-bg text-xs text-warning-text">
                                            Walk-In
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    )}



                    {searchQuery && !loading && data.prebooked.length === 0 && data.walkin.length === 0 && (
                        <div className="rounded-lg border border-border bg-background p-8 text-center">
                            <p className="text-foreground/60">No players found matching "{searchQuery}"</p>
                            <p className="mt-2 text-sm text-foreground/40">
                                Please check the spelling or ask front desk staff for help
                            </p>
                        </div>
                    )}
                </div>

            )}

        </div>



    )
}

export default SearchPage