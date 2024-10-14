import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  ); // Use state and fallback
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setUser(resp.data); // Update user in state
        setOpenDialog(false);
      })
      .catch((error) => {
        console.log("Error fetching user profile:", error);
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img src="/logo.svg" alt="Logo" />
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button className="rounded-full" variant="outline">
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button className="rounded-full" variant="outline">
                My Trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={`${user?.picture}?t=${new Date().getTime()}`} // Add cache-busting timestamp
                  alt="Profile pic"
                  className="h-[35px] w-[35px] rounded-full"
                  onError={(e) => {
                    e.target.src = "/default-profile.jpg";
                  }} // Fallback image
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    window.location.reload();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button
                className="w-full mt-5 flex gap-4 items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
