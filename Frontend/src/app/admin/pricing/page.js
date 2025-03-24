"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/admin/Layout";
import toast from "react-hot-toast";

export default function PricingAdmin() {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    type: "monthly",
    name: "",
    title: "",
    price: "",
    btnText: "",
    trail: "",
    features: [""],
    suggested: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const response = await fetch("http://localhost:5000/api/pricing");
    const data = await response.json();
    setPlans(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pricing`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Pricing plan added successfully!");
        fetchPlans();
        setFormData({
          type: "monthly",
          name: "",
          title: "",
          price: "",
          btnText: "",
          trail: "",
          features: [""],
          suggested: false,
        });
      } else {
        toast.error("Failed to add pricing plan");
      }
    } catch (error) {
      console.error("Error adding pricing plan:", error);
      toast.error("Error adding pricing plan");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Manage Pricing Plans</h2>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block mb-1">Plan Type</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Plan Name</label>
            <input
              type="text"
              placeholder="e.g. Free Plan, Business King, Pro Master"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              placeholder="e.g. For Small teams or office, For Enterprise business"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input
              type="text"
              placeholder="Enter price (e.g. 0, 15, 24)"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Button Text</label>
            <input
              type="text"
              placeholder="e.g. Start free trial, Create account"
              value={formData.btnText}
              onChange={(e) =>
                setFormData({ ...formData, btnText: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Trial Text</label>
            <input
              type="text"
              placeholder="e.g. Or Start 14 Days trial (optional)"
              value={formData.trail}
              onChange={(e) =>
                setFormData({ ...formData, trail: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Features (one per line)</label>
            <textarea
              placeholder="Enter features, one per line:
e.g.
Drag & Drop Builder
1,000's of Templates
Blog Support Tools
eCommerce Store"
              value={formData.features.join("\n")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: e.target.value.split("\n"),
                })
              }
              className="w-full p-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.suggested}
                onChange={(e) =>
                  setFormData({ ...formData, suggested: e.target.checked })
                }
                className="mr-2"
              />
              Suggested Plan (Highlight this plan as recommended)
            </label>
          </div>
          <button
            type="submit"
            className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
          >
            Add Pricing Plan
          </button>
        </form>

        <div className="space-y-4">
          {plans.monthly?.map((plan) => (
            <div key={plan._id} className="border p-4 rounded">
              <h3 className="font-bold">{plan.name} (Monthly)</h3>
              <p className="text-gray-600">{plan.title}</p>
              <p>Price: ${plan.price}</p>
              <ul className="list-disc ml-4">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
