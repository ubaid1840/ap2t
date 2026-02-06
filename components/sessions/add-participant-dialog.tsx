"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, User, Loader2, Check } from "lucide-react";
import axios from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AddParticipantDialogProps {
  sessionId: string;
  onSuccess: () => void;
}

interface Player {
  player_id: string;
  first_name: string;
  last_name: string;
  email: string;
  picture: string;
}

export function AddParticipantDialog({ sessionId, onSuccess }: AddParticipantDialogProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          search.length > 1 
            ? `/admin/players/search?query=${search}`
            : `/admin/players/search`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setLoading(false);
      }
    };
    
    const delayDebounceFn = setTimeout(fetchPlayers, search.length > 0 ? 300 : 0);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const addParticipant = async (playerId: string) => {
    setAddingId(playerId);
    try {
      await axios.post(`/admin/sessions/${sessionId}/participants`, {
        player_id: playerId,
      });
      onSuccess();
      setOpen(false)
    } catch (error) {
      console.error("Add participant error", error);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
        setOpen(val);
        if(!val) {
            setSearch("");
            setResults([]);
        }
    }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Participant
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#252525] border-[#3A3A3A] max-h-[70vh] max-w-5xl p-0 gap-0">
        <DialogHeader className="border-b border-[#3A3A3A] p-4">
          <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
            Add Participant
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-[#99A1AF]">Search Player</Label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search by name..."
                className="pl-9 !bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            ) : results.length > 0 ? (
              <ScrollArea className="h-[60vh]">
                <div className="space-y-2">
                  {results.map((player) => (
                    <div
                      key={player.player_id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A1A] border border-[#3A3A3A]"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.picture} />
                          <AvatarFallback>{player.first_name[0]}{player.last_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-[#E5E7EB]">
                            {player.first_name} {player.last_name}
                          </p>
                          <p className="text-xs text-[#99A1AF]">{player.email}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => addParticipant(player.player_id)}
                        disabled={addingId === player.player_id}
                      >
                        {addingId === player.player_id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Plus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="text-center py-8 text-[#99A1AF]">
                No players found.
              </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
