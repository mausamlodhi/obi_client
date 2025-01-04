"use client"
import UpdateButton from "@/components/UpdateButton";
import { members } from "@wix/members";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const userData = useSelector((state)=>state.auth.user) 
  console.log("data : ",userData)
  const user = {
    member: {
      contactId: "12345",
      profile: {
        nickname: "johndoe",
      },
      contact: {
        firstName: "John",
        lastName: "Doe",
        phones: ["+1234567890"],
      },
      loginEmail: "johndoe@gmail.com",
    },
  };
  
  const orderRes = {
    orders: [
      {
        _id: "order1234567890",
        priceSummary: {
          subtotal: {
            amount: 99.99,
          },
        },
        _createdDate: new Date("2023-01-01T12:00:00Z"),
        status: "Completed",
      },
      {
        _id: "order0987654321",
        priceSummary: {
          subtotal: {
            amount: 49.99,
          },
        },
        _createdDate: new Date("2023-02-15T15:30:00Z"),
        status: "Processing",
      },
      {
        _id: "order1122334455",
        priceSummary: {
          subtotal: {
            amount: 25.5,
          },
        },
        _createdDate: new Date("2023-03-10T08:45:00Z"),
        status: "Shipped",
      },
    ],
  };
  
  if (!user.member?.contactId) {
    return <div className="">Not logged in!</div>;
  }

    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     try {
    //       const response = await fetch(`http://localhost:5050/api/customer/${id}`)
    //       const data = await response.json();
    //       console.log("xoxoxo",response,data)
    //       if (response.ok) {
    //         setProducts(data.data);
    //       }
    //     } catch (err) {
    //       console.error("Error fetching products:", err);
    //     }
    //   };
  
    //   fetchProducts();
    // }, [id]);

  return (
    <div className="flex flex-col md:flex-row gap-24 md:h-[calc(100vh-180px)] items-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user.member.contactId} />
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder={userData.name || "john"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder={
              (userData?.phoneNumber||
              "+1234567")
            }
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={userData?.email || "john@gmail.com"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <UpdateButton />
        </form>
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Orders</h1>
        <div className="mt-12 flex flex-col">
          {orderRes.orders.map((order) => (
            <Link
              href={`/orders/${order._id}`}
              key={order._id}
              className="flex justify-between px-2 py-6 rounded-md hover:bg-green-50 even:bg-slate-100"
            >
              <span className="w-1/4">{order._id?.substring(0, 10)}...</span>
              <span className="w-1/4">
                ${order.priceSummary?.subtotal?.amount}
              </span>
              {order._createdDate && (
                <span className="w-1/4">{format(order._createdDate)}</span>
              )}
              <span className="w-1/4">{order.status}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
