import { UserProfile } from ".";
import { useSettingsContext } from "@/providers/SettingsProvider";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import TwoFactorAuth from "./TwoFactorAuth";
import TwoFactorAuthOTP from "./TwoFactorAuthOTP";
import Activities from "./Activities";

export default function ActiveSettingsOption() {
  const { activeOption } = useSettingsContext();

  return (
    <div className="col-span-7 bg-white p-6 rounded-[40px]">
      <p className="pb-4 border-b border-[#F0F0F0] text-[24px] font-bold text-dark mb-4">
        {activeOption}
      </p>
      {activeOption === "User Profile" && <UserProfile />}
      {activeOption === "Change Password" && <ChangePassword />}
      {activeOption === "Edit Profile" && <EditProfile />}
      {activeOption === "Enable 2FA" && <TwoFactorAuth />}
      {activeOption === "Verify 2FA OTP" && <TwoFactorAuthOTP />}
      {activeOption === "Activities" && <Activities />}
    </div>
  );
}
