"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import axios from "axios";
import modalNotification from "@/utility/notification";
import { loginSuccess, logout } from "@/redux/features/auth.slice";
import { useDispatch } from "react-redux";

const NavIcons = () => {
  const dispatch = useDispatch()
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state)=>state.auth)
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = async()=>{
    try{
      setIsProfileOpen(false)
      const response = await axios.get(`http://localhost:5050/api/customer/logout/${userData?.user?.id}`);
      modalNotification({
        type:'success',
        message:'Logout success'
      })
      dispatch(logout());
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={()=>{
          if(userData?.isLogIn && !isProfileOpen){
            setIsProfileOpen(true)
          }else if(isProfileOpen){
            setIsProfileOpen(false)
          }
          else{
            router.push('/login')
          }
        }}
        // onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="" onClick={()=>{
            setIsProfileOpen(false);
            router.push(`/profile/${userData?.user?.id}`)
          }}>Profile</Link>
          <div className="mt-2 cursor-pointer"
            onClick={handleLogout}
          >
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          3
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
