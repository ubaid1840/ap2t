"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { User } from "lucide-react";

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    name: "",
    designation: "",
    rating: 0,
  });

  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing token");
      return;
    }

    if (form.rating === 0) {
      setError("Please select a rating");
      return;
    }

    const res = await fetch("/api/testimonials/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, token }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
        <div className="bg-[#454545] p-8 rounded-2xl text-center">
          <h1 className="text-2xl font-semibold mb-2">Thank you!</h1>
          <p className="text-[#a3a3a3]">Your review has been submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center px-4">
  <div className="w-full max-w-xl bg-[#2a2a2a] rounded-2xl p-6 shadow-xl relative text-white">

    <h2 className="text-lg font-medium mb-1">Leave a Review</h2>
    <p className="text-xs text-[#888] mb-5">Share your experience with us</p>

    <div className="mb-4">
      <label className="text-xs text-[#bbb] block mb-1">Title</label>
      <input type="text" placeholder="Title"
        className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm text-white outline-none"
        value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
    </div>

    <div className="mb-4">
      <label className="text-xs text-[#bbb] block mb-1">Description</label>
      <textarea placeholder="Description"
        className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm text-white outline-none resize-y min-h-[90px]"
        value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
    </div>

    <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="text-xs text-[#bbb] block mb-1">Your Name</label>
        <input type="text" placeholder="Your Name"
          className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm text-white outline-none"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="text-xs text-[#bbb] block mb-1">Designation</label>
        <input type="text" placeholder="e.g. Athlete, Parent"
          className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-3 py-2 text-sm text-white outline-none"
          value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
      </div>
    </div>

    <div className="mb-6">
      <label className="text-xs text-[#bbb] block mb-2">Rating</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button type="button" key={star}
            onClick={() => setForm({ ...form, rating: star })}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl">
            <span className={(hover || form.rating) >= star ? 'text-[#c8f020]' : 'text-[#3a3a3a]'}>★</span>
          </button>
        ))}
      </div>
    </div>

    <div className="flex justify-end gap-3">
      <button onClick={handleSubmit} className="bg-[#c8f020] text-[#111] font-semibold rounded-lg px-5 py-2 text-sm">Submit Review</button>
    </div>
  </div>
</div>
  );
}
