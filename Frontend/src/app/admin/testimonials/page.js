"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/admin/Layout";
import toast from 'react-hot-toast';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    review: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success('Testimonial added successfully!');
        fetchTestimonials();
        setFormData({ name: "", role: "", image: "", review: "", rating: 5 });
      } else {
        toast.error('Failed to add testimonial');
      }
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error('Error adding testimonial');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter client's full name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <input
              type="text"
              placeholder="e.g. CEO at TechCorp, Marketing Director"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="text"
              placeholder="Enter image URL or path (e.g. /testimonials/user1.jpg)"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Review</label>
            <textarea
              placeholder="Enter client's testimonial or review message"
              value={formData.review}
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Rating (1-5)</label>
            <input
              type="number"
              placeholder="Enter rating between 1 and 5"
              min="1"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData({ ...formData, rating: Number(e.target.value) })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
          >
            Add Testimonial
          </button>
        </form>

        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="border p-4 rounded">
              <h3 className="font-bold">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.role}</p>
              <p>{testimonial.review}</p>
              <p>Rating: {testimonial.rating}/5</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
